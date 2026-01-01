---
id: task-18
title: Inspect latest screenshot asset and fix mismatch if needed
status: Done
assignee: []
created_date: '2026-01-01 14:40'
updated_date: '2026-01-01 20:14'
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
- [x] #1 Task notes include the exact newest PNG filename from `/mnt/c/Users/vnkbr/Downloads` plus a one-line match/mismatch verdict.
- [x] #2 If a replacement occurs, the repo asset is updated in-place (no duplicate files) and the new image dimensions match the old asset (record the dimension check output in notes).
- [x] #3 Commands `npm run lint`, `npm run build`, and `./scripts/docs-list.ts` are executed with exit codes recorded (or explicit blockers noted).
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Newest PNG: `/mnt/c/Users/vnkbr/Downloads/Screenshot 2026-01-01 093819.png`. Verdict: mismatch (not a UI screenshot asset; shows PowerShell error output).

Repo check: no `*.png` assets in repo (`rg --files -g "*.png"` empty), so nothing to replace.

What looks wrong in screenshot: `npm run dev` fails with "'next' is not recognized" -> deps not installed or wrong repo. Also `curl -I http://localhost:3000` hits PowerShell alias; use `curl.exe -I http://localhost:3000` or `Invoke-WebRequest -Method Head -Uri http://localhost:3000`.

Tests/gate: not run yet; blockers = dependencies not installed in app repo; will run after install.

Latest PNG verified UI screenshot: `/mnt/c/Users/vnkbr/Downloads/Screenshot 2026-01-01 150033.png` (localhost page). No repo screenshot asset exists; skipping replacement per request.

Gate run (hub repo): `npm run lint` -> exit 127 (`next: not found`), `npm run build` -> exit 127 (`next: not found`), `./scripts/docs-list.ts` -> exit 0. Blocker: hub repo lacks Next deps; expected.
<!-- SECTION:NOTES:END -->
