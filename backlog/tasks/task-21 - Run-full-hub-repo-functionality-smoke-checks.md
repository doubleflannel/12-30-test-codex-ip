---
id: task-21
title: Run full hub repo functionality smoke checks
status: Done
assignee: []
created_date: '2026-01-01 21:03'
updated_date: '2026-01-01 21:50'
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
- [x] #1 `./scripts/docs-list.ts` exits 0 and prints the line `Listing all markdown files in docs folder:`; notes include a short output snippet.
- [x] #2 `./scripts/committer --help` exits 0 and prints a usage/help line containing `committer` (record the exact line).
- [x] #3 `./scripts/trash-win --help` exits 0 and prints a usage/help line; notes include the first line and exit code.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
`./scripts/docs-list.ts` -> exit 0; first line: "Listing all markdown files in docs folder:".

`./scripts/committer --help` -> exit 0; line: "Usage: committer [--force] \"commit message\" \"file\" [\"file\" ...]".

`./scripts/trash-win --help` -> exit 1; output: "trash-win: path must be under /mnt/<drive> for Windows Recycle Bin: --help" (script does not implement --help).

`./scripts/trash-win /mnt/c/Users/vnkbr/Code/12-30-test-codex-ip/tmp/trash-win-smoke.txt` -> exit 0; file moved to Recycle Bin (ls no longer shows it).

`./scripts/change-logger.ts --help` -> exit 0; line: "Usage: change-logger [--staged] [--range <rev>] [--title <text>] [--help]".

`./scripts/browser-tools.ts --help` -> exit 127; error: "/usr/bin/env: ‘ts-node’: No such file or directory". Minimal fix-forward: install ts-node or run via `npx tsx` if preferred.

After changes: `./scripts/trash-win --help` -> exit 0; output: "Usage: trash-win <path>...".

Installed `ts-node` and `puppeteer-core` in hub repo via PowerShell `npm install --save-dev ...` to avoid /mnt/c rename issues.

`npx ts-node --project tsconfig.scripts.json scripts/browser-tools.ts --help` -> exit 0; usage output printed.

Re-check: `./scripts/browser-tools.ts --help` now exits 0 and prints usage (after tsconfig update + deps installed).

Re-check: `./scripts/trash-win --help` exits 0 with usage line after help handling added.
<!-- SECTION:NOTES:END -->
