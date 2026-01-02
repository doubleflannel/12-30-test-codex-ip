---
id: task-33
title: Stage and commit selected edits; clean untracked artifacts
status: Done
assignee: []
created_date: '2026-01-02 13:02'
updated_date: '2026-01-02 13:05'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Prescriptive clean-up and commit: stage and commit the user-approved changes only, keeping commits small and atomic (AGENTS.md alone; docs/web-ref changes together; scripts/browser-tools.ts + scripts/committer + scripts/trash-win together). Use the repo’s CLI-first flow, verify staged content with `git --no-pager diff --cached --name-status`, and avoid touching unrelated files. Remove untracked build/reference artifacts using `./scripts/trash-win` with absolute /mnt paths; keep `docs/web-ref/web-ref-intake-prompt.md` untracked for now.

How to test: run `git status -s` before and after to confirm only the intended files are staged/committed and the specified untracked paths are removed; success looks like three clean commits with Conventional Commit messages, the untracked artifacts gone, and no accidental staging of other files. Keep notes short; do not edit content beyond staging/committing and trashing files.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Create three commits: one for `AGENTS.MD`; one for `docs/web-ref` changes (including the move + deletion); one for `scripts/browser-tools.ts`, `scripts/committer`, `scripts/trash-win`.
- [x] #2 Remove `.next/` and `docs/web-ref/gitingest.com/` and `docs/web-ref/okm-lp-demo.zeabur.app/` via `./scripts/trash-win` with absolute /mnt paths; keep `docs/web-ref/web-ref-intake-prompt.md`.
- [x] #3 `git status -s` shows no unintended staged files; only remaining untracked items are those explicitly kept or pending decisions (e.g., `skills/ask-details/`, `skills/screenshot-use/`).
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Committed: `docs: update agent guidance`, `docs: update web ref intake kit`, `chore: harden helper scripts`. Removed untracked `.next/`, `docs/web-ref/gitingest.com/`, `docs/web-ref/okm-lp-demo.zeabur.app/` via `./scripts/trash-win` with absolute /mnt paths. Remaining untracked: `docs/web-ref/web-ref-intake-prompt.md`, `skills/ask-details/`, `skills/screenshot-use/`. Backlog task deletions still unstaged as intended.
<!-- SECTION:NOTES:END -->
