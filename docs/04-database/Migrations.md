Here is the complete, production-grade documentation file for docs/04-database/Migrations.md.

File Path: docs/04-database/Migrations.md
Markdown
# GyaanByte — Flyway Database Migrations & Data Seeding Strategy

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-12-MIGRATIONS
Target File     : docs/04-database/Migrations.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Data Engineer & Principal Backend Architect
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Data Architecture Board | Baseline Database Migrations & Seeding Specification | Approved |

---

## Table of Contents
1. [Executive Summary & Migration Strategy](#1-executive-summary--migration-strategy)
2. [Flyway Naming Conventions & Rules](#2-flyway-naming-conventions--rules)
3. [Versioned Migration Scripts Directory Structure](#3-versioned-migration-scripts-directory-structure)
4. [Sample Baseline & Incremental Migration Scripts](#4-sample-baseline--incremental-migration-scripts)
5. [Environment Data Seeding Strategy](#5-environment-data-seeding-strategy)
6. [Validation, Checksums & CI/CD Pipeline Execution](#6-validation-checksums--cicd-pipeline-execution)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Migration Strategy

The **GyaanByte Platform** utilizes **Flyway** for automated, version-controlled database schema management across PostgreSQL 16 environments (Development, Staging, and Production).

All relational database schema changes must be declared as versioned SQL migration scripts stored directly inside the Spring Boot application repository (`src/main/resources/db/migration/`). Direct manual alteration of database schemas in any environment is strictly prohibited.

---

# 2. Flyway Naming Conventions & Rules

Flyway migration filenames must strictly adhere to the following naming structure:

V.sql    (Versioned Schema Migrations)
R.sql             (Repeatable Migrations - Views, Stored Functions)


### Formatting Rules:
1. **Prefix:** `V` for versioned migrations, `R` for repeatable scripts.
2. **Version:** Numerical dot-separated sequence (e.g., `V1.0.0`, `V1.0.1`, `V1.1.0`).
3. **Separator:** Double underscore `__` (mandatory).
4. **Description:** Snake_case descriptive text (e.g., `create_users_table`, `add_lead_indexes`).
5. **Extension:** `.sql`.

---

# 3. Versioned Migration Scripts Directory Structure

```text
src/main/resources/db/
├── migration/
│   ├── V1.0.0__initial_schema_identity.sql
│   ├── V1.0.1__initial_schema_crm.sql
│   ├── V1.0.2__initial_schema_projects.sql
│   ├── V1.0.3__initial_schema_training.sql
│   ├── V1.0.4__initial_schema_payments.sql
│   ├── V1.0.5__performance_indexes.sql
│   └── R__01_analytics_materialized_views.sql
└── seed/
    ├── dev/
    │   └── R__dev_seed_data.sql
    └── test/
        └── R__test_seed_data.sql
4. Sample Baseline & Incremental Migration Scripts
4.1 Script: V1.0.0__initial_schema_identity.sql
SQL
-- Migration: V1.0.0__initial_schema_identity.sql
-- Description: Creates core identity tables (users, roles, user_roles)

CREATE TABLE IF NOT EXISTS users (
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

CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Seed static immutable system roles
INSERT INTO roles (name, description) VALUES
    ('ROLE_ADMIN', 'Full platform system administration privileges'),
    ('ROLE_TRAINER', 'Instructor and course evaluator access'),
    ('ROLE_STUDENT', 'Enrolled learner and project purchaser access'),
    ('ROLE_SALES', 'CRM and lead management access')
ON CONFLICT (name) DO NOTHING;
4.2 Script: V1.0.5__performance_indexes.sql
SQL
-- Migration: V1.0.5__performance_indexes.sql
-- Description: Applies high-performance query indexes across critical tables

-- Fast lead lookup for CRM deduplication
CREATE INDEX IF NOT EXISTS idx_leads_email_created_at ON leads(email, created_at DESC);

-- Accelerated catalog lookup by category & activation status
CREATE INDEX IF NOT EXISTS idx_projects_category_active ON projects(category_id) WHERE is_active = TRUE;

-- Fast enrollment lookup by user
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
5. Environment Data Seeding Strategy
Production Environment (prod): Flyway runs strictly versioned schema migrations (db/migration/). Seed files are excluded entirely. System default static data (e.g., initial roles, core categories) is inserted via explicit ON CONFLICT DO NOTHING statements in versioned scripts.

Development Environment (dev): Uses repeatable scripts (R__dev_seed_data.sql) activated via Spring profile spring.profiles.active=dev to populate mock projects, sample courses, test leads, and dummy users.

Testing Environment (test): Utilizes lightweight SQL seeds executed during Spring @DataJpaTest / Testcontainers execution phases.

6. Validation, Checksums & CI/CD Pipeline Execution
During application startup, Spring Boot triggers Flyway migration routines automatically:

YAML
spring:
  flyway:
    enabled: true
    baseline-on-migrate: true
    locations: classpath:db/migration
    validate-on-migrate: true
    out-of-order: false
Checksum Guardrails:
Once a migration script is deployed and executed against any environment, it must never be edited or altered retroactively. Flyway calculates an MD5 checksum of each script and stores it in the flyway_schema_history table.

If a developer modifies an executed migration script, Flyway validation will fail at boot time with a FlywayChecksumException.

Schema corrections must be introduced strictly via a new, incremental versioned script (e.g., V1.0.6__fix_lead_phone_length.sql).

7. Governance & Approval Sign-Off
================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead Data Engineer                      Date: August 08, 2026
 [X] Principal Systems Architect             Date: August 08, 2026

================================================================================
