# Theming

The MaV system themes with **CSS custom properties and one HTML attribute** — there is
no ThemeProvider and no props-based styling. This is a deliberate contract inherited
from the source design system.

## Switching themes

```ts
// light is the default (no attribute needed)
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme'); // back to light
```

Persist the choice yourself (e.g. `localStorage`), and consider seeding from
`window.matchMedia('(prefers-color-scheme: dark)')`.

## How it works

- `src/tokens/primitives.css` — raw hex palette (`--mav-bc-*`), including light/dark
  pairs (`--mav-bc-mono100-l` / `--mav-bc-mono100-d`).
- `src/tokens/semantic.css` — the tokens components actually use (`--mav-text-default`,
  `--mav-btn-primary-default`, …), defined on `:root` with light values that reference
  primitives.
- `src/tokens/dark.css` — `[data-theme='dark']` re-points ONLY the semantic tokens that
  change. Component CSS never mentions dark mode.

## Rules

1. **Never write dark-specific styles in app code.** If something looks wrong in dark
   mode, the fix is a token, not a `[data-theme=dark]` override.
2. **Never hardcode hex.** Use `var(--mav-…)` or the typed maps from `@mav/bayad/tokens`.
3. Status colors (danger `#ff0000`, success `#629c28`, warning `#ff8400`) and the focus
   ring are **identical in both themes** by design.
4. The headline flip: brand primary `#352eff` (electric blue) → `#a1ff5b` (lime).
   Text on primary flips white → black — always use `--mav-btn-primary-text` /
   `--mav-text-inverted`, never a literal.

## Re-fonting

Override one token to swap the entire system between the three sanctioned UI families
(Plus Jakarta Sans — default, Inter, Poppins):

```css
:root {
  --mav-font-active: var(--mav-font-inter);
}
```

`--mav-font-mono` (JetBrains Mono) is fixed and used for amounts and card numbers.

## Note on the source system

The source MaV system also shipped a third `neon` theme (deep navy + electric lime).
It was deliberately dropped in this port; adding it back is purely additive — a new
`[data-theme='neon']` block re-pointing semantic tokens.
