---
id: task-17
title: Add screenshot-use skill and wire it into AGENTS.md
status: Done
assignee:
  - codex
created_date: '2026-01-01 13:52'
updated_date: '2026-01-01 14:28'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a new skill at `skills/screenshot-use/SKILL.md` that contains the exact screenshot workflow instructions so agents can follow a single, reusable skill; keep the content concise, ASCII-only, and aligned with the existing skill format.

Update `AGENTS.MD` to reference the new skill under Tools and remove the existing standalone "Screenshots ("use a screenshot")" section, so the screenshot workflow is only defined in one place; verify the resulting AGENTS layout still reads cleanly and the new skill is discoverable from the Tools list.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `skills/screenshot-use/SKILL.md` exists and includes the three bullet instructions for selecting the newest PNG, verifying UI, replacing asset, and running gate/CI; file follows the same heading and description style as other skills.
- [x] #2 `AGENTS.MD` no longer contains the standalone "Screenshots ("use a screenshot")" section, and the Tools list includes a new entry for `skills/screenshot-use` with a short description.
- [x] #3 Running `rg -n "screenshot" AGENTS.MD skills/screenshot-use/SKILL.md` shows the workflow only in the skill file and a single Tools reference in AGENTS.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1) Create skills/screenshot-use/SKILL.md with the required bullets and standard skill header.
2) Remove the standalone Screenshots section from AGENTS.MD.
3) Add a Tools entry for skills/screenshot-use in AGENTS.MD.
4) Verify with rg that the workflow lives only in the skill file and AGENTS has a single reference.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Created skills/screenshot-use/SKILL.md with the screenshot workflow steps.

Removed standalone Screenshots section from AGENTS.MD.

Added skills/screenshot-use entry under Tools in AGENTS.MD.

rg check: workflow only in skills/screenshot-use/SKILL.md; AGENTS contains only the tool reference (plus existing browser-tools screenshot mentions).
<!-- SECTION:NOTES:END -->
