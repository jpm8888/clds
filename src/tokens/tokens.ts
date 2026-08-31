/**
 * @mav/bayad — typed design-token map.
 *
 * Every value is a `var(--mav-…)` CSS string, ready to drop into inline
 * styles or CSS-in-JS-free style objects:
 *
 * ```tsx
 * import { color, space, radius } from '@mav/bayad/tokens';
 * <div style={{ background: color.bgSecondary, padding: space[16], borderRadius: radius.md }} />
 * ```
 *
 * The resolved light/dark values are noted per token. NEVER hardcode hex
 * colors in app code — dark mode works by re-pointing these variables when
 * `data-theme="dark"` is set on `<html>`.
 *
 * Component-internal tokens (e.g. `--mav-btn-*`, `--mav-input-*`) are not
 * exported here on purpose: they are consumed by the design-system CSS
 * itself. App code should style layouts with the tokens below and use the
 * React components for everything else.
 */

export const color = {
  /** Brand primary. Light `#352eff` (electric blue) / dark `#a1ff5b` (lime). */
  primary: 'var(--mav-main-primary)',
  /** Brand secondary. Light `#0053ff` / dark `#a1ff5b`. */
  secondary: 'var(--mav-main-secondary)',
  /** Brand tertiary 1 — soft periwinkle `#7c9dff` (both themes). */
  tertiary1: 'var(--mav-main-tertiary-1)',
  /** Brand tertiary 2. Light `#030192` (deep navy) / dark `#a1ff5b`. */
  tertiary2: 'var(--mav-main-tertiary-2)',

  /** Page background. Light `#ffffff` / dark `#171717`. */
  bgDefault: 'var(--mav-bg-default)',
  /** Secondary background (grouped rows, wells). Light `#e5e5e5` / dark `#242424`. */
  bgSecondary: 'var(--mav-bg-secondary)',
  /** Tinted brand background (highlights, swipe-up areas). Light `#e6edff` / dark `#f6fff1`. */
  bgTertiary: 'var(--mav-bg-tertiary)',
  /** Raised surface (cards). Light `#ffffff` / dark `#1f1f1f`. */
  surface: 'var(--mav-surface)',

  /** Primary text. Light `#171717` / dark `#ffffff`. */
  textDefault: 'var(--mav-text-default)',
  /** Secondary/description text — `#7f7f7f` (both themes). */
  textDescription: 'var(--mav-text-description)',
  /** Placeholder text. Light `#b2b2b2`. */
  textPlaceholder: 'var(--mav-text-placeholder)',
  /** Disabled text. Light `#cccccc`. */
  textDisabled: 'var(--mav-text-disabled)',
  /** Brand-colored text/links. Light `#352eff` / dark `#a1ff5b`. */
  textBrand: 'var(--mav-text-brand)',
  /** Text on brand/inverse surfaces. Light `#ffffff` / dark `#171717`. */
  textInverted: 'var(--mav-text-inverted)',

  /** Default icon tint. Light `#171717` / dark `#ffffff`. */
  iconDefault: 'var(--mav-icon-default)',
  /** Active/selected icon. Light `#352eff` / dark `#a1ff5b`. */
  iconActive: 'var(--mav-icon-active)',
  /** Subtle icon `#b2b2b2`. */
  iconSubtle: 'var(--mav-icon-subtle)',
  /** Icon on brand/inverse surfaces. */
  iconInverted: 'var(--mav-icon-inverted)',

  /** Hairline divider. Light `#efefef` / dark `#484848`. */
  divider: 'var(--mav-divider-default)',
  /** Strong border. Light `#171717` / dark `#ffffff`. */
  borderDefault: 'var(--mav-border-default)',
  /** Subtle border. Light `#efefef` / dark `#b2b2b2`. */
  borderSubtle: 'var(--mav-border-subtle)',
  /** Active border. Light `#352eff` / dark `#a1ff5b`. */
  borderActive: 'var(--mav-border-active)',
  /** Disabled border `#cccccc`. */
  borderDisabled: 'var(--mav-border-disabled)',

  /** Danger `#ff0000` — identical in both themes. */
  danger: 'var(--mav-system-danger)',
  /** Danger at 10% alpha — soft backgrounds. */
  dangerSoft: 'var(--mav-system-danger-soft)',
  /** Success `#629c28` — identical in both themes. */
  success: 'var(--mav-system-success)',
  /** Success at 10% alpha. */
  successSoft: 'var(--mav-system-success-soft)',
  /** Warning `#ff8400` — identical in both themes. */
  warning: 'var(--mav-system-warning)',
  /** Warning at 10% alpha. */
  warningSoft: 'var(--mav-system-warning-soft)',
  /** Info blue `#144cc7`. */
  info: 'var(--mav-system-info)',
  /** Neutral status `#d9d9d9`. */
  natural: 'var(--mav-system-natural)',

  /** Bottom-sheet scrim. Light `#0d0d0d80` / dark `#00000099`. */
  blanket: 'var(--mav-blanket)',
} as const;

/** Spacing scale, px-named (e.g. `space[16]` → 16px). */
export const space = {
  0: 'var(--mav-space-0)',
  2: 'var(--mav-space-2)',
  4: 'var(--mav-space-4)',
  6: 'var(--mav-space-6)',
  8: 'var(--mav-space-8)',
  10: 'var(--mav-space-10)',
  12: 'var(--mav-space-12)',
  14: 'var(--mav-space-14)',
  16: 'var(--mav-space-16)',
  18: 'var(--mav-space-18)',
  20: 'var(--mav-space-20)',
  24: 'var(--mav-space-24)',
  28: 'var(--mav-space-28)',
  32: 'var(--mav-space-32)',
  36: 'var(--mav-space-36)',
  38: 'var(--mav-space-38)',
  40: 'var(--mav-space-40)',
  44: 'var(--mav-space-44)',
  48: 'var(--mav-space-48)',
  54: 'var(--mav-space-54)',
  56: 'var(--mav-space-56)',
  64: 'var(--mav-space-64)',
} as const;

export const layout = {
  /** Horizontal page padding on mobile — 20px. */
  containerPadding: 'var(--mav-container-padding)',
  /** Max content width on the 390px reference viewport — 343px. */
  maxContentWidth: 'var(--mav-max-content-width)',
} as const;

export const radius = {
  /** 2px. */ xs: 'var(--mav-radius-xs)',
  /** 4px — the default button/input radius. */ sm: 'var(--mav-radius-sm)',
  /** 8px. */ md: 'var(--mav-radius-md)',
  /** 16px — cards. */ lg: 'var(--mav-radius-lg)',
  /** Pill/circle. */ full: 'var(--mav-radius-full)',
  /** 32px — bottom-sheet top corners. */ sheet: 'var(--mav-radius-sheet)',
} as const;

export const borderWidth = {
  xs: 'var(--mav-border-width-xs)',
  sm: 'var(--mav-border-width-sm)',
  md: 'var(--mav-border-width-md)',
} as const;

export const shadow = {
  xs: 'var(--mav-shadow-xs)',
  sm: 'var(--mav-shadow-sm)',
  md: 'var(--mav-shadow-md)',
  lg: 'var(--mav-shadow-lg)',
  xl: 'var(--mav-shadow-xl)',
  /** 1px outline + soft drop — cards on white. */
  outline: 'var(--mav-shadow-outline)',
  /** Subtle raised edge used by inputs and small cards. */
  input: 'var(--mav-shadow-input)',
  /** Brand focus ring — identical in light and dark. */
  focus: 'var(--mav-shadow-focus)',
  /** Softer blue focus ring used by form fields. */
  focusSoft: 'var(--mav-shadow-focus-soft)',
} as const;

export const font = {
  /** Active UI family (defaults to Plus Jakarta Sans). Override --mav-font-active to swap. */
  body: 'var(--mav-font-body)',
  display: 'var(--mav-font-display)',
  /** JetBrains Mono — amounts, card numbers, code. */
  mono: 'var(--mav-font-mono)',
} as const;

export const fontSize = {
  h1: 'var(--mav-font-size-h1)',
  h2: 'var(--mav-font-size-h2)',
  h3: 'var(--mav-font-size-h3)',
  h4: 'var(--mav-font-size-h4)',
  h5: 'var(--mav-font-size-h5)',
  h6: 'var(--mav-font-size-h6)',
  h7: 'var(--mav-font-size-h7)',
  /** 20px. */ xl: 'var(--mav-font-size-xl)',
  /** 18px. */ lg: 'var(--mav-font-size-lg)',
  /** 16px. */ md: 'var(--mav-font-size-md)',
  /** 14px — the default UI size. */ sm: 'var(--mav-font-size-sm)',
  /** 12px. */ xs: 'var(--mav-font-size-xs)',
  /** 10px. */ '2xs': 'var(--mav-font-size-2xs)',
} as const;

export const fontWeight = {
  regular: 'var(--mav-font-weight-regular)',
  medium: 'var(--mav-font-weight-medium)',
  semibold: 'var(--mav-font-weight-semibold)',
  bold: 'var(--mav-font-weight-bold)',
} as const;

export const duration = {
  /** 0.15s — hover/press feedback. */
  fast: 'var(--mav-duration-fast)',
  /** 0.18s — small state changes. */
  base: 'var(--mav-duration-base)',
  /** 0.2s — toggles, tabs. */
  med: 'var(--mav-duration-med)',
  /** 0.38s — sheets, page transitions. */
  slow: 'var(--mav-duration-slow)',
} as const;

export const easing = {
  /** cubic-bezier(.22,.9,.3,1) — the MaV signature ease-out. */
  out: 'var(--mav-ease-out)',
  standard: 'var(--mav-ease-standard)',
} as const;

export const zIndex = {
  base: 'var(--mav-z-base)',
  sticky: 'var(--mav-z-sticky)',
  appbar: 'var(--mav-z-appbar)',
  overlay: 'var(--mav-z-overlay)',
  sheet: 'var(--mav-z-sheet)',
  toast: 'var(--mav-z-toast)',
  tooltip: 'var(--mav-z-tooltip)',
} as const;

/**
 * Breakpoints in px. CSS custom properties cannot appear in @media queries,
 * so use these numbers directly (and comment the breakpoint name).
 */
export const breakpoints = {
  /** 360 — small Android. */
  xs: 360,
  /** 390 — the reference mobile viewport. */
  sm: 390,
  /** 600 — large phone / small tablet. */
  mdSm: 600,
  /** 768 — tablet. */
  md: 768,
  /** 1024 — small laptop. */
  lg: 1024,
  /** 1280 — desktop. */
  xl: 1280,
  /** 1440 — wide desktop. */
  '2xl': 1440,
} as const;

export type ColorToken = keyof typeof color;
export type SpaceToken = keyof typeof space;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadow;
export type FontSizeToken = keyof typeof fontSize;
export type Breakpoint = keyof typeof breakpoints;
