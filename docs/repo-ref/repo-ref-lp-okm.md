---
summary: Repo intake summary for reference project.
read_when: repo intake or lp okm reference
---

# Repo Intake Summary

## Summary
- Important signals: Next.js App Router + React 19 + TypeScript; Ghost is the only data store; shadcn/Radix UI; no explicit tests; entrypoints in `app/*` + one API route.
- Hard parts for duplication: dependency risk (Ghost SDK in client, tooltip file possibly broken), env coupling (`NEXT_PUBLIC_GHOST_URL`, `GHOST_ADMIN_API_KEY`), and HTML trust boundary (`dangerouslySetInnerHTML`).
- System design hotspots: client vs server fetch split (server `/blog`, client "Latest News"), Ghost Admin API write path via internal API, no DB so all state rides on Ghost.
- Unknowns that block clean duplication: package manager/lockfile, deployment target, Ghost config expectations, and whether client fetch is intentional (CORS/bundle risk).
- Follow-ups that unlock decisions: canonical deploy target + envs; should newsletter be server-only; confirm tooltip file validity; clarify newsletter list ID.

## CLI-First
- Content fetch audit (posts, featured, single): Core: consistency in read paths; Needed: verify server vs client fetch; What: a CLI that fetches sample posts and prints counts and slugs; Analogy: like walking every aisle in a supermarket before opening, counting products, comparing shelf labels to the stock list, and noting which aisles are empty or mislabeled so customers do not get lost.
- Newsletter subscribe smoke: Core: write path health; Needed: confirm Ghost Admin API works; What: a CLI that posts a test email and reports status codes; Analogy: like sending a test letter through a building mail chute, tracking whether it reaches the front desk, and watching for jams or delays before real mail starts arriving.
- Env sanity check: Core: config correctness; Needed: ensure required vars exist; What: a CLI that validates `NEXT_PUBLIC_GHOST_URL`, `NEXT_PUBLIC_GHOST_CONTENT_API_KEY`, `GHOST_ADMIN_API_KEY`; Analogy: like laying out every ingredient, tool, and oven setting on the counter before cooking a big dinner so you do not discover a missing item halfway through the meal.
- Build and lint gate: Core: release readiness; Needed: baseline quality signal; What: a CLI wrapper for `next build` and `next lint` with exit codes; Analogy: like inspecting a car with a full checklist, from lights to brakes to tire pressure, before a long road trip so small issues do not become roadside failures.
- Quality gate (lint, typecheck, build, e2e, CI): Core: release confidence; Needed: catch regressions before deploy; What: a CLI/CI chain that runs lint, typecheck, build, then Playwright smoke flows with artifacts on failure; Analogy: like running a full safety inspection, a road test, and a documented checklist before handing over the keys, so every system is verified and any failure comes with photos and a report.

## Signals
### Runtime / stack
- Node.js + Next.js (App Router) + React + TypeScript (Next 16.1.0, React 19.2.0, TypeScript ^5) with Tailwind CSS tooling and shadcn/Radix UI components.

### Primary entrypoints (App Router)
- Pages: `app/page.tsx` (home), `app/about/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, plus shared `app/layout.tsx`.
- API route: `app/api/newsletter/subscribe/route.ts` (newsletter subscription).

### Commands (build/test/lint)
- `dev: next dev`, `build: next build`, `start: next start`, `lint: next lint`. (No explicit `test` script shown.)

### Layers / layout (high-level)
- UI / Routes: `app/*` route components + `components/*` UI building blocks.
- Domain / integrations: `lib/ghost.ts` (Ghost Content API read), `lib/ghost-members.ts` (client helper calling internal API), `app/api/newsletter/subscribe/route.ts` (server writes to Ghost Admin API).
- Design system: `components/ui/*` (shadcn/Radix wrappers) + Tailwind config files.

### Data stores
- No first-party DB/migrations evident in the dump; content and members appear to live in Ghost (headless CMS + Members). Reads use Ghost Content API; writes create a member via Ghost Admin API.

### External integrations / config and secrets
- Ghost Content API via `@tryghost/content-api` using `NEXT_PUBLIC_GHOST_URL` and `NEXT_PUBLIC_GHOST_CONTENT_API_KEY` (defaults to `http://localhost:2368`).
- Ghost Admin API via `GHOST_ADMIN_API_KEY`, generating a short-lived JWT (`expiresIn: '5m'`) and POSTing to `/ghost/api/admin/members/`.

## Flow
### Site page request (typical)
- Request hits Next.js route in `app/*` -> page composes `components/*` (for example, `Navigation`, `Footer`) and returns HTML/JS to the client.

### Blog listing (/blog)
- Server component `app/blog/page.tsx` runs `getPosts(20)` + `getFeaturedPosts(3)` in parallel (Ghost Content API) -> renders featured + latest post lists with links to `/blog/[slug]`.

### Blog details (/blog/[slug])
- Page fetches a single post by slug via `getPostBySlug(slug)` (Ghost Content API) and renders HTML content via `dangerouslySetInnerHTML`.

### Homepage "Latest News" widget
- `components/LatestNews.tsx` is a client component that calls `getPosts(3)` inside a `useEffect` and then renders the cards.

### Newsletter subscribe flow ("Inner Circle")
1. User submits email in `components/InnerCircle.tsx` -> calls `subscribeToNewsletter(email)` from `lib/ghost-members.ts`.
2. `subscribeToNewsletter` POSTs to internal route `/api/newsletter/subscribe`.
3. `app/api/newsletter/subscribe/route.ts` validates input, reads `NEXT_PUBLIC_GHOST_URL` + `GHOST_ADMIN_API_KEY`, generates Ghost JWT, calls Ghost Admin API to create a member, and returns success/error JSON (including a duplicate-email special case on HTTP 422).

## Intricacies
- Client-side Ghost fetch risk: `components/LatestNews.tsx` (client) imports and calls `getPosts` from `lib/ghost.ts`, which instantiates `GhostContentAPI` using env vars and runs `.posts.browse(...)`. This couples browser runtime to a library that may assume server/Node context and can introduce CORS/bundling issues depending on Ghost + Next config.
- HTML rendering surface: blog post content is rendered with `dangerouslySetInnerHTML` from `post.html`. Safety depends on Ghost HTML sanitization and author permissions.
- Secret handling / configuration coupling: newsletter signup requires both `NEXT_PUBLIC_GHOST_URL` and `GHOST_ADMIN_API_KEY`; if either is missing, it returns a 500 "Server configuration error."
- Shadcn UI wrapper appears syntactically broken in dump: `components/ui/tooltip.tsx` shows `({ className, sideOffset = 4, .props }, ref)` and `{.props}`, which would not compile as-is. This may be a transcription artifact, or it may indicate a real build-breaking file.
- Mixed rendering strategies: `/blog` is server-rendered via async page, but homepage "Latest News" is client-fetched and shows a loading state; content freshness, caching, and performance differ across surfaces.

## Unknowns
- Deployment target and runtime constraints (Vercel vs Node server vs container) are not shown (no CI/CD or infra files surfaced in the dump snippets).
- Package manager (npm/pnpm/yarn/bun) is not explicit in the snippets (no lockfile excerpt shown).
- Whether `components/ui/tooltip.tsx` is truly broken vs a dump formatting glitch.
- Ghost configuration expectations: exact values of `NEXT_PUBLIC_GHOST_URL`, `NEXT_PUBLIC_GHOST_CONTENT_API_KEY`, and `GHOST_ADMIN_API_KEY` for local/dev/prod; whether Ghost is self-hosted or Ghost(Pro).
- Data privacy/compliance posture for capturing emails (double opt-in behavior is implied by "Check your email to confirm," but the Ghost Members configuration is not visible here).
- Testing strategy is unclear (no test scripts shown in `package.json`).

## Follow-up questions
- What is the canonical production entrypoint (for example, Vercel deploy, `next start` on a Node host, or container), and which environment provides the required Ghost vars?
- Is it intentional that `LatestNews` fetches Ghost posts client-side (via `useEffect`), or should it be server-rendered or proxied through a Next API route to avoid CORS/bundling issues?
- Is the `components/ui/tooltip.tsx` snippet accurate, and does the repo currently build successfully? If it does, can you point to the correct version of that file?
- For newsletter signup: do you want to subscribe users to all newsletters (currently `newsletters: []`) or a specific newsletter list/ID in Ghost?
- Are you relying on Ghost to sanitize post HTML sufficiently for `dangerouslySetInnerHTML`, or do you want an additional sanitization layer in the Next app?
- Which command(s) are the source of truth for quality gates: only `next lint`, or hidden scripts (formatting, typecheck, tests) not present in this dump?
