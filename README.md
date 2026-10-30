# JavaScript DevSecOps Security Starter

[![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Security](https://img.shields.io/badge/Security-DevSecOps-red)](SECURITY.md)

**A reusable security engineering foundation for JavaScript and Node.js applications.**

A practical DevSecOps starter repository designed to integrate security throughout the Software Development Lifecycle (SDLC).

It provides reusable application security controls, automated security analysis, dependency vulnerability detection, container hardening, and CI/CD security workflows.

Instead of treating security as a final deployment activity, this project demonstrates how to incorporate security into everyday development, code review, integration, and release processes.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture and Security Workflow](#architecture-and-security-workflow)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing and Quality Assurance](#testing-and-quality-assurance)
- [Security Tooling](#security-tooling)
- [Docker and Containerization](#docker-and-containerization)
- [CI/CD Security Pipeline](#cicd-security-pipeline)
- [Software Bill of Materials](#software-bill-of-materials)
- [Security Considerations](#security-considerations)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Project Overview

Modern JavaScript applications depend on extensive third-party packages, external services, container images, and automated deployment pipelines.

Without appropriate security controls, these dependencies and development workflows can introduce vulnerabilities such as:

- Hardcoded credentials and accidental secret exposure.
- Vulnerable or compromised third-party dependencies.
- Insecure application endpoints and inadequate input validation.
- Container privilege escalation and excessive permissions.
- Vulnerabilities introduced through insecure CI/CD workflows.
- Inadequate security visibility across the software supply chain.

This repository addresses these challenges by providing a reusable security baseline for JavaScript/Node.js projects.

It combines secure application development practices with automated security tooling and infrastructure-level controls.

### Project Objectives

1. Establish secure coding practices for JavaScript applications.
2. Integrate security checks into the development lifecycle.
3. Detect exposed credentials before they reach production.
4. Identify vulnerable dependencies and insecure code patterns.
5. Harden application containers using security best practices.
6. Generate software component inventories through SBOM tooling.
7. Establish repeatable security workflows that can be adopted across multiple projects.

**The intended outcome:** Security becomes an engineering responsibility throughout the development lifecycle rather than an isolated activity performed before release.

---

## Key Features

### 1. Secure JavaScript Application Foundation

The Express API demonstrates reusable application security controls, including:

- HTTP security headers through Helmet.
- Request body size restrictions.
- Input validation and strict schema enforcement with Zod.
- Request identification using UUIDs.
- Centralized error handling.
- Structured application logging with Pino.
- Sensitive-field redaction in configured logs.
- API rate limiting.
- Explicit CORS origin configuration.
- Environment variable validation.

### 2. Secret Detection

Integrates Gitleaks to identify potentially exposed credentials and sensitive information.

Security controls include:

- Git ignore rules for sensitive files.
- Gitleaks configuration.
- Repository secret scanning through GitHub Actions.
- Local secret scanning support.

### 3. Static Application Security Testing (SAST)

Static analysis is incorporated into the development workflow using:

- Semgrep.
- ESLint.
- ESLint Security Plugin.
- GitHub CodeQL.

These tools help identify potentially insecure coding patterns and application vulnerabilities before deployment.

### 4. Software Composition Analysis (SCA)

Dependency security is addressed through:

- npm audit.
- Dependabot.
- GitHub Dependency Review.
- Automated dependency vulnerability checks.

The objective is to identify known vulnerabilities in direct and transitive dependencies.

### 5. Container Security

The Docker configuration incorporates:

- Multi-stage image construction.
- Non-root application execution.
- Production-only dependency installation.
- Reduced runtime image contents.
- Container health checks.

Trivy is integrated into the GitHub Actions workflow to scan built container images for vulnerabilities.

### 6. CI/CD Security Integration

GitHub Actions provides automated workflows for:

- Application linting and testing.
- Dependency vulnerability assessment.
- Secret detection.
- Static application security testing.
- Dependency review.
- CodeQL analysis.
- Container vulnerability scanning.
- SBOM generation.

### 7. Security Documentation

The repository includes supporting security engineering documentation:

- Threat modeling.
- Security control mapping.
- Incident response guidance.
- Repository adoption checklist.
- Vulnerability reporting policy.

---

## Technology Stack

| Category | Technology |
|---|---|
| Programming language | JavaScript (ES Modules) |
| Runtime | Node.js 22+ |
| Backend framework | Express.js 4 |
| Input validation | Zod |
| Security headers | Helmet |
| Rate limiting | express-rate-limit |
| Logging | Pino / pino-http |
| Testing | Vitest |
| API testing | Supertest |
| Code quality | ESLint / Prettier |
| SAST | Semgrep / CodeQL |
| Secret scanning | Gitleaks |
| Dependency analysis | npm audit / Dependabot |
| Containerization | Docker |
| Container scanning | Trivy |
| SBOM | Syft-based SBOM generation |
| CI/CD | GitHub Actions |
| Dependency management | npm |

---

## Architecture and Security Workflow

The repository follows a security-focused development lifecycle.

```text
              DEVELOPER WORKSTATION
                       |
                       v
                JavaScript Source
                       |
                       v
                Git Version Control
                       |
             +---------+---------+
             |                   |
             v                   v
         Gitleaks          Code Review
             |                   |
             +---------+---------+
                       |
                       v
                 GitHub Actions
                       |
          +------------+------------+
          |            |            |
          v            v            v
        SAST          SCA        Unit Tests
      Semgrep      npm audit      Vitest
      CodeQL       Dependabot
          |            |            |
          +------------+------------+
                       |
                       v
                 Docker Build
                       |
                       v
                 Trivy Scan
                       |
                       v
                  SBOM Build
                       |
                       v
               Release Artifacts
```

The workflow illustrates the intended security lifecycle. Actual enforcement of deployment and release approvals requires additional repository and environment configuration.

---

## Project Structure

```text
javascript-devsecops-starter/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── codeql.yml
│   │   ├── container-security.yml
│   │   └── sbom.yml
│   │
│   ├── CODEOWNERS
│   ├── dependabot.yml
│   └── pull_request_template.md
│
├── .husky/
│   └── pre-commit
│
├── docs/
│   ├── ADOPTION-CHECKLIST.md
│   ├── INCIDENT-RESPONSE.md
│   ├── SECURITY-CONTROLS.md
│   └── THREAT-MODEL.md
│
├── scripts/
│   └── security-check.sh
│
├── src/
│   ├── config/
│   │   └── env.js
│   │
│   ├── middleware/
│   │   ├── error-handler.js
│   │   └── request-id.js
│   │
│   ├── routes/
│   │   ├── health.js
│   │   └── v1.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── api.test.js
│
├── .dockerignore
├── .env.example
├── .gitleaks.toml
├── .gitignore
├── .npmrc
├── .prettierrc.json
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── LICENSE
├── package.json
├── SECURITY.md
└── vitest.config.js
```

---

## Prerequisites

Ensure the following tools are available:

| Requirement | Purpose |
|---|---|
| Node.js 22+ | JavaScript runtime |
| npm | Dependency management |
| Git | Version control |
| Docker | Containerization |
| GitHub account | Repository hosting and CI/CD |

Optional local security scanning tools:

- Gitleaks
- Semgrep
- Trivy

GitHub Actions provides the configured automated scanning workflows independently of whether these tools are installed locally.

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd javascript-devsecops-starter
```

### 2. Install dependencies

```bash
npm install
```

This generates the npm lockfile if one is not already present.

Commit `package-lock.json` to version control before using the CI and Docker workflows, both of which use `npm ci`.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Update the configuration according to your environment.

### 4. Start the development server

```bash
npm run dev
```

The API listens on:

```text
http://localhost:3000
```

---

## Environment Configuration

The application uses environment variables validated through Zod during startup.

| Variable | Description | Default |
|---|---|---|
| NODE_ENV | Application environment | development |
| PORT | Application listening port | 3000 |
| HOST | Application bind address | 0.0.0.0 |
| LOG_LEVEL | Logging verbosity | info |
| CORS_ORIGIN | Trusted frontend origin | http://localhost:5173 |
| TRUST_PROXY | Enable trusted proxy configuration | false |

Example configuration:

```env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5173
TRUST_PROXY=false
```

**Security guidance:**

- Never commit `.env` files.
- Do not expose credentials through application logs.
- Use a dedicated secrets manager for production credentials.
- Configure CORS with explicitly trusted origins.
- Enable proxy trust only when the actual proxy topology is understood and correctly configured.

---

## Running the Application

Start the application:

```bash
npm run dev
```

Start in production mode:

```bash
npm start
```

The application provides health endpoints and a demonstration API endpoint.

---

## API Endpoints

### Health Checks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health/live` | Application liveness |
| GET | `/health/ready` | Application readiness |

### Demonstration API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/echo` | Validates and returns a message |

Example request:

```bash
curl -X POST http://localhost:3000/api/v1/echo \
  -H "Content-Type: application/json" \
  -d '{"message":"DevSecOps security baseline"}'
```

Example response:

```json
{
  "data": {
    "message": "DevSecOps security baseline"
  }
}
```

The endpoint uses strict Zod schema validation and rejects unexpected properties or invalid message lengths.

---

## Testing and Quality Assurance

The project uses Vitest and Supertest for automated API testing.

### Run unit and integration tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Generate test coverage

```bash
npm run test:coverage
```

### Run linting

```bash
npm run lint
```

### Verify formatting

```bash
npm run format:check
```

### Run the complete quality check

```bash
npm run check
```

The complete check runs:

1. ESLint.
2. Prettier formatting verification.
3. Vitest automated tests.

Coverage thresholds are configured in `vitest.config.js`.

---

## Security Tooling

The repository includes dedicated security commands.

### Dependency Vulnerability Scanning

```bash
npm run security:deps
```

Uses npm audit to identify known dependency vulnerabilities at high severity and above.

### Secret Scanning

```bash
npm run security:secrets
```

Runs Gitleaks against the repository working tree.

### Static Application Security Testing

```bash
npm run security:sast
```

Runs Semgrep using its JavaScript security ruleset.

### Combined Local Security Checks

```bash
npm run security:local
```

Runs dependency auditing, available local security scanners, and application quality checks.

Gitleaks and Semgrep must be installed locally for their respective scanner checks to execute.

---

## Docker and Containerization

The application includes a multi-stage Dockerfile designed to reduce runtime dependencies and privileges.

### Build the image

First ensure `package-lock.json` has been generated and committed.

```bash
docker build -t javascript-devsecops-starter .
```

### Run the container

```bash
docker run --rm \
  -p 3000:3000 \
  --env-file .env \
  javascript-devsecops-starter
```

### Using Docker Compose

```bash
docker compose up --build
```

Stop the application:

```bash
docker compose down
```

### Container Security Controls

The supplied configuration demonstrates:

- Non-root application execution.
- Multi-stage image construction.
- Production-only runtime dependencies.
- Read-only container filesystem through Compose.
- Dropped Linux capabilities through Compose.
- No-new-privileges security option.
- Container health checks.

The production deployment environment should additionally provide appropriate network restrictions, resource limits, image provenance verification, and runtime monitoring.

---

## CI/CD Security Pipeline

GitHub Actions automates several security and quality checks.

The repository contains the following workflows:

| Workflow | Responsibility |
|---|---|
| `ci.yml` | Linting, tests, dependency auditing, SAST, secret scanning and dependency review |
| `codeql.yml` | Automated JavaScript code analysis |
| `container-security.yml` | Docker image vulnerability scanning |
| `sbom.yml` | SBOM generation and artifact upload |

### Pipeline Triggers

The workflows use the following triggers where configured:

- Pull requests.
- Pushes to the `main` branch.
- Scheduled CodeQL analysis.
- Published GitHub releases.
- Manual workflow execution.

### Repository-Level Security Configuration

For stronger enforcement, configure the following directly in GitHub repository settings:

- Branch protection or repository rulesets.
- Mandatory pull request reviews.
- Required CI status checks.
- CODEOWNERS approval.
- Secret scanning and push protection.
- Dependabot security alerts.
- Restricted GitHub Actions permissions.
- Protected deployment environments.

These controls require repository configuration and are not automatically enforced simply by adding workflow files.

---

## Software Bill of Materials (SBOM)

The repository includes an SBOM workflow using the Anchore SBOM Action.

It generates a CycloneDX JSON inventory of the project components and uploads it as a GitHub Actions artifact.

The SBOM provides visibility into:

- Software components.
- Dependency relationships.
- Third-party packages.
- Software supply chain inventory.

An SBOM is an inventory, not proof that the application or its dependencies are vulnerability-free.

---

## Security Considerations

This repository provides a reusable security foundation. It should not be interpreted as a complete production security implementation.

The following controls require additional project-specific work:

- Authentication and authorization.
- Database security and parameterized queries.
- Multi-tenant access control.
- CSRF protection where browser sessions are used.
- SSRF prevention for outbound HTTP integrations.
- Distributed rate limiting for horizontally scaled services.
- TLS and production ingress configuration.
- Cloud IAM and secrets management.
- Runtime security monitoring.

Review `docs/THREAT-MODEL.md` and `docs/SECURITY-CONTROLS.md` before adopting the starter in another application.

---

## Future Improvements

Potential extensions to the security engineering baseline:

- [ ] Integrate DAST using OWASP ZAP.
- [ ] Add API authentication and authorization examples.
- [ ] Integrate container image signing and verification.
- [ ] Add build provenance and artifact attestations.
- [ ] Add Terraform infrastructure security scanning.
- [ ] Introduce Kubernetes security policies.
- [ ] Integrate runtime application security monitoring.
- [ ] Add centralized security reporting and vulnerability SLAs.
- [ ] Automate security exception management.
- [ ] Introduce deployment gates and protected environments.
- [ ] Activate and enforce local Git pre-commit hooks.
- [ ] Add integration tests for rate limiting and CORS behavior.

---

## Contributing

Contributions and security improvements are welcome.

Before submitting a pull request:

1. Review the existing security controls.
2. Follow the established JavaScript conventions.
3. Add or update tests for application changes.
4. Run the available quality and security checks.
5. Document security implications.
6. Never commit secrets or sensitive information.

For vulnerability reporting, consult [SECURITY.md](SECURITY.md).

---

## License

Copyright (c) 2026 Jonkidera.

This project is distributed under the custom permission terms defined in [LICENSE](LICENSE).

Redistribution and modification are permitted subject to those conditions.

---

## Author

**Jonkidera**

Software Engineer | DevOps | DevSecOps | EdTech Tutor | Tech Mentor


