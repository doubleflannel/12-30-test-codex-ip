---
id: task-30
title: Rename ask-questions skill to ask-details
status: Done
assignee: []
created_date: '2026-01-02 12:20'
updated_date: '2026-01-02 12:22'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Rename the existing ask-questions skill to the shorter name ask-details in both the repo and the local Codex skills directory so the trigger is concise but behavior stays the same. Update the skill folder name, SKILL.md frontmatter name, and any in-repo references found via `rg` to keep metadata and paths aligned; keep content intact except where the name must change. Use small, reversible CLI edits (`mv`, `rg`) and avoid touching unrelated untracked files noted in `git status`.

After the rename, ensure the local skill installation under `~/.codex/skills` is updated to match the new name so Codex picks it up on restart, and remove or move aside the old skill folder if it exists (use a move, not delete). Validate with a quick `rg` check for the new name and confirm no lingering `ask-questions-if-underspecified` references remain. Note how to run the verification and what success looks like (matched lines, exit code 0).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `skills/ask-details/SKILL.md` exists and the frontmatter name is exactly `ask-details` while the body remains otherwise unchanged.
- [x] #2 `rg -n "ask-questions-if-underspecified" skills docs` returns no matches after the rename.
- [x] #3 `~/.codex/skills/ask-details/SKILL.md` exists and `rg -n "name: ask-details" ~/.codex/skills/ask-details/SKILL.md` exits 0.
<!-- AC:END -->
