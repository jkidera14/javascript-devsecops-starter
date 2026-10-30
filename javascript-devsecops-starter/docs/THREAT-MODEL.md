# Threat model

Use this as a starting point. Revisit it whenever the system, data, deployment topology, or trust boundaries change.

## System and assets

- HTTP API process and runtime configuration.
- User-submitted request data.
- Environment configuration and credentials supplied by the deployment platform.
- Dependency graph, build pipeline, container image, and release artifacts.
- Operational logs and security findings.

## Trust boundaries

1. Internet/client to reverse proxy or load balancer.
2. Proxy to Node.js service.
3. Application to databases, queues, object storage, and third-party APIs (not included in this demo).
4. Developer workstation to Git repository.
5. GitHub Actions runner to package registries and artifact storage.
6. Build artifact to container registry and production runtime.

## Threat scenarios and controls

| Threat | Example | Starter controls | Project-specific work |
|---|---|---|---|
| Injection / malformed input | Unexpected fields or oversized JSON | Zod strict schema, body limit | Parameterized DB access; validate every route |
| Credential exposure | Token committed to Git | Ignore rules, Gitleaks | Secret manager, rotation, push protection |
| Dependency compromise | Malicious or vulnerable npm package | Audit, Dependabot, SBOM | Lockfile review, provenance, allowlist policy |
| API abuse | Request flood | Rate limiting | Shared rate-limit store, WAF, quotas, bot controls |
| Information disclosure | Stack trace returned to caller | Generic error responses | PII classification and log review |
| Supply-chain tampering | Compromised CI action | Scoped permissions | Pin actions by SHA, attest artifacts, isolate runners |
| Container escape / privilege abuse | App runs as root | Non-root, dropped caps in Compose | Runtime seccomp/AppArmor, admission policy |
| Unauthorized access | User accesses another tenant's record | Not implemented | Authentication, authorization, tenant isolation tests |
| SSRF | User-controlled URL fetched server-side | Not implemented | Egress restrictions, URL/IP validation, allowlists |
| XSS / CSRF | Browser session misuse | Helmet baseline | Contextual output encoding, CSP, CSRF design |

## Data classification

Before adding real data, document:
- Public data.
- Internal operational data.
- Personal data / PII.
- Authentication secrets and cryptographic material.
- Regulated or contractually restricted data.

Do not log passwords, access tokens, session cookies, full payment details, private keys, or sensitive request bodies.

## Security assumptions

- The service is deployed behind a correctly configured TLS-terminating ingress or load balancer.
- The proxy trust setting remains disabled unless the exact trusted proxy topology is configured.
- Production secrets are injected by a secret manager, not committed or baked into the image.
- The demo API does not implement authentication, authorization, persistence, or business-critical workflows.
