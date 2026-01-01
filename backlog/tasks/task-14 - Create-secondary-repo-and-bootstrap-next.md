---
id: task-14
title: Create secondary repo and bootstrap Next.js dev
status: Done
assignee:
  - codex
created_date: '2026-01-01 01:40'
updated_date: '2026-01-01 13:40'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a new secondary repo, initialize git, set an HTTPS remote, and initialize a separate Backlog.md tracker inside the secondary repo so work is tracked locally for that codebase.

Add a minimal Next.js App Router scaffold with npm scripts and dependencies so `npm run dev` can start a local server; include a short README section describing how to run and what success looks like; keep files small and readable; testing is running `npm run dev` and capturing the local URL or the exact blocker if the filesystem install fails.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Secondary repo exists, is a git repo with `origin` set to the HTTPS remote, and has its own Backlog.md initialized.
- [x] #2 `package.json` in the secondary repo includes scripts for `dev`, `build`, `start`, and `lint` plus `next`, `react`, and `react-dom` dependencies; minimal `app/layout.tsx` and `app/page.tsx` exist.
- [x] #3 `README.md` in the secondary repo documents `npm run dev`, expected local URL output, and a simple success check; `npm run dev` output (success URL or blocker) is recorded in task notes.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1) Create secondary repo directory, git init, set origin remote.
2) Initialize Backlog.md in the new repo.
3) Create package.json with scripts and dependencies (npm).
4) Add minimal App Router scaffold (app/layout.tsx, app/page.tsx).
5) Add README dev instructions.
6) Install deps and attempt npm run dev; record output or blocker.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Docs list: ./scripts/docs-list.ts (repo-ref/repo-ref-lp-okm.md flagged missing front matter).

Updated scripts via npm pkg set: dev/build/start/lint.

npm install attempt (no progress) was interrupted (hung).

npm install with loglevel=info failed: ENOTEMPTY rename at node_modules/baseline-browser-mapping -> node_modules/.baseline-browser-mapping-<tmp>; log: /home/vnkbr/.npm/_logs/2026-01-01T01_47_56_936Z-debug-0.log.

Blocker: likely stale node_modules; need permission to trash node_modules and re-run install.

User approved trashing node_modules; ran ./scripts/trash-win and reinstalled deps.

npm install next/react/react-dom completed with lockfile warning: "invalid or damaged lockfile detected" (added 22 packages).

Multiple npm install attempts for dev deps hung or ended with ENOTEMPTY rename errors; npm ls next shows invalid next installation.

Current state: node_modules exists; npm ls next reports invalid; install likely incomplete on /mnt/c filesystem.

Created secondary repo at target path, initialized git, renamed branch to main, set origin to the HTTPS remote.

Initialized Backlog.md in secondary repo (backlog/ created; MCP configured for OpenAI Codex).

Installed deps: next@16.1.1, react@19.2.3, react-dom@19.2.3; dev deps: typescript@5.9.3, @types/react@19.2.7, @types/react-dom@19.2.3, @types/node@25.0.3, eslint@9.39.2, eslint-config-next@16.1.1.

Created app scaffold: app/layout.tsx and app/page.tsx.

README.md includes npm run dev instructions and success check.

npm run dev output: "Next.js 16.1.1 (Turbopack)" with Local http://localhost:3000, then "Starting..." (stopped after confirming URL).
<!-- SECTION:NOTES:END -->
