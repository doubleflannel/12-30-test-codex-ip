---
id: task-34
title: Commit backlog task deletions and add web-ref intake prompt doc
status: Done
assignee: []
created_date: '2026-01-02 13:08'
updated_date: '2026-01-02 13:08'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Prescriptive cleanup: stage and commit the already-intended deletions of the six backlog task files, keeping the commit small and scoped to backlog/task removals only. Use `./scripts/committer` for a single atomic commit; verify staged paths with `git --no-pager diff --cached --name-status` before committing.

Then add `docs/web-ref/web-ref-intake-prompt.md` to the repo as a separate docs commit (also via `./scripts/committer`). Keep untracked skill files untouched while we decide. How to test: `git status -s` shows the backlog deletions and the new doc staged/committed as intended; success looks like two Conventional Commit commits and no accidental staging of other files.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Commit backlog task deletions only (the six `backlog/tasks/task-11/14/15/16/20` paths) with `./scripts/committer`.
- [x] #2 Add and commit `docs/web-ref/web-ref-intake-prompt.md` as its own docs commit using `./scripts/committer`.
- [x] #3 `git status -s` shows no unintended staged files; remaining untracked items are just the `skills/*` directories (pending decision).
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Committed: `chore: remove backlog tasks` and `docs: add web ref intake prompt`. Remaining untracked: `skills/ask-details/`, `skills/screenshot-use/`.
<!-- SECTION:NOTES:END -->
