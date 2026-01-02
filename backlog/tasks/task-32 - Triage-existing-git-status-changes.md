---
id: task-32
title: Triage existing git status changes
status: To Do
assignee: []
created_date: '2026-01-02 12:47'
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
- [ ] #1 Run `git status -s` and `git --no-pager diff --name-status` and report modified/deleted paths with counts.
- [ ] #2 Run `git ls-files --others --exclude-standard` and list untracked paths, noting any build artifacts (e.g., `.next/`).
- [ ] #3 Produce a short triage summary with suggested next actions (ignore, keep, or investigate) without modifying files.
<!-- AC:END -->
