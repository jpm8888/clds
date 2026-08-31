# @mav/bayad

MaV design system for the **Bayad** fintech prototype — token-driven React components
ported from the MaV (Modular App Visualizer) HTML design system. Mobile-first,
light/dark theming via one attribute, zero styling dependencies.

## Quickstart

```bash
bun add @mav/bayad   # or bun link from this repo during development
```

```tsx
// main.tsx
import '@mav/bayad/styles.css';
import { Button, TextField, BalanceCard } from '@mav/bayad';
import { color, space } from '@mav/bayad/tokens';

// dark mode — no provider, just an attribute:
document.documentElement.setAttribute('data-theme', 'dark');
```

Load fonts in `index.html` (Plus Jakarta Sans + JetBrains Mono via Google Fonts — see
CLAUDE.md) or `import '@mav/bayad/fonts.css'`.

## Development

```bash
bun install
bun run storybook        # component workshop @ localhost:6006 (light/dark toolbar)
bun run verify           # typecheck + lint + token check + build + storybook build
```

- `src/tokens/` — the design-token layer (651 CSS custom properties, normalized from
  the Figma-verbatim source names; see `docs/tokens-figma-mapping.md`).
- `src/components/{atoms,molecules,organisms}/<Name>/` — one folder per component:
  `Name.tsx`, `name.css`, `Name.stories.tsx`, `index.ts`.
- `scripts/check-tokens.ts` — fails the build on any `var(--mav-*)` that isn't defined.
- **CLAUDE.md** — the AI-consumption contract: component index, rules, screen recipes.

## Source

Ported from `MaV-Ver2-main` (static HTML design system, Figma "Modular App Visualizer").
The full asset library (16 card skins, ~40 illustrations) remains there; this package
bundles a curated subset.
