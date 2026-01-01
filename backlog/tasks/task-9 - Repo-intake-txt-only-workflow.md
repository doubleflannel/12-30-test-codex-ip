---
id: task-9
title: 'Repo intake: txt-only workflow'
status: To Do
assignee: []
created_date: '2026-01-01 00:15'
updated_date: '2026-01-01 00:16'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Before editing docs/repo-intake.md, read AGENTS.md and skim CHANGELOG.md, then search Backlog tasks to avoid duplicates. Rewrite the doc so it assumes a .txt-only repo dump: remove CLI entrypoint, CLI steps, and any wording about attached repos, files, or non-text inputs, and replace them with explicit .txt-only instructions that tell the AI to extract signals, flow, intricacies, and targeted follow-up questions from text alone. Keep the document prescriptive and easy to scan, and keep tools limited to rg and ./scripts/docs-list.ts for verification (no new skills/scripts unless required).

How to test: run ./scripts/docs-list.ts and confirm repo-intake.md is listed with the same summary; run rg -n "Directive|Text-only|Output format|How to test/verify" docs/repo-intake.md to confirm those headings exist; run rg -n "CLI entrypoint|How to run" docs/repo-intake.md and confirm it returns no matches.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 How to test/verify references only ./scripts/docs-list.ts and rg, and includes the repo-intake.md listing check.
<!-- AC:END -->
