---
id: task-3
title: >-
  Update pickup skill to read latest docs/tmp_handoff handoff note and confirm
  deletion
status: To Do
assignee: []
created_date: '2025-12-31 20:04'
updated_date: '2025-12-31 20:30'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Before editing, read `AGENTS.md` and skim `CHANGELOG.md` to align with repo rules, and confirm no overlapping Backlog task; then update `/home/vnkbr/.codex/skills/pickup/SKILL.md` so the pickup checklist instructs the agent to locate and read the newest `docs/tmp_handoff/handoff-*.md` (by modified time), with an explicit CLI example such as `ls -t docs/tmp_handoff/handoff-*.md | head -n 1` if needed, and place the step near the start of the checklist after the docs list/AGENTS read.

Add a final step that, after pickup is complete, asks the user to confirm deleting that handoff file; if confirmed, use `./scripts/trash-win` (not `rm`) to delete it, and include a clear how-to-test note in the task: create two handoff files, verify the instruction selects the newest, and confirm the delete prompt appears.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `/home/vnkbr/.codex/skills/pickup/SKILL.md` includes a step to read the newest `docs/tmp_handoff/handoff-*.md` by modified time.
- [ ] #2 The pickup skill adds a final step asking the user to confirm deletion of the handoff note, and specifies `./scripts/trash-win` for deletion.
- [ ] #3 The pickup skill includes or references an explicit CLI example for selecting the newest handoff file (e.g., `ls -t ... | head -n 1`).
<!-- AC:END -->
