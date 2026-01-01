---
id: task-14
title: Add Next.js dev scripts and minimal app scaffold for local boot
status: To Do
assignee: []
created_date: '2026-01-01 01:40'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a minimal, runnable Next.js App Router scaffold and the npm scripts/dependencies needed to start a dev server in this repo; keep the scope to the repo root only, use npm as confirmed by the lockfile, and make the files small and readable so future work can extend them without a rewrite.

How to test: run `npm run dev` and confirm a local URL is printed and loads a basic page; if you add or change any docs describing the workflow, run `./scripts/docs-list.ts` and ensure the new doc shows up so the workflow stays discoverable and CLI-first.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `package.json` includes scripts for `dev`, `build`, `start`, and `lint`, and includes `next`, `react`, and `react-dom` in dependencies with explicit versions.
- [ ] #2 Minimal App Router scaffold exists at `app/layout.tsx` and `app/page.tsx`, and `npm run dev` prints a local URL without immediate runtime errors.
- [ ] #3 A short doc note exists (or README update) describing the dev command and expected output, and `./scripts/docs-list.ts` lists the doc file if added.
<!-- AC:END -->
