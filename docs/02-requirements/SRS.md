# GyaanByte — Software Requirements Specification (SRS)

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-04-SRS
Target File     : docs/02-requirements/SRS.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Systems Architect & Requirements Engineering Team
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Requirements Team | Baseline Software Requirements Specification | Approved |

---

## Table of Contents
1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Features & Functional Requirements (Layer-Wise)](#3-system-features--functional-requirements-layer-wise)
4. [External Interface Requirements](#4-external-interface-requirements)
5. [Non-Functional Requirements (NFRs)](#5-non-functional-requirements-nfrs)
6. [Data Requirements & Bounded Contexts](#6-data-requirements--bounded-contexts)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Introduction

## 1.1 Purpose
This Software Requirements Specification (SRS) defines the functional, non-functional, and interface requirements for the **GyaanByte Platform**. It serves as the governing contract between product stakeholders and the engineering team for backend development (Java 21 / Spring Boot 3) and frontend engineering (Next.js 16 / React 19).

## 1.2 Scope
The platform spans four integrated architectural layers:
- **Layer 1:** Core Platform Foundation (Identity, Security, Config, Storage, Notifications, Cache).
- **Layer 2:** Business Domains (CRM, Projects, Training, Consultations, Content, Payments).
- **Layer 3:** Dashboards (Admin, Trainer, Student, Sales Portals).
- **Layer 4:** Analytics Engine (Reports, Revenue Aggregators, Lead Funnels).

---

# 2. Overall Description

## 2.1 Product Perspective
The GyaanByte Platform is a monolithic modular application structured using Domain-Driven Design (DDD) principles. It utilizes PostgreSQL as the primary persistent data store, Redis for caching and session/rate-limiting management, MinIO for S3-compatible object storage, and RabbitMQ for asynchronous event-driven tasks.

## 2.2 User Classes and Characteristics
- **Guest Visitor:** Unauthenticated user browsing public training catalogs, project lists, and blogs.
- **Student / Learner:** Authenticated user enrolled in training programs, downloading project source codes, and booking mentorship.
- **Trainer / Mentor:** Instructor managing course modules, student evaluations, and live consultation schedules.
- **Sales / CRM Agent:** Internal user managing lead pipelines, tracking follow-ups, and converting inquiries.
- **System Administrator:** Full RBAC privilege across all system domains, user management, and configuration settings.

---

# 3. System Features & Functional Requirements (Layer-Wise)

### 3.1 Layer 1: Core Platform & Security
- **FR-SEC-01:** The system shall authenticate users via Stateless JSON Web Tokens (JWT) containing cryptographically signed claims (Access Token TTL: 15 mins, Refresh Token TTL: 7 days).
- **FR-SEC-02:** The system shall enforce Role-Based Access Control (RBAC) using Spring Security method-level annotations (`@PreAuthorize("hasRole('ADMIN')")`).
- **FR-STR-01:** The system shall provide secure file upload and generation of time-limited presigned URLs (15-minute expiry) via MinIO object storage.
- **FR-NOT-01:** The system shall queue notification requests asynchronously using RabbitMQ and deliver emails via Spring Mail integration.

### 3.2 Layer 2: Business Domains
- **FR-CRM-01:** The system shall expose a public lead capture API (`/api/v1/public/crm/leads`) validating incoming payload data with Zod/Bean Validation rules.
- **FR-PRJ-01:** The system shall allow users to filter project catalogs dynamically by technology stack, category, and price range using JPA Specifications.
- **FR-TRN-02:** The system shall track student lesson completion percentage and update enrollment statuses automatically upon capstone submission.
- **FR-PAY-01:** The system shall integrate with external payment gateways (Razorpay/Stripe), verifying cryptographic webhook signatures before crediting orders.

---

# 4. External Interface Requirements

- **4.1 User Interfaces:** Responsive web application built with Next.js 16, React 19, and TailwindCSS adhering to WCAG 2.1 AA accessibility guidelines.
- **4.2 Software Interfaces:** RESTful API contracts adhering to OpenAPI 3.0 specifications with JSON request/response formats.
- **4.3 Communication Protocols:** HTTPS (TLS 1.3) for all client-server communications; AMQP for internal message broker communication with RabbitMQ.

---

# 5. Non-Functional Requirements (NFRs)

- **NFR-PERF-01:** Public catalog and content API endpoints must respond within $\le 200\text{ ms}$ under normal load (95th percentile).
- **NFR-SEC-01:** All passwords must be hashed using BCrypt with a minimum work factor of 12.
- **NFR-AVAIL-01:** The platform backend architecture shall target 99.9% uptime availability during operational windows.
- **NFR-SCAL-01:** Database queries for high-frequency tables (`projects`, `courses`, `leads`) must utilize appropriate indexes to maintain query execution times under $50\text{ ms}$.

---

# 6. Data Requirements & Bounded Contexts

Data storage is logically partitioned into bounded contexts to prevent tight coupling across business domains:
1. **Identity Context:** `users`, `roles`, `permissions`, `refresh_tokens`, `sessions`.
2. **CRM Context:** `leads`, `lead_notes`, `lead_status_history`, `consultations`.
3. **Projects Context:** `projects`, `project_categories`, `project_tags`, `project_downloads`.
4. **Training Context:** `courses`, `modules`, `lessons`, `enrollments`, `certificates`.
5. **Billing Context:** `payments`, `transactions`, `invoices`, `coupons`.

---

# 7. Governance & Approval Sign-Off

================================================================================
APPROVAL SIGN-OFF
[X] Chief Technology Officer (CTO)           Date: August 08, 2026
[X] Lead Systems Architect                  Date: August 08, 2026
[X] Lead Requirements Engineer              Date: August 08, 2026

================================================================================
