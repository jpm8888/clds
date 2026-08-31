/** Copies the standalone CSS exports that don't flow through the Vite JS
 * graph into dist/. Run automatically by `bun run build`. */
import { copyFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
copyFileSync(`${root}src/fonts.css`, `${root}dist/fonts.css`);
console.log('✓ copied fonts.css to dist/');
