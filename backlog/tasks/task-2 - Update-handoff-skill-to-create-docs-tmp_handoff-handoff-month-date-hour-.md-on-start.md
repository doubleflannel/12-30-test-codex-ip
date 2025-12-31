---
id: task-2
title: >-
  Update handoff skill to create docs/tmp_handoff/handoff-<month-date>-<hour>.md
  on start
status: In Progress
assignee:
  - codex
created_date: '2025-12-31 20:03'
updated_date: '2025-12-31 20:30'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Before editing, read `AGENTS.md` and skim `CHANGELOG.md` to align with repo rules, and confirm no overlapping Backlog task; then update `/home/vnkbr/.codex/skills/handoff/SKILL.md` so the very first step of the handoff skill tells the agent to create a new note in `docs/tmp_handoff` named `handoff-<month-date>-<hour>.md` using local time (e.g., `handoff-12-31-20.md`), and make the instruction explicit that the note is created at start and will hold the handoff bullets that follow using the existing handoff format.

Call out any skill/script usage only if needed (this should be a direct skill edit, no new script expected), and include a clear how-to-test note in the task: create a file with the specified pattern under `docs/tmp_handoff`, verify the file name and location match, and confirm the note uses the same ordered list as the current handoff guidance; if a helper is introduced, include the exact command and expected output.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `/home/vnkbr/.codex/skills/handoff/SKILL.md` adds a first step instructing creation of `docs/tmp_handoff/handoff-<month-date>-<hour>.md` at skill start.
- [ ] #2 The instruction includes an example filename `handoff-12-31-20.md` and specifies local time for the hour.
- [ ] #3 The instruction states the note should use the existing "Include (in order)" handoff format and is created before listing the handoff content.
<!-- AC:END -->
