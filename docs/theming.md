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
3. Status colors (danger `#ff0000`, success `#629c28`, warning `#ff8400`) are
   **identical in both themes** by design. The focus ring lifts with the primary
   (`rgba(242,97,34,.4)` → `rgba(255,122,61,.4)`).
4. The headline flip: brand primary `#f26122` (Bayad orange) → `#ff7a3d` (lifted
   orange — hue held). Because the primary stays orange in both themes, text on
   primary is **pinned white in both** — still always use `--mav-btn-primary-text` /
   `--mav-text-inverted`, never a literal.
5. The full-width primary CTA is a gradient, not a flat fill: `--mav-btn-primary-bg`
   runs orange → blue (with a warm mid stop, upgraded to oklab interpolation where
   supported). It is applied by the Button `xl` size only — a narrow button would
   show just the middle of the ramp and read as disabled. The gradient token is for
   `background` only; borders, strokes and SVG stops use the flat
   `--mav-btn-primary-default`.

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

The palette is the **Bayad brand layer** from the source MaV system
(`css/brands/bayad.css` on the `bayad-design-system` branch): primary orange
`#f26122` observed from the live Bayad app, official blue `#2188ca` secondary,
with the tint/shade ramps re-solved from MaV's original mix ratios. MaV's own
blue/lime palette and its third `neon` theme were deliberately dropped in this
port; the non-brand families (mono scale, status colors, illustrative data-viz
ramps) remain from the MaV Figma source.
