---
id: task-27
title: Fix change-logger skill to target repo root safely
status: To Do
assignee: []
created_date: '2026-01-02 12:01'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update the change-logger workflow so it never writes to the wrong repository when run from another repo. Make the script resolve the root from `git rev-parse --show-toplevel` (based on current working directory), or add a `--root <path>` override; prefer cwd root and validate the path contains a `.git` directory before writing. If a repo-local `./scripts/change-logger.ts` exists, require using it and refuse to run from a different repo path; like checking the address before dropping a package.

Adjust the skill docs to state the safe entrypoint and the new root resolution behavior. Add a short usage snippet showing `--root` (if implemented) and clarify that it writes `CHANGELOG.md` at the resolved root. How to test: run the script from a different repo and confirm it writes to that repo’s `CHANGELOG.md`, then run from the hub repo and confirm it writes to the hub `CHANGELOG.md`. Keep changes small and isolated to the script and skill docs; no repo-wide rewrites.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Running `./scripts/change-logger.ts --help` documents root resolution or `--root`, and the script refuses to write if the resolved root is not a git repo.
- [ ] #2 When run from a different repo cwd, the script writes `CHANGELOG.md` inside that repo’s git root (not the hub repo).
- [ ] #3 When run from the hub repo cwd, the script writes `CHANGELOG.md` inside the hub repo root and logs the resolved root path.
<!-- AC:END -->
