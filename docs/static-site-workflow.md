---
summary: Static site workflow for local preview (no build/lint).
read_when: static workflow
---

# Static site workflow
Analogy: like a paper flyer on a wall; no oven, just tape and view.

## CLI entrypoint
```bash
python3 -m http.server 3000
```

## How to run
1) Start the local server:
```bash
python3 -m http.server 3000
```
2) Open `http://localhost:3000`.

## Success looks like
- Browser shows the landing page.
- Terminal shows `Serving HTTP on ... port 3000`.

## Quick check
```bash
curl -I http://localhost:3000
```
Expected: `HTTP/1.0 200 OK` (or similar), exit 0.
