---
id: task-26
title: 'Web ref intake doc: add rebuild kit extraction details + success tests'
status: To Do
assignee: []
created_date: '2026-01-02 11:26'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Extend `docs/web-ref/web-ref-intake.md` with a `Rebuild Kit extraction` section that explains how to collect `dom.html` (rendered), `styles/` (linked CSS, inline.css, optional cssom.css + meta), `assets.json` (images/fonts/video/scripts/links schema), and `tokens.json` (typography/colors/radius/shadow/spacing + button states). Add the folder layout tree for `docs/web-ref/<sanitized-url>/` including `screenshots/<viewport>/` and components, and include guidance on optional `--download-assets`. Keep language prescriptive, ASCII-only, and aligned to the tool outputs, like a labeled parts bin.

How to test: run `rg -n "styles/|assets.json|tokens.json|Folder layout|Success tests" docs/web-ref/web-ref-intake.md` and verify each heading and schema snippet appears. Also run `./scripts/docs-list.ts` to ensure the doc lists properly after the additions; no script changes in this task.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `docs/web-ref/web-ref-intake.md` contains a folder layout block that includes `dom.html`, `page-dump.json`, `styles/inline.css`, `assets.json`, `tokens.json`, and `screenshots/desktop/full.png`.
- [ ] #2 The doc includes a JSON schema snippet for `assets.json` with top-level keys `images`, `fonts`, `video`, `audio`, `scripts`, and `links`.
- [ ] #3 The doc includes a `Success tests` section that lists at least five checks, including `dom.html` size, `screenshots/desktop/full.png` size, and `styles/linked-*.css` count when `cssLinks` exist.
<!-- AC:END -->
