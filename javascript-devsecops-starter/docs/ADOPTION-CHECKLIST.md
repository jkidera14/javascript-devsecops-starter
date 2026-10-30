# Reuse / adoption checklist

Use this checklist for every project that adopts this starter.

## Before copying

- [ ] Identify application owner, data owner, and security contact.
- [ ] Classify data and identify compliance / contractual obligations.
- [ ] Draw architecture and trust-boundary diagram.
- [ ] Write abuse cases and threat model.
- [ ] Define supported Node.js version and update policy.

## Repository setup

- [ ] Copy security workflows, scanner configs, docs, and baseline middleware.
- [ ] Replace project name, ownership, CODEOWNERS, and contact details.
- [ ] Keep a committed lockfile and use `npm ci` in CI.
- [ ] Add `.env` and secret patterns to ignore rules.
- [ ] Configure branch protection, mandatory reviews, and required checks.
- [ ] Enable secret scanning, push protection, and Dependabot where available.
- [ ] Set GitHub Actions permissions to read-only by default.
- [ ] Pin third-party Actions to full commit SHAs for production-grade hardening.

## Application implementation

- [ ] Validate environment variables at startup; never print the full environment.
- [ ] Validate body, query, path, and header inputs at every endpoint.
- [ ] Use parameterized queries / safe ORM methods.
- [ ] Implement authentication with a maintained identity provider or library.
- [ ] Implement object-level authorization and tenant isolation.
- [ ] Apply least privilege to database and cloud identities.
- [ ] Set explicit CORS origins.
- [ ] Configure rate limits using a shared store for horizontally scaled deployments.
- [ ] Add timeouts, payload limits, and safe outbound HTTP / SSRF controls.
- [ ] Define secure cookie, CSRF, CSP, and session policies if browser sessions are used.
- [ ] Review logs for secrets, PII, and excessive detail.

## Build and release

- [ ] Build from a lockfile in a clean environment.
- [ ] Run lint, unit, integration, SAST, secret, and dependency checks.
- [ ] Scan the final image, not only the source tree.
- [ ] Generate and retain an SBOM for the release.
- [ ] Sign / attest artifacts where supported by the delivery platform.
- [ ] Use short-lived cloud credentials / OIDC.
- [ ] Deploy with non-root identity and minimum Linux capabilities.
- [ ] Configure TLS, ingress, network policies, resource limits, and runtime monitoring.
- [ ] Test rollback and incident-response procedures.

## After release

- [ ] Monitor dependency advisories and vulnerability findings.
- [ ] Patch within defined severity-based SLAs.
- [ ] Review privileged access and secrets periodically.
- [ ] Run DAST and authorized penetration tests for exposed services.
- [ ] Revisit threat model after material changes.
- [ ] Record exceptions with owner, rationale, mitigation, and expiry.
