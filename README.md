# OrbitKind Landing Page

Static landing page inspired by okm-lp-demo. Serve locally and iterate quickly with lightweight helper scripts.

- View locally: `python3 -m http.server 3000` then open `http://localhost:3000`.
- Static workflow: `npm run lint` / `npm run build` are informational no-ops unless a framework is added back.
- Docs routing: run `./scripts/docs-list.ts` (requires `tsx` or `ts-node` + deps) to see summaries and read_when tags; all docs live in `docs/` with front matter.
- Commit helper: `./scripts/committer "<message>" <files...>` stages only listed paths and refuses empty or dot (`.`) commits.
- Browser tooling: `./scripts/browser-tools.ts` (requires `ts-node` + `puppeteer-core`) for DevTools actions like open/nav, pick, screenshot, console tailing, and content extraction.
- Web ref intake: `./scripts/web-ref-intake.ts <url>` (requires `ts-node` + `playwright`) dumps rendered DOM + CSS into JSON.
- Design cues: see `docs/landing-design.md`; browser feedback workflow in `~/.codex/skills/brave-search/reference/browser-tools-reference.md`.
