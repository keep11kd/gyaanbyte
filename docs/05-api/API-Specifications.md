Here is the complete, production-grade documentation file for docs/05-api/API-Specification.md.File Path: docs/05-api/API-Specification.mdMarkdown# GyaanByte — REST API Architecture & OpenAPI Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-13-APISPEC
Target File     : docs/05-api/API-Specification.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : API & Integrations Engineering Lead
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | API Architecture Team | Baseline REST API Contract & Specification | Approved |

---

## Table of Contents
1. [Executive Summary & Design Principles](#1-executive-summary--design-principles)
2. [Global API Conventions & Protocols](#2-global-api-conventions--protocols)
3. [Unified Response Wrappers & Error Contracts](#3-unified-response-wrappers--error-contracts)
4. [Authentication & Authorization Headers](#4-authentication--authorization-headers)
5. [Core Domain API Endpoint Catalog](#5-core-domain-api-endpoint-catalog)
   - [5.1 Auth & Identity Domain (`/api/v1/auth`)](#51-auth--identity-domain-apiv1auth)
   - [5.2 Lead Management & CRM Domain (`/api/v1/crm`)](#52-lead-management--crm-domain-apiv1crm)
   - [5.3 Academic Projects Domain (`/api/v1/projects`)](#53-academic-projects-domain-apiv1projects)
   - [5.4 Training & LMS Domain (`/api/v1/training`)](#54-training--lms-domain-apiv1training)
   - [5.5 Payments & Checkout Domain (`/api/v1/payments`)](#55-payments--checkout-domain-apiv1payments)
6. [Rate Limiting & Throttling Guarantees](#6-rate-limiting--throttling-guarantees)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Design Principles

This specification defines the contract guidelines, endpoint definitions, security headers, request/response models, and error responses for the **GyaanByte Platform REST APIs**.

All endpoints adhere strictly to **OpenAPI 3.0** standards, utilizing JSON (JavaScript Object Notation) over HTTPS (TLS 1.3) with explicit URL versioning (`/api/v1/`).

---

# 2. Global API Conventions & Protocols

- **Base URL Topology:** `https://api.gyaanbyte.com/api/v1`
- **Content Type:** `Content-Type: application/json` (except multi-part file upload endpoints using `multipart/form-data`).
- **HTTP Method Usage:**
  - `GET`: Idempotent read operations.
  - `POST`: Entity creation or complex queries requiring body payloads.
  - `PUT`: Full resource replacements.
  - `PATCH`: Partial field modifications.
  - `DELETE`: Logical or physical soft deletes.

---

# 3. Unified Response Wrappers & Error Contracts

Every API response emitted by the backend system returns a standardized envelope structure (`ApiResponse<T>`).

### 3.1 Standard Success Envelope
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "error": null,
  "timestamp": "2026-08-08T20:54:00Z"
}
3.2 Standard Error Envelope (HTTP 400/401/403/404/500)JSON{
  "success": false,
  "message": "Validation failed for request parameters",
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "Email address must be a valid email format",
      "phoneNumber": "Phone number must be exactly 10 digits"
    }
  },
  "timestamp": "2026-08-08T20:54:00Z"
}
4. Authentication & Authorization HeadersProtected routes enforce HTTP Bearer Token authentication via the standard Authorization header:HTTPAuthorization: Bearer <JWT_ACCESS_TOKEN>
Refresh tokens are set automatically as HttpOnly, Secure, SameSite=Strict cookies during login and token renewal cycles.5. Core Domain API Endpoint Catalog5.1 Auth & Identity Domain (/api/v1/auth)HTTP MethodEndpoint PathAuth RequiredDescriptionPOST/api/v1/auth/registerNoneRegisters a new user account and dispatches verification mail.POST/api/v1/auth/loginNoneAuthenticates user credentials and issues access + refresh tokens.POST/api/v1/auth/refreshCookieExchanges refresh cookie for a new 15-minute access token.GET/api/v1/auth/meBearerReturns profile metadata and roles for the authenticated user.5.2 Lead Management & CRM Domain (/api/v1/crm)HTTP MethodEndpoint PathAuth RequiredDescriptionPOST/api/v1/public/crm/leadsNonePublic lead capture endpoint for website inquiry forms.GET/api/v1/crm/leadsROLE_SALES, ADMINFetches a paginated list of leads with status filtering.PATCH/api/v1/crm/leads/{id}/statusROLE_SALES, ADMINUpdates the state machine status of a sales lead.5.3 Academic Projects Domain (/api/v1/projects)HTTP MethodEndpoint PathAuth RequiredDescriptionGET/api/v1/projectsNoneQueries project catalog with search parameters and tags.GET/api/v1/projects/{slug}NoneFetches detailed project metadata and abstract details.GET/api/v1/projects/{id}/download-linkBearerGenerates a 15-minute MinIO presigned URL for verified buyers.5.4 Training & LMS Domain (/api/v1/training)HTTP MethodEndpoint PathAuth RequiredDescriptionGET/api/v1/training/coursesNoneLists all published learning programs and modules.POST/api/v1/training/progressBearerMarks a course lesson as completed and returns overall progress.GET/api/v1/training/certificates/{id}BearerDownloads generated course completion certificate PDF.5.5 Payments & Checkout Domain (/api/v1/payments)HTTP MethodEndpoint PathAuth RequiredDescriptionPOST/api/v1/payments/create-orderBearerCreates a checkout order with Razorpay or Stripe gateway.POST/api/v1/public/payments/webhookWebhook SignatureAsync endpoint receiving payment outcome signatures.6. Rate Limiting & Throttling GuaranteesAPI access rates are enforced at the NGINX edge and Redis layer using a Token Bucket algorithm:Public Endpoints: 60 requests per minute per IP address.Authenticated APIs: 300 requests per minute per authenticated User ID.File Download Token APIs: 10 generation requests per 24 hours per project purchase.When an IP or user exceeds limits, the server returns HTTP status 429 Too Many Requests:JSON{
  "success": false,
  "message": "Rate limit exceeded. Please wait before retrying.",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "details": { "retryAfterSeconds": 45 }
  }
}
7. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] API Engineering Lead                    Date: August 08, 2026
 [X] Lead Systems Architect                  Date: August 08, 2026

================================================================================
