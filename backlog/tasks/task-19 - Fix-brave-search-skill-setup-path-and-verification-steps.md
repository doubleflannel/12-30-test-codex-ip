---
id: task-19
title: Fix brave-search skill setup path and verification steps
status: Done
assignee: []
created_date: '2026-01-01 20:22'
updated_date: '2026-01-01 20:31'
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
- [x] #1 `skills/brave-search/SKILL.md` Setup section uses `/home/vnkbr/.codex/skills/brave-search` and no longer references `~/Projects/agent-scripts/skills/brave-search`.
- [x] #2 Running `cd /home/vnkbr/.codex/skills/brave-search && npm ci` succeeds, and `./search.js "steipete" -n 1` prints a `Result 1` block with a non-empty Title.
- [x] #3 The doc includes explicit “How to run” and “Success looks like” lines and names the required `BRAVE_API_KEY` env var.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Updated `skills/brave-search/SKILL.md` setup path to `/home/vnkbr/.codex/skills/brave-search`, added missing-key note, alt install note, and How to run/Success looks like.

Verification: `cd /home/vnkbr/.codex/skills/brave-search && npm ci` succeeded (added 50 packages, 0 vulns).

Verification: `./search.js "steipete" -n 1` -> Result 1 Title "Peter Steinberger" (Link https://steipete.me/).
<!-- SECTION:NOTES:END -->
