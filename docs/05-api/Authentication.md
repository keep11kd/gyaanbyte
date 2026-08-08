# GyaanByte — API Authentication & Security Architecture

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-18-AUTH
Target File     : docs/05-api/Authentication.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Security Architect & Identity Engineering Lead
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Security Architecture Board | Baseline Authentication & Authorization Technical Standard | Approved |

---

## Table of Contents
1. [Executive Summary & Security Principles](#1-executive-summary--security-principles)
2. [Authentication Flow & JWT Token Mechanics](#2-authentication-flow--jwt-token-mechanics)
3. [Token Management & Renewal Protocol](#3-token-management--renewal-protocol)
4. [Role-Based Access Control (RBAC) Matrix](#4-role-based-access-control-rbac-matrix)
5. [Token Revocation & Session Invalidation](#5-token-revocation--session-invalidation)
6. [API Security Headers & HTTP Policies](#6-api-security-headers--http-policies)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Security Principles

This specification details the end-to-end authentication mechanisms, token lifecycle policies, role-based access control (RBAC) structures, and transmission security standards for the **GyaanByte Platform API**.

### Fundamental Security Postures:
- **Stateless Bearer Authentication:** Access to protected backend resource servers relies on JSON Web Tokens (JWT) signed via HMAC-SHA256 / RSA-256 algorithm keys.
- **Dual-Token Architecture:** Short-lived access tokens (15-minute lifespan) paired with rotation-enabled refresh tokens (7-day lifespan).
- **Secure Refresh Transmission:** Refresh tokens are bound strictly to `HttpOnly`, `Secure`, `SameSite=Strict` cookies to mitigate Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) vectors.

---

# 2. Authentication Flow & JWT Token Mechanics

┌──────────┐                     ┌──────────────┐                     ┌──────────────┐│  Client  │                     │  API Gateway │                     │ Auth Service │└────┬─────┘                     └──────┬───────┘                     └──────┬───────┘│                                  │                                    ││ 1. POST /api/v1/auth/login       │                                    │├─────────────────────────────────►│                                    ││    (email, password)             │ 2. Forward Credentials             ││                                  ├───────────────────────────────────►││                                  │                                    │ 3. Validate Hash &│                                  │                                    │    Generate Tokens│                                  │ 4. Return JWTs & Set Refresh Cookie││                                  │◄───────────────────────────────────┤│ 5. HTTP 200 OK                   │                                    ││    AccessToken in Body +         │                                    ││    RefreshToken in HttpOnly Cookie│                                   ││◄─────────────────────────────────┤                                    │
### 2.1 Access Token JWT Payload Structure
```json
{
  "iss": "[https://api.gyaanbyte.com](https://api.gyaanbyte.com)",
  "sub": "c39a2b84-27f1-4b1e-9208-112233445566",
  "name": "Abdul Bari Sheikh",
  "roles": [
    "ROLE_STUDENT",
    "ROLE_DEVELOPER"
  ],
  "tokenVersion": 1,
  "iat": 1786136000,
  "exp": 1786136900
}
3. Token Management & Renewal ProtocolWhen the 15-minute access token expires, the client application issues an automatic rotation request via POST /api/v1/auth/refresh.HTTPPOST /api/v1/auth/refresh HTTP/1.1
Host: api.gyaanbyte.com
Cookie: gyaanbyte_refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
The authentication service verifies:The signature of the refresh token.That the refresh token is not listed on the Redis revocation blacklist.That the tokenVersion embedded within the token matches the current token_version stored in the Postgres database users record.Upon successful validation, a new access token and rotated refresh token cookie are returned.4. Role-Based Access Control (RBAC) MatrixThe system enforces granular method-level authorization using Spring Security @PreAuthorize annotations backed by predefined domain roles:Authority RoleTarget UsersAllowed System ActionsROLE_STUDENTRegistered UsersAccess purchased project downloads, stream enrolled courses, update own profile.ROLE_SALESCRM Executive / SalesView inbound leads, transition lead pipeline status, attach interaction notes.ROLE_INSTRUCTORMentors / TrainersUpload course materials, evaluate capstone submissions, conduct 1-on-1 sessions.ROLE_ADMINSystem AdministratorsManage user roles, perform catalog CRUD, execute system configuration changes.5. Token Revocation & Session InvalidationIn scenarios involving password resets, suspicious account compromise, or explicit user logout:Global Invalidation: The database column users.token_version is incremented (token_version = token_version + 1). This instantly renders all existing access and refresh tokens invalid across all devices.Explicit Logout: The active refresh token identifier (jti) is pushed to a Redis Key-Value cache with a Time-To-Live (TTL) matching the token's remaining validity duration.6. API Security Headers & HTTP PoliciesAll outgoing HTTP API responses enforce the following HTTP security policy headers:HTTPStrict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'none'; frame-ancestors 'none';
Cache-Control: no-store, no-cache, must-revalidate, max-age=0
7. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead Security Architect                 Date: August 08, 2026
 [X] Principal Systems Engineer              Date: August 08, 2026

================================================================================
