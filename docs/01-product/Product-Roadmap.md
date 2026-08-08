Here is the next complete, production-grade documentation file in the series: docs/01-product/Product-Roadmap.md.

File Path: docs/01-product/Product-Roadmap.md
Markdown
# GyaanByte — Strategic Product Roadmap & Release Plan

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-02-ROADMAP
Target File     : docs/01-product/Product-Roadmap.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Systems Architect & Product Engineering Team
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Product Engineering Team | Baseline 4-Phase Product Roadmap & Sprint Schedule | Approved |

---

## Table of Contents
1. [Executive Summary & Roadmap Scope](#1-executive-summary--roadmap-scope)
2. [4-Phase Strategic Roadmap Overview](#2-4-phase-strategic-roadmap-overview)
3. [Layer-Wise Feature Capability Matrix](#3-layer-wise-feature-capability-matrix)
4. [Sprint-by-Sprint Engineering Execution Schedule](#4-sprint-by-sprint-engineering-execution-schedule)
5. [Release Management & Versioning Strategy](#5-release-management--versioning-strategy)
6. [Critical Path & Risk Interdependencies](#6-critical-path--risk-interdependencies)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Roadmap Scope

This Product Roadmap defines the multi-year engineering execution plan for the **GyaanByte Platform**. It bridges the high-level business vision established in `docs/01-product/Vision.md` with concrete technical delivery schedules.

The roadmap is structured strictly around GyaanByte's **4-Layer Architecture**:
1. **Layer 1: Core Platform (Foundation)** — Security, Infrastructure, Media, System Utilities.
2. **Layer 2: Business Modules** — CRM, Projects, Training, Consultations, Marketing Content, Payments.
3. **Layer 3: Dashboards** — Role-tailored frontend interfaces (Admin, Trainer, Student, Sales).
4. **Layer 4: Analytics** — Asynchronous reporting, funnel tracking, and revenue aggregation.

---

# 2. 4-Phase Strategic Roadmap Overview

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Core Platform & Foundation (v1.0.0) — Q3-Q4 2026                               │
│ Focus: Monolith Core, Base Layer 1, CRM, Projects, Training & Single Tenant Dashboards │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 2: Marketplace & Automation Scale (v2.0.0) — Q1-Q2 2027                            │
│ Focus: Student/Trainer Portals, Automated Certifications, Payment Webhooks, MinIO S3   │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 3: AI Augmentation & Internal CRM Suite (v3.0.0) — Q3-Q4 2027                    │
│ Focus: AI Code Reviewer, Automated Lead Assignment, RabbitMQ Workers, Advanced Analytics│
└────────────────────────────────────────────┬────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 4: Enterprise Ecosystem & Global Cloud (v4.0.0) — 2028+                           │
│ Focus: Multi-Region Deployments, SaaS Product Module, Enterprise LMS Integration        │
└─────────────────────────────────────────────────────────────────────────────────────────┘


---

# 3. Layer-Wise Feature Capability Matrix

The table below breaks down explicit feature deliverables across all four architectural layers and maps them to target release versions.

| Layer | Domain | Capability / Feature | Phase 1 (`v1.0`) | Phase 2 (`v2.0`) | Phase 3 (`v3.0`) |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **Layer 1** | Identity & Security | JWT Authentication (Access + Refresh Token) | ✅ | ✅ | ✅ |
| **Layer 1** | Identity & Security | Role-Based Access Control (RBAC: Admin, Trainer, Student, Sales) | ✅ | ✅ | ✅ |
| **Layer 1** | Identity & Security | OAuth2 Federated Login (Google, GitHub) | ⏳ | ✅ | ✅ |
| **Layer 1** | Core Infrastructure | Local/MinIO Object Storage with Presigned URLs | ✅ | ✅ | ✅ |
| **Layer 1** | Core Infrastructure | Async Mail Engine (Spring Mail + Redis Queues) | ✅ | ✅ | ✅ |
| **Layer 1** | Core Infrastructure | Centralized Exception Handling & Standard API Responses | ✅ | ✅ | ✅ |
| **Layer 2** | CRM | Public Lead Capture API & Consultation Booking | ✅ | ✅ | ✅ |
| **Layer 2** | CRM | Lead Pipeline Stages (New, Contacted, Qualified, Closed) | ✅ | ✅ | ✅ |
| **Layer 2** | CRM | Automated Lead Scoring & Smart Sales Routing | ❌ | ⏳ | ✅ |
| **Layer 2** | Projects | Source Code Catalog, Tagging, & Search Filters | ✅ | ✅ | ✅ |
| **Layer 2** | Projects | Secure Download Token Engine (Rate-limited, Short-lived) | ✅ | ✅ | ✅ |
| **Layer 2** | Training | Course Builder (Courses, Modules, Lessons) | ✅ | ✅ | ✅ |
| **Layer 2** | Training | Quiz Engine & Assignment Submissions | ⏳ | ✅ | ✅ |
| **Layer 2** | Training | Automated PDF Certificate Generation Engine | ❌ | ✅ | ✅ |
| **Layer 2** | Payments | Gateway Integration (Razorpay / Stripe) + Webhooks | ✅ | ✅ | ✅ |
| **Layer 2** | Payments | Coupon Discount Engine & Invoice PDF Generation | ✅ | ✅ | ✅ |
| **Layer 3** | Dashboards | Unified Admin Operations Console | ✅ | ✅ | ✅ |
| **Layer 3** | Dashboards | Student Portal & Learning Progress View | ⏳ | ✅ | ✅ |
| **Layer 3** | Dashboards | Trainer & Mentor Scheduling Portal | ❌ | ✅ | ✅ |
| **Layer 4** | Analytics | Revenue Aggregators & Lead Funnel Charts | ✅ | ✅ | ✅ |
| **Layer 4** | Analytics | Real-Time Platform Activity Stream (RabbitMQ Driven) | ❌ | ⏳ | ✅ |

---

# 4. Sprint-by-Sprint Engineering Execution Schedule

Execution is organized into 2-week agile sprints to deliver Phase 1 (`v1.0.0`).

+-----------------------------------------------------------------------------------+
|                        PHASE 1 SPRINT TIMELINE (18 WEEKS)                         |
|                                                                                   |
|  [Sprint 1] ──► [Sprint 2] ──► [Sprint 3] ──► [Sprint 4] ──► [Sprint 5]         |
|  Base Setup     Auth & RBAC    Storage & Mail   CRM Domain     Projects Domain    |
|                                                                                   |
|  [Sprint 6] ──► [Sprint 7] ──► [Sprint 8] ──► [Sprint 9]                         |
|  Training Domain Content Domain  Payments        Analytics & QA                   |
+-----------------------------------------------------------------------------------+


### Sprint Detailed Deliverables

#### Sprint 1: Architecture & Base Platform
- Establish repository layout (`frontend/`, `backend/`, `docs/`).
- Initialize Spring Boot 3.x project with Java 21 LTS and Maven dependencies.
- Configure PostgreSQL connection pool (HikariCP) and Flyway migration baseline (`V1__init_schema.sql`).
- Implement Docker Compose environment (`PostgreSQL 16`, `Redis 7`, `MinIO`, `RabbitMQ`).
- Establish global API response standard (`ApiResponse<T>`) and global exception handling (`@RestControllerAdvice`).

#### Sprint 2: Identity, Security & User Management (Layer 1)
- Implement Spring Security filter chain with Stateless JWT support.
- Build Database Schema: `users`, `roles`, `permissions`, `refresh_tokens`, `audit_logs`.
- Develop Auth REST APIs: `/api/v1/auth/login`, `/api/v1/auth/refresh`, `/api/v1/auth/logout`, `/api/v1/auth/me`.
- Implement Password Hashing (`BCryptPasswordEncoder`) and RBAC authorization guards (`@PreAuthorize`).

#### Sprint 3: Storage, Settings & Notifications (Layer 1)
- Configure MinIO Java SDK for S3-compatible file storage.
- Implement `/api/v1/storage/upload` and `/api/v1/storage/presigned-url` endpoints.
- Develop System Settings key-value configuration repository.
- Build Async Email Service using Spring Mail and Redis task queues for background delivery.

#### Sprint 4: CRM & Consultation Domain (Layer 2)
- Build Database Schema: `leads`, `lead_notes`, `lead_status_history`, `consultations`.
- Build Public Endpoints: `/api/v1/public/crm/leads` and `/api/v1/public/crm/consultations`.
- Implement Admin CRM Endpoints: Status transition pipeline, Lead note assignment, and Sales follow-up scheduler.

#### Sprint 5: Projects & Academic Catalog Domain (Layer 2)
- Build Database Schema: `projects`, `project_categories`, `project_tags`, `project_files`.
- Implement JPA Specifications for dynamic multi-parameter search (filter by category, tag, price, stack).
- Implement secure download link generation using MinIO signed URLs with 15-minute expiration timers.

#### Sprint 6: Training & Learning Management Domain (Layer 2)
- Build Database Schema: `courses`, `modules`, `lessons`, `enrollments`.
- Build Admin Course Builder API (CRUD for structured course content).
- Implement Student Enrollment processing and lesson progress tracking (`/api/v1/training/progress`).

#### Sprint 7: Content, Blog & Marketing Domain (Layer 2)
- Build Database Schema: `blogs`, `categories`, `tags`, `testimonials`, `faqs`.
- Build Public Marketing Content APIs with Redis Caching `@Cacheable`.
- Implement dynamic SEO metadata payload generators for Next.js 16 SSG/ISR support.

#### Sprint 8: Payments, Invoices & Coupons (Layer 2)
- Build Database Schema: `payments`, `transactions`, `invoices`, `coupons`.
- Integrate Razorpay / Stripe Payment Intent and Webhook Verification listeners.
- Implement Coupon validation logic (flat amount, percentage discount, usage limit checks).
- Build PDF Invoice generation engine using iText/OpenPDF.

#### Sprint 9: Analytics, Optimization & Release Readiness (Layers 3 & 4)
- Build Read-optimized Analytics Queries: Revenue summary, Lead conversion rate, Course enrollment count.
- Configure Spring Boot Actuator, Prometheus metrics endpoint, and Grafana dashboard layout.
- Perform End-to-End integration testing and security audit (OWASP Top 10 validation).
- Tag release `v1.0.0` and deploy to staging environment via Docker Compose & NGINX.

---

# 5. Release Management & Versioning Strategy

GyaanByte follows **Semantic Versioning 2.0.0 (`MAJOR.MINOR.PATCH`)**:

                         ┌───────────────────────────┐
                         │    VERSION NUMBERING      │
                         │       v MAJOR.MINOR.PATCH │
                         └─────────────┬─────────────┘
                                       │
     ┌─────────────────────────────────┼─────────────────────────────────┐
     ▼                                 ▼                                 ▼
┌──────────────────┐              ┌──────────────────┐              ┌──────────────────┐
│  MAJOR Version   │              │  MINOR Version   │              │  PATCH Version   │
│  (e.g., v1.0.0)  │              │  (e.g., v1.1.0)  │              │  (e.g., v1.0.1)  │
├──────────────────┤              ├──────────────────┤              ├──────────────────┤
│ Architectural or │              │ New domain feature│              │ Bug fixes, security│
│ breaking API     │              │ addition without │              │ patches, database│
│ changes.         │              │ breaking changes.│              │ index tuning.    │
└──────────────────┘              └──────────────────┘              └──────────────────┘


### Deployment Environments

| Environment | Purpose | Branch | URL Strategy |
| :--- | :--- | :--- | :--- |
| **Development** | Feature branch integration & unit testing | `develop` | `https://dev-api.gyaanbyte.com` |
| **Staging** | Pre-release validation & QA automation | `release/*` | `https://staging-api.gyaanbyte.com` |
| **Production** | Live enterprise platform serving customers | `main` | `https://api.gyaanbyte.com` |

---

# 6. Critical Path & Risk Interdependencies

[Sprint 1: Base Platform]
│
▼
[Sprint 2: Auth & RBAC] ────────┐ (Required before any Admin endpoint)
│                     │
▼                     ▼
[Sprint 3: Storage & Mail] ──► [Sprint 4 & 5: CRM & Projects]
│
▼
[Sprint 8: Payments Domain]
│
▼
[Sprint 9: Analytics & Release v1.0]


### Risk & Blocker Mitigation Rules
1. **Database Schema Locking:** No entity creation is allowed in Java without a corresponding Flyway migration script in `src/main/resources/db/migration/`.
2. **Third-Party Payment Delays:** Mock Payment Gateway interfaces (`MockPaymentServiceImpl`) must be implemented in Sprint 1 to ensure backend development is never blocked by merchant verification delays.

---

# 7. Governance & Approval Sign-Off

================================================================================
APPROVAL SIGN-OFF
[X] Chief Technology Officer (CTO)           Date: August 08, 2026
[X] Lead Systems Architect                  Date: August 08, 2026
[X] Head of Product Engineering             Date: August 08, 2026

================================================================================
