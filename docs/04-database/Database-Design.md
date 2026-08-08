# GyaanByte — Database Design & Entity Relationship Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-11-DBDESIGN
Target File     : docs/04-database/Database-Design.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Principal Data Architect & Backend Lead Engine
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Data Architecture Board | Baseline Relational Database Schema & ERD Specification | Approved |

---

## Table of Contents
1. [Executive Summary & RDBMS Architecture](#1-executive-summary--rdbms-architecture)
2. [Database Naming Conventions & Standards](#2-database-naming-conventions--standards)
3. [Domain-Wise Schemas & Entity Definitions](#3-domain-wise-schemas--entity-definitions)
   - [3.1 Identity & Access Context (AUTH)](#31-identity--access-context-auth)
   - [3.2 CRM & Lead Management Context (CRM)](#32-crm--lead-management-context-crm)
   - [3.3 Academic Projects Context (PRJ)](#33-academic-projects-context-prj)
   - [3.4 Training & LMS Context (TRN)](#34-training--lms-context-trn)
   - [3.5 Payments & Billing Context (PAY)](#35-payments--billing-context-pay)
4. [Indexing Strategy & Execution Optimization](#4-indexing-strategy--execution-optimization)
5. [Data Archival & Audit Control](#5-data-archival--audit-control)
6. [Governance & Approval Sign-Off](#6-governance--approval-sign-off)

---

# 1. Executive Summary & RDBMS Architecture

The **GyaanByte Platform** utilizes **PostgreSQL 16** as its primary persistent relational database. The schema is designed according to 3rd Normal Form (3NF) principles to maintain data integrity while incorporating targeted JSONB structures for dynamic, low-frequency metadata.

---

# 2. Database Naming Conventions & Standards

- **Tables:** Lowercase snake_case, plural nouns (e.g., `users`, `project_downloads`, `lead_notes`).
- **Columns:** Lowercase snake_case (e.g., `first_name`, `created_at`, `is_active`).
- **Primary Keys:** UUID v4 default or BIGSERIAL `id`.
- **Foreign Keys:** Single singular entity reference appended with `_id` (e.g., `user_id`, `course_id`).
- **Audit Columns:** Every primary business table must include `created_at`, `updated_at`, `created_by`, and `updated_by`.

---

# 3. Domain-Wise Schemas & Entity Definitions

### 3.1 Identity & Access Context (AUTH)

┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐│      users      │1     N│   user_roles    │N     1│      roles      │├─────────────────┼───────┼─────────────────┼───────┼─────────────────┤│ id (PK)         │       │ user_id (FK)    │       │ id (PK)         ││ email           │       │ role_id (FK)    │       │ name            ││ password_hash   │       └─────────────────┘       └─────────────────┘│ status          │└─────────────────┘
#### Table: `users`
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_VERIFICATION',
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
Table: roles & user_rolesSQLCREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);
3.2 CRM & Lead Management Context (CRM)Table: leadsSQLCREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    academic_branch VARCHAR(100),
    target_technology VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
3.3 Academic Projects Context (PRJ)┌───────────────────┐1     N┌───────────────────┐
│ project_categories│───────│     projects      │
├───────────────────┤       ├───────────────────┤
│ id (PK)           │       │ id (PK)           │
│ name              │       │ category_id (FK)  │
└───────────────────┘       │ title, price      │
                            └─────────┬─────────┘
                                      │1
                                      │
                                      │N
                            ┌─────────┴─────────┐
                            │ project_downloads │
                            ├───────────────────┤
                            │ id (PK)           │
                            │ project_id (FK)   │
                            │ user_id (FK)      │
                            └───────────────────┘
Table: projectsSQLCREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id BIGINT NOT NULL REFERENCES project_categories(id),
    summary TEXT NOT NULL,
    tech_stack_tags VARCHAR(255)[] NOT NULL,
    price_inr NUMERIC(10, 2) NOT NULL,
    source_code_s3_key VARCHAR(500) NOT NULL,
    documentation_s3_key VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
3.4 Training & LMS Context (TRN)Tables: courses, modules, lessons, enrollmentsSQLCREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    price_inr NUMERIC(10, 2) NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    progress_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);
3.5 Payments & Billing Context (PAY)Table: payment_ordersSQLCREATE TABLE payment_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    gateway_order_id VARCHAR(100) UNIQUE,
    amount_inr NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    item_type VARCHAR(50) NOT NULL, -- 'PROJECT' or 'COURSE'
    item_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
4. Indexing Strategy & Execution OptimizationTo ensure query latency bounds $\le 50\text{ ms}$ on critical tables, composite and partial indexes are applied:SQL-- Fast lead lookup for CRM deduplication checks
CREATE INDEX idx_leads_email_created_at ON leads(email, created_at DESC);

-- Accelerated catalog lookup by category & activation status
CREATE INDEX idx_projects_category_active ON projects(category_id) WHERE is_active = TRUE;

-- Array search index for project technology tags
CREATE INDEX idx_projects_tech_tags ON projects USING GIN (tech_stack_tags);

-- Fast enrollment lookup by user
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
5. Data Archival & Audit ControlSoft Deletes: Critical domain tables (projects, courses) utilize an is_deleted boolean flag rather than physical row removal.Audit Logs: Schema audit_logs captures immutable JSON records of sensitive modifications (password changes, payment status updates, RBAC role assignments).6. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Principal Data Architect                Date: August 08, 2026
 [X] Lead Backend Engineer                   Date: August 08, 2026

================================================================================
