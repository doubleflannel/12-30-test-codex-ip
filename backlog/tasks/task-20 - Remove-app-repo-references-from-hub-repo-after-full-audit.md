---
id: task-20
title: Remove app repo references from hub repo after full audit
status: In Progress
assignee: []
created_date: '2026-01-01 20:29'
updated_date: '2026-01-01 20:33'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Do a thorough audit of the hub repo to remove all app-repo-related references so this repo stands alone without `dupe-lp-okm` links, paths, or guidance. Use CLI-first checks (`rg -n` across the repo) to find mentions of the app repo name, absolute path, and GitHub URL, then remove or rewrite those sections so they no longer point to the app repo. Keep edits small and focused; if a note must exist elsewhere, move it to the app repo instead of keeping it here.

How to test: run `rg -n "dupe-lp-okm|app repo|/mnt/c/Users/vnkbr/Code/dupe-lp-okm|doubleflannel/dupe-lp-okm" .` in the hub repo and confirm zero matches; then run `./scripts/docs-list.ts` to ensure docs front matter remains valid. Record any remaining references you intentionally kept (if any) with justification, but default expectation is none.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `rg -n "dupe-lp-okm|app repo|/mnt/c/Users/vnkbr/Code/dupe-lp-okm|doubleflannel/dupe-lp-okm" .` returns no matches in `/mnt/c/Users/vnkbr/Code/12-30-test-codex-ip`.
- [ ] #2 `README.md` and `AGENTS.MD` in the hub repo contain zero app-repo references (no app repo path, name, or GitHub URL).
- [ ] #3 `./scripts/docs-list.ts` exits 0 after changes; no new missing front matter warnings introduced.
<!-- AC:END -->
