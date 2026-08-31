# Figma → normalized token mapping

The source system (`MaV-Ver2-main/css/tokens.css`) preserves Figma variable names
verbatim — slashes, spaces, ampersands, casing, and typos included. This port
normalizes everything to kebab-case `--mav-*` names. This document is the contract for
tracing a token back to Figma.

## Normalization rules

1. `/`, ` `, `&` → `-`; everything lowercased. `--btn/primary/default` → `--mav-btn-primary-default`.
2. Figma typos are **fixed** (the source deliberately preserved them):
   | Figma (verbatim)                          | Normalized                                       |
   | ----------------------------------------- | ------------------------------------------------ |
   | `alert/waring/*`, `badge & chip/waring/*` | `--mav-alert-warning-*`, `--mav-badge-warning-*` |
   | `devider/default`                         | `--mav-divider-default`                          |
   | `main-text/inverterd`                     | `--mav-text-inverted`                            |
   | `Color/Netural/White`                     | folds into `--mav-main-white`                    |
   | `bubble/*outcoming*`                      | `--mav-bubble-*outgoing*`                        |
3. Redundant part names are shortened: `bg-box`→`bg`, `outline-box`→`outline`,
   `text-default`→`text` (in button/badge contexts), `bg-box-active`→`bg` (the state is
   already in the name), `active-state`→`active`.

## Namespace map

| Figma / source CSS namespace                           | Normalized namespace                                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `--bc-*` (baseColors.js primitives)                    | `--mav-bc-*` (primitives.css — never used by components)                                                     |
| `--Main/*`                                             | `--mav-main-*`                                                                                               |
| `--Mono/N`                                             | `--mav-mono-N`                                                                                               |
| `--System/*`                                           | `--mav-system-*`                                                                                             |
| `--Tint/Primary/N`, `--Shade/Primary/N` (etc.)         | `--mav-tint-primary-N`, `--mav-shade-primary-N`, `…-secondary-N`, `…-tertiary-N`, `…-tertiary2-N`            |
| `--background/bg-*`                                    | `--mav-bg-*` (`bg-default` → `--mav-bg-default`)                                                             |
| `--main-text/*`                                        | `--mav-text-*`                                                                                               |
| `--icon/*`                                             | `--mav-icon-*`                                                                                               |
| `--border/*`                                           | `--mav-border-*`                                                                                             |
| `--btn/{primary,secondary,textonly,sliding,swipeup}/*` | `--mav-btn-{…}-*` (`default-outline`→`outline`, `Bg`→`bg`, `Bg-2`→`bg2`, `sliding-disabled`→`knob-disabled`) |
| `--input-field/{state}/{part}`                         | `--mav-input-{state}-{part}`                                                                                 |
| `--OTP/*`, `--otp-slot/*`                              | `--mav-otp-*`, `--mav-otp-slot-*`                                                                            |
| `--Checkbox/*`, `--toggle/*`, `--Radio/*`              | `--mav-checkbox-*`, `--mav-toggle-*`, `--mav-radio-*`                                                        |
| `--alert/*`, `--badge & chip/*`                        | `--mav-alert-*`, `--mav-badge-*`                                                                             |
| `--avatar/*`, `--toast/*`                              | `--mav-avatar-*`, `--mav-toast-*`                                                                            |
| `--nav bar/*`, `--menu/*`                              | `--mav-nav-*`, `--mav-menu-*`                                                                                |
| `--Tabs/Tab-Default`, `--Tabs/Tab-Active`              | `--mav-tabs-default`, `--mav-tabs-active`                                                                    |
| `--account/*`, `--button-dock/bg-dock`                 | `--mav-account-*`, `--mav-dock-bg`                                                                           |
| `--bubble/*`, `--coachmark/*`                          | `--mav-bubble-*`, `--mav-coachmark-*`                                                                        |
| `--Balance/*`, `--Header-app bar/bg-header`            | `--mav-balance-*`, `--mav-appbar-bg`                                                                         |
| `--gain&loss/*`, `--Line-Chart/*`                      | `--mav-gainloss-*`, `--mav-chart-*`                                                                          |
| `--loader/spin`                                        | `--mav-loader-spin`                                                                                          |
| `--color/blanket/bold`, `--radius/sheet/lg`            | `--mav-blanket`, `--mav-radius-sheet`                                                                        |
| `--layout/*`                                           | `--mav-container-padding`, `--mav-max-content-width`, `--mav-otp-*`                                          |

## Collapsed redundancies

The source shipped several parallel namings; each collapses to ONE set here:

- **Spacing** — `--space-N`, `--spacing/K` (Tailwind step ×4 = px) and `--Spacing/N`
  all fold into `--mav-space-N` (px-named).
- **Shadows** — the `rgba(16,16,19,…)` scale keeps its names (`--mav-shadow-xs…xl`,
  `--shadow-custom` → `--mav-shadow-outline`). Of the Figma effect styles,
  `--shadow/sm` was byte-identical to `--shadow-input` → both are
  `--mav-shadow-input`; `--shadow/md|lg|xl|2xl` were unused by component pages and are
  mapped to the nearest `--mav-shadow-*` when encountered. `--focus/primary` →
  `--mav-shadow-focus-soft`.
- **Font sizes** — `--medium/*` (12–20) and `--body/*` (10–20) fold into one scale:
  `--mav-font-size-{2xs:10, xs:12, sm:14, md:16, lg:18, xl:20}` + headings
  `--mav-font-size-{h1:64 … h7:24}` (the heading scale was documented but untokenized
  in the source).
- **Doc aliases** — the source's `--mav-primary/bg/fg/muted/border/placeholder`
  shorthand set folds into the semantic layer (`--mav-main-primary`,
  `--mav-bg-default`, `--mav-text-default`, `--mav-text-description`,
  `--mav-border-subtle`, `--mav-text-placeholder`).

## New in this port (no Figma source)

- `--mav-z-*` (z-index layers), `--mav-duration-*` + `--mav-ease-*` (motion),
  heading font sizes, line-heights, letter-spacings, breakpoints (TS-only).
- `--mav-bc-primary-dark-soft: #ff7a3d1a` — the source referenced
  `--bc-dark-primary-soft` in `--gradient-brand` but never defined it (known bug),
  fixed here.

## Known source quirks preserved

- `--mav-bc-manna-200` = `--mav-bc-manna-100` = `#ffefc7` (duplicate in the Figma
  export, kept for parity).
- The neon theme and `--bc-neon-*` collection were **dropped** (light + dark only).

## Bayad rebrand

Brand-carrying values no longer trace to the MaV Figma file: they come from the
**Bayad brand layer** (`css/brands/bayad.css`, `bayad-design-system` branch of the
source repo), which re-pointed 69 brand tokens at six observed/derived Bayad values
(primary `#f26122`, official blue `#2188ca`, tint `#f58859`, deep `#c2491a`, pale
wash `#fde4da`, dark primary `#ff7a3d`) and re-solved the tint/shade ramps with
MaV's original mix ratios. Non-brand families (mono, status, illustrative ramps)
still trace to the Figma names below.
- Kept one-off literals (no palette primitive exists): progress-bar fills, dark chat
  bubbles, blanket scrims — each marked `/* one-off */` in the token files.
