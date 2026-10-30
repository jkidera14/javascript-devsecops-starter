# Security incident response quick guide

This guide is a starting point. Align it with the organization's incident command, legal, privacy, and regulatory processes.

## 1. Triage

- Record detection time, reporter, affected service, environment, and observed indicators.
- Preserve relevant logs, workflow runs, image digests, and deployment metadata.
- Determine whether the issue is an active compromise, exposed credential, vulnerable dependency, or false positive.
- Assign an incident lead and track decisions in an access-controlled incident record.

## 2. Contain

- Revoke and rotate exposed credentials immediately; invalidate affected sessions/tokens.
- Disable compromised integrations or deployment credentials.
- Isolate affected workloads where safe to do so.
- Block malicious traffic at the edge / WAF while preserving evidence.
- Avoid destructive cleanup before evidence preservation unless required to stop active harm.

## 3. Eradicate and recover

- Patch vulnerable code or dependency and rebuild from a trusted commit.
- Rebuild images; do not reuse a potentially compromised image.
- Verify CI workflows, dependency changes, and artifact provenance.
- Restore from known-good backups if integrity is in doubt.
- Monitor closely after recovery.

## 4. Communicate

- Notify internal security, service owner, privacy/legal, and leadership according to policy.
- Determine contractual and statutory notification duties with qualified counsel / privacy officers.
- Do not speculate publicly or disclose personal data in incident channels.

## 5. Learn

- Write a blameless post-incident review.
- Identify root cause, contributing conditions, detection gaps, and control failures.
- Create owners and due dates for corrective actions.
- Update threat model, tests, runbooks, and security controls.
