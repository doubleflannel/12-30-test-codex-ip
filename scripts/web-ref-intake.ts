#!/usr/bin/env -S npx ts-node --project tsconfig.scripts.json

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const DEFAULT_OUT = 'page-dump.json';
const DEFAULT_MAX_NODES = 5;

const usage = () => {
  console.log(`Usage: web-ref-intake <url> [options]

Options:
  --out <path>         Output JSON path (default: ${DEFAULT_OUT})
  --selectors <list>   Comma-separated selectors to sample computed styles
  --max-nodes <n>      Cap samples per selector (default: ${DEFAULT_MAX_NODES})
  -h, --help           Show this help

Example:
  web-ref-intake https://example.com --out tmp/page-dump.json --selectors "h1,.hero" --max-nodes 3`);
};

type CliArgs = {
  url: string;
  outPath: string;
  selectors: string[];
  maxNodes: number;
};

const fail = (message: string): never => {
  console.error(`Error: ${message}`);
  usage();
  process.exit(1);
};

const parseArgs = (argv: string[]): CliArgs => {
  let url: string | null = null;
  let outPath = DEFAULT_OUT;
  let selectors: string[] = [];
  let maxNodes = DEFAULT_MAX_NODES;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      usage();
      process.exit(0);
    }

    if (!arg.startsWith('-') && !url) {
      url = arg;
      continue;
    }

    if (arg === '--out') {
      const value = argv[i + 1];
      if (!value) {
        fail('--out requires a path');
      }
      outPath = value;
      i += 1;
      continue;
    }

    if (arg === '--selectors') {
      const value = argv[i + 1];
      if (!value) {
        fail('--selectors requires a comma-separated list');
      }
      selectors = value
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);
      i += 1;
      continue;
    }

    if (arg === '--max-nodes') {
      const value = argv[i + 1];
      if (!value) {
        fail('--max-nodes requires a number');
      }
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        fail('--max-nodes must be a positive integer');
      }
      maxNodes = parsed;
      i += 1;
      continue;
    }

    fail(`Unknown argument: ${arg}`);
  }

  if (!url) {
    fail('Missing <url>');
  }

  return { url, outPath, selectors, maxNodes };
};

const main = async () => {
  const { url, outPath, selectors, maxNodes } = parseArgs(process.argv.slice(2));
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    const data = await page.evaluate(
      ({ selectors: selectorList, maxNodes: sampleCap }) => {
        const html = document.documentElement.outerHTML;
        const inlineStyles = Array.from(document.querySelectorAll('style')).map((style) => style.textContent || '');
        const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
          .map((link) => link.href)
          .filter(Boolean);

        const computedStyles: Record<string, unknown> = {};
        if (selectorList.length > 0) {
          selectorList.forEach((selector) => {
            const nodes = Array.from(document.querySelectorAll(selector));
            const samples = nodes.slice(0, sampleCap).map((node) => {
              const style = window.getComputedStyle(node);
              const entries: Record<string, string> = {};
              Array.from(style).forEach((prop) => {
                entries[prop] = style.getPropertyValue(prop);
              });

              const className =
                typeof (node as HTMLElement).className === 'string'
                  ? (node as HTMLElement).className
                  : (node as HTMLElement).className?.toString?.() ?? '';

              return {
                tag: node.tagName,
                id: (node as HTMLElement).id || null,
                className,
                styles: entries,
              };
            });

            computedStyles[selector] = {
              matchCount: nodes.length,
              sampleCount: samples.length,
              samples,
            };
          });
        }

        return {
          url: location.href,
          html,
          cssLinks,
          inlineStyles,
          ...(selectorList.length > 0 ? { computedStyles } : {}),
        };
      },
      { selectors, maxNodes },
    );

    const resolvedOut = path.resolve(outPath);
    await mkdir(path.dirname(resolvedOut), { recursive: true });
    await writeFile(resolvedOut, `${JSON.stringify(data, null, 2)}\n`);
    console.log(`Wrote ${resolvedOut}`);
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error: ${message}`);
  process.exit(1);
});
