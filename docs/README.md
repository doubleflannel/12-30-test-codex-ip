---
summary: How we structure docs and expectations for contributors.
read_when: onboarding
---

# Docs workflow
- All docs live under `docs/`.
- Every doc must start with front matter including `summary` (single line) and `read_when` (trigger tag like `ui`, `release`, `auth`).
- Run `./scripts/docs-list.ts` at the start of each session to see what's relevant.
- Keep docs concise and actionable; prefer checklists over prose where possible.

# Adding a new doc
1. Create `docs/<topic>.md` with front matter.
2. Use a `read_when` trigger agents can match to workflows (e.g., `landing`, `deploy`, `copy`).
3. Keep summaries short; the listing script truncates to one line.
