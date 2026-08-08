# GyaanByte — Security Architecture & Threat Mitigation Framework

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-20-SECARCH
Target File     : docs/06-security/Security-Architecture.md
Classification  : CONFIDENTIAL / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Chief Information Security Officer (CISO) & Security Lead
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Security Governance Board | Baseline Security & Threat Mitigation Specification | Approved |

---

## Table of Contents
1. [Executive Summary & Security Philosophy](#1-executive-summary--security-philosophy)
2. [Threat Modeling & Risk Taxonomy (STRIDE)](#2-threat-modeling--risk-taxonomy-stride)
3. [OWASP Top 10 Mitigation Controls](#3-owasp-top-10-mitigation-controls)
4. [Data Protection & Cryptographic Protocols](#4-data-protection--cryptographic-protocols)
5. [Network Security, DDoS & Edge Protection](#5-network-security-ddos--edge-protection)
6. [Audit Logging, Monitoring & SIEM Integration](#6-audit-logging-monitoring--siem-integration)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Security Philosophy

This specification defines the defense-in-depth security architecture for the **GyaanByte Platform**. 

The security strategy follows a **Zero-Trust Network Architecture (ZTNA)** principle:
- **Never Trust, Always Verify:** Every internal microservice call and external API request requires explicit identity validation and contextual privilege verification.
- **Least Privilege Access:** Database users, API tokens, and operational roles operate under strictly bound scopes.
- **Blast Radius Reduction:** Network segmentation isolates transactional databases from public-facing edge proxy proxies.

---

# 2. Threat Modeling & Risk Taxonomy (STRIDE)

| Threat Category | Target Subsystem | Risk Description | Primary Countermeasure |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Identity / Auth API | User session forgery or JWT token replay. | RSA-256 signed JWTs with short expiry (15m) and TLS 1.3 binding. |
| **Tampering** | MinIO / S3 Assets | Unauthorized modification of source code zips or PDFs. | Presigned GET URLs with cryptographic expiration tags and hash checks. |
| **Repudiation** | Payments & Orders | Fraudulent denial of transactions or invoice edits. | Immutable append-only audit log tables in PostgreSQL with hash chains. |
| **Information Disclosure** | Database & PII | Exposure of student phone numbers or payment logs. | AES-256 field-level encryption for PII and TLS encryption for transport. |
| **Denial of Service** | Public REST APIs | Volumetric resource exhaustion via botnets. | Redis-backed sliding-window rate limiting at NGINX edge gateway. |
| **Elevation of Privilege** | CRM / Sales Portal | Sales executive attempting admin actions. | Spring Security method-level `@PreAuthorize("hasRole('ADMIN')")`. |

---

# 3. OWASP Top 10 Mitigation Controls

### 3.1 A01: Broken Access Control
- Enforce strict server-side authorization on all routes.
- Path parameters (e.g., `/api/v1/users/{userId}/orders`) compare `{userId}` against the authenticated JWT subject ID in Spring Security contexts.

### 3.2 A02: Cryptographic Failures
- Passwords hashed using **BCrypt** with a minimum work factor (strength) of 12.
- Symmetric key encryption uses **AES-256-GCM** with unique initialization vectors (IV) for sensitive field storage.

### 3.3 A03: Injection (SQLi / NoSQLi / Command Injection)
- 100% parameterization of database interactions through Spring Data JPA / Hibernate ORM.
- Input string sanitization utilizing OWASP Java HTML Sanitizer to strip XSS vectors from input text fields.

---

# 4. Data Protection & Cryptographic Protocols

┌─────────────────────────────────────────────────────────────────────────────┐
│                       DATA PROTECTION ARCHITECTURE                          │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ Data In-Transit                      │ TLS 1.3 with Perfect Forward Secrecy │
│                                      │ (PFS) and ECDHE key exchange.        │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Data At-Rest (Database)              │ PostgreSQL Transparent Data         │
│                                      │ Encryption (TDE) / encrypted volumes.│
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Data At-Rest (Object Storage)        │ MinIO Server-Side Encryption (SSE-S3)│
│                                      │ using AES-256 algorithms.            │
└──────────────────────────────────────┴──────────────────────────────────────┘


---

# 5. Network Security, DDoS & Edge Protection

- **Cloudflare / NGINX WAF:** Inspects incoming web traffic for malicious signatures (SQLi, XSS, Path Traversal) prior to reaching internal API routes.
- **Container Isolation:** Docker containers run under non-root permissions with `read-only` root filesystems where applicable.
- **CORS Policy:** Strict origin whitelisting allowing requests only from trusted domains (`https://gyaanbyte.com`, `https://admin.gyaanbyte.com`).

---

# 6. Audit Logging, Monitoring & SIEM Integration

All security-critical events (login failures, permission changes, bulk data exports, payment webhooks) generate structured JSON audit logs emitted to standard output (`stdout`) and forwarded to Prometheus / Loki.

### Sample Audit Log Payload:
```json
{
  "timestamp": "2026-08-08T21:02:00.000Z",
  "eventType": "AUTH_FAILURE",
  "severity": "WARN",
  "userId": "ANONYMOUS",
  "ipAddress": "103.21.124.15",
  "userAgent": "Mozilla/5.0 ...",
  "details": {
    "reason": "INVALID_PASSWORD",
    "attemptedEmail": "user@example.com"
  }
}
7. Governance & Approval Sign-Off
================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Information Security Officer (CISO) Date: August 08, 2026
 [X] Lead Security Architect                  Date: August 08, 2026
 [X] Principal Systems Engineer              Date: August 08, 2026

================================================================================
