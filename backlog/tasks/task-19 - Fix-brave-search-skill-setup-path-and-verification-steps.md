---
id: task-19
title: Fix brave-search skill setup path and verification steps
status: To Do
assignee: []
created_date: '2026-01-01 20:22'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update `skills/brave-search/SKILL.md` so the setup path points at the real installed location (`/home/vnkbr/.codex/skills/brave-search`) and remove the stale `~/Projects/agent-scripts/skills/brave-search` instruction that fails with “No such file or directory.” Keep it CLI-first and explicit: show `npm ci`, note the required `BRAVE_API_KEY`, and reference the shipped scripts (`search.js`, `content.js`) so agents can run the tool without guessing paths or context. Include a brief, prescriptive note for alternative installs (if a different path is used) so the skill remains accurate and self-contained.

Verify by running the new setup command and a minimal search call; capture what success should look like in the doc (e.g., `Result 1` with Title/Link). How to test: `cd /home/vnkbr/.codex/skills/brave-search && npm ci` then `./search.js "steipete" -n 1` (expect at least one result block). Mention the failure mode if `BRAVE_API_KEY` is missing so the doc teaches recovery. Keep this change scoped to the skill doc and do not alter tool code unless the instructions require a small tweak for correctness.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `skills/brave-search/SKILL.md` Setup section uses `/home/vnkbr/.codex/skills/brave-search` and no longer references `~/Projects/agent-scripts/skills/brave-search`.
- [ ] #2 Running `cd /home/vnkbr/.codex/skills/brave-search && npm ci` succeeds, and `./search.js "steipete" -n 1` prints a `Result 1` block with a non-empty Title.
- [ ] #3 The doc includes explicit “How to run” and “Success looks like” lines and names the required `BRAVE_API_KEY` env var.
<!-- AC:END -->
