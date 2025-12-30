#!/usr/bin/env tsx
// Emit a markdown changelog entry with beginner-friendly analogies and append it to CHANGELOG.md in the project root.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type Entry = { status: 'A' | 'M' | 'D' | 'R'; path: string; from?: string };

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const CHANGELOG_PATH = path.join(ROOT, 'CHANGELOG.md');

function runGit(args: string[]): string {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`git command failed: git ${args.join(' ')}\n${message}`);
    process.exit(1);
  }
}

function parseNameStatus(output: string): Entry[] {
  const entries: Entry[] = [];
  for (const line of output.split('\n').filter(Boolean)) {
    const parts = line.split('\t');
    if (parts.length < 2) continue;
    const code = parts[0].trim();
    const status = code[0] as Entry['status'];
    if (status === 'R') {
      entries.push({ status, from: parts[1], path: parts[2] });
    } else if (status === 'A' || status === 'M' || status === 'D') {
      entries.push({ status, path: parts[1] });
    }
  }
  return entries;
}

function parseStatus(output: string): Entry[] {
  const entries: Entry[] = [];
  for (const line of output.split('\n').filter(Boolean)) {
    const code = line.slice(0, 2).trim();
    const pathVal = line.slice(3).trim();
    const statusChar = code[0] || code[1];
    if (!pathVal) continue;
    if (statusChar === 'R') {
      const parts = pathVal.split(' -> ');
      if (parts.length === 2) {
        entries.push({ status: 'R', from: parts[0], path: parts[1] });
      }
    } else if (statusChar === 'A' || statusChar === 'M' || statusChar === 'D') {
      entries.push({ status: statusChar, path: pathVal });
    } else if (statusChar === '?') {
      entries.push({ status: 'A', path: pathVal });
    }
  }
  return entries;
}

function collectEntries(range: string | null, stagedOnly: boolean): Entry[] {
  if (range) {
    const diff = runGit(['diff', '--name-status', range]);
    return parseNameStatus(diff);
  }
  if (stagedOnly) {
    const diff = runGit(['diff', '--cached', '--name-status']);
    return parseNameStatus(diff);
  }
  const status = runGit(['status', '--porcelain=v1']);
  return parseStatus(status);
}

function formatAnalogy(entry: Entry): string {
  switch (entry.status) {
    case 'A':
      return `Added ${entry.path} to expand the toolkit and clarify intent, spelling out what’s new so future work has a clear anchor; like adding a new room to a house and labeling the door so everyone knows where to gather without wandering.`;
    case 'M':
      return `Updated ${entry.path} to refine behavior and readability, reducing friction for anyone touching that path next; like repainting a hallway and replacing the signs so traffic flows smoothly instead of guessing which way to turn.`;
    case 'D':
      return `Removed ${entry.path} to trim clutter and maintenance overhead, shrinking the surface area for bugs and confusion; like retiring a wobbly chair before someone trips over it in a busy workshop.`;
    case 'R':
      return `Renamed ${entry.from} → ${entry.path} to make purpose obvious and keep references consistent, avoiding lookup detours; like relabeling a toolbox drawer so you grab the right wrench the first time instead of opening every drawer.`;
    default:
      return `Touched ${entry.path} to keep the system coherent and predictable, smoothing small rough edges; like tidying a shared desk so everyone can find their tools without pausing to rearrange clutter.`;
  }
}

function buildSection(entries: Entry[], title?: string): string {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const sectionTitle = title ? `${date} — ${title}` : `${date} — Working tree updates`;
  if (entries.length === 0) {
    return `## ${sectionTitle}\n- No changes detected—like checking your backpack and finding everything already in place.\n\n`;
  }

  const bullets = entries
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((entry) => `- ${formatAnalogy(entry)}`)
    .join('\n');

  return `## ${sectionTitle}\n${bullets}\n\n`;
}

function upsertChangelog(section: string): void {
  const header = `Timeline of project changes with beginner-friendly analogies for quick scanning.\n\n# Changelog\n\n`;

  if (!fs.existsSync(CHANGELOG_PATH)) {
    fs.writeFileSync(CHANGELOG_PATH, header + section, { encoding: 'utf8' });
    console.log(`Created CHANGELOG.md with new entry.`);
    return;
  }

  const existing = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const marker = '# Changelog';
  const idx = existing.indexOf(marker);
  if (idx === -1) {
    const combined = header + section + existing;
    fs.writeFileSync(CHANGELOG_PATH, combined, { encoding: 'utf8' });
    console.log(`Updated CHANGELOG.md (inserted header and new entry).`);
    return;
  }

  const insertPos = existing.indexOf('\n', idx + marker.length) + 1 || existing.length;
  const updated = existing.slice(0, insertPos) + section + existing.slice(insertPos);
  fs.writeFileSync(CHANGELOG_PATH, updated, { encoding: 'utf8' });
  console.log(`Updated CHANGELOG.md with new entry.`);
}

function help(): void {
  console.log(`Usage: change-logger [--staged] [--range <rev>] [--title <text>] [--help]

Options:
  --staged        Include staged changes only (default: staged + unstaged).
  --range <rev>   git diff range (e.g., main..HEAD). Overrides --staged.
  --title <text>  Title for the changelog section (default: working tree updates).
  --help          Show this help text.
`);
}

function main(): void {
  const args = process.argv.slice(2);
  let stagedOnly = false;
  let range: string | null = null;
  let title: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--staged') {
      stagedOnly = true;
    } else if (arg === '--range') {
      range = args[++i] ?? null;
    } else if (arg === '--title') {
      title = args[++i] ?? undefined;
    } else if (arg === '--help' || arg === '-h') {
      help();
      return;
    }
  }

  const entries = collectEntries(range, stagedOnly);
  const section = buildSection(entries, title);
  upsertChangelog(section);
}

main();
