# GyaanByte — Database Schema & DDL Technical Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-16-DBSCHEMA
Target File     : docs/04-database/Schema.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Data Engineer & Principal Database Architect
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Data Architecture Board | Baseline Full PostgreSQL Schema DDL Specification | Approved |

---

## Table of Contents
1. [Executive Summary & Schema Topology](#1-executive-summary--schema-topology)
2. [Database Initialization & Extensions](#2-database-initialization--extensions)
3. [Domain-Wise Data Definition Language (DDL)](#3-domain-wise-data-definition-language-ddl)
   - [3.1 Identity & Security Domain (`auth`)](#31-identity--security-domain-auth)
   - [3.2 Lead Management & CRM Domain (`crm`)](#32-lead-management--crm-domain-crm)
   - [3.3 Academic Projects Domain (`projects`)](#33-academic-projects-domain-projects)
   - [3.4 LMS & Training Domain (`training`)](#34-lms--training-domain-training)
   - [3.5 Payments, Billing & Coupons Domain (`payments`)](#35-payments-billing--coupons-domain-payments)
4. [Triggers & Automated Timestamp Maintenance](#4-triggers--automated-timestamp-maintenance)
5. [Indexing, Partitioning & Maintenance Policy](#5-indexing-partitioning--maintenance-policy)
6. [Governance & Approval Sign-Off](#6-governance--approval-sign-off)

---

# 1. Executive Summary & Schema Topology

This specification serves as the official Data Definition Language (DDL) reference for the **GyaanByte Platform** database deployed on **PostgreSQL 16**.

The schema is logically partitioned by business domains using standard PostgreSQL schemas (`auth_domain`, `crm_domain`, `projects_domain`, `training_domain`, `payments_domain`) or prefixed multi-tenant safe tables to guarantee namespace isolation, clean privilege delegation, and high-throughput query execution.

---

# 2. Database Initialization & Extensions

```sql
-- Enforce UTC Timezone for all transactional timestamp handling
SET timezone = 'UTC';

-- Required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
3. Domain-Wise Data Definition Language (DDL)
3.1 Identity & Security Domain (auth)
SQL
-- Table: users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_VERIFICATION' 
        CHECK (status IN ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED')),
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    token_version INT NOT NULL DEFAULT 1,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: roles
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- Table: user_roles
CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);
3.2 Lead Management & CRM Domain (crm)
SQL
-- Table: leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    academic_branch VARCHAR(100),
    target_technology VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'NEW'
        CHECK (status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED_LOST')),
    assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: lead_notes
CREATE TABLE lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    note_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
3.3 Academic Projects Domain (projects)
SQL
-- Table: project_categories
CREATE TABLE project_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Table: projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id BIGINT NOT NULL REFERENCES project_categories(id),
    summary TEXT NOT NULL,
    description_md TEXT,
    tech_stack_tags VARCHAR(255)[] NOT NULL,
    price_inr NUMERIC(10, 2) NOT NULL CHECK (price_inr >= 0),
    source_code_s3_key VARCHAR(500) NOT NULL,
    documentation_s3_key VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: project_downloads
CREATE TABLE project_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    user_id UUID NOT NULL REFERENCES users(id),
    ip_address VARCHAR(45) NOT NULL,
    downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
3.4 LMS & Training Domain (training)
SQL
-- Table: courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price_inr NUMERIC(10, 2) NOT NULL CHECK (price_inr >= 0),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: enrollments
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    progress_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00 CHECK (progress_percentage BETWEEN 0 AND 100),
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'EXPIRED')),
    enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);
3.5 Payments, Billing & Coupons Domain (payments)
SQL
-- Table: payment_orders
CREATE TABLE payment_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    gateway_order_id VARCHAR(100) UNIQUE,
    gateway_provider VARCHAR(30) NOT NULL CHECK (gateway_provider IN ('RAZORPAY', 'STRIPE')),
    amount_inr NUMERIC(10, 2) NOT NULL CHECK (amount_inr > 0),
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')),
    item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('PROJECT', 'COURSE', 'CONSULTATION')),
    item_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
4. Triggers & Automated Timestamp Maintenance
To enforce record modification auditability automatically at the database engine level, an explicit PL/pgSQL trigger function handles updated_at timestamps:

SQL
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers across updated_at tables
CREATE TRIGGER set_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER set_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER set_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER set_payment_orders_updated_at BEFORE UPDATE ON payment_orders FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
5. Indexing, Partitioning & Maintenance Policy
B-Tree Composite Indexes: Configured on frequent query filters (email, status, created_at).

GIN Array Indexes: Configured on projects.tech_stack_tags for fast multi-tag matching.

Autovacuum Tuning: Configured with autovacuum_vacuum_scale_factor = 0.05 on high-churn tables (payment_orders, lead_notes) to maintain optimal index scans.

6. Governance & Approval Sign-Off
================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead Data Engineer                      Date: August 08, 2026
 [X] Principal Backend Architect             Date: August 08, 2026

================================================================================
