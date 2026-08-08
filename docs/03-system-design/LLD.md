# GyaanByte — Low-Level Design (LLD) & Component Specification

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.
Document ID     : GYT-DOC-10-LLD
Target File     : docs/03-system-design/LLD.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead Backend Architect & Principal Software Engineer
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India

## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Engineering Architecture Board | Baseline Low-Level Design & Detailed Code Blueprint | Approved |

---

## Table of Contents
1. [Executive Summary & Scope](#1-executive-summary--scope)
2. [Package Hierarchy & Domain Encapsulation](#2-package-hierarchy--domain-encapsulation)
3. [Design Patterns & Structural Implementation](#3-design-patterns--structural-implementation)
4. [Security Filter Chain & JWT Authentication Pipeline](#4-security-filter-chain--jwt-authentication-pipeline)
5. [Domain Service & Event Handler Implementations](#5-domain-service--event-handler-implementations)
6. [Global Exception Handling Architecture](#6-global-exception-handling-architecture)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Scope

This Low-Level Design (LLD) document provides class-level details, design patterns, security filter mechanics, event dispatcher contracts, and package structures for the **GyaanByte Platform** backend (Java 21 / Spring Boot 3.3.x).

This specification guarantees that all domain components adhere to SOLID principles, maintain compile-time package encapsulation, and follow standardized exception and transaction boundaries.

---

# 2. Package Hierarchy & Domain Encapsulation

The Spring Boot backend utilizes a package-by-domain architecture under `com.gyaanbyte`. Direct coupling across domain entities is prohibited; communication between domains occurs strictly through domain service interfaces or asynchronous events.

```text
com.gyaanbyte/
├── common/
│   ├── dto/                 # Generic ApiResponse<T>, PageResponse<T>
│   ├── exception/           # Global Base Exception Hierarchy
│   └── util/                # SecurityContextUtils, DateUtils
├── infrastructure/
│   ├── config/              # SecurityConfig, RedisConfig, RabbitMQConfig
│   ├── mail/                # EmailService, TemplateRenderer
│   └── storage/             # MinioStorageProvider, StorageService
└── domains/
    ├── auth/
    │   ├── controller/      # AuthController, OAuth2Controller
    │   ├── service/         # AuthService, JwtTokenProvider, UserDetailsServiceImpl
    │   ├── repository/      # UserRepository, RoleRepository
    │   └── model/           # User, Role, Permission Entities
    ├── crm/
    │   ├── controller/      # LeadController, SalesPipelineController
    │   ├── service/         # LeadService, LeadAssignmentEngine
    │   ├── repository/      # LeadRepository, LeadNoteRepository
    │   └── model/           # Lead, LeadNote, LeadStatus Enum
    ├── projects/
    │   ├── controller/      # ProjectController, DownloadController
    │   ├── service/         # ProjectService, PresignedUrlGenerator
    │   ├── repository/      # ProjectRepository, CategoryRepository
    │   └── model/           # Project, ProjectTag, AcademicCategory
    └── payments/
        ├── adapter/         # RazorpayAdapter, StripeAdapter (Strategy Pattern)
        ├── controller/      # PaymentWebhookController, OrderController
        ├── service/         # PaymentService, InvoiceGenerator
        └── model/           # PaymentOrder, Transaction, Invoice
3. Design Patterns & Structural Implementation
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              DESIGN PATTERNS TAXONOMY                                  │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ Strategy Pattern         │ Used in `PaymentGatewayAdapter` to dynamically switch       │
│                          │ between Razorpay and Stripe at runtime.                     │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ Factory Pattern          │ Used in `StorageProviderFactory` to initialize MinIO or S3  │
│                          │ client instances based on active Spring profiles.           │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ Observer / Event Bus     │ Implemented using Spring `ApplicationEventPublisher` and    │
│                          │ RabbitMQ `@RabbitListener` for asynchronous side-effects.   │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ Specification Pattern    │ Implemented via `org.springframework.data.jpa.domain.       │
│                          │ Specification` for dynamic dynamic multi-field search.     │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
3.1 Payment Gateway Strategy Pattern Contract
Java
public interface PaymentGatewayAdapter {
    PaymentOrderResponse createOrder(CreateOrderRequest request);
    boolean verifyWebhookSignature(String payload, String signature, String secret);
    RefundResponse processRefund(String transactionId, BigDecimal amount);
    PaymentProvider getProviderName();
}
4. Security Filter Chain & JWT Authentication Pipeline
Authentication is executed via a custom Spring Security filter chain (JwtAuthenticationFilter) running ahead of UsernamePasswordAuthenticationFilter.

Incoming Request (HTTP Header: Authorization Bearer <JWT>)
                          │
                          ▼
            ┌───────────────────────────┐
            │  JwtAuthenticationFilter  │
            └─────────────┬─────────────┘
                          │
            ┌─────────────┴─────────────┐
            │ Is Bearer Token Present?  │
            └──────┬─────────────┬──────┘
               YES │             │ NO
                   ▼             └───────────────────────┐
┌────────────────────────────────────┐                   │
│ JwtTokenProvider.validateToken()   │                   │
└──────────┬─────────────────┬───────┘                   │
     VALID │                 │ INVALID                   │
           ▼                 ▼                           ▼
┌──────────────────┐  ┌──────────────┐         ┌───────────────────┐
│ Load UserDetails │  │ Throw 401    │         │ Proceed Down      │
│ Set Security     │  │ Unauthorized │         │ Filter Chain      │
│ Context          │  └──────────────┘         │ (Public Endpoint) │
└──────────┬───────┘                           └─────────┬─────────┘
           │                                             │
           └──────────────────────┬──────────────────────┘
                                  ▼
                   ┌────────────────────────────┐
                   │  RestController Endpoint   │
                   └────────────────────────────┘
5. Domain Service & Event Handler Implementations
5.1 Lead Processing Event Driven Execution
Java
@Service
@RequiredArgsConstructor
@Slf4j
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public LeadResponse createPublicLead(CreateLeadRequest request) {
        // 1. Deduplication validation check
        boolean exists = leadRepository.existsByEmailAndCreatedAtAfter(
            request.getEmail(), LocalDateTime.now().minusDays(14)
        );
        if (exists) {
            log.warn("Duplicate lead submission detected for email: {}", request.getEmail());
            // Append note logic...
        }

        // 2. Persist entity
        Lead lead = Lead.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .status(LeadStatus.NEW)
                .build();
        Lead savedLead = leadRepository.save(lead);

        // 3. Publish asynchronous domain event
        eventPublisher.publishEvent(new LeadCreatedEvent(this, savedLead.getId(), savedLead.getEmail()));

        return LeadMapper.toResponse(savedLead);
    }
}
6. Global Exception Handling Architecture
Global REST exceptions are caught using @RestControllerAdvice, converting raw runtime exceptions into standardized ApiResponse<Void> payloads.

Java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(ex.getMessage(), "RESOURCE_NOT_FOUND"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.validationError("Validation failed", errors));
    }
}
7. Governance & Approval Sign-Off
================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Principal Backend Architect             Date: August 08, 2026
 [X] Lead Quality Assurance Engineer         Date: August 08, 2026

================================================================================
