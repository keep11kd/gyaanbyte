Here is the complete, production-grade documentation file for docs/03-system-design/HLD.md.File Path: docs/03-system-design/HLD.mdMarkdown# GyaanByte — High-Level Design (HLD) Document

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-09-HLD
Target File     : docs/03-system-design/HLD.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Chief Systems Architect & Lead Software Engineer
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Architecture Board | Baseline High-Level Design Specification | Approved |

---

## Table of Contents
1. [Executive Summary & System Context](#1-executive-summary--system-context)
2. [C4 Model Context & Container Architecture](#2-c4-model-context--container-architecture)
3. [Subsystem Component Breakdown](#3-subsystem-component-breakdown)
4. [Dynamic System Workflows & Sequence Flows](#4-dynamic-system-workflows--sequence-flows)
5. [External Service Integration Architecture](#5-external-service-integration-architecture)
6. [Security, Resilience & High-Availability Topology](#6-security-resilience--high-availability-topology)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & System Context

This High-Level Design (HLD) document describes the high-level functional blocks, structural container boundaries, runtime component interactions, data pipeline flows, and integration topologies of the **GyaanByte Platform**.

The platform is engineered to handle multiple concurrent operational workloads:
- **B2C Academic Sales:** Direct-to-student source code downloads and project reports.
- **EdTech Training:** Asynchronous course delivery, quizzes, and live mentorship bookings.
- **B2B Software Development CRM:** Inbound lead ingestion, pipeline tracking, and client consultation scheduling.

---

# 2. C4 Model Context & Container Architecture

### 2.1 C4 Level 1: System Context Diagram

                            ┌───────────────────────────┐
                            │   Students / Mentors /    │
                            │    Sales & Admin Users    │
                            └─────────────┬─────────────┘
                                          │ HTTPS (Web Browser / Mobile)
                                          ▼
                            ┌───────────────────────────┐
                            │     GYAANBYTE PLATFORM    │
                            │   (Monolithic Modular)    │
                            └──────┬───┬───┬───┬───┬────┘
                                   │   │   │   │   │
         ┌─────────────────────────┘   │   │   │   └─────────────────────────┐
         ▼                             ▼   ▼   ▼                             ▼
┌───────────────────────────┐   ┌─────────────────────┐   ┌───────────────────────────┐│   Razorpay / Stripe API   │   │ MinIO S3 Object Store│   │ Spring Mail (SMTP Server) ││   (Payment Gateways)      │   │ (Project Artifacts) │   │ (Transactional Emails)    │└───────────────────────────┘   └─────────────────────┘   └───────────────────────────┘
### 2.2 C4 Level 2: Container Diagram

┌──────────────────────────────────────────────────────────────────────────────────────────────────┐│                                     GYAANBYTE CONTAINER BOUNDARY                                 ││                                                                                                  ││  ┌───────────────────────┐             HTTPS / REST API            ┌──────────────────────────┐  ││  │  Next.js 16 Web UI    ├────────────────────────────────────────►│  Spring Boot 3 App Server│  ││  │ (React 19 / Tailwind) │                                         │    (Java 21 Engine)      │  ││  └───────────────────────┘                                         └───┬──────┬──────┬─────┬──┘  ││                                                                        │      │      │     │     ││                                      ┌─────────────────────────────────┘      │      │     │     ││                                      ▼                                        ▼      │     │     ││                       ┌──────────────────────────────┐    ┌───────────────────────┐  │     │     ││                       │ PostgreSQL 16 Relational DB  │    │ Redis 7 In-Memory Cache│  │     │     ││                       │   (ACID Persistent Data)     │    │ (Sessions, Rate Limit)│  │     │     ││                       └──────────────────────────────┘    └───────────────────────┘  │     │     ││                                                                                      ▼     │     ││                                                           ┌────────────────────────────┐   │     ││                                                           │ RabbitMQ 3.13 Message Broker│◄──┘     ││                                                           │  (Async Event Bus)         │         ││                                                           └──────────────┬─────────────┘         ││                                                                          │                       ││                                                                          ▼                       ││                                                           ┌────────────────────────────┐         ││                                                           │ MinIO Object Storage Engine│◄────────┘│                                                           │ (Bucket Source Code Zip)   ││                                                           └────────────────────────────┘└──────────────────────────────────────────────────────────────────────────────────────────────────┘
---

# 3. Subsystem Component Breakdown

| Subsystem Component | Internal Module Responsibility | Target Data Store | Inter-Process Protocol |
| :--- | :--- | :--- | :--- |
| **Auth Subsystem** | Authentication, JWT Token Issuance, Password Reset, RBAC | PostgreSQL (`users`, `roles`), Redis (Token Blacklist) | Synchronous REST / Internal Spring Security Filter |
| **CRM Subsystem** | Public Lead Capture, Kanban Pipeline Management, Lead Notes | PostgreSQL (`leads`, `lead_notes`) | REST / RabbitMQ Async (`LeadCreatedEvent`) |
| **Projects Subsystem** | Catalog Specs, Multi-Tag Filtering, Presigned Download URLs | PostgreSQL (`projects`), MinIO Bucket (`/projects`) | REST / MinIO S3 SDK |
| **Training Subsystem** | Course Hierarchy, Module Progress, Dynamic Certificate Generation | PostgreSQL (`courses`, `enrollments`, `certificates`) | REST / Asynchronous PDF Generation Workers |
| **Payment Subsystem** | Gateway Order Creation, Webhook HMAC Verification, Tax Invoices | PostgreSQL (`payments`, `transactions`, `invoices`) | Async Webhooks / External Razorpay/Stripe APIs |

---

# 4. Dynamic System Workflows & Sequence Flows

### 4.1 Student Project Purchase & Secure Download Workflow

Student Client            Next.js Frontend           Spring Boot Backend         Payment Gateway            MinIO S3 Storage│                          │                            │                         │                         ││── 1. Selects Project ───►│                            │                         │                         ││   & Click Checkout       │                            │                         │                         ││                          │── 2. POST /orders/create ─►│                         │                         ││                          │                            │── 3. Init Gateway Order►│                         ││                          │                            │◄── 4. Return Order ID ──│                         ││                          │◄── 5. Payment Session ID ──│                         │                         ││                          │                            │                         │                         ││── 6. Submits Payment ──────────────────────────────────────────────────────────►│                         ││                                                       │◄── 7. Async Webhook ────│                         ││                                                       │     Signature Verified  │                         ││                                                       │── 8. Unlock Order ─────┐│                         ││                                                       │   & Grant Access   ││                         ││                                                       │◄───────────────────┘│                         ││                          │                            │                         │                         ││── 9. Click Download ────►│                            │                         │                         ││                          │── 10. GET /download-link ─►│                         │                         ││                          │                            │── 11. Request Signed URL ─────────────────────────►││                          │                            │◄── 12. Return Signed URL (15m Expiry) ─────────────││                          │◄── 13. Download URL ───────│                         │                         ││── 14. Direct Fetch Zip File from S3 URL ─────────────────────────────────────────────────────────────────►│
---

# 5. External Service Integration Architecture

### 5.1 Payment Gateway Adapter Integration Pattern
To prevent tight coupling with a single provider, all payment operations are routed through a unified `PaymentGatewayAdapter` interface:

```text
               ┌───────────────────────────────────────┐
               │    PaymentGatewayAdapter (Interface)   │
               └───────────────────┬───────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌───────────────────────────────────┐               ┌───────────────────────────────────┐
│     RazorpayPaymentAdapter        │               │      StripePaymentAdapter         │
└───────────────────────────────────┘               └───────────────────────────────────┘
5.2 Asynchronous Event Topology (RabbitMQ Exchange Architecture)Exchange Name: gyaanbyte.domain.events (Topic Exchange).Routing Keys:crm.lead.created $\rightarrow$ Triggers Sales Manager Email Notification Queue.payment.order.completed $\rightarrow$ Triggers Invoice PDF Generation & Email Queue.training.course.completed $\rightarrow$ Triggers Certificate Generation Queue.6. Security, Resilience & High-Availability Topology6.1 Defense-in-Depth Security ControlsEdge Firewall: NGINX reverse proxy enforcing TLS 1.3 encryption, IP rate limiting, and CORS policy enforcement.API Application Guard: Spring Security stateless filter chain checking JWT signature validity and user permissions on every request.Data Boundary Isolation: Input validation using Hibernate Validator (@NotNull, @Size, @Pattern) and SQL injection protection through JPA Parametrized Queries.6.2 Fault Resilience & Failover StrategyDatabase Connection Resilience: HikariCP pool configured with connection verification queries (testOnBorrow = true) and maximum lifetime thresholds.Cache Failover: If Redis becomes unavailable, Spring Cache gracefully degrades to direct PostgreSQL database execution without breaking application runtime.7. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead Systems Architect                  Date: August 08, 2026
 [X] Principal Backend Architect             Date: August 08, 2026

================================================================================
