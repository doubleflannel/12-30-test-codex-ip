---
id: task-15
title: Add short cross-link between hub repo and secondary repo
status: Done
assignee: []
created_date: '2026-01-01 13:48'
updated_date: '2026-01-01 20:10'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a short, explicit cross-link so anyone reading this hub repo can jump to the secondary repo, and vice versa; keep it to a few lines in each README (or a short doc note if you prefer) and make the wording unambiguous about which repo is the source of product code vs the workflow/docs hub. Include a brief rationale line so future contributors understand why the repos are split and where to do work.

How to test: open both README files and confirm the link text appears with the correct absolute path and URL; then run a quick `rg -n "cross-link" README.md` in each repo to verify the cross-link is discoverable from the CLI without browsing.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `README.md` in the hub repo contains a 2–4 line section that links to the secondary repo and states this repo is the workflow/docs hub.
- [x] #2 `README.md` in the secondary repo contains a 2–4 line section that links back to the hub repo and states product code lives there.
- [x] #3 A CLI check `rg -n "cross-link" README.md` run in each repo returns the new section lines (not just an existing mention).
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Edits: added cross-link sections in `README.md` (hub) and the secondary repo `README.md`.

CLI check (hub): `rg -n "cross-link" README.md` -> line 6 shows new section link.

CLI check (secondary): `rg -n "cross-link" README.md` -> line 12 shows new section line.
<!-- SECTION:NOTES:END -->
