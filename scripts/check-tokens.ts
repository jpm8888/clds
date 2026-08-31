/**
 * Verifies every `var(--mav-…)` referenced in src CSS/TS(X) is actually
 * defined in src/tokens/*.css. Prevents dangling-token bugs (the source
 * system shipped one: --bc-dark-primary-soft was referenced but never
 * defined). Run: `bun run check-tokens`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('../src', import.meta.url).pathname;
const TOKEN_DIR = join(SRC, 'tokens');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(css|tsx?)$/.test(name) ? [full] : [];
  });
}

const defined = new Set<string>();
for (const file of walk(TOKEN_DIR)) {
  if (!file.endsWith('.css')) continue;
  for (const m of readFileSync(file, 'utf8').matchAll(/(--mav-[\w-]+)\s*:/g)) {
    defined.add(m[1]!);
  }
}

const errors: string[] = [];
for (const file of walk(SRC)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/var\(\s*(--mav-[\w-]+)/g)) {
    const name = m[1]!;
    if (!defined.has(name)) {
      const line = text.slice(0, m.index).split('\n').length;
      errors.push(`${file.replace(SRC, 'src')}:${line} references undefined token ${name}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} dangling token reference(s):\n` + errors.join('\n'));
  process.exit(1);
}
console.log(`✓ all var(--mav-*) references resolve (${defined.size} tokens defined)`);
