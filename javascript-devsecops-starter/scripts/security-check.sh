#!/usr/bin/env bash
set -euo pipefail

echo '[1/4] Dependency audit'
npm audit --audit-level=high

echo '[2/4] Secret scan'
if command -v gitleaks >/dev/null 2>&1; then
  gitleaks detect --source . --no-banner
else
  echo 'SKIP: gitleaks is not installed. Install it before treating this as a complete security check.'
fi

echo '[3/4] SAST'
if command -v semgrep >/dev/null 2>&1; then
  semgrep scan --config p/javascript --error .
else
  echo 'SKIP: semgrep is not installed. Install it before treating this as a complete security check.'
fi

echo '[4/4] Application checks'
npm run check

echo 'Local security checks completed. Review all scanner output; a green run is not proof of security.'
