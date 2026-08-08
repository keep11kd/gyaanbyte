Here is the complete, production-grade documentation file for docs/03-system-design/Architecture.md.File Path: docs/03-system-design/Architecture.mdMarkdown# GyaanByte — System Architecture & Architectural Blueprint

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-08-ARCH
Target File     : docs/03-system-design/Architecture.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Chief Technology Officer & Lead Systems Architect
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Lead Systems Architect | Baseline 4-Layer Modular Monolith Architecture Blueprint | Approved |

---

## Table of Contents
1. [System Architectural Overview](#1-system-architectural-overview)
2. [The 4-Layer Architectural Model](#2-the-4-layer-architectural-model)
3. [Technology Stack & Framework Alignment](#3-technology-stack--framework-alignment)
4. [Domain-Driven Design (DDD) Bounded Contexts](#4-domain-driven-design-ddd-bounded-contexts)
5. [Cross-Cutting Architectural Concerns](#5-cross-cutting-architectural-concerns)
6. [Non-Functional System Guarantees](#6-non-functional-system-guarantees)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. System Architectural Overview

The **GyaanByte Platform** architecture is designed as a **Domain-Driven Modular Monolith**. This pattern provides clear physical and logical separation across business capabilities, enabling high development velocity, simple deployment topologies, and strong compile-time boundaries while guaranteeing a seamless future path toward Microservices extraction if organizational scale requires it.

                     ┌─────────────────────────────────────────┐
                     │           Layer 3: Dashboards           │
                     │  (Admin, Trainer, Student, Sales, etc.) │
                     └────────────────────┬────────────────────┘
                                          │ REST API (HTTPS / JSON)
                                          ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐│                               Layer 2: Business Domains                                ││  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  ││  │     CRM      │  │   Projects   │  │   Training   │  │ Consultations│  │  Payments │  ││  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └───────────┘  │└─────────────────────────────────────────────┬──────────────────────────────────────────┘│ Depends On▼┌────────────────────────────────────────────────────────────────────────────────────────┐│                              Layer 1: Core Platform Base                               ││  ┌──────────────────────┐  ┌────────────────────────┐  ┌────────────────────────────┐  ││  │ Identity & Security  │  │  Core Infrastructure   │  │    Platform Utilities      │  ││  │ (Auth, RBAC, OAuth)  │  │ (Storage, Mail, Cache) │  │ (Settings, Media, Search)  │  ││  └──────────────────────┘  └────────────────────────┘  └────────────────────────────┘  │└─────────────────────────────────────────────┬──────────────────────────────────────────┘│ Async Events (AMQP / Redis)▼┌─────────────────────────────────────────┐│           Layer 4: Analytics            ││    (Reports, Funnels, Revenue Engine)   │└─────────────────────────────────────────┘
---

# 2. The 4-Layer Architectural Model

### 2.1 Layer 1: Core Platform Base (Foundation)
Provides cross-cutting system services, hardware abstractions, security mechanisms, and foundational data structures consumed by upper layers.
- **Identity & Security:** Stateless JWT authentication, RBAC authorization filters, BCrypt hashing.
- **Infrastructure:** MinIO S3 Object Storage connector, JavaMail asynchronous SMTP handler, Redis cache connection manager.
- **Platform Utilities:** System configuration key-value store, global API response builders, exception standardizers.

### 2.2 Layer 2: Business Modules (Domain Core)
Contains pure business logic, domain entities, persistence repositories, and specialized validators. Each business domain is encapsulated in its own package and exposes both public and administrative endpoints.
- **Domains:** CRM, Projects, Training, Consultations, Content, Payments.

### 2.3 Layer 3: Role-Tailored Dashboards (Presentation)
Frontend user interfaces built using Next.js 16 and React 19. They communicate with Layer 2 REST endpoints through standard JSON contracts.
- **Interfaces:** Public Portal, Student Portal, Sales CRM Dashboard, Trainer Operations Console, Admin Management Console.

### 2.4 Layer 4: Analytics Engine (Reporting & Insights)
Asynchronous read-optimized data processing layer. Aggregates business transactions, tracking event streams from RabbitMQ, and generating materialized statistics without locking transactional OLTP tables.

---

# 3. Technology Stack & Framework Alignment

┌────────────────────────────────────────────────────────────────────────────────────────┐│                                TECHNOLOGY STACK MATRIX                                │├──────────────────────────┬─────────────────────────────────────────────────────────────┤│ Frontend Framework       │ Next.js 16 (App Router), React 19, TypeScript 5.x           ││ Styling & UI Componentry │ TailwindCSS 4, Shadcn UI, Lucide Icons, Framer Motion       ││ Client State & Fetching  │ TanStack Query v5 (React Query), React Hook Form, Zod       │├──────────────────────────┼─────────────────────────────────────────────────────────────┤│ Backend Runtime & Core   │ Java 21 LTS, Spring Boot 3.3.x                             ││ Security & Auth          │ Spring Security 6 (Stateless JWT + OAuth2 OIDC)             ││ Persistence & ORM        │ Spring Data JPA, Hibernate ORM, Flyway Schema Migrations   │├──────────────────────────┼─────────────────────────────────────────────────────────────┤│ Primary Relational DB    │ PostgreSQL 16 (ACID-compliant OLTP storage)                 ││ In-Memory Cache & Lock   │ Redis 7 (Caching, Session Store, Distributed Lock Engine)   ││ Object Storage           │ MinIO (S3-Compatible Object Storage for project zips & PDFs)││ Message Broker           │ RabbitMQ 3.13 (Async AMQP domain event dispatcher)          │├──────────────────────────┼─────────────────────────────────────────────────────────────┤│ Observability & DevOps   │ Docker Compose, NGINX Proxy, Actuator, Prometheus, Grafana  │└──────────────────────────┴─────────────────────────────────────────────────────────────┘
---

# 4. Domain-Driven Design (DDD) Bounded Contexts

To enforce strict separation of concerns, backend Java code resides under `com.gyaanbyte.domains.<domain>`. Direct cross-domain database joins are strictly forbidden at the JPA ORM layer. Cross-domain interactions occur strictly via:
1. **In-Process Java Service Interfaces** (for synchronous transactional queries).
2. **Spring Application Event Publisher / RabbitMQ Events** (for asynchronous eventual consistency).

```text
com.gyaanbyte/
├── common/                  # Cross-cutting API models, exceptions, utilities
├── infrastructure/          # Storage, Mail, Redis, and AMQP configurations
└── domains/
    ├── auth/                # Security, Identity & OAuth Context
    ├── crm/                 # Leads, Contact Pipelines & Sales Notes
    ├── projects/            # Source Code Packages, Tags & File Storage
    ├── training/            # Courses, Modules, Lessons & Certificates
    ├── payments/            # Gateways, Transactions & Invoice Engine
    ├── content/             # Blogs, FAQs & Marketing Testimonials
    ├── consultation/        # Slot Scheduling & Mentor Bookings
    └── analytics/           # Background Aggregations & Report Generators
5. Cross-Cutting Architectural Concerns5.1 Centralized Exception Handling & API Response StandardizationAll REST API controllers return an identical payload structure (ApiResponse<T>) to simplify client-side integration:JSON{
  "success": true,
  "message": "Project list fetched successfully",
  "data": { ... },
  "error": null,
  "timestamp": "2026-08-08T20:51:32Z"
}
System errors are intercepted globally using @RestControllerAdvice, translating Java exceptions (EntityNotFoundException, AccessDeniedException, MethodArgumentNotValidException) into structured standard responses with appropriate HTTP status codes.5.2 Multi-Layer Caching StrategyLayer 1 (L1) Application Cache: Spring @Cacheable backed by Redis for high-frequency, low-variance reads (e.g., System Settings, Public Project Catalogs, Course Outlines).Cache Eviction: Automatic invalidation on write events (@CacheEvict(value = "projects", allEntries = true)).5.3 Asynchronous Execution & Event ProcessingOperations that exceed $100\text{ ms}$ execution budgets (such as PDF generation, sending transactional emails, or re-indexing search metadata) are offloaded asynchronously to RabbitMQ worker queues.6. Non-Functional System GuaranteesHigh Availability & Fault Tolerance: Database connection pools managed via HikariCP with automatic reconnection retries.Horizontal Scalability: Stateless backend application containers can be scaled horizontally behind an NGINX load balancer.Data Integrity: Strict ACID compliance for payment and registration workflows using Spring @Transactional boundaries.7. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead Systems Architect                  Date: August 08, 2026
 [X] Principal Software Engineer             Date: August 08, 2026

================================================================================
