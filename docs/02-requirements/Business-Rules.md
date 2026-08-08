Here is the complete, production-grade documentation file for docs/02-requirements/Business-Rules.md.

File Path: docs/02-requirements/Business-Rules.md
Markdown
# GyaanByte — Enterprise Business Rules & Constraints Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-06-BIZRULES
Target File     : docs/02-requirements/Business-Rules.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Business Analyst & Enterprise Systems Architect
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Enterprise Architecture | Baseline Business Rules & Logic Constraints | Approved |

---

## Table of Contents
1. [Executive Summary & Rule Governance](#1-executive-summary--rule-governance)
2. [Rule Classification Taxonomy](#2-rule-classification-taxonomy)
3. [Identity & Security Business Rules (BR-AUTH)](#3-identity--security-business-rules-br-auth)
4. [CRM & Lead Pipeline Business Rules (BR-CRM)](#4-crm--lead-pipeline-business-rules-br-crm)
5. [Academic Projects & Asset Management Rules (BR-PRJ)](#5-academic-projects--asset-management-rules-br-prj)
6. [Training, Courses & Certifications Rules (BR-TRN)](#6-training-courses--certifications-rules-br-trn)
7. [Payments, Coupons & Refund Rules (BR-PAY)](#7-payments-coupons--refund-rules-br-pay)
8. [Storage, Watermarking & Audit Rules (BR-SYS)](#8-storage-watermarking--audit-rules-br-sys)
9. [Governance & Approval Sign-Off](#9-governance--approval-sign-off)

---

# 1. Executive Summary & Rule Governance

This document establishes the official enterprise business rules, logical invariants, validation boundaries, and policy constraints enforced across the **GyaanByte Platform**.

Every business rule specified herein must be strictly implemented in backend domain entities, service layer validators (`domains/<domain>/validator/`), and database migration constraints.

---

# 2. Rule Classification Taxonomy

Business rules are categorized using a standard priority and enforcement classification:

| Level | Severity | System Behavior on Violation |
| :--- | :--- | :--- |
| **CRITICAL** | Hard Constraint | Immediate transaction rollback (`HTTP 400` / `403` / `422`). Unoverrideable by any user. |
| **HIGH** | Policy Constraint | Requires explicit manager/admin privilege override and writes an event log to `audit_logs`. |
| **MEDIUM** | Operational Rule | Triggers warning indicators or automatic soft corrections (e.g., fallback default values). |

---

# 3. Identity & Security Business Rules (BR-AUTH)

### BR-AUTH-001: Password Complexity Constraint `[CRITICAL]`
* **Rule:** User passwords must be a minimum of 8 characters and a maximum of 64 characters, containing at least one uppercase letter, one lowercase letter, one numeric digit, and one special character (`@$!%*?&`).
* **Enforcement:** Evaluated at registration and password reset via regular expression validation in `AuthValidator.java`.

### BR-AUTH-002: Failed Login Lockout & Rate Limiting `[CRITICAL]`
* **Rule:** If a user submits 5 consecutive incorrect passwords within a 15-minute window for a single account, the account must be locked for 30 minutes.
* **Enforcement:** Managed atomically using Redis key counters (`login_attempts:{email}`) with automatic key expiration.

### BR-AUTH-003: Session Multi-Device Invalidation `[HIGH]`
* **Rule:** Issuing a password reset or triggering a "Logout All Devices" action must immediately revoke all existing refresh tokens for that `user_id` by incrementing the user's `token_version` counter in PostgreSQL.

---

# 4. CRM & Lead Pipeline Business Rules (BR-CRM)

### BR-CRM-001: Lead Uniqueness & Deduplication `[HIGH]`
* **Rule:** A public lead submission matching an active lead (status not equal to `CLOSED_LOST` or `CONVERTED`) with the same phone number or email within 14 calendar days must not create a duplicate record. Instead, it appends a `LeadNote` entry to the existing lead record.
* **Enforcement:** Enforced in `CrmService.processPublicLead()` prior to entity persistence.

### BR-CRM-002: SLA Follow-Up Escalation `[MEDIUM]`
* **Rule:** Any lead in status `NEW` that remains unassigned or untouched for more than 4 hours during operational hours (09:00 to 18:00 IST) must automatically trigger a push notification and email alert to the Sales Manager.

---

# 5. Academic Projects & Asset Management Rules (BR-PRJ)

### BR-PRJ-001: Source Code Download Rate Limiting `[CRITICAL]`
* **Rule:** A verified purchaser of an Academic Project source code zip file is permitted a maximum of **10 download requests per 24-hour period**.
* **Enforcement:** Each token generation call to `/api/v1/projects/{id}/download-link` checks and increments a Redis counter (`project_downloads:{user_id}:{project_id}`).

### BR-PRJ-002: File Expiration & Dynamic Signed URL TTL `[CRITICAL]`
* **Rule:** Presigned Object Storage URLs generated for project files or solution documentation must have an absolute time-to-live (TTL) of **15 minutes**.
* **Enforcement:** MinIO S3 SDK pre-signed parameter configuration (`expiry = 900 seconds`).

---

# 6. Training, Courses & Certifications Rules (BR-TRN)

### BR-TRN-001: Certificate Issuance Prerequisites `[CRITICAL]`
* **Rule:** A Course Completion Certificate can only be generated and issued if and only if:
  1. The student's overall lesson progress is equal to 100%.
  2. All mandatory quizzes have been passed with a minimum score of 70%.
  3. The final capstone assignment submission has been evaluated and marked as `APPROVED` by a assigned Trainer/Mentor.
* **Enforcement:** Checked by `CertificateService.generateCertificate()` before executing PDF rendering and hashing routines.

### BR-TRN-002: Quiz Attempt Cooldown `[MEDIUM]`
* **Rule:** If a student fails a course quiz (score < 70%), they must wait a minimum cooldown period of 2 hours before attempting the quiz again. Maximum allowed retries per quiz: 5 attempts.

---

# 7. Payments, Coupons & Refund Rules (BR-PAY)

### BR-PAY-001: Coupon Stacking Prohibition `[CRITICAL]`
* **Rule:** Only one promotional coupon code can be applied per checkout transaction. Stacking multiple coupons on a single invoice is strictly prohibited.
* **Enforcement:** Order invoice calculation service rejects payloads containing more than one validated coupon ID.

### BR-PAY-002: Minimum Transaction Valuation `[HIGH]`
* **Rule:** The total net payable amount after coupon discount application cannot fall below ₹99 (or $1.00 USD) for digital content orders, ensuring transaction fees do not exceed operational margins.

### BR-PAY-003: Academic Project Refund Policy `[CRITICAL]`
* **Rule:** Due to the open nature of downloadable software source code, digital academic project purchases are **non-refundable** once the source code repository zip file has been downloaded at least once.

---

# 8. Storage, Watermarking & Audit Rules (BR-SYS)

### BR-SYS-001: Dynamic Document Watermarking `[HIGH]`
* **Rule:** All downloadable PDF documentation, project reports, and system design diagrams generated for academic orders must be dynamically watermarked on every page with the buyer's full name, email address, order ID, and transaction timestamp.

### BR-SYS-002: Financial Transaction Audit Immutability `[CRITICAL]`
* **Rule:** Records stored in the `payments` and `transactions` database tables are read-only once saved. No `UPDATE` or `DELETE` statements are permitted on these tables. Corrections must be handled exclusively through reversing `credit_note` or `refund` records.

---

# 9. Governance & Approval Sign-Off

================================================================================
APPROVAL SIGN-OFF
[X] Chief Technology Officer (CTO)           Date: August 08, 2026
[X] Head of Product Strategy                Date: August 08, 2026
[X] Lead Systems Architect                  Date: August 08, 2026

================================================================================
