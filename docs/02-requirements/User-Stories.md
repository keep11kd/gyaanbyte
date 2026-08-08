Here is the next complete, production-grade documentation file in the series: docs/02-requirements/User-Stories.md.

File Path: docs/02-requirements/User-Stories.md
Markdown
# GyaanByte — User Stories & Acceptance Criteria Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-05-USERSTORIES
Target File     : docs/02-requirements/User-Stories.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Product Manager & Quality Assurance Team
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Quality Assurance Team | Baseline Epic & User Story Requirements Mapping | Approved |

---

## Table of Contents
1. [Executive Summary & Epic Mapping](#1-executive-summary--epic-mapping)
2. [Target Persona Definitions](#2-target-persona-definitions)
3. [Epic 01: Authentication & Identity Management](#3-epic-01-authentication--identity-management)
4. [Epic 02: Lead Management & CRM Pipeline](#4-epic-02-lead-management--crm-pipeline)
5. [Epic 03: Academic Project Catalog & Secure Downloads](#5-epic-03-academic-project-catalog--secure-downloads)
6. [Epic 04: Course Enrollment & Learning Management](#6-epic-04-course-enrollment--learning-management)
7. [Epic 05: Payments, Coupons & Invoicing](#7-epic-05-payments-coupons--invoicing)
8. [Epic 06: Admin Operations & System Control](#8-epic-06-admin-operations--system-control)
9. [Governance & Approval Sign-Off](#9-governance--approval-sign-off)

---

# 1. Executive Summary & Epic Mapping

This document details the functional user stories and Gherkin-style (`Given-When-Then`) acceptance criteria for the **GyaanByte Platform**. Each story maps directly to bounded contexts in Layer 1 (Core Platform), Layer 2 (Business Domains), and Layer 3 (Dashboards).

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              GYAANBYTE EPIC TAXONOMY                                   │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
│
┌───────────────┬───────────────┬────────┴──────┬───────────────┬───────────────┐
▼               ▼               ▼               ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   EPIC 01   │ │   EPIC 02   │ │   EPIC 03   │ │   EPIC 04   │ │   EPIC 05   │ │   EPIC 06   │
│ Identity &  │ │   CRM &     │ │ Academic    │ │ Training &  │ │ Payments &  │ │ System      │
│ Security    │ │ Leads       │ │ Projects    │ │ Learning    │ │ Invoicing   │ │ Admin       │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘


---

# 2. Target Persona Definitions

- **P1: Guest Learner (Riya):** A computer science undergraduate looking for capstone project source code and viva preparation.
- **P2: Enrolled Student (Aman):** An active learner enrolled in a Java & Spring Boot mentorship bootcamp.
- **P3: Sales Executive (Vikram):** An internal CRM user responsible for following up on project leads and closing client sales.
- **P4: Mentor / Instructor (Neha):** A senior engineer responsible for evaluating student code submissions and conducting 1-on-1 viva sessions.
- **P5: Platform Admin (Suresh):** System administrator overseeing RBAC, settings, and business revenue analytics.

---

# 3. Epic 01: Authentication & Identity Management

### US-AUTH-01: User Registration & Email Verification
* **As a** Guest Learner (P1),
* **I want to** register an account using my email and a secure password,
* **So that** I can access purchased courses, project files, and mentorship slots.

```gherkin
Scenario: Successful User Registration
  Given a guest user is on the registration page
  When they submit a valid full name, email "student@example.com", and password meeting complexity rules
  Then the system creates a user record with status "PENDING_VERIFICATION"
  And dispatches a verification token asynchronously via email
  And returns a HTTP 201 Created response with message "Verification email sent"

Scenario: Registration with Duplicate Email
  Given an existing registered user with email "student@example.com"
  When a guest attempts to register with "student@example.com"
  Then the system rejects the registration
  And returns a HTTP 409 Conflict with error code "AUTH_EMAIL_ALREADY_EXISTS"
US-AUTH-02: Stateless JWT Authentication
As a Registered User (P2),

I want to log in with my credentials and receive a signed access token,

So that I can authenticate my API requests securely.

Gherkin
Scenario: Successful Authentication
  Given a registered user with active status
  When they submit correct credentials to POST "/api/v1/auth/login"
  Then the system returns an HTTP 200 OK with an Access Token (15-min TTL) in the response body
  And sets an HttpOnly, Secure Refresh Token cookie (7-day TTL)
4. Epic 02: Lead Management & CRM Pipeline
US-CRM-01: Public Lead Capture
As a Guest Visitor (P1),

I want to submit an inquiry form for custom project development or training,

So that the GyaanByte team can contact me with a customized solution.

Gherkin
Scenario: Submitting an Academic Lead Form
  Given a visitor on the "Academic Projects" landing page
  When they submit name, phone number, academic branch, and target technology stack
  Then the system creates a lead entry in domain context "CRM" with status "NEW"
  And emits a "LeadCreatedEvent" to RabbitMQ to notify the sales team via email
  And returns HTTP 201 Created with confirmation reference ID
5. Epic 03: Academic Project Catalog & Secure Downloads
US-PRJ-01: Dynamic Multi-Param Catalog Search
As a Student Learner (P1/P2),

I want to filter projects by domain, technology stack, and price range,

So that I can quickly locate a project matching my university syllabus requirements.

Gherkin
Scenario: Filtering Projects by Technology Stack
  Given a catalog containing projects with tags ["JAVA", "SPRING_BOOT", "PYTHON"]
  When a user queries GET "/api/v1/projects?tag=SPRING_BOOT&category=MAJOR"
  Then the system executes a dynamic JPA Specification query
  And returns a paginated JSON list of projects matching criteria within 100ms
US-PRJ-02: Secure Signed Download URL Generation
As a Paid Student (P2),

I want to receive a secure, short-lived download link for my project source code,

So that unauthorized users cannot hotlink or steal proprietary project repositories.

Gherkin
Scenario: Generating Presigned Source Code Download Link
  Given an authenticated user who has a completed order for Project ID "PRJ-101"
  When they request GET "/api/v1/projects/PRJ-101/download-link"
  Then the system generates a MinIO presigned URL with an expiry timer of 15 minutes
  And logs the download attempt in the audit table with user ID and client IP address
6. Epic 04: Course Enrollment & Learning Management
US-TRN-01: Course Progress Tracking
As an Enrolled Student (P2),

I want to mark lessons as completed and track my overall course progress,

So that I can visualize my learning journey and unlock capstone project evaluations.

Gherkin
Scenario: Marking a Lesson Complete
  Given a student enrolled in Course ID "CRS-01" with 10 total lessons
  When they complete Lesson 3 and POST to "/api/v1/training/progress"
  Then the system records the completion event
  And recalculates total progress to 30%
  And returns the updated enrollment progress payload
7. Epic 05: Payments, Coupons & Invoicing
US-PAY-01: Payment Gateway Webhook Verification
As a Platform System,

I want to cryptographically verify incoming payment gateway webhooks (Razorpay/Stripe),

So that orders are only fulfilled after confirmed payment receipts.

Gherkin
Scenario: Successful Payment Gateway Signature Verification
  Given an incoming webhook request from Razorpay containing payload and signature
  When the backend payment service calculates the HMAC-SHA256 hash using the webhook secret
  And the calculated hash matches the header signature
  Then the payment status updates from "PENDING" to "SUCCESS"
  And the system automatically unlocks course or project access for the buyer
8. Epic 06: Admin Operations & System Control
US-ADM-01: Global Role-Based Dashboard Access
As a Platform Admin (P5),

I want to access centralized revenue, lead pipeline, and user metrics,

So that I can monitor system performance and operational health.

Gherkin
Scenario: Non-Admin Attempting Admin Dashboard Access
  Given an authenticated user with role "ROLE_STUDENT"
  When they attempt to request GET "/api/v1/admin/analytics/revenue"
  Then Spring Security interceptor blocks the request via `@PreAuthorize("hasRole('ADMIN')")`
  And returns HTTP 403 Forbidden with payload `{"error": "ACCESS_DENIED"}`
9. Governance & Approval Sign-Off
================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Product Officer (CPO)              Date: August 08, 2026
 [X] Lead Quality Assurance Engineer         Date: August 08, 2026
 [X] Lead Systems Architect                  Date: August 08, 2026

================================================================================
