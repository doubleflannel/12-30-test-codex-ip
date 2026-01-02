---
id: task-31
title: Trash stale handoff note in docs/tmp_handoff
status: To Do
assignee: []
created_date: '2026-01-02 12:29'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Prescriptive cleanup: move the stale `docs/tmp_handoff/handoff-01-02-07.md` into the Windows Recycle Bin using `./scripts/trash-win` so it is recoverable and we avoid raw deletes; keep blast radius tiny, avoid touching unrelated docs, and rely on CLI-first steps to confirm the file is gone from the working tree. Mention script use explicitly, keep the removal local to that path, and avoid any repo-wide search/replace or mass cleanup.

How to test: run `ls docs/tmp_handoff` or `./scripts/docs-list.ts` to confirm the file no longer appears; success looks like the file missing from the folder, `./scripts/trash-win` exit code 0, and `git status -s` showing the deletion. Keep notes short; no other docs updates unless behavior changes.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `./scripts/trash-win docs/tmp_handoff/handoff-01-02-07.md` exits 0 and the file lands in Trash (recoverable).
- [ ] #2 `ls docs/tmp_handoff` does not list `handoff-01-02-07.md` and `./scripts/docs-list.ts` no longer reports that path.
- [ ] #3 `git status -s` shows only the deletion of `docs/tmp_handoff/handoff-01-02-07.md` related to this task.
<!-- AC:END -->
