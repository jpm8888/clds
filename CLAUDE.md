# @mav/bayad — MaV Design System

Token-driven React component library for the **Bayad** fintech prototype (mobile-first
e-banking: balances, transfers, cards, QR pay, OTP auth). This file is the contract for
AI agents building apps with this package — follow it and screens come out on-brand.

## Setup (the three things every consumer must do)

```tsx
// 1. once, at the app root:
import '@mav/bayad/styles.css';

// 2. load fonts — add to index.html (preferred):
//    <link rel="preconnect" href="https://fonts.googleapis.com">
//    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Inter:wght@100..900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
//    (or: import '@mav/bayad/fonts.css')

// 3. theming — one attribute, no provider:
document.documentElement.setAttribute('data-theme', 'dark'); // or 'light' / remove
```

## Hard rules

1. **Never hardcode colors.** Use `var(--mav-…)` in CSS, or the typed maps from
   `@mav/bayad/tokens` (`color`, `space`, `radius`, `shadow`, `fontSize`, `fontWeight`,
   `duration`, `easing`, `zIndex`, `breakpoints`) in inline styles.
2. **Never write dark-mode styles.** Dark mode is automatic — the tokens flip when
   `data-theme="dark"` is set (brand: `#f26122` Bayad orange → `#ff7a3d` lifted orange). If something
   looks wrong in dark, you used a literal color; replace it with a token.
3. **Layout is mobile-first**: 390px reference viewport, `--mav-container-padding`
   (20px) side padding, content max-width `--mav-max-content-width` (343px). One
   `primary` Button per screen; the main CTA is `<Button size="xl">` inside a
   `<ButtonDock>`.
4. **Icons**: `<Icon name="…" />` — `name` is a typed union (typos fail to compile).
   Icon-only buttons need `aria-label`. Amounts and card numbers use
   `fontFamily: font.mono`.
5. Spacing rhythm: 4/8/12/16/20/24/32 px (`space[16]` etc.). Radius: `sm` (4px) for
   buttons/inputs, `lg` (16px) for cards, `sheet` (32px) for bottom-sheet tops.
6. Z-index only via `zIndex.*` tokens (sticky < appbar < overlay < sheet < toast).
7. Components accept `className` and native HTML props; interactive ones forward refs
   and support controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) use.

## Component index

### Atoms
| Export | Purpose / key props |
|---|---|
| `Button` | Actions. `variant: primary\|secondary\|clear\|swipe`, `size: xs\|sm\|md\|lg\|xl`, `leadingIcon`, `trailingIcon`, `iconOnly`, `loading` |
| `Icon` | Line icon. `name: IconName` (typed union), `size` (16/20/24) |
| `TextField` | Text input. `size: sm\|md\|lg`, `label`, `description`, `errorMessage`, `leadingIcon`, `trailingIcon`, `prefix` |
| `Textarea` | Multiline input. Same states as TextField |
| `SearchField` | Search input with magnifier, `clearable` + `onClear` |
| `OtpInput` | 4–6 digit code entry. `length`, `variant: boxed\|boxless`, `onComplete`, auto-advance/paste |
| `Badge` / `Chip` | Status labels / filter chips. `color: primary\|white\|warning\|success\|danger` |
| `Avatar` / `AvatarStack` / `AvatarProfile` | People. `src` or initials; stack overlaps |
| `Divider` | Hairline; optional `label` ("or continue with") |
| `Spinner` | Loading spinner, `size` |
| `ProgressBar` | Determinate progress, `label`/`showValue` |
| `Illustration` | Bundled brand SVG art. `name: IllustrationName` or `src` |
| `SocialButton` | Sign-in with Apple/Google… white card button |
| `TextLink` | Inline text link, `variant: primary\|secondary\|tertiary` |

### Molecules
| Export | Purpose / key props |
|---|---|
| `Checkbox` / `Radio` / `Toggle` | Form controls (native inputs; Toggle is `role="switch"`) |
| `Stepper` | Multi-step progress indicator |
| `AmountInput` | Large centered currency entry + preset chips |
| `Tabs` / `PillTabs` / `GlideTabs` | Tab strips; `items`, `value`/`onChange`; GlideTabs animates the indicator |
| `ButtonGroup` | Segmented control |
| `MenuButton` | Circular icon button + label (quick actions grid) |
| `ButtonDock` | Bottom dock hosting xl Buttons (safe-area aware) |
| `Breadcrumb` | Path navigation |
| `Coachmark` | Onboarding tooltip with dots |
| `Alert` | Inline banner. `variant: primary\|warning\|success\|danger` |
| `Toast` / `ToastNotification` / `Snackbar` | Transient feedback (Snackbar is compact, always dark) |
| `EmptyState` | Centered empty/loading state. `media: illustration\|icon\|loader` |
| `PaymentCard` | Card face. `skin` from `paymentCardSkins`, number/holder/expiry |
| `List` + `ListRow` (+ `ListSoftIcon`, `ListAvatar`, `ListStore`, `ListButton`, `ListTag`, `ListCheck`) | Row lists with accessory variants |
| `SectionHeader` | Section title + action, spacing presets |
| `BlogCard` / `BlogListRow` | Content cards |
| `Pagination` | Page controls, controlled `page` |
| `Balance` | Balance amount display with visibility eye-toggle |
| `CashflowCard` | Income/expense summary with gain/loss badge |
| `Chart` | Data-driven SVG line/bar chart. `data`, `variant: gain\|loss\|warning\|brand` |
| `ChatBubble` / `ChatThread` | Support-chat bubbles (incoming/outgoing, replies) |
| `MessageInput` | Chat composer strip |
| `Datepicker` | Month-grid calendar, `value`/`onChange`, min/max, keyboard nav |
| `SwipeButton` | Swipe-to-confirm with real drag; `onConfirm`, Enter/Space fallback |

### Organisms & screens
| Export | Purpose |
|---|---|
| `AppBar` | Top app bar (title/back/actions; `inverted` stays dark) |
| `BottomNav` | Bottom tab bar with active glide + badges |
| `BottomSheet` | Modal sheet: blanket, drag-to-dismiss, Esc, scroll-lock, focus mgmt |
| `PhoneFrame` | Presentational phone bezel for demos/stories |
| `BalanceCard` | Hero account balance card with actions |
| `TransactionList` / `TransactionItem` | Transaction rows with signed amounts |
| `SpendLimit` / `SpendBarChart` | Spending limit progress + bars |
| `LinkedAccounts` | Linked bank account rows |
| `QrPay` | Scan-to-pay card |
| `ReceiptDetail` | Transaction receipt (status, amount, meta rows) |
| `DonutChart` | Spend-by-category donut (data-driven SVG) |
| `PinDots` | PIN entry dots + keypad |
| `AmountSlider` | Amount range slider |
| `LoginForm` | Sign-in screen (fields, CTA, social row) |
| `OtpEntry` | OTP verification screen with resend timer |
| `SelectAccount` | "Select source of funds" screen with locked rows |
| `Splash` | Bayad launch screen (light/gradient/deep grounds, lockup + progress rail, animated) |
| `HomeHero` + `HomeHeroWallet` | Home greeting panel (warm gradient, Power-On ring, clock greeting) + overlapping wallet card |
| `ServiceMenu` | Home services / bill-category icon grid (one line set, brand-tint chips, one emphasised tile) |
| `BillReminders` + `BillReminderSetup` | Due bills with pay-from-the-row + reminder setup (lead-time chips, channels, autopay) |
| `SnapABillCapture` / `SnapABillReview` | Photograph a paper bill → confirm extracted biller/account/amount/due date |
| `AiAssistant` | Conversational layer over payment history — answers are objects (payable rows, a figure, a chart) |
| `PaymentOrchestration` / `OrchestrationTrace` | Ops (desktop): rail health, ordered routing rules, rollout share; per-payment path trace |
| `Reconciliation` / `ReconciliationEvidence` | Ops (desktop): settlement batch with exceptions; source-of-truth evidence panel |

## Screen recipes (copy-paste starting points)

**Dashboard**
```tsx
<AppBar title="Home" actions={[/* bell */]} />
<div style={{ padding: `0 ${space[20]}`, display: 'grid', gap: space[16] }}>
  <BalanceCard /* balance, actions */ />
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: space[12] }}>
    <CashflowCard direction="income" /* … */ />
    <CashflowCard direction="expense" /* … */ />
  </div>
  <SectionHeader title="Recent activity" action={<TextLink>See all</TextLink>} />
  <TransactionList items={/* … */} />
</div>
<BottomNav items={/* home/stats/scan/chat/profile */} />
```

**Login** — `<Splash>` on boot → `<LoginForm onSubmit={…} />` → `<OtpEntry length={6} onComplete={…} />`.

**Payment confirm** — open a `<BottomSheet>` with `<ReceiptDetail>` summary +
`<SwipeButton onConfirm={pay}>Swipe to pay</SwipeButton>`; on success show `<Toast tone="success">`.

**Send money** — `<SelectAccount accounts={…} onConfirm={…} />` → `<AmountInput>` +
preset chips → `<ButtonDock><Button size="xl">Continue</Button></ButtonDock>`.

## Do / Don't

- ✅ Compose screens from these components; style only layout (flex/grid + `space[*]`).
- ✅ Use `PhoneFrame` in demos, never in the real app shell.
- ❌ No new colors, shadows, or radii; no Tailwind/styled-components on top.
- ❌ No `[data-theme=dark]` selectors in app code.
- ❌ Don't rebuild an existing component ad hoc — check the index above first.

## More context

- `docs/theming.md` — the theming contract in depth.
- `docs/tokens-figma-mapping.md` — trace any token back to its Figma name.
- `docs/guidelines.md` — per-family usage guidance.
- `bun run storybook` — live workshop with a light/dark toolbar.
- Full asset sets (16 card skins, ~40 illustrations) live in the source repo
  (`MaV-Ver2-main/app/assets/`); this package bundles a curated subset.
