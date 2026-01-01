---
id: task-6
title: Add repo architecture intake doc with CLI verification
status: To Do
assignee: []
created_date: '2025-12-31 22:33'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a single repo intake document under docs/ that tells someone how to ingest a repository and check its architecture in a CLI-first, non-programmer-friendly way, following AGENTS.md requirements: include a clear entrypoint command, how to run, what success looks like, and a quick check. Keep guidance prescriptive and concise, aligned to our toolchain; use scripts/docs-list.ts, rg, and git status -sb for discovery/verification; mention any extra skills or scripts only if actually needed.

Include a short how-to-test/verify section in the doc that uses AGENTS.md-approved tools to confirm the file is present and readable (docs list includes the file, key headings are discoverable via rg, and the CLI steps run without errors). The doc must include required front matter (summary + read_when) and be easy to scan, with a minimal checklist for capturing architecture signals and expected outputs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 New file at docs/architecture-intake.md with front matter: summary (single line) and read_when tag architecture.
- [ ] #2 Doc includes sections titled: CLI entrypoint, How to run, Success looks like, Quick check; each section has concrete commands aligned to AGENTS.md tools.
- [ ] #3 Doc includes a How to test/verify section that explicitly uses ./scripts/docs-list.ts and rg to validate the doc is discoverable and the key headings exist.
<!-- AC:END -->
