---
id: task-28
title: Add ask-questions skill for clarifying underspecified requests
status: To Do
assignee: []
created_date: '2026-01-02 12:09'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a new skill under `skills/ask-questions-if-underspecified/` with a single `SKILL.md` that exactly matches the provided content and frontmatter. Follow skill-creator guidance: keep the body concise, imperative, and ASCII-only; do not add extra files. If the `init_skill.py` helper is unavailable, create the folder and file manually and note that in task notes. Use the provided name `ask-questions-if-underspecified` for the skill folder to keep name/folder alignment, unless a user change requests otherwise. Mention that this skill is only invoked explicitly and should not auto-trigger; keep that wording intact.

How to test: run `rg -n "name: ask-questions-if-underspecified|Do not use automatically" skills/ask-questions-if-underspecified/SKILL.md` to verify key strings, and run `./scripts/docs-list.ts` to confirm no doc list errors were introduced. Keep scope tight: only add the new skill file. Note: no packaging required unless requested.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `skills/ask-questions-if-underspecified/SKILL.md` exists with the exact frontmatter name `ask-questions-if-underspecified` and description line from the request.
- [ ] #2 The skill body includes sections `Goal`, `Workflow`, `Question templates`, and `Anti-patterns` with the provided wording preserved.
- [ ] #3 `rg -n "Do not use automatically" skills/ask-questions-if-underspecified/SKILL.md` returns a match and exit code 0.
<!-- AC:END -->
