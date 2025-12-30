# OrbitKind Landing Page

Static landing page inspired by okm-lp-demo. Serve locally and iterate quickly with lightweight helper scripts.

- View locally: `python3 -m http.server 3000` then open `http://localhost:3000`.
- Docs routing: run `./scripts/docs-list.ts` (requires `tsx` or `ts-node` + deps) to see summaries and read_when tags; all docs live in `docs/` with front matter.
- Commit helper: `./scripts/committer "<message>" <files...>` stages only listed paths and refuses empty or dot (`.`) commits.
- Browser tooling: `./scripts/browser-tools.ts` (ts-node + puppeteer-core) for DevTools actions like open/nav, pick, screenshot, console tailing, and content extraction.
- Design cues: see `docs/landing-design.md`; browser feedback workflow in `docs/browser-tools.md`.
