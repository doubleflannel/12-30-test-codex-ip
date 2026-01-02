---
summary: Playwright workflow for web reference intake (rendered DOM + CSS).
read_when: web intake
---

# Web reference intake (copy/paste)
Analogy: like photographing a storefront and collecting paint swatches.

## Goal (Rebuild Kit)
Turn one or many URLs into a Rebuild Kit folder per URL so we can copy layout and style with confidence.

## Output inventory (per URL)
- `dom.html` (rendered snapshot)
- `page-dump.json` (metadata + links + samples)
- `styles/` (downloaded CSS + inline.css + optional cssom.css)
- `assets.json` (images/fonts/video/scripts/etc.)
- `tokens.json` (design-token-ish digest)
- `screenshots/` (PNG plan: full page + sections + components)

Page-dump.json pointers: add a `paths` object plus `sections` and `components` arrays so the kit is navigable (each entry stores selector hints, bbox, and screenshot path).

## The actually-reliable way: render in a browser and dump DOM + styles (Playwright)
- Load the page in headless Chromium.
- Save the fully rendered DOM plus stylesheet references.
- Optional: capture computed styles for specific selectors (sample only; full DOM is huge).

Minimal Playwright example (one-off):
```js
// node dump-dom-css.js
import { chromium } from "playwright";
import fs from "fs";

const url = process.argv[2];
if (!url) throw new Error("Usage: node dump-dom-css.js https://site.com");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const html = document.documentElement.outerHTML;

  const inlineStyles = Array.from(document.querySelectorAll("style")).map((s) => s.textContent || "");
  const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map((l) => l.href)
    .filter(Boolean);

  return { url: location.href, html, cssLinks, inlineStyles };
});

await browser.close();
fs.writeFileSync("page-dump.json", JSON.stringify(data, null, 2));
console.log("Wrote page-dump.json");
```

## CLI entrypoint
```bash
npx ts-node --project tsconfig.scripts.json scripts/web-ref-intake.ts https://example.com
```

## Options
- `--out <filename>`: output JSON filename (default: `page-dump.json`).
- Output is always written under `docs/web-ref/<url>/` (URL is sanitized for filesystem).
- `--urls <file>`: list of URLs (one per line).
- `--sitemap <url>`: optional sitemap source to expand URLs.
- `--viewports <list>`: `mobile,tablet,desktop` (defaults: 390x844, 768x1024, 1440x900).
- `--shots <list>`: which screenshots to produce (defaults to baseline set below).
- `--max-sections <n>`: cap number of section shots (default: 12).
- `--component-selectors <list>`: comma-separated selectors to always capture.
- `--states=on`: enable hover/focus/dark-mode shots.
- `--selectors <css,selectors>`: comma-separated selectors to sample computed styles.
- `--max-nodes <n>`: cap samples per selector (default: 5).

## How to run
1) Install deps (includes Playwright):
```bash
npm install
npx playwright install chromium
```
2) Run the intake:
```bash
npx ts-node --project tsconfig.scripts.json scripts/web-ref-intake.ts https://example.com
```

## Screenshot plan (PNG)

Inputs:
- `--urls <file>` or `--sitemap <url>` for multi-page capture.
- `--viewports` defaults: 390x844, 768x1024, 1440x900.
- `--shots` to choose what to capture.
- `--max-sections` to cap sections (default 12).
- `--component-selectors` for always-captured primitives.

Default screenshot set per page (always useful baseline):
- `screenshots/<viewport>/full.png` (full page)
- `screenshots/<viewport>/above-the-fold.png` (0 to viewport height)
- `screenshots/<viewport>/nav.png` (first header/nav if present)
- `screenshots/<viewport>/footer.png` (footer if present)

Section shots (works on most marketing pages):
- Selector priority: `main > section`, `section`, `[data-section]`, `main > div > section`.
- Capture up to `--max-sections`.
- Output: `screenshots/<viewport>/section-01.png`, `section-02.png`, ...
- Record bbox + selector hint in `page-dump.json` under `sections`.

Component shots (stable visual primitives, default N=3 each):
- Buttons: `a[href*="signup"], a[href*="join"], button[type="submit"], .btn, [role="button"]`
- Cards: `.card, [class*="card"], article, li:has(h2), div:has(> h3)`
- Forms: `form, input, textarea, select`
- Hero: closest container around `main h1`
- Output: `screenshots/<viewport>/components/button-01.png`, `card-01.png`, `form-01.png`, `hero.png`
- Record bbox + selector in `page-dump.json` under `components`.

State shots (optional, `--states=on`):
- Hover primary CTA -> `components/button-01-hover.png`
- Focus first input -> `components/form-01-focus.png`
- Dark mode toggle -> `full-dark.png` (or emulate prefers-color-scheme: dark)

## Rebuild Kit extraction

A) `dom.html`
- Save rendered `document.documentElement.outerHTML`.
- Optional: `dom.cleaned.html` with scripts stripped for diffing.

B) `styles/`
- Download each `cssLinks[]` to `styles/linked-01.css`, `linked-02.css`, etc.
- Write `styles/index.json` mapping URL -> local filename.
- Concatenate inline `<style>` blocks into `styles/inline.css`.
- Optional CSSOM: iterate `document.styleSheets` and append `cssRules` into `styles/cssom.css` with `styles/cssom.meta.json` noting blocked sheets.

C) `assets.json`
Schema:
```json
{
  "images": { "html": [], "css": [], "icons": [] },
  "fonts": { "preload": [], "css": [] },
  "video": [],
  "audio": [],
  "scripts": [],
  "links": { "canonical": "", "og": {}, "twitter": {} }
}
```
- HTML sources: `img[src]`, `source[srcset]`, icons, `meta[property="og:image"]`.
- CSS sources: parse `url(...)` in linked/inline/CSSOM.
- Fonts: `link[rel="preload"][as="font"]` and `@font-face` URLs.
- Scripts: `script[src]` with module/nomodule flags.
- Optional: `--download-assets` to fetch into `assets/` and record local paths.

D) `tokens.json`
- Typography: font stacks, weights, base size, heading scale.
- Colors: CSS vars, top text/background colors by frequency.
- Radius + shadows: unique values from buttons/cards/inputs.
- Spacing scale: clustered padding/margin values.
- Button styles: normal + hover + focus for primary CTA.

## Folder layout (per URL)
```
docs/web-ref/<sanitized-url>/
  dom.html
  page-dump.json
  styles/
    inline.css
    linked-01.css
    linked-02.css
    cssom.css
    index.json
    cssom.meta.json
  assets.json
  tokens.json
  screenshots/
    desktop/
      full.png
      above-the-fold.png
      nav.png
      footer.png
      section-01.png
      components/
        hero.png
        button-01.png
    mobile/
      full.png
```

## Success tests
- `dom.html` exists and size > 5 KB.
- `screenshots/desktop/full.png` exists and size > 50 KB.
- `styles/inline.css` exists (may be empty).
- If `cssLinks` length > 0, `styles/linked-*.css` count matches.
- `assets.json` is valid JSON and has at least one of images/fonts/scripts.
- `tokens.json` includes `typography.fontFamilies.length >= 1` and `colors.topTextColors.length >= 1`.
- `tokens.json` includes `radii.length >= 1` or `shadows.length >= 1`.

## Quick check
```bash
rg -n "\"url\"|\"html\"|\"cssLinks\"|\"inlineStyles\"" docs/web-ref/<url>/page-dump.json
```
Expected: matches for each key; exit 0.
