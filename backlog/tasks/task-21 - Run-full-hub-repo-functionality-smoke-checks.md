---
id: task-21
title: Run full hub repo functionality smoke checks
status: In Progress
assignee: []
created_date: '2026-01-01 21:03'
updated_date: '2026-01-01 21:03'
labels:
  - smoke
  - tooling
  - hub
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Run a thorough, CLI-first smoke pass over the hub repo to confirm core tools still work after recent edits. Use the repo scripts directly from `/mnt/c/Users/vnkbr/Code/12-30-test-codex-ip`: `./scripts/docs-list.ts`, `./scripts/committer --help`, and `./scripts/trash-win --help`; for TS tools, try `./scripts/change-logger.ts --help` and `./scripts/browser-tools.ts --help` (or `npx tsx`/`ts-node` if required) and record the smallest missing prerequisite if they fail. Keep the scope to verification only; do not refactor or change behavior unless a fix-forward step is explicitly needed to make the smoke checks pass.

How to test: run each command and capture the first 1–3 lines of output plus exit code; if any command fails due to missing runtime (tsx/ts-node, puppeteer-core), note the exact error and the minimal next step. Success is that the hub tools can be executed from the CLI without path confusion, and any blockers are documented clearly so an agent can resolve them in one step.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `./scripts/docs-list.ts` exits 0 and prints the line `Listing all markdown files in docs folder:`; notes include a short output snippet.
- [ ] #2 `./scripts/committer --help` exits 0 and prints a usage/help line containing `committer` (record the exact line).
- [ ] #3 `./scripts/trash-win --help` exits 0 and prints a usage/help line; notes include the first line and exit code.
<!-- AC:END -->
