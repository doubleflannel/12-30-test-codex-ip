---
id: task-20
title: Remove secondary repo references from hub repo after full audit
status: Done
assignee: []
created_date: '2026-01-01 20:29'
updated_date: '2026-01-01 20:52'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Do a thorough audit of the hub repo to remove all secondary-repo-related references so this repo stands alone without external links, paths, or guidance. Use CLI-first checks (`rg -n` across the repo) to find mentions of the secondary repo name, absolute path, and GitHub URL, then remove or rewrite those sections so they no longer point to that repo. Keep edits small and focused; if a note must exist elsewhere, move it to the secondary repo instead of keeping it here.

How to test: run `rg -n "<secondary-repo-identifiers>" .` in the hub repo and confirm zero matches; then run `./scripts/docs-list.ts` to ensure docs front matter remains valid. Record any remaining references you intentionally kept (if any) with justification, but default expectation is none.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `rg -n "<secondary-repo-identifiers>" .` returns no matches in `/mnt/c/Users/vnkbr/Code/12-30-test-codex-ip`.
- [x] #2 `README.md` and `AGENTS.MD` in the hub repo contain zero secondary-repo references (no path, name, or GitHub URL).
- [x] #3 `./scripts/docs-list.ts` exits 0 after changes; no new missing front matter warnings introduced.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Audit changes: removed cross-link section from `README.md`; sanitized `docs/tmp_handoff/handoff-01-01-09.md` and `docs/repo-ref/repo-ref-lp-okm.md`; updated task-18 note to avoid secondary-repo wording; re-created tasks 14–16 with neutral filenames/content to remove secondary-repo identifiers from hub repo.

CLI check: `rg -n <secondary-repo-identifiers> .` returned no matches (exit 1).

Docs check: `./scripts/docs-list.ts` exit 0; no missing front matter warnings.
<!-- SECTION:NOTES:END -->
