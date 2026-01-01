---
id: task-5
title: Add repo architecture intake doc with CLI verification
status: Done
assignee:
  - codex
created_date: '2025-12-31 22:32'
updated_date: '2025-12-31 23:46'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a single repo intake document under `docs/` that tells someone how to ingest a repository and check its architecture in a CLI-first, non-programmer-friendly way, following AGENTS.md requirements (include a clear entrypoint command, "how to run", what success looks like, and a quick check). Keep the guidance prescriptive and concise, aligned to our toolchain (use commands like `./scripts/docs-list.ts`, `rg`, and `git status -sb` for discovery/verification) and call out any skill or script usage only if it is actually needed.

Include a short how-to-test/verify section in the doc that uses the AGENTS.md-approved tools to confirm the file is present and readable (e.g., docs list includes the file, key headings are discoverable via `rg`, and the CLI steps run without errors). The doc must include required front matter (summary + read_when) and be easy to scan, with a minimal checklist for capturing architecture signals and expected outputs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A new file exists at `docs/architecture-intake.md` with front matter that includes a single-line `summary` and a `read_when` tag `architecture`.
- [x] #2 The doc includes explicit sections for CLI entrypoint, how to run, success looks like, and quick check, each containing concrete commands aligned to AGENTS.md tools.
- [x] #3 The doc includes a how-to-test/verify section that explicitly uses `./scripts/docs-list.ts` and `rg` to validate the doc is discoverable and the key headings are present.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
- Create `docs/architecture-intake.md` with required front matter (summary + read_when: architecture) and scan-friendly structure.
- Add explicit sections: CLI entrypoint, How to run, Success looks like, Quick check, and How to test/verify, each with concrete commands using repo-approved tools (`./scripts/docs-list.ts`, `rg`, `git status -sb`).
- Write a prescriptive, copy-paste intake flow that extracts architecture signals (runtime, entrypoints, build/test, data stores, integrations) and ends with a short list of follow-up questions for user verification.
- Run quick verification commands (docs list + rg headings) to confirm discoverability; update task acceptance criteria.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Created docs/architecture-intake.md with required front matter and sections; added CLI-first intake steps, checklist, follow-up questions, and how-to-test/verify commands.

Created docs/architecture-intake.md with required front matter and sections; added CLI-first intake steps, checklist, follow-up questions, and how-to-test/verify commands.

Verified docs list + rg headings.
<!-- SECTION:NOTES:END -->
