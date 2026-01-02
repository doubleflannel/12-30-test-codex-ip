---
id: task-29
title: Install ask-questions skill into Codex skills directory
status: To Do
assignee: []
created_date: '2026-01-02 12:12'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Install the new local skill `skills/ask-questions-if-underspecified` into `$CODEX_HOME/skills` so Codex can load it on restart. Because the helper installer only pulls from GitHub, use a direct local copy from the repo into `~/.codex/skills/ask-questions-if-underspecified`, but first verify the destination does not already exist; if it does, stop and ask before replacing. Keep this a small, reversible change with no extra files.

How to test: `rg -n "name: ask-questions-if-underspecified" ~/.codex/skills/ask-questions-if-underspecified/SKILL.md` should match. After installation, remind the user to restart Codex to pick up the new skill. If the user prefers GitHub-based install, note that it requires pushing the skill first and rerun with the installer script.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `~/.codex/skills/ask-questions-if-underspecified/SKILL.md` exists and includes the correct name frontmatter.
- [ ] #2 No existing skill directory was overwritten without explicit approval; if it existed, installation paused and asked.
- [ ] #3 User is told to restart Codex to pick up the new skill.
<!-- AC:END -->
