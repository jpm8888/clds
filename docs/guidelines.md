# Usage guidelines

Per-family guidance for building Bayad screens. The component index and screen recipes
live in CLAUDE.md; this file covers judgment calls.

## Buttons & actions
- One `primary` Button per screen. Secondary paths use `variant="secondary"` or `clear`.
- The screen's main CTA is `<Button size="xl">` inside `<ButtonDock>` at the bottom.
- Destructive-feeling money movements (pay, transfer) prefer `<SwipeButton>` — the drag
  gesture is the confirmation.
- Icon-only buttons always get `aria-label`. Icons stay 20px at every button size.
- `TextLink` for inline navigation ("See all", "Resend code") — never a padded button.

## Forms
- `TextField` for everything single-line; `label` above, `errorMessage` below (sets the
  error state automatically). Don't invent floating labels.
- Money entry uses `AmountInput` (large centered amount + preset chips), not TextField.
- OTP always via `OtpInput` (4 or 6); the full screen flow is `OtpEntry`.
- Checkbox/Radio/Toggle are native inputs under the hood — group radios by `name`,
  label toggles with the `label` prop rather than external text.

## Feedback
- `Alert` = persistent inline banner inside content flow.
- `Toast`/`Snackbar` = transient overlay feedback after an action (position fixed,
  `zIndex.toast`). Snackbar stays dark in both themes — that's by design.
- Empty lists, no-results and inline loading use `EmptyState` (media: illustration /
  icon / loader) — never an ad-hoc centered div.

## Lists & finance
- Any row-based UI is `List` + `ListRow` with an accessory variant — don't hand-roll rows.
- Transactions: `TransactionList`; amounts are signed and colored by direction
  automatically. Amounts elsewhere use `font.mono`.
- Dashboard hierarchy: `BalanceCard` (hero) → `CashflowCard` pair → `SectionHeader` +
  `TransactionList`.
- Charts (`Chart`, `DonutChart`, `SpendBarChart`) are data-driven SVG — pass data, pick
  a `variant`; never import a chart library.

## Navigation & overlays
- Top: `AppBar`. Bottom: `BottomNav` (3–5 items). In-page switching: `Tabs`/`PillTabs`.
- Anything modal on mobile is a `BottomSheet` (not a centered dialog): it handles
  blanket, Esc, drag-down, scroll-lock and focus. Put its CTA in its footer dock.
- `Coachmark` only for first-run onboarding; keep to ≤3 steps.

## Screens
- Boot: `Splash` → auth (`LoginForm` → `OtpEntry`) → app shell (AppBar + content +
  BottomNav).
- Money-source picking uses `SelectAccount` (supports locked rows with messages).
- `PhoneFrame` is for Storybook/demos only — never render it in the app.

## Layout
- Vertical rhythm: `space[16]`–`space[24]` between blocks; `space[8]`–`space[12]`
  within a block. Page gutter: `layout.containerPadding` (20px).
- Cards: `radius.lg` (16px) + `shadow.input` or `shadow.outline`. Don't stack heavy
  shadows on mobile.
- Breakpoints from `breakpoints` (390 is the design target; 768+ may center content at
  `layout.maxContentWidth`-per-column layouts).

## Accessibility
- Focus rings are token-driven and theme-invariant — never remove `outline`/`box-shadow`
  focus styles.
- Respect reduced motion: all decorative animation in the system is already gated;
  gate yours behind `@media (prefers-reduced-motion: no-preference)` too.
- Interactive color contrast is tuned per theme in the tokens; using tokens = inheriting
  the contrast work.

## Known accessibility debt (from the source palette)

axe flags `color-contrast` (serious) on a few Figma-faithful pairs: placeholder text
`#b2b2b2` on white, status text on its 10% soft tint (warning `#ff8400`, success
`#629c28`, danger on `--mav-*-soft` backgrounds), and OTP slot placeholders. These are
inherited from the source design system, excluded from the automated axe gate
(`tests/a11y.spec.ts`), and should be revisited with design if the prototype graduates.
