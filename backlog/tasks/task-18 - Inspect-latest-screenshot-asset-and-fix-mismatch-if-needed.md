---
id: task-18
title: Inspect latest screenshot asset and fix mismatch if needed
status: To Do
assignee: []
created_date: '2026-01-01 14:40'
labels:
  - assets
  - screenshot
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Inspect the newest PNG under `/mnt/c/Users/vnkbr/Downloads` and visually verify it matches the intended landing page state; compare it against the current screenshot asset in repo (likely under `assets/`), note any mismatches (layout, copy, spacing, colors), and decide whether the repo asset needs replacement. Use the screenshot-use workflow and keep the change small and safe (same dimensions, no renames unless required), documenting any decision in notes if replacement is not needed.

If replacement is needed, swap in the verified PNG (same dimensions), ensure any references still resolve, and keep the update scoped to the single asset so review is easy. How to test: run `npm run lint` and `npm run build`, and run `./scripts/docs-list.ts` to confirm docs front-matter checks still pass; call out any blocked steps and why.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Task notes include the exact newest PNG filename from `/mnt/c/Users/vnkbr/Downloads` plus a one-line match/mismatch verdict.
- [ ] #2 If a replacement occurs, the repo asset is updated in-place (no duplicate files) and the new image dimensions match the old asset (record the dimension check output in notes).
- [ ] #3 Commands `npm run lint`, `npm run build`, and `./scripts/docs-list.ts` are executed with exit codes recorded (or explicit blockers noted).
<!-- AC:END -->
