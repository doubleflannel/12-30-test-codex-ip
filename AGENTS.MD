See ~/AGENTS.MD for canonical/shared agent rules.

# Repo specifics
- Purpose: static landing page inspired by okm-lp-demo for iteration.
- Start every session by running `./scripts/docs-list.ts`.
- Local view: `python3 -m http.server 3000` from repo root, then open `http://localhost:3000`.
- Tests: none yet; validate via visual check in browser and lint HTML/CSS manually.
- Docs live in `docs/`; each doc must start with front matter containing `summary` and `read_when`.
- Tooling: `./scripts/committer "<message>" <files...>` stages only listed files and refuses empty commits.
