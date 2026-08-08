Here is the complete, production-grade documentation file for docs/05-api/API-Design.md.File Path: docs/05-api/API-Design.mdMarkdown# GyaanByte — REST API Design Principles & Architectural Standards

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-17-APIDESIGN
Target File     : docs/05-api/API-Design.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead API Architect & Principal Backend Engineer
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | API Standards Committee | Baseline REST API Architectural Guidelines & Design Patterns | Approved |

---

## Table of Contents
1. [Executive Summary & Architectural Philosophy](#1-executive-summary--architectural-philosophy)
2. [URL Naming Conventions & Resource Hierarchy](#2-url-naming-conventions--resource-hierarchy)
3. [HTTP Method Semantics & Status Code Mappings](#3-http-method-semantics--status-code-mappings)
4. [Query Parameters: Filtering, Sorting & Pagination](#4-query-parameters-filtering-sorting--pagination)
5. [Versioning & Content Negotiation Strategy](#5-versioning--content-negotiation-strategy)
6. [Request & Response Serialization Standards](#6-request--response-serialization-standards)
7. [Idempotency & Resilience Guarantees](#7-idempotency--resilience-guarantees)
8. [Governance & Approval Sign-Off](#8-governance--approval-sign-off)

---

# 1. Executive Summary & Architectural Philosophy

This specification establishes the architectural guidelines and design principles for all Application Programming Interfaces (APIs) built within the **GyaanByte Platform**.

### Core API Principles:
- **Resource-Centric Design:** Uniform resource identifiers (URIs) represent nouns, avoiding verb-based path segments.
- **Strict HTTPS Transport:** All production API traffic requires TLS 1.3 encryption.
- **Predictable Error Contracts:** Unified error payloads across all HTTP status codes.
- **Backward Compatibility:** Non-breaking changes (adding optional parameters, returning extra fields) must not increment API major versions.

---

# 2. URL Naming Conventions & Resource Hierarchy

### 2.1 URI Structural Guidelines
- **Kebab-case URLs:** All path segments must be lowercase kebab-case (e.g., `/download-link`, `/project-categories`).
- **Plural Nouns for Collections:** Collection paths use plural nouns (e.g., `/projects`, `/leads`, `/courses`).
- **Hierarchical Nesting (Max 2 Levels Deep):** Sub-resources must represent genuine logical containment.

```text
GOOD:  GET /api/v1/courses/java-microservices/lessons
BAD:   GET /api/v1/getJavaMicroservicesCourseLessons
BAD:   GET /api/v1/courses/java-microservices/modules/12/lessons/4/comments/99/likes
3. HTTP Method Semantics & Status Code MappingsHTTP MethodOperationsIdempotentSafePrimary HTTP Status CodesGETRead resource or collectionYesYes200 OK, 404 Not FoundPOSTCreate resource / Execute actionNoNo201 Created, 400 Bad Request, 422 UnprocessablePUTReplace resource state entirelyYesNo200 OK, 204 No Content, 404 Not FoundPATCHPartial resource field updateNoNo200 OK, 400 Bad RequestDELETESoft/Physical resource deletionYesNo200 OK, 204 No Content, 404 Not Found4. Query Parameters: Filtering, Sorting & PaginationAll collection-fetching GET endpoints must support standard Spring Data Pageable mechanics to prevent memory exhaustion and database lock contention.4.1 Pagination Parameterspage: Zero-indexed page number (default: 0).size: Items per page (default: 20, maximum enforced: 100).4.2 Sorting Parameterssort: Expressed as <field>,<direction> (e.g., sort=createdAt,desc or sort=priceInr,asc). Multiple sort parameters are permitted.4.3 Standard Filter SyntaxHTTPGET /api/v1/projects?category=MAJOR&tag=SPRING_BOOT&minPrice=1000&maxPrice=5000&page=0&size=20&sort=createdAt,desc
5. Versioning & Content Negotiation Strategy5.1 Explicit URI Path VersioningMajor API breaking changes require incrementing the explicit URI prefix segment (/v1/, /v2/).5.2 Header RequirementsHTTPAccept: application/json
Content-Type: application/json; charset=UTF-8
X-Request-ID: 9b8f72a1-3d4e-4f51-b82d-112233445566
The X-Request-ID UUID header is passed through MDC (Mapped Diagnostic Context) logging to trace requests across application filters and RabbitMQ event queues.6. Request & Response Serialization StandardsField Naming Strategy: lowerCamelCase for JSON request/response payloads.Timestamps: ISO-8601 strings in UTC timezone (YYYY-MM-DDTHH:mm:ss.sssZ).Null Value Handling: Null JSON fields should be omitted from output payloads (@JsonInclude(JsonInclude.Include.NON_NULL)).JSON{
  "id": "c39a2b84-27f1-4b1e-9208-112233445566",
  "title": "Enterprise E-Commerce Spring Boot Microservices",
  "priceInr": 4999.00,
  "createdAt": "2026-08-08T20:55:00.000Z"
}
7. Idempotency & Resilience GuaranteesOperations that trigger financial transactions or external state mutations (such as /api/v1/payments/create-order) accept an Idempotency-Key HTTP header.HTTPIdempotency-Key: 7b8c3d91-e4f2-4a12-8899-aabbccdd1122
The backend stores processing outcomes in Redis for 24 hours against this key. Duplicate submission returns the cached response without re-executing gateway orders or database writes.8. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead API Architect                      Date: August 08, 2026
 [X] Principal Backend Engineer             Date: August 08, 2026

================================================================================
