---
id: task-23
title: Remove Next.js scripts/deps and document static-site workflow
status: To Do
assignee: []
created_date: '2026-01-01 23:20'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Switch the repo to a static-only workflow so `npm run lint` and `npm run build` no longer fail from missing `app/` or `pages/`. Update `package.json` to remove Next/React dependencies and replace `lint`/`build` scripts with no-op, cross-platform commands that exit 0 and explain the static workflow. Keep the change small and reversible, and do not run installs; like turning off a disconnected appliance so the circuit stops tripping.

Update docs to match the behavior change: add a short `docs/static-site-workflow.md` note with front matter, CLI entrypoint, how to run, success looks like, and a quick check. Also update `README.md` to call out the static workflow and mention that lint/build are no-ops unless a framework is added back. If any stale build artifacts like `.next/` are present, leave them untouched unless explicitly asked; focus on config and docs so the repo stays clean and predictable.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `package.json` no longer lists `next`, `react`, `react-dom`, or `eslint-config-next`, and `npm run lint` / `npm run build` print a static-workflow message and exit 0.
- [ ] #2 `docs/static-site-workflow.md` exists with `summary` and `read_when` front matter plus sections `How to run`, `Success looks like`, and `Quick check`.
- [ ] #3 `README.md` mentions the static workflow and the no-op lint/build behavior.
<!-- AC:END -->
