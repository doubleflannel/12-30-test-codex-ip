---
id: task-25
title: 'Web ref intake doc: add screenshot plan section + inputs/defaults'
status: To Do
assignee: []
created_date: '2026-01-02 11:26'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a new section in `docs/web-ref/web-ref-intake.md` titled `Screenshot plan (PNG)` that captures the flexible input surface for multi-URL runs. Document `--urls`, optional `--sitemap`, `--viewports` with default sizes, `--shots`, `--max-sections`, and `--component-selectors`, plus the default screenshot set (full, above-the-fold, nav, footer), the section shot heuristics (`main > section`, `section`, `[data-section]`, fallback), and component shots for buttons/cards/forms/hero. Include the optional state shots (hover/focus/dark mode) behind a `--states=on` toggle, and keep it concise and prescriptive; think of it like a camera shot list taped to a storyboard.

How to test: run `rg -n "Screenshot plan|--viewports|above-the-fold.png|section-01.png|components/" docs/web-ref/web-ref-intake.md` and confirm each string appears once in the new section. Keep changes limited to the doc (no script changes) and maintain ASCII-only text.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `docs/web-ref/web-ref-intake.md` includes a section heading `Screenshot plan (PNG)` followed by a list of required inputs that mention `--urls`, `--viewports`, and `--shots`.
- [ ] #2 The doc lists default screenshot filenames including `full.png`, `above-the-fold.png`, `nav.png`, and `footer.png`, plus section shots named `section-01.png`.
- [ ] #3 The doc includes a component shots subsection that names output paths under `components/` and mentions `--states=on` for hover/focus/dark mode.
<!-- AC:END -->
