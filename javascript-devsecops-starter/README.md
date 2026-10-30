# JavaScript DevSecOps Starter

A reusable security baseline for JavaScript / Node.js services. Copy this repository's controls into new projects, adapt the policy to the risk of the application, and keep security checks in the normal developer workflow.

**Owner:** Jonkidera  
**Primary stack:** JavaScript, Node.js, Express  
**Runtime target:** Node.js 22 LTS

## What this repository gives you

- Secure-by-default Express API skeleton with environment validation, security headers, rate limiting, input validation, request IDs, safe errors, and structured logging.
- Unit/integration tests and linting.
- Git hooks for fast local checks.
- GitHub Actions CI with tests, dependency audit, secret scanning, SAST, container scanning, and CodeQL.
- Docker multi-stage build running as a non-root user.
- SBOM generation with Syft.
- Dependabot, CODEOWNERS, security policy, threat model, incident response notes, and adoption checklist.

> This is a starter baseline, not a certification or guarantee that an application is secure. Threat-model each project, pin and review dependencies, configure repository protections, and test the deployed system.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

API:
- `GET /health/live`
- `GET /health/ready`
- `POST /api/v1/echo` — demonstration endpoint with schema validation

Run checks:

```bash
npm run check
npm run test:coverage
npm audit --audit-level=high
```

Build and run the container:

```bash
docker build -t js-devsecops-starter .
docker run --rm -p 3000:3000 --env-file .env js-devsecops-starter
```

## Repository structure

```text
.
├── .github/
│   ├── CODEOWNERS
│   ├── dependabot.yml
│   └── workflows/
│       ├── ci.yml
│       ├── codeql.yml
│       ├── container-security.yml
│       └── sbom.yml
├── .husky/pre-commit
├── docs/
│   ├── ADOPTION-CHECKLIST.md
│   ├── INCIDENT-RESPONSE.md
│   ├── SECURITY-CONTROLS.md
│   └── THREAT-MODEL.md
├── scripts/
│   └── security-check.sh
├── src/
│   ├── app.js
│   ├── config/env.js
│   ├── middleware/error-handler.js
│   ├── middleware/request-id.js
│   ├── routes/health.js
│   ├── routes/v1.js
│   └── server.js
├── tests/
├── .dockerignore
├── .env.example
├── .gitleaks.toml
├── .gitignore
├── .npmrc
├── Dockerfile
├── eslint.config.js
├── LICENSE
├── package.json
└── ...
```

## Security workflow

1. **Prevent:** secure coding conventions, validated configuration, input schemas, least privilege, protected branches, review ownership.
2. **Detect:** Gitleaks, ESLint security rules, Semgrep, npm audit, CodeQL, Trivy.
3. **Verify:** automated tests, coverage, dependency review, image scan, SBOM.
4. **Respond:** documented triage, credential rotation, patching, evidence preservation.
5. **Improve:** track findings, tune false positives transparently, review controls at each release.

## Copying this starter into another project

Use `docs/ADOPTION-CHECKLIST.md`. Do not blindly copy secrets, `.env`, generated artifacts, or this demo endpoint. Replace the example routes, data model, authentication, authorization, and CORS policy with project-specific implementations.

## Important operational notes

- Do not commit `.env`, credentials, private keys, tokens, production dumps, or certificates.
- Git hooks are convenience controls and can be bypassed. Enforce equivalent checks in CI.
- `npm audit` reports known advisories; review reachability, exploitability, and remediation before accepting risk.
- Container scanning and SBOM generation run in CI. Review findings and retain the SBOM as a release artifact.
- Set GitHub branch protection / rulesets in repository settings; workflow files cannot enforce those settings by themselves.
- Use short-lived CI credentials and OIDC for cloud deployment. Do not store long-lived cloud keys in repository secrets where OIDC is available.
- The included CORS origin is an example. Set `CORS_ORIGIN` to the exact trusted frontend origin(s), not `*` for authenticated production APIs.

## Suggested learning sequence

1. Run the API and tests; inspect each middleware.
2. Trigger validation failures and observe safe error responses.
3. Add a deliberately vulnerable test branch (never deploy it) and see which scanners detect it.
4. Add a dependency and review its provenance, license, advisories, and transitive dependencies.
5. Build the image, inspect the user and filesystem permissions, then scan it.
6. Review the generated SBOM and connect a finding to a remediation PR.
7. Add authentication and authorization only after defining the threat model and access-control model.

## License

See `LICENSE`. Redistribution is permitted under the conditions stated there.
