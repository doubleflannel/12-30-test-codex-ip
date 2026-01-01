---
id: task-15
title: Add short cross-link between hub repo and app repo
status: To Do
assignee: []
created_date: '2026-01-01 13:48'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a short, explicit cross-link so anyone reading this hub repo can jump to the app repo, and vice versa; keep it to a few lines in each README (or a short doc note if you prefer) and make the wording unambiguous about which repo is the source of app code vs the workflow/docs hub. Include a brief rationale line so future contributors understand why the repos are split and where to do work.

How to test: open both README files and confirm the link text appears with the correct absolute path and GitHub URL; then run a quick `rg -n "dupe-lp-okm"` (or the final link label) in each repo to verify the cross-link is discoverable from the CLI without browsing.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `README.md` in `/mnt/c/Users/vnkbr/Code/12-30-test-codex-ip` contains a 2–4 line section that links to `https://github.com/doubleflannel/dupe-lp-okm` and states this repo is the workflow/docs hub.
- [ ] #2 `README.md` in `/mnt/c/Users/vnkbr/Code/dupe-lp-okm` contains a 2–4 line section that links back to `/mnt/c/Users/vnkbr/Code/12-30-test-codex-ip` (and optionally its GitHub URL if provided) and states app code lives here.
- [ ] #3 A CLI check `rg -n "dupe-lp-okm" README.md` run in each repo returns the new cross-link section lines (not just an existing mention).
<!-- AC:END -->
