#!/usr/bin/env tsx
// Emit a markdown changelog entry with beginner-friendly analogies and append it to CHANGELOG.md in the git root.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

type Entry = { status: 'A' | 'M' | 'D' | 'R'; path: string; from?: string };
type Group = {
  key: string;
  counts: Record<Entry['status'], number>;
};

const BASE_MARKER_RE = /change-logger-base:\s*([0-9a-f]{7,40})/i;
let gitCwd = process.cwd();
let changelogPath = path.join(gitCwd, 'CHANGELOG.md');

function runGit(args: string[], cwd = gitCwd): string {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], cwd }).trim();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`git command failed: git ${args.join(' ')}\n${message}`);
    process.exit(1);
  }
}

function resolveRoot(rootOverride?: string): string {
  const candidate = rootOverride ? path.resolve(rootOverride) : process.cwd();
  const root = runGit(['rev-parse', '--show-toplevel'], candidate);
  const gitMeta = path.join(root, '.git');
  if (!fs.existsSync(gitMeta)) {
    console.error(`Resolved git root missing .git: ${root}`);
    process.exit(1);
  }
  return root;
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

function collectRangeEntries(range: string): Entry[] {
  const diff = runGit(['diff', '--name-status', range]);
  return parseNameStatus(diff);
}

function collectWorkingTreeEntries(stagedOnly: boolean): Entry[] {
  if (stagedOnly) {
    const diff = runGit(['diff', '--cached', '--name-status']);
    return parseNameStatus(diff);
  }
  const status = runGit(['status', '--porcelain=v1']);
  return parseStatus(status);
}

function mergeEntries(primary: Entry[], secondary: Entry[]): Entry[] {
  const seen = new Set<string>();
  const result: Entry[] = [];
  const add = (entry: Entry) => {
    const key = entry.status === 'R' ? `R:${entry.from ?? ''}->${entry.path}` : `${entry.status}:${entry.path}`;
    if (seen.has(key)) return;
    seen.add(key);
    result.push(entry);
  };
  primary.forEach(add);
  secondary.forEach(add);
  return result;
}

function readBaseCommit(): string | null {
  if (!fs.existsSync(changelogPath)) {
    return null;
  }
  const existing = fs.readFileSync(changelogPath, 'utf8');
  const match = existing.match(BASE_MARKER_RE);
  return match?.[1] ?? null;
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

function groupKeyForPath(filePath: string): string {
  const parts = filePath.split('/').filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0] ?? filePath;
}

function groupEntries(entries: Entry[]): Group[] {
  const map = new Map<string, Group>();
  entries.forEach((entry) => {
    const key = groupKeyForPath(entry.path);
    if (!map.has(key)) {
      map.set(key, { key, counts: { A: 0, M: 0, D: 0, R: 0 } });
    }
    const group = map.get(key);
    if (!group) return;
    group.counts[entry.status] += 1;
  });
  return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));
}

function formatGroupLine(group: Group): string {
  const counts = group.counts;
  const total = counts.A + counts.M + counts.D + counts.R;
  const parts = [
    counts.A ? `A:${counts.A}` : null,
    counts.M ? `M:${counts.M}` : null,
    counts.D ? `D:${counts.D}` : null,
    counts.R ? `R:${counts.R}` : null,
  ].filter(Boolean);
  const summary = parts.length > 0 ? ` (${parts.join(', ')})` : '';
  const verb = counts.A && !counts.M && !counts.D && !counts.R ? 'Added' : counts.D && total === counts.D ? 'Removed' : 'Updated';
  const analogy =
    verb === 'Added'
      ? 'like stocking a new shelf in the workshop so tools are easy to find.'
      : verb === 'Removed'
        ? 'like clearing out an unused drawer so the workspace stays tidy.'
        : 'like reorganizing a drawer so the right tool is quicker to grab.';
  return `${verb} ${group.key}${summary} to keep changes readable at a glance; ${analogy}`;
}

function buildSection(entries: Entry[], title?: string, baseCommit?: string): string {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const sectionTitle = title ? `${date} — ${title}` : `${date} — Working tree updates`;
  const baseLine = baseCommit ? `_Base commit marker: ${baseCommit}_\n` : '';
  if (entries.length === 0) {
    return `## ${sectionTitle}\n${baseLine}- No changes detected—like checking your backpack and finding everything already in place.\n\n`;
  }

  const groups = groupEntries(entries);
  const bullets = groups.map((group) => `- ${formatGroupLine(group)}`).join('\n');

  return `## ${sectionTitle}\n${baseLine}${bullets}\n\n`;
}

function upsertChangelog(section: string): void {
  const header = `Timeline of project changes with beginner-friendly analogies for quick scanning.\n\n# Changelog\n\n`;

  if (!fs.existsSync(changelogPath)) {
    fs.writeFileSync(changelogPath, header + section, { encoding: 'utf8' });
    console.log(`Created CHANGELOG.md with new entry.`);
    return;
  }

  const existing = fs.readFileSync(changelogPath, 'utf8');
  const marker = '# Changelog';
  const idx = existing.indexOf(marker);
  if (idx === -1) {
    const combined = header + section + existing;
    fs.writeFileSync(changelogPath, combined, { encoding: 'utf8' });
    console.log(`Updated CHANGELOG.md (inserted header and new entry).`);
    return;
  }

  const insertPos = existing.indexOf('\n', idx + marker.length) + 1 || existing.length;
  const updated = existing.slice(0, insertPos) + section + existing.slice(insertPos);
  fs.writeFileSync(changelogPath, updated, { encoding: 'utf8' });
  console.log(`Updated CHANGELOG.md with new entry.`);
}

function help(): void {
  console.log(`Usage: change-logger [--root <path>] [--staged] [--range <rev>] [--title <text>] [--help]

Options:
  --root <path>  Override repo root (defaults to git root from cwd).
  --staged        Include staged changes only (default: staged + unstaged).
  --range <rev>   git diff range (e.g., main..HEAD). Overrides --staged.
  --title <text>  Title for the changelog section (default: working tree updates).
  --help          Show this help text.

Notes:
  If no --range is provided, the script will look for a base commit marker in
  CHANGELOG.md and include commits since that marker, plus current working tree
  changes. Each run records the latest HEAD commit as the new marker.
  Output is grouped by the first two path segments (e.g., skills/brave-search).
  CHANGELOG.md is always written at the resolved repo root.
`);
}

function main(): void {
  const args = process.argv.slice(2);
  let stagedOnly = false;
  let range: string | null = null;
  let title: string | undefined;
  let rootOverride: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--staged') {
      stagedOnly = true;
    } else if (arg === '--root') {
      rootOverride = args[++i] ?? undefined;
    } else if (arg === '--range') {
      range = args[++i] ?? null;
    } else if (arg === '--title') {
      title = args[++i] ?? undefined;
    } else if (arg === '--help' || arg === '-h') {
      help();
      return;
    }
  }

  const root = resolveRoot(rootOverride);
  gitCwd = root;
  changelogPath = path.join(root, 'CHANGELOG.md');
  console.log(`Using repo root: ${root}`);

  let includeWorkingTree = true;
  let effectiveRange = range;
  let baseMarker: string | null = null;
  let writeMarker = false;

  if (!effectiveRange && !stagedOnly) {
    baseMarker = readBaseCommit();
    if (baseMarker) {
      effectiveRange = `${baseMarker}..HEAD`;
      writeMarker = true;
    }
  }

  if (effectiveRange) {
    includeWorkingTree = range === null;
    writeMarker = true;
  }

  const rangeEntries = effectiveRange ? collectRangeEntries(effectiveRange) : [];
  const workingEntries = includeWorkingTree ? collectWorkingTreeEntries(stagedOnly) : [];
  const entries = mergeEntries(workingEntries, rangeEntries);
  const headCommit = writeMarker ? runGit(['rev-parse', 'HEAD']) : undefined;
  const section = buildSection(entries, title, headCommit);
  upsertChangelog(section);
}

main();
