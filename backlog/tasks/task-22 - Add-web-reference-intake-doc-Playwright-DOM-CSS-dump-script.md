---
id: task-22
title: Add web reference intake doc + Playwright DOM/CSS dump script
status: In Progress
assignee: []
created_date: '2026-01-01 23:12'
updated_date: '2026-01-01 23:16'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create `docs/web-ref/web-ref-intake.md` with proper front matter (`summary`, `read_when`) and a concise, prescriptive workflow for web-reference intake. Include the requested "The actually-reliable way" section that instructs rendering a page in Playwright and dumping rendered DOM + stylesheet links + inline styles, plus an optional computed-styles note. The doc must be CLI-first: show the entrypoint command, how to run, what success looks like, and a quick check; keep it scan-friendly and ASCII, with a short analogy for non-programmers.

Implement a CLI script `scripts/web-ref-intake.ts` that takes a URL and writes a JSON dump using Playwright Chromium (visit with `networkidle`). Output must include `url`, `html`, `cssLinks`, and `inlineStyles`, and optionally `computedStyles` when selectors are provided (cap samples to avoid huge output). Provide `--out`, `--selectors`, and `--max-nodes` flags; print usage and exit non-zero on error. Add a small README bullet referencing the script and add `playwright` as a devDependency; do not run installs. Test by running `./scripts/docs-list.ts` and `npx ts-node --project tsconfig.scripts.json scripts/web-ref-intake.ts https://example.com --out tmp/page-dump.json` to verify the JSON keys.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `./scripts/docs-list.ts` lists `docs/web-ref/web-ref-intake.md`, and the doc includes sections `The actually-reliable way`, `How to run`, `Success looks like`, and `Quick check`.
- [ ] #2 Running `npx ts-node --project tsconfig.scripts.json scripts/web-ref-intake.ts https://example.com --out tmp/page-dump.json` creates `tmp/page-dump.json` containing JSON keys `url`, `html`, `cssLinks`, and `inlineStyles`.
- [ ] #3 `README.md` adds a bullet that mentions `scripts/web-ref-intake.ts` and notes the Playwright dependency or install step.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Progress: added docs/web-ref/web-ref-intake.md with Playwright section + example, added scripts/web-ref-intake.ts, updated README.md, added playwright devDependency.

Checks: ./scripts/docs-list.ts now lists web-ref/web-ref-intake.md.

Next: run web-ref-intake script after npm install + playwright install to confirm JSON output keys.
<!-- SECTION:NOTES:END -->
