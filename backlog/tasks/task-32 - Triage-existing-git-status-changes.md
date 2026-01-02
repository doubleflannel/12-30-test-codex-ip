---
id: task-32
title: Triage existing git status changes
status: Done
assignee: []
created_date: '2026-01-02 12:47'
updated_date: '2026-01-02 12:48'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Provide a concise, CLI-first triage of the current dirty working tree so we can decide what to keep, discard, or ignore without touching files. Use `git status -s`, `git --no-pager diff --name-status`, and `git ls-files --others --exclude-standard` to categorize modified, deleted, and untracked paths; summarize counts, highlight likely generated artifacts (e.g., `.next/` traces), and flag any doc/task deletions that look intentional vs accidental.

How to test: rerun the same three commands and confirm the summary still matches the working tree; success looks like a clear categorized list, explicit call-outs for risky deletions, and no file edits made during triage. Keep the scope tiny and avoid repo-wide changes.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Run `git status -s` and `git --no-pager diff --name-status` and report modified/deleted paths with counts.
- [x] #2 Run `git ls-files --others --exclude-standard` and list untracked paths, noting any build artifacts (e.g., `.next/`).
- [x] #3 Produce a short triage summary with suggested next actions (ignore, keep, or investigate) without modifying files.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Summary: Modified (5): AGENTS.MD, docs/web-ref/web-ref-intake.md, scripts/browser-tools.ts, scripts/committer, scripts/trash-win. Deleted (8): backlog/tasks task-11, task-14 (2 files), task-15, task-16, task-20, docs/repo-intake.md, docs/web-ref/okm-lp-demo.zeabur.app/content.md. Untracked (8): .next/trace, .next/trace-build, docs/repo-ref/repo-ref-intake.md, docs/web-ref/gitingest.com/page-dump.json, docs/web-ref/okm-lp-demo.zeabur.app/page-dump.json, docs/web-ref/web-ref-intake-prompt.md, skills/ask-details/SKILL.md, skills/screenshot-use/SKILL.md. Suggested actions: ignore/remove .next artifacts, confirm intended deletions/moves for backlog tasks + docs, decide whether new skills/docs should be added or discarded.
<!-- SECTION:NOTES:END -->
