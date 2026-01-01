---
id: task-4
title: Add repo architecture intake doc with CLI verification
status: To Do
assignee: []
created_date: '2025-12-31 22:32'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a single repo intake document under `docs/` that tells someone how to ingest a repository and check its architecture in a CLI-first, non-programmer-friendly way, following AGENTS.md requirements (include a clear entrypoint command, “how to run,” what success looks like, and a quick check). Keep the guidance prescriptive and concise, aligned to our toolchain (use commands like `./scripts/docs-list.ts`, `rg`, and `git status -sb` for discovery/verification) and call out any skill or script usage only if it is actually needed.

Include a short “how to test/verify” section in the doc that uses the AGENTS.md-approved tools to confirm the file is present and readable (e.g., docs list includes the file, key headings are discoverable via `rg`, and the CLI steps run without errors). The doc must include required front matter (summary + read_when) and be easy to scan, with a minimal checklist for capturing architecture signals and expected outputs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A new file exists at `docs/architecture-intake.md` with front matter that includes a single-line `summary` and a `read_when` tag `architecture`.
- [ ] #2 The doc includes explicit sections for “CLI entrypoint,” “How to run,” “Success looks like,” and “Quick check,” each containing concrete commands aligned to AGENTS.md tools.
- [ ] #3 The doc includes a “How to test/verify” section that explicitly uses `./scripts/docs-list.ts` and `rg` to validate the doc is discoverable and the key headings are present.
<!-- AC:END -->
