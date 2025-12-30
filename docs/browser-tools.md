---
summary: How to gather quick UI feedback without extra infra.
read_when: ui
---

# Browser tools workflow
- Serve locally via `python3 -m http.server 3000` and open `http://localhost:3000`.
- Use DevTools device toolbar to check mobile/desktop breakpoints; prefer 360px and 1280px presets.
- Record a short capture (GIF/MP4) with built-in screen recorder when reporting UI issues; keep under 10s.
- For design tweaks, grab a single annotated screenshot; mark spacing/color concerns directly in the image.
- When reporting, include viewport size, browser, and commit SHA in the note.
