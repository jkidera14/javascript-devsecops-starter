# Security controls and verification map

| Control | Implementation | Verification | Important limitation |
|---|---|---|---|
| Secret prevention | `.gitignore`, Gitleaks, pre-commit guidance | Gitleaks local + CI | Rotate any exposed credential; deleting a file does not remove Git history |
| Dependency hygiene | Dependabot, `npm audit`, dependency review | CI and weekly PRs | Audit findings require triage; do not blindly force upgrades |
| SAST | ESLint security plugin, Semgrep, CodeQL | CI / scheduled scan | Static analysis has false positives and false negatives |
| Input validation | Zod strict schema, body size limit | Vitest + Supertest | Validate every trust boundary, including query/path/header values |
| HTTP hardening | Helmet, no `X-Powered-By`, no-store | Integration tests | Tune CSP and other headers for the real frontend |
| Abuse resistance | Express rate limit | Integration / load tests | Use a shared store behind multiple replicas; in-memory limits are per process |
| Error handling | Generic client errors, structured server logs | Integration tests | Ensure log access and retention are controlled |
| Logging | Pino redaction and restricted serializers | Inspect test logs | Review all added log fields for PII and secrets |
| Container | Multi-stage build, non-root user, read-only Compose, dropped caps | Docker inspection + Trivy | Production orchestrator policies must also be configured |
| SBOM | Syft / Anchore action, CycloneDX | Release artifact review | SBOM is an inventory, not a vulnerability verdict |
| CI permissions | Read-only defaults, job-scoped elevated permissions | Workflow review | Pin third-party actions to full commit SHAs for hardened production pipelines |
| Ownership | CODEOWNERS | PR review | Configure branch rules / rulesets in GitHub settings |

## Minimum GitHub repository settings

Configure these manually:

- Protect `main` with a ruleset.
- Require pull requests and at least one independent approval.
- Require status checks from CI, CodeQL, and security jobs.
- Require CODEOWNERS review for sensitive paths.
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution.
- Restrict force pushes and deletion.
- Enable secret scanning and push protection where available.
- Enable Dependabot alerts and security updates.
- Restrict GitHub Actions to approved actions and reusable workflows.
- Set workflow token default permissions to read-only.
- Protect production environments and require approvals for deployment.

## Release gate recommendation

Do not deploy if any of the following is true without a documented, approved exception:

- Confirmed leaked credential or private key.
- Unresolved critical vulnerability affecting the shipped artifact.
- High-severity vulnerability with a viable exploit path and no mitigation.
- Failing tests, failed security workflow, or missing required review.
- Missing SBOM or provenance evidence where required by policy.

Exceptions need an owner, rationale, compensating control, expiry date, and tracking issue.
