# AGENTS.MD

Ivan owns this. Start: one sentence, single line: "Hi, <NYC-themed motivating clause>" (vary phrasing; avoid repeats).
Work style: telegraph; noun-phrases ok; drop grammar; min tokens; short analogy; non-programming friendly.

## Principles
- CLI-first: Default to a CLI entrypoint. Make the core behavior runnable from the terminal.
- Close the loop: Always include “how to run.” State what success looks like (expected output, exit code, files created). Add a quick check (test, lint, or a smoke command).
- Small tasks, fix-forward: Prefer changes with low blast radius. Queue follow-ups instead of big rewrites. If something is wrong, fix forward and avoid revert-first.
- Linear git: Remind to commit often. Keep commits small and atomic. Keep history simple (solo: main; team: branch + PR).
- Docs ship with code: Remind to update docs when behavior changes. Add a short `docs/*.md` note for new workflows. Keep docs easy to scan.

## Agent Protocol
- Workspace: `/mnt/c/Users/vnkbr/Code/12-30-test-codex-ip`.
- PRs: use `gh pr view/diff` (no URLs).
- No `./runner` (not allowed here). Guardrails: use `trash` for deletes (move to system Trash; recoverable; avoid `rm`).
- Need upstream file: stage in `tmp_staging/`, then cherry-pick; never overwrite tracked.
- Bugs: add regression test when it fits.
- Keep files <~500 LOC; split/refactor as needed.
- Commits: Conventional Commits (`feat|fix|refactor|build|ci|chore|docs|style|perf|test`) (prefix = change type; like labeling boxes so the warehouse stays organized).
- Editor: `code <path>` (open file in VS Code).
- CI: `gh run list/view` (check pipeline status, rerun/fix until green).
- Prefer end-to-end verify; if blocked, say what’s missing.
- New deps: quick health check (recent releases/commits, adoption).
- Web: search early; quote exact errors; prefer 2024–2025 sources; use `brave-search` skill first.
- Oracle: run `npx -y @steipete/oracle --help` once/session before first use (default to API; model gpt-5.2-pro).
- Style: telegraph. Drop filler/grammar. Min tokens (global AGENTS + replies). Add short analogy; non-programming friendly.

## Architecture
- TypeScript: use repo PM; run `./scripts/docs-list.ts`; keep files small; follow existing patterns.

## Screenshots ("use a screenshot")
- Pick newest PNG in `/mnt/c/Users/vnkbr/Downloads`.
- Verify it’s the right UI (ignore filename).
- Replace asset; keep dimensions; commit; run gate; verify CI.

## Docs
- Start: run docs list (`./scripts/docs-list.ts`); open docs before coding.
- Follow links until domain makes sense; honor `Read when` hints.
- Keep notes short; update docs when behavior/API changes (no ship w/o docs).
- Add `read_when` hints on cross-cutting docs.
- Model preference: gpt-5.2-codex.

## PR Feedback
- Active PR: `gh pr view --json number,title,url --jq '"PR #\\(.number): \\(.title)\\n\\(.url)"'`.
- PR comments: `gh pr view …` + `gh api …/comments --paginate`.
- Replies: cite fix + file/line; resolve threads only after fix lands.
- When merging a PR: thank the contributor in `CHANGELOG.md`.

## Flow & Runtime
- Use repo’s package manager/runtime; no swaps w/o approval.
- Use Codex background for long jobs; tmux only for interactive/persistent (debugger/server).

## Build / Test
- Before handoff: run full gate (lint/typecheck/tests/docs).
- CI red: `gh run list/view`, rerun, fix, push, repeat til green.
- Keep it observable (logs, panes, tails, MCP/browser tools).

## Git
- Safe by default: `git status/diff/log`. Push only when user asks.
- `git checkout` ok for PR review / explicit request.
- Branch changes require user consent.
- Destructive ops forbidden unless explicit (`reset --hard`, `clean`, `restore`, `rm`, ...).
- Remotes in local workspaces: prefer HTTPS; flip SSH->HTTPS before pull/push.
- Commit helper on PATH: `committer` (bash). Prefer it; if repo has `./scripts/committer`, use that.
- Don’t delete/rename unexpected stuff; stop + ask.
- No repo-wide S/R scripts; keep edits small/reviewable.
- Avoid manual `git stash`; if Git auto-stashes during pull/rebase, that’s fine (hint, not hard guardrail).
- If user types a command ("pull and push"), that’s consent for that command.
- No amend unless asked.
- Big review: `git --no-pager diff --color=never`.
- Multi-agent: check `git status/diff` before edits; ship small commits.

## macOS Permissions / Signing (TCC)
- Never re-sign / ad-hoc sign / change bundle ID as "debug" without explicit ok (can mess TCC).

## Critical Thinking
- Fix root cause (not band-aid).
- Unsure: read more code; if still stuck, ask w/ short options.
- Conflicts: call out; pick safer path.
- Unrecognized changes: assume other agent; keep going; focus your changes. If it causes issues, stop + ask user.
- Leave breadcrumb notes in thread.

## Tools
### scripts/browser-tools.ts
- Chrome DevTools helper. Cmds: `start`, `nav`, `eval`, `screenshot`, `pick`, `cookies`, `inspect`, `kill`.
- Description: a remote control for Chrome DevTools (nav, eval, pick, screenshot, logs).

### scripts/change-logger.ts
- Changelog helper. Generates/updates `CHANGELOG.md`.
- Description: a chronicler that writes or updates `CHANGELOG.md`.

### scripts/committer
- Commit helper: use `./scripts/committer` (repo). Stages only listed paths.
- Description: a bouncer that only lets named files into a commit.

### scripts/docs-list.ts
- Lists `docs/` + enforces front-matter.
- Description: a concierge that lists docs and when to read them.

### scripts/trash-win
- Move files to Trash: `./scripts/trash-win ...` (Windows Recycle Bin).
- Description: a recycler that sends files to the Windows Recycle Bin.

### skills/brave-search
- Web search and content extraction via Brave Search API.
- Description: a librarian that fetches web sources quickly.

### skills/change-logger
- Generate/maintain `CHANGELOG.md` from git state or ranges.
- Description: a storyteller that turns git history into a friendly changelog.

### skills/create-cli
- Design CLI specs (args, flags, prompts, errors, exit codes).
- Description: an architect that drafts CLI specs before you build.

### skills/markdown-converter
- Convert many file types into Markdown for analysis.
- Description: a translator that turns many file types into Markdown.

### skills/oracle
- Bundle prompt+files for 2nd model. Use when stuck/buggy/review. Default to API first; use gpt-5.2-pro.
- Run `npx -y @steipete/oracle --help` once/session (before first use; engine: API).
- Description: a second-opinion reviewer that checks your work with extra context.

### mcporter / firecrawl
- MCP launcher for web tasks in Windows/WSL. Use `npx mcporter firecrawl` for web scraping/HTML fetch.
- Description: a power adapter to plug in web scraping tools.

### gh
- GitHub CLI for PRs/CI/releases. Given issue/PR URL (or `/pull/5`): use `gh`, not web search.
- Description: a gatekeeper for PRs, CI, and repo metadata.

### tmux
- Use only when you need persistence/interaction (debugger/server).
- Description: a session keeper for long-running terminals.
<frontend_aesthetics>
Avoid "AI slop" UI. Be opinionated + distinctive.

Do:
- Typography: pick a real font; avoid Inter/Roboto/Arial/system defaults.
- Theme: commit to a palette; use CSS vars; bold accents > timid gradients.
- Motion: 1-2 high-impact moments (staggered reveal beats random micro-anim).
- Background: add depth (gradients/patterns), not flat default.

Avoid: purple-on-white clichés, generic component grids, predictable layouts.
</frontend_aesthetics>
