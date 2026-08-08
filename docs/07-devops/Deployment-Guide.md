# GyaanByte — DevOps, Deployment & Infrastructure Architecture Guide

================================================================================
GYAANBYTE TECHNOLOGIES PVT. LTD.Document ID     : GYT-DOC-21-DEVOPS
Target File     : docs/07-devops/Deployment-Guide.md
Classification  : PUBLIC / INTERNAL ENGINEERING
Status          : APPROVED
Author          : Lead DevOps Engineer & Cloud Infrastructure Architect
Effective Date  : August 2026
Location        : Lucknow, Uttar Pradesh, India
## Revision History

| Version | Date | Author | Description / Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.0` | August 2026 | Cloud Infrastructure Team | Baseline CI/CD, Containerization & Deployment Guide | Approved |

---

## Table of Contents
1. [Executive Summary & Infrastructure Topology](#1-executive-summary--infrastructure-topology)
2. [Docker Containerization & Multi-Stage Builds](#2-docker-containerization--multi-stage-builds)
3. [CI/CD Pipeline Architecture (GitHub Actions)](#3-cicd-pipeline-architecture-github-actions)
4. [Kubernetes Orchestration & Helm Deployment](#4-kubernetes-orchestration--helm-deployment)
5. [Environment Configuration & Secret Management](#5-environment-configuration--secret-management)
6. [Observability, Health Checks & Log Aggregation](#6-observability-health-checks--log-aggregation)
7. [Governance & Approval Sign-Off](#7-governance--approval-sign-off)

---

# 1. Executive Summary & Infrastructure Topology

This specification defines the containerization standards, CI/CD automation pipelines, Kubernetes manifest orchestration, and deployment protocols for the **GyaanByte Platform**.

### Core Infrastructure Principles:
- **Immutable Infrastructure:** Application artifacts are packaged into secure, minimal OCI-compliant Docker containers.
- **Zero-Downtime Deployments:** Kubernetes Rolling Updates combined with Liveness/Readiness probes guarantee 99.99% system availability.
- **GitOps Continuous Delivery:** GitHub Actions handles automated testing, image scanning, and deployment trigger dispatches.

---

# 2. Docker Containerization & Multi-Stage Builds

The Spring Boot backend uses multi-stage Docker builds based on Eclipse Temurin JDK 17 to produce lean runtime containers (< 250 MB) running as non-root users.

```dockerfile
# Stage 1: Build & Package
FROM maven:3.9-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

# Stage 2: Runtime Execution
FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S gyaanbyte && adduser -S gyaanbyte -G gyaanbyte
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
USER gyaanbyte:gyaanbyte

EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
3. CI/CD Pipeline Architecture (GitHub Actions)┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Git Commit  │ ──► │ Unit & Integration│ ──► │ SonarQube &  │ ──► │ Docker Build │
│ (main/dev)   │     │   Tests      │     │ Security Scan│     │  & GHCR Push │
└──────────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
                                                                      │
                                                                      ▼
                                                               ┌──────────────┐
                                                               │ K8s Rolling  │
                                                               │  Deployment  │
                                                               └──────────────┘
GitHub Actions Workflow Summary (.github/workflows/deploy.yml):Trigger: Push to main branch or tag creation (v*.*.*).Quality Gate: Executes mvn clean verify and posts code coverage metrics to SonarQube.Container Security: Scans container base layers for CVEs using Trivy.Publishing: Tags and pushes image artifacts to GitHub Container Registry (ghcr.io).Deployment: Updates Kubernetes deployment image tag using kubectl set image.4. Kubernetes Orchestration & Helm DeploymentDeployment Manifest (k8s/deployment.yaml)YAMLapiVersion: apps/v1
kind: Deployment
metadata:
  name: gyaanbyte-backend
  namespace: production
  labels:
    app: gyaanbyte-backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: gyaanbyte-backend
  template:
    metadata:
      labels:
        app: gyaanbyte-backend
    spec:
      containers:
      - name: api-server
        image: ghcr.io/gyaanbyte/backend:latest
        ports:
        - containerPort: 8080
        envFrom:
        - secretRef:
            name: gyaanbyte-secrets
        - configMapRef:
            name: gyaanbyte-config
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1024Mi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 5
5. Environment Configuration & Secret ManagementConfigMaps: Store non-sensitive runtime parameters (e.g., SPRING_PROFILES_ACTIVE=prod, LOGGING_LEVEL_ROOT=INFO).Secret Management: Production credentials (DB passwords, JWT private keys, Razorpay API keys) are managed via HashiCorp Vault or AWS Secrets Manager, injected directly as environment variables into pod memory at runtime.6. Observability, Health Checks & Log AggregationMetrics Collection: Spring Boot Actuator exports Prometheus metrics at /actuator/prometheus, scraped every 15 seconds.Dashboards: Grafana visualizes JVM heap usage, active HTTP requests, DB connection pool (HikariCP) status, and latency distributions ($p_{95}, p_{99}$).Centralized Logging: Fluentbit sidecars forward JSON structured logs to Grafana Loki for real-time querying.7. Governance & Approval Sign-Off================================================================================
                               APPROVAL SIGN-OFF
================================================================================

 [X] Chief Technology Officer (CTO)           Date: August 08, 2026
 [X] Lead DevOps Engineer                    Date: August 08, 2026
 [X] Cloud Infrastructure Architect          Date: August 08, 2026

================================================================================
