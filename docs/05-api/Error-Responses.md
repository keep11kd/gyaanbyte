Here is the complete, production-grade documentation file for docs/05-api/Error-Responses.md.File Path: docs/05-api/Error-Responses.mdMarkdown# GyaanByte — REST API Error Handling & Exception Response Architecture

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-19-ERRORSPEC
Target File     : docs/05-api/Error-Responses.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Backend Architect & API Governance Team
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | API Standards Committee | Baseline Standardized Error Handling Specification | Approved |

---

## Table of Contents
1. [Executive Summary & Core Principles](#1-executive-summary--core-principles)
2. [Unified Error Payload Specification](#2-unified-error-payload-specification)
3. [HTTP Status Code & System Error Mapping](#3-http-status-code--system-error-mapping)
4. [Standardized Application Error Catalog](#4-standardized-application-error-catalog)
5. [Concrete Response Examples](#5-concrete-response-examples)
6. [Global Exception Handling Architecture](#6-global-exception-handling-architecture)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Core Principles

This specification defines the uniform error handling schema, failure taxonomy, HTTP status code mappings, and error response structures for all **GyaanByte Platform APIs**.

### Core Error Handling Guarantees:
- **Predictable Payload Structure:** Every non-`2xx` HTTP response returns a standardized JSON error envelope (`ApiErrorResponse`).
- **Data Leak Prevention:** Internal stack traces, raw SQL query fragments, and framework logs are sanitized before leaving the application boundary.
- **Actionable Debugging:** Every error response includes a unique `requestId` and granular `details` map to aid client-side validation rendering and log tracing.

---

# 2. Unified Error Payload Specification

All error responses strictly adhere to the following JSON structure:

```json
{
  "success": false,
  "message": "Human-readable summary of the error condition",
  "error": {
    "code": "DOMAIN_SPECIFIC_ERROR_CODE",
    "details": {
      "field_name": "Specific validation failure explanation"
    }
  },
  "requestId": "9b8f72a1-3d4e-4f51-b82d-112233445566",
  "timestamp": "2026-08-08T20:58:00.000Z"
}
Payload Field Dictionarysuccess (boolean): Always false for error responses.message (string): User-friendly summary message suitable for frontend toast/banner notifications.error.code (string): Machine-readable uppercase application code (e.g., VALIDATION_ERROR, PAYMENT_FAILED).error.details (object | null): Key-value pairs providing field-level validation messages or diagnostic context.requestId (string): UUID tracking header (X-Request-ID) mapped in backend logs for distributed tracing.timestamp (string): ISO-8601 UTC timestamp recording when the failure occurred.3. HTTP Status Code & System Error MappingHTTP CodeHTTP Status TextTarget Failure Scenarios400Bad RequestMalformed JSON, missing mandatory headers, syntax errors.401UnauthorizedMissing JWT, expired token, invalid signatures.403ForbiddenInsufficient permissions/roles (RBAC rejection).404Not FoundRequested entity ID or API route does not exist.409ConflictDuplicate entry (e.g., duplicate user email or active booking conflict).422Unprocessable EntityBusiness rule violation (e.g., applying an expired coupon code).429Too Many RequestsRate-limiting thresholds exceeded.500Internal Server ErrorUnhandled runtime exceptions, database timeouts.503Service UnavailableExternal gateway/downstream service outage.4. Standardized Application Error CatalogDomain CodeDescriptionDefault HTTP StatusINVALID_INPUT_FORMATJSON parsing failure or invalid payload structure.400 Bad RequestVALIDATION_ERRORSpring @Valid field-level constraints failed.400 Bad RequestAUTH_TOKEN_EXPIREDJWT access token has passed its expiration time.401 UnauthorizedAUTH_INVALID_CREDENTIALSLogin username/password pair does not match records.401 UnauthorizedACCESS_DENIEDToken user lacks required authority for endpoint.403 ForbiddenRESOURCE_NOT_FOUNDTarget entity (e.g., Project, Course, Lead) not found.404 Not FoundDUPLICATE_RESOURCEEntity with unique key already exists.409 ConflictPAYMENT_GATEWAY_ERRORRazorpay or Stripe transaction processing failed.422 UnprocessableRATE_LIMIT_EXCEEDEDRequest frequency exceeds Token Bucket quota.429 Too Many RequestsINTERNAL_SERVER_ERRORSystem crash or unexpected exception.500 Server Error5. Concrete Response Examples5.1 Validation Error (400 Bad Request)JSON{
  "success": false,
  "message": "Validation failed for request parameters",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "Must be a well-formed email address",
      "phoneNumber": "Phone number must be exactly 10 digits"
    }
  },
  "requestId": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  "timestamp": "2026-08-08T20:58:05.120Z"
}
5.2 Token Expired (401 Unauthorized)JSON{
  "success": false,
  "message": "Access token has expired. Please refresh your token.",
  "error": {
    "code": "AUTH_TOKEN_EXPIRED",
    "details": null
  },
  "requestId": "b2c3d4e5-f6a7-8901-2345-6789abcdef01",
  "timestamp": "2026-08-08T20:58:12.450Z"
}
5.3 Resource Not Found (404 Not Found)JSON{
  "success": false,
  "message": "Project with ID 'c39a2b84-27f1-4b1e-9208-112233445566' was not found",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "details": {
      "resource": "Project",
      "identifier": "c39a2b84-27f1-4b1e-9208-112233445566"
    }
  },
  "requestId": "c3d4e5f6-a7b8-9012-3456-789abcdef012",
  "timestamp": "2026-08-08T20:58:20.890Z"
}
6. Global Exception Handling ArchitectureIn the Spring Boot backend, exceptions are caught globally using @RestControllerAdvice, ensuring all unhandled exceptions are mapped to the standard envelope before returning to clients:Java@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );

        ApiErrorDetails errorDetails = ApiErrorDetails.builder()
                .code("VALIDATION_ERROR")
                .details(errors)
                .build();

        ApiResponse<Void> response = ApiResponse.error(
                "Validation failed for request parameters",
                errorDetails,
                MDC.get("requestId")
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
7. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead Backend Architect                  Date: August 08, 2026
 [X] API Quality Assurance Lead              Date: August 08, 2026

================================================================================
