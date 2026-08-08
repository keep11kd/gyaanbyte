# GyaanByte — Detailed Subsystem & Module Design Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-14-MODDESIGN
Target File     : docs/03-system-design/Module-Design.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Principal Software Architect & Domain Leads
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Domain Architecture Board | Baseline Subsystem & Module Design Document | Approved |

---

## Table of Contents
1. [Executive Summary & Modular Boundary Principles](#1-executive-summary--modular-boundary-principles)
2. [Layer 1 Foundation Modules Design](#2-layer-1-foundation-modules-design)
3. [Layer 2 Business Domain Modules Design](#3-layer-2-business-domain-modules-design)
   - [3.1 Identity & Access Module (`com.gyaanbyte.domains.auth`)](#31-identity--access-module-comgyaanbytedomainsauth)
   - [3.2 Lead Management & CRM Module (`com.gyaanbyte.domains.crm`)](#32-lead-management--crm-module-comgyaanbytedomainscrm)
   - [3.3 Academic Projects Module (`com.gyaanbyte.domains.projects`)](#33-academic-projects-module-comgyaanbytedomainsprojects)
   - [3.4 Training & LMS Module (`com.gyaanbyte.domains.training`)](#34-training--lms-module-comgyaanbytedomainstraining)
   - [3.5 Software Services & Consultations Module (`com.gyaanbyte.domains.consultation`)](#35-software-services--consultations-module-comgyaanbytedomainsconsultation)
   - [3.6 Payments & Billing Module (`com.gyaanbyte.domains.payments`)](#36-payments--billing-module-comgyaanbytedomainspayments)
4. [Inter-Module Communication & Contracts](#4-inter-module-communication--contracts)
5. [Compile-Time Enforcement & Modulith Boundaries](#5-compile-time-enforcement--modulith-boundaries)
6. [Governance & Approval Sign-Off](#6-governance--approval-sign-off)

---

# 1. Executive Summary & Modular Boundary Principles

This document defines the internal structural mechanics, internal component interactions, and state boundaries for each subsystem module within the **GyaanByte Platform**.

### Modular Rules of Engagement:
1. **Low Coupling & High Cohesion:** Each domain module contains its own controllers, services, repositories, and DTOs.
2. **Encapsulated Data Ownership:** No module may directly query or alter database entities belonging to another domain module using JPA mapping relations (`@OneToMany`, `@ManyToOne` across domain boundaries are strictly prohibited).
3. **Public Component Contracts:** Cross-module programmatic access must be routed strictly through standard Java interfaces exposed in `com.gyaanbyte.domains.<domain>.api`.

---

# 2. Layer 1 Foundation Modules Design

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               LAYER 1 FOUNDATION MODULES                               │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ Security & Identity      │ Houses JwtAuthenticationFilter, TokenProvider, and     │
│ Foundation               │ custom UserDetails loader.                                │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ Storage Abstraction      │ MinIO / AWS S3 abstraction layer offering presigned URL     │
│ Engine                   │ generation and multi-part streaming uploads.                │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ Async Mail & Messaging   │ RabbitMQ event publishers and Thymeleaf-rendered transactional│
│ Engine                   │ SMTP mail dispatchers.                                      │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘


---

# 3. Layer 2 Business Domain Modules Design

### 3.1 Identity & Access Module (`com.gyaanbyte.domains.auth`)
- **Primary Responsibility:** User lifecycle, credential verification, RBAC mapping, token issuance, and password recovery.
- **Key Classes:**
  - `AuthController.java`: Exposes REST authentication endpoints (`/login`, `/register`, `/refresh`).
  - `AuthServiceImpl.java`: Orchestrates BCrypt hashing, Spring Security AuthenticationManager calls, and Redis token version updates.
  - `JwtTokenProvider.java`: Cryptographically signs and validates RSA / HMAC JWT claims.

### 3.2 Lead Management & CRM Module (`com.gyaanbyte.domains.crm`)
- **Primary Responsibility:** Captures inbound project and training inquiries, manages sales pipelines, and maintains interaction logs.
- **Key Classes:**
  - `LeadController.java`: Endpoints for lead generation and Kanban status transitions.
  - `LeadAssignmentEngine.java`: Round-robin or workload-based auto-assignment algorithm distributing new leads to sales team members.
  - `LeadNoteRepository.java`: JPA repository for timestamped interaction notes.

### 3.3 Academic Projects Module (`com.gyaanbyte.domains.projects`)
- **Primary Responsibility:** Catalog indexing, multi-tag filtering, project documentation assets, and download link generation.
- **Key Classes:**
  - `ProjectController.java`: Search, filter, and metadata extraction APIs.
  - `ProjectSpecification.java`: Dynamic JPA criteria builder filtering by technology tags (`JAVA`, `SPRING_BOOT`), category, and price range.
  - `PresignedUrlGenerator.java`: Interacts with Layer 1 storage to sign temporary S3 URLs.

### 3.4 Training & LMS Module (`com.gyaanbyte.domains.training`)
- **Primary Responsibility:** Course structure management, student lesson tracking, capstone evaluations, and certificate issuance.
- **Key Classes:**
  - `CourseService.java`: Manages course curriculum tree navigation (`Course -> Module -> Lesson`).
  - `ProgressTracker.java`: Calculates progress percentages and triggers course completion triggers.
  - `CertificatePdfGenerator.java`: Uses iText/OpenPDF to render verified certificates with QR codes.

### 3.5 Software Services & Consultations Module (`com.gyaanbyte.domains.consultation`)
- **Primary Responsibility:** Calendar availability management, trainer 1-on-1 slot bookings, and video session link generation.
- **Key Classes:**
  - `SlotScheduler.java`: Manages mentor time blocks and prevents double bookings using pessimistic database locks.
  - `ConsultationBookingService.java`: Converts confirmed payment orders into booked slots.

### 3.6 Payments & Billing Module (`com.gyaanbyte.domains.payments`)
- **Primary Responsibility:** Direct payment gateway integration, webhook signature verification, order fulfillment, and GST invoice rendering.
- **Key Classes:**
  - `PaymentWebhookController.java`: Idempotent listener for Razorpay / Stripe asynchronous webhooks.
  - `InvoiceEngine.java`: Dynamic tax calculation and PDF invoice generation.

---

# 4. Inter-Module Communication & Contracts

To maintain loose coupling, modules communicate via asynchronous domain events or lightweight API interface contracts.

┌────────────────────────┐                   ┌────────────────────────┐
│  CRM Domain Module     │                   │ Payments Domain Module │
└───────────┬────────────┘                   └───────────┬────────────┘
│                                            │
│ Emits LeadConvertedEvent                   │ Emits PaymentSuccessEvent
▼                                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    RabbitMQ Domain Event Bus                        │
└──────────────────────────────────┬──────────────────────────────────┘
│
▼
┌──────────────────────────────┐
│ Notifications / Mail Engine  │
└──────────────────────────────┘


---

# 5. Compile-Time Enforcement & Modulith Boundaries

The application uses **Spring Modulith** test verifications (`ApplicationModules.of(GyaanByteApplication.class).verify()`) in unit tests. 

Any illegal package import across domain boundaries (e.g., `com.gyaanbyte.domains.crm` importing `com.gyaanbyte.domains.payments.model.PaymentOrder` directly) will fail the CI/CD build execution.

---

# 6. Governance & Approval Sign-Off

================================================================================
APPROVAL SIGN-OFF
[X] Chief Technology Officer (CTO)           Date: August 08, 2026
[X] Lead Software Architect                 Date: August 08, 2026
[X] Principal Backend Engineer             Date: August 08, 2026

================================================================================
