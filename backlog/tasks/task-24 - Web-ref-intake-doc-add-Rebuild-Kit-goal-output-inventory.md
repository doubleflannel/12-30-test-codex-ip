---
id: task-24
title: 'Web ref intake doc: add Rebuild Kit goal + output inventory'
status: Done
assignee: []
created_date: '2026-01-02 11:26'
updated_date: '2026-01-02 11:28'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update `docs/web-ref/web-ref-intake.md` to reframe the workflow as a Rebuild Kit generator, with a clear Goal section and an explicit output inventory that matches the current script behavior and desired future outputs (dom.html, page-dump.json, styles/, assets.json, tokens.json, screenshots/). Add a short paragraph that explains the page-dump.json role and the new pointer fields (paths, sections, components) so the kit is navigable, and keep the doc CLI-first with the entrypoint and default output path under `docs/web-ref/<url>/` stated up front; keep wording ASCII and scan-friendly.

How to test: run `./scripts/docs-list.ts` to confirm the doc still lists cleanly and then use `rg -n` to verify the new Goal and output inventory sections are present. Make the language prescriptive (step-by-step), include a short non-technical analogy, and do not change scripts or code in this task; only doc edits in `docs/web-ref/web-ref-intake.md`.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `./scripts/docs-list.ts` lists `docs/web-ref/web-ref-intake.md` and the summary line still renders in the docs list output.
- [x] #2 `docs/web-ref/web-ref-intake.md` contains an explicit output inventory list that includes the exact strings `dom.html`, `page-dump.json`, `styles/`, `assets.json`, `tokens.json`, and `screenshots/`.
- [x] #3 `docs/web-ref/web-ref-intake.md` contains a dedicated page-dump pointer paragraph mentioning `paths`, `sections`, and `components` as keys.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Updates: rewrote docs/web-ref/web-ref-intake.md with Goal + output inventory and page-dump pointer paragraph (paths/sections/components).

Checks: ./scripts/docs-list.ts; rg -n "dom.html|page-dump.json|styles/|assets.json|tokens.json|screenshots/|paths|sections|components" docs/web-ref/web-ref-intake.md.
<!-- SECTION:NOTES:END -->
