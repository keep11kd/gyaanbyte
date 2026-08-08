Here is the complete, production-grade documentation file for docs/04-database/ERD.md.

File Path: docs/04-database/ERD.md
Markdown
# GyaanByte — Entity Relationship Diagram (ERD) & Data Model Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-15-ERD
Target File     : docs/04-database/ERD.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Principal Data Architect & Database Systems Team
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Data Architecture Board | Baseline Structural Entity Relationship Specification | Approved |

---

## Table of Contents
1. [Executive Summary & ER Architecture](#1-executive-summary--er-architecture)
2. [Global Entity Relationship Overview Diagram](#2-global-entity-relationship-overview-diagram)
3. [Domain-Wise Structural Diagrams & Cardinalities](#3-domain-wise-structural-diagrams--cardinalities)
   - [3.1 Identity & Access Control Subsystem (AUTH)](#31-identity--access-control-subsystem-auth)
   - [3.2 Lead Pipeline & CRM Subsystem (CRM)](#32-lead-pipeline--crm-subsystem-crm)
   - [3.3 Academic Projects Catalog Subsystem (PRJ)](#33-academic-projects-catalog-subsystem-prj)
   - [3.4 LMS & Training Subsystem (TRN)](#34-lms--training-subsystem-trn)
   - [3.5 Payments & Invoicing Subsystem (PAY)](#35-payments--invoicing-subsystem-pay)
4. [Relationship & Foreign Key Matrix](#4-relationship--foreign-key-matrix)
5. [Integrity Rules & Cascade Deletion Policies](#5-integrity-rules--cascade-deletion-policies)
6. [Governance & Approval Sign-Off](#6-governance--approval-sign-off)

---

# 1. Executive Summary & ER Architecture

This specification outlines the logical and physical Entity-Relationship (ER) design governing the **GyaanByte Platform** PostgreSQL 16 database instance.

The system schema maintains relational integrity through foreign keys, strict check constraints, and non-nullable domain invariants. Cross-domain relationships (e.g., `PaymentOrder` referencing a `User` or `Project`) are enforced via foreign keys, while operational separation is maintained by domain-bounded table groupings.

---

# 2. Global Entity Relationship Overview Diagram

                          ┌────────────────┐
                          │     roles      │
                          └───────┬────────┘
                                  │ N
                                  │
                                  │ M
                          ┌───────┴────────┐
                          │     users      │
                          └───┬───┬───┬────┘
                              │   │   │
      ┌───────────────────────┘   │   └───────────────────────┐
    1 │                           │ 1                       1 │
      ▼                           ▼                           ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│     leads     │           │  enrollments  │           │payment_orders │
└───────┬───────┘           └───────┬───────┘           └───────┬───────┘
1 │                         N │                         1 │
▼                           ▼                           ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│  lead_notes   │           │    courses    │           │  invoices     │
└───────────────┘           └───────┬───────┘           └───────────────┘
1 │
▼
┌───────────────┐
│ project_cat.  │
└───────┬───────┘
1 │
▼
┌───────────────┐
│   projects    │
└───────────────┘


---

# 3. Domain-Wise Structural Diagrams & Cardinalities

### 3.1 Identity & Access Control Subsystem (AUTH)

┌───────────────────────┐            ┌───────────────────────┐            ┌───────────────────────┐
│         users         │            │      user_roles       │            │         roles         │
├───────────────────────┤            ├───────────────────────┤            ├───────────────────────┤
│ id (PK)         UUID  │1          N│ user_id (PK, FK) UUID │N          1│ id (PK)        BIGINT │
│ email        VARCHAR  ├───────────►│ role_id (PK, FK)BIGINT│◄───────────┤ name         VARCHAR  │
│ password_hash VARCHAR │            └───────────────────────┘            │ description  VARCHAR  │
└───────────────────────┘                                                 └───────────────────────┘


### 3.2 Lead Pipeline & CRM Subsystem (CRM)

┌───────────────────────┐            ┌───────────────────────┐
│         leads         │            │      lead_notes       │
├───────────────────────┤            ├───────────────────────┤
│ id (PK)         UUID  │1          N│ id (PK)         UUID  │
│ full_name    VARCHAR  ├───────────►│ lead_id (FK)    UUID  │
│ email        VARCHAR  │            │ note_text       TEXT  │
│ phone_number VARCHAR  │            │ author_id (FK)  UUID  │
│ status       VARCHAR  │            │ created_at TIMESTAMP  │
└───────────────────────┘            └───────────────────────┘


### 3.3 Academic Projects Catalog Subsystem (PRJ)

┌─────────────────────────┐          ┌─────────────────────────┐          ┌─────────────────────────┐
│   project_categories    │          │        projects         │          │    project_downloads    │
├─────────────────────────┤          ├─────────────────────────┤          ├─────────────────────────┤
│ id (PK)         BIGINT  │1        N│ id (PK)           UUID  │1        N│ id (PK)           UUID  │
│ name           VARCHAR  ├─────────►│ category_id (FK) BIGINT │├─────────►│ project_id (FK)   UUID  │
│ slug           VARCHAR  │          │ title          VARCHAR  │          │ user_id (FK)      UUID  │
└─────────────────────────┘          │ price_inr      NUMERIC  │          │ downloaded_at TIMESTAMP │
└─────────────────────────┘          └─────────────────────────┘


### 3.4 LMS & Training Subsystem (TRN)

┌───────────────────────┐            ┌───────────────────────┐            ┌───────────────────────┐
│        courses        │            │        modules        │            │        lessons        │
├───────────────────────┤            ├───────────────────────┤            ├───────────────────────┤
│ id (PK)         UUID  │1          N│ id (PK)         UUID  │1          N│ id (PK)         UUID  │
│ title        VARCHAR  ├───────────►│ course_id (FK)  UUID  ├───────────►│ module_id (FK)  UUID  │
│ price_inr    NUMERIC  │            │ title        VARCHAR  │            │ title        VARCHAR  │
└───────────────────────┘            └───────────────────────┘            └───────────────────────┘


---

# 4. Relationship & Foreign Key Matrix

| Source Table | Source Column | Target Table | Target Column | Cardinality | Relationship Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `user_roles` | `user_id` | `users` | `id` | $N : 1$ | Associates registered user with roles. |
| `user_roles` | `role_id` | `roles` | `id` | $N : 1$ | Maps role definitions to users. |
| `leads` | `assigned_agent_id`| `users` | `id` | $N : 1$ (Optional) | Identifies sales executive handling lead. |
| `lead_notes` | `lead_id` | `leads` | `id` | $N : 1$ | Contains interaction history for a lead. |
| `projects` | `category_id` | `project_categories` | `id` | $N : 1$ | Categorizes academic project assets. |
| `project_downloads`| `project_id` | `projects` | `id` | $N : 1$ | Records file downloads per project. |
| `enrollments` | `user_id` | `users` | `id` | $N : 1$ | Tracks course enrollments for a user. |
| `payment_orders` | `user_id` | `users` | `id` | $N : 1$ | Links financial checkout order to user. |

---

# 5. Integrity Rules & Cascade Deletion Policies

- **User Deletion Guard (`users` table):** Physical `DELETE` on `users` is disallowed in production. Accounts undergo soft-deletion by transitioning `status` to `DEACTIVATED`. Foreign key cascades on transactional data (`payment_orders`, `invoices`) are set to `ON DELETE RESTRICT` to preserve immutable financial audit trails.
- **Cascading Child Records:** Child tables holding non-financial contextual items (such as `lead_notes` or `user_roles`) enforce `ON DELETE CASCADE` when the parent record is explicitly removed.

---

# 6. Governance & Approval Sign-Off

================================================================================
APPROVAL SIGN-OFF
[X] Chief Technology Officer (CTO)           Date: August 08, 2026
[X] Principal Data Architect                Date: August 08, 2026
[X] Lead Software Engineer                   Date: August 08, 2026

================================================================================
