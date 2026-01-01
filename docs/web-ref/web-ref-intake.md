---
summary: Playwright workflow for web reference intake (rendered DOM + CSS).
read_when: web intake
---

# Web reference intake (copy/paste)
Analogy: like photographing a storefront and collecting paint swatches.

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
npx ts-node --project tsconfig.scripts.json scripts/web-ref-intake.ts https://example.com --out tmp/page-dump.json
```

## Options
- `--out <path>`: output JSON path (default: `page-dump.json`).
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
npx ts-node --project tsconfig.scripts.json scripts/web-ref-intake.ts https://example.com --out tmp/page-dump.json
```

## Success looks like
- `tmp/page-dump.json` exists and includes `url`, `html`, `cssLinks`, `inlineStyles`.
- When `--selectors` is used, `computedStyles` is present with match counts and samples.

## Quick check
```bash
rg -n "\"url\"|\"html\"|\"cssLinks\"|\"inlineStyles\"" tmp/page-dump.json
```
Expected: matches for each key; exit 0.
