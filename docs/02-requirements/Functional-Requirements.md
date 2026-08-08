# GyaanByte — Detailed Functional Requirements Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-07-FUNCREQ
Target File     : docs/02-requirements/Functional-Requirements.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Systems Architect & Requirements Engineering Team
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Requirements Engineering | Baseline Detailed Functional Requirements Specification | Approved |

---

## Table of Contents
1. [Introduction & Functional Decomposition Hierarchy](#1-introduction--functional-decomposition-hierarchy)
2. [Layer 1: Core Platform Functional Requirements](#2-layer-1-core-platform-functional-requirements)
3. [Layer 2: Business Modules Functional Requirements](#3-layer-2-business-modules-functional-requirements)
   - [3.1 Identity & Access Domain (AUTH)](#31-identity--access-domain-auth)
   - [3.2 Lead Management & CRM Domain (CRM)](#32-lead-management--crm-domain-crm)
   - [3.3 Academic Projects Domain (PRJ)](#33-academic-projects-domain-prj)
   - [3.4 Training & Learning Management Domain (TRN)](#34-training--learning-management-domain-trn)
   - [3.5 Software Services & Consultations Domain (CNS)](#35-software-services--consultations-domain-cns)
   - [3.6 Content Management & SEO Domain (CNT)](#36-content-management--seo-domain-cnt)
   - [3.7 Payments, Coupons & Billing Domain (PAY)](#37-payments-coupons--billing-domain-pay)
4. [Layer 3: Role-Tailored Dashboards Requirements](#4-layer-3-role-tailored-dashboards-requirements)
5. [Layer 4: Analytics Engine Requirements](#5-layer-4-analytics-engine-requirements)
6. [Requirements Traceability Matrix](#6-requirements-traceability-matrix)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Introduction & Functional Decomposition Hierarchy

This specification breaks down the system capabilities into atomic, verifiable functional requirements. Each requirement is assigned a unique identifier (`FR-<DOMAIN>-<ID>`) and mapped across the 4-Layer Architecture.

                           ┌───────────────────────────┐
                           │   GYAANBYTE FUNCTIONAL    │
                           │      REQUIREMENTS         │
                           └─────────────┬─────────────┘
                                         │
  ┌──────────────────────┬───────────────┴───────────────┬──────────────────────┐
  ▼                      ▼                               ▼                      ▼
┌───────────┐          ┌───────────┐                   ┌───────────┐          ┌───────────┐
│  LAYER 1  │          │  LAYER 2  │                   │  LAYER 3  │          │  LAYER 4  │
│  Core     │          │ Business  │                   │ Dashboards│          │ Analytics │
│ Platform  │          │ Modules   │                   │           │          │ Engine    │
└───────────┘          └───────────┘                   └───────────┘          └───────────┘


---

# 2. Layer 1: Core Platform Functional Requirements

### 2.1 File Storage & Object Management
* **FR-SYS-01 (MinIO Object Storage):** The system shall integrate with MinIO S3-compatible storage for uploading, storing, and retrieving source code packages, video assets, project PDFs, and user profile images.
* **FR-SYS-02 (Presigned Signed URLs):** All downloadable digital files must be served strictly via time-restricted presigned URLs with an expiration time configurable in `application.yml` (default: 15 minutes). Direct bucket access must be blocked.

### 2.2 Asynchronous Messaging & Queueing
* **FR-SYS-03 (RabbitMQ Event Publisher):** The system shall publish domain events (`UserRegisteredEvent`, `LeadCreatedEvent`, `PaymentSuccessEvent`) to RabbitMQ exchanges to decouple synchronous REST HTTP requests from background processing.
* **FR-SYS-04 (Mail Engine):** The system shall consume queued email jobs and render HTML template notifications using Thymeleaf and JavaMail Sender.

---

# 3. Layer 2: Business Modules Functional Requirements

## 3.1 Identity & Access Domain (AUTH)
* **FR-AUTH-01 (User Registration):** The platform shall allow guest users to register with full name, email, phone number, and password. Accounts are flagged as `UNVERIFIED` until email token validation is complete.
* **FR-AUTH-02 (JWT Authentication):** The API shall authenticate users via Bearer tokens in the HTTP Authorization header (`Authorization: Bearer <JWT>`). Tokens must carry claims for user ID, email, and role permissions.
* **FR-AUTH-03 (Token Refresh Lifecycle):** The backend shall issue short-lived access tokens (15 minutes) and long-lived refresh tokens (7 days stored in an HttpOnly cookie). Endpoint `/api/v1/auth/refresh` shall cycle refresh tokens atomically.

## 3.2 Lead Management & CRM Domain (CRM)
* **FR-CRM-01 (Lead Ingestion):** The system shall expose a public endpoint `/api/v1/public/crm/leads` to capture interest forms from students or B2B enterprise clients.
* **FR-CRM-02 (Lead Pipeline Stages):** Sales agents shall be able to transition lead statuses through a structured state machine: `NEW -> CONTACTED -> QUALIFIED -> PROPOSAL_SENT -> CONVERTED / CLOSED_LOST`.
* **FR-CRM-03 (Lead Notes & Audit):** System shall allow sales users to attach timestamped follow-up notes and set schedule reminders for lead calls.

## 3.3 Academic Projects Domain (PRJ)
* **FR-PRJ-01 (Project Catalog Browsing):** The public catalog shall render projects with title, tech stack tags, category (Major/Minor/IEEE), price, abstract summary, and video demo URL.
* **FR-PRJ-02 (JPA Specification Filtering):** The backend shall support dynamic filtering across combinations of parameters: `?category=MAJOR&tag=SPRING_BOOT&minPrice=5000&maxPrice=15000&search=E-Commerce`.
* **FR-PRJ-03 (Source Code Package Management):** Administrators shall be able to upload zipped source code files, SQL schemas, and project documentation PDFs per project entry.

## 3.4 Training & Learning Management Domain (TRN)
* **FR-TRN-01 (Course Hierarchy):** Courses must support a 3-level tree layout: `Course -> Module -> Lesson (Video / Text / Code Sandbox)`.
* **FR-TRN-02 (Enrollment Processing):** Upon successful payment confirmation, the system shall instantiate an `Enrollment` record granting the user access to the course curriculum.
* **FR-TRN-03 (Progress Calculation):** The backend shall track completion on a per-lesson basis and calculate total progress percentage: 

$$\text{Progress \%} = \left(\frac{\text{Completed Lessons}}{\text{Total Lessons}}\right) \times 100$$

* **FR-TRN-04 (Certificate Generation):** Once course progress equals 100% and quizzes are passed, the system shall dynamically generate a unique PDF certificate containing a QR code for online validation.

## 3.5 Software Services & Consultations Domain (CNS)
* **FR-CNS-01 (Slot Availability Builder):** Mentors and trainers shall define weekly recurring calendar slots for 1-on-1 viva prep and technical consulting.
* **FR-CNS-02 (Consultation Booking):** Users shall select an available slot and complete payment, triggering calendar invites with video conference links dispatched to both mentor and student.

## 3.6 Content Management & SEO Domain (CNT)
* **FR-CNT-01 (Blog CMS):** Rich text blog articles with markdown support, author attribution, published timestamps, and dynamic URL slugs.
* **FR-CNT-02 (SEO Metadata API):** Public endpoints must return OpenGraph tags, meta descriptions, and JSON-LD schema objects for server-side rendering in Next.js 16.

## 3.7 Payments, Coupons & Billing Domain (PAY)
* **FR-PAY-01 (Payment Gateway Integration):** The API shall create orders using Razorpay/Stripe APIs and handle payment verification via secure Webhook signature parsing.
* **FR-PAY-02 (Coupon Engine):** The system shall validate discount coupon codes based on usage limits, date ranges, minimum cart value, and percentage vs. flat discount rules.
* **FR-PAY-03 (Invoice Generation):** System shall render PDF tax invoices containing company registration details, itemized breakdown, GST calculations, and customer billing address upon payment completion.

---

# 4. Layer 3: Role-Tailored Dashboards Requirements

* **FR-DSH-01 (Admin Operations Console):** Unified admin dashboard displaying platform-wide high-level metrics (Total Revenue, Active Users, Pending Leads, Course Completion Rates) and full CRUD management over all domains.
* **FR-DSH-02 (Student Learning Portal):** Student view displaying active course enrollments, project download links, booked consultation sessions, certificate downloads, and order receipts.
* **FR-DSH-03 (Sales CRM Portal):** Kanban-style pipeline interface for sales executives to drag and drop leads through pipeline stages and track target conversion metrics.

---

# 5. Layer 4: Analytics Engine Requirements

* **FR-ANL-01 (Revenue Aggregations):** Scheduled background jobs shall compute daily, weekly, and monthly revenue metrics broken down by product category (Academic Projects vs. Training vs. Services).
* **FR-ANL-02 (Lead Funnel Conversion Analytics):** The engine shall compute conversion rates across each stage of the CRM pipeline to measure sales team efficiency.

---

# 6. Requirements Traceability Matrix

| Requirement ID | Bounded Context | Epic Mapping | Target Sprint | Primary User Role |
| :--- | :--- | :--- | :--- | :--- |
| **FR-SYS-01 / 02** | Core Storage | EPIC 03 (Projects) | Sprint 3 | System / All Users |
| **FR-AUTH-01 / 02** | Identity Context | EPIC 01 (Auth) | Sprint 2 | Registered Users |
| **FR-CRM-01 / 02** | CRM Context | EPIC 02 (Leads) | Sprint 4 | Guest / Sales Agent |
| **FR-PRJ-01 / 02** | Projects Context | EPIC 03 (Projects) | Sprint 5 | Student Learner |
| **FR-TRN-01 - 04** | Training Context | EPIC 04 (Training) | Sprint 6 | Student / Mentor |
| **FR-PAY-01 - 03** | Billing Context | EPIC 05 (Payments) | Sprint 8 | Registered User |
| **FR-DSH-01 / 02** | UI Dashboards | EPIC 06 (Admin) | Sprint 9 | Admin / Student |

---

# 7. Governance & Approval Sign-Off

================================================================================
APPROVAL SIGN-OFF
[X] Chief Technology Officer (CTO)           Date: August 08, 2026
[X] Lead Requirements Engineer              Date: August 08, 2026
[X] Lead Systems Architect                  Date: August 08, 2026

================================================================================
