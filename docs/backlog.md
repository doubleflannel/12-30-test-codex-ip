---
summary: Backlog.md setup + core commands for this repo.
read_when: task planning or AI runs
---

# Backlog.md quick use
Analogy: corkboard in the break room; sticky notes live inside the repo.

## Core commands (CLI-first)
- Install: `npm i -g backlog.md` (or `bun add -g backlog.md`)
- Init: `backlog init "12-30-test-codex-ip"`
- Tasks: `backlog task create "Title"` + `backlog task list --plain`
- Board: `backlog board` (exit with `q`)
- Web UI: `backlog browser`
- Search: `backlog search "query" --plain`

## Codex MCP wiring
- Add MCP server: `codex mcp add backlog backlog mcp start`
- Verify in Codex: `/mcp` shows `backlog`
- Workflow doc: `backlog://workflow/overview`

## How to run
- TUI: `backlog board`
- Success looks like: `backlog/` exists; tasks show on board; exit code 0
- Quick check: `backlog task create "Smoke task"` then `backlog task list --plain`
