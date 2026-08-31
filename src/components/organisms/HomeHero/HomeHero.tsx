import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './home-hero.css';

/** Time-of-day greeting: 05:00–11:59 morning · 12:00–17:59 afternoon ·
 * 18:00–04:59 evening. The greeting is the one piece of copy that should
 * never be wrong, so it comes from the device clock; only the words change —
 * the panel does not re-tint by hour, because a brand that looks different
 * in the morning is not a brand. */
export function greetingForHour(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good morning,';
  if (hour >= 12 && hour < 18) return 'Good afternoon,';
  return 'Good evening,';
}

const sparkPath = <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />;

/* The "Power On" ring from the client's own mark. */
const orb = (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle
      cx="50"
      cy="52"
      r="34"
      strokeWidth="9"
      strokeLinecap="round"
      strokeDasharray="182 32"
      transform="rotate(96 50 52)"
    />
    <rect x="45.5" y="6" width="9" height="30" rx="4.5" fill="#fff" stroke="none" />
  </svg>
);

export interface HomeHeroProps extends HTMLAttributes<HTMLDivElement> {
  /** Short name in the headline (e.g. "Saurabh"). */
  name: string;
  /** Full name in the identity row; defaults to `name`. */
  fullName?: string;
  /** Masked phone / secondary identity line (e.g. "+63 •••• 8265"). */
  detail?: ReactNode;
  /** Avatar initials, or a full <img> / custom node. */
  avatar?: ReactNode;
  /** Greeting line. Defaults to the device clock via {@link greetingForHour}. */
  greeting?: ReactNode;
  /** Supporting line under the headline (max-width 250px by design). */
  subline?: ReactNode;
  /** Primary CTA label — a white card button on the gradient. */
  ctaLabel?: ReactNode;
  onCta?: () => void;
  /** Quiet dismiss link next to the CTA (e.g. "Not now"). */
  dismissLabel?: ReactNode;
  onDismiss?: () => void;
  /** Show the notification bell. @default true */
  bell?: boolean;
  /** Unread dot on the bell. */
  bellDot?: boolean;
  onBellClick?: () => void;
  /** Compact variant: headline only — no subline, actions, or detail line. */
  mini?: boolean;
}

/**
 * Home Hero — the greeting panel at the top of the home screen. The panel is
 * warm end to end (primary → deep) with a drifting white highlight; blue is
 * deliberately not mixed into it (orange and blue mixed along a line always
 * cross grey) and carries the brand elsewhere on the screen. The decorative
 * object is the brand's own "Power On" ring. Pair with {@link HomeHeroWallet}
 * immediately after — it overlaps the panel's bottom padding.
 *
 * @example
 * <HomeHero name="Saurabh" fullName="Saurabh Chandolia" detail="+63 •••• 8265"
 *   subline="Add your account number once and your bills come to you."
 *   ctaLabel="Add an account" onCta={addAccount} dismissLabel="Not now" />
 * <HomeHeroWallet balance="0.00" />
 */
export const HomeHero = forwardRef<HTMLDivElement, HomeHeroProps>(function HomeHero(
  {
    name,
    fullName = name,
    detail,
    avatar,
    greeting,
    subline,
    ctaLabel,
    onCta,
    dismissLabel,
    onDismiss,
    bell = true,
    bellDot,
    onBellClick,
    mini,
    className,
    ...rest
  },
  ref,
) {
  const greet = greeting ?? greetingForHour(new Date().getHours());
  return (
    <div ref={ref} className={cx('hh', mini && 'hh-mini', className)} {...rest}>
      <div className="hh-orb">{orb}</div>
      <svg className="hh-spark s1" viewBox="0 0 24 24" aria-hidden="true">
        {sparkPath}
      </svg>
      <svg className="hh-spark s2" viewBox="0 0 24 24" aria-hidden="true">
        {sparkPath}
      </svg>
      <svg className="hh-spark s3" viewBox="0 0 24 24" aria-hidden="true">
        {sparkPath}
      </svg>
      <div className="hh-body">
        <div className="hh-top hh-rise">
          {avatar != null && <div className="hh-avatar">{avatar}</div>}
          <div className="hh-who">
            <div className="hh-who-n">{fullName}</div>
            {detail && <div className="hh-who-s">{detail}</div>}
          </div>
          {bell && (
            <button type="button" className="hh-bell" aria-label="Notifications" onClick={onBellClick}>
              {bellDot && <i aria-hidden="true" />}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 8-3 8h18s-3-1-3-8" />
                <path d="M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
            </button>
          )}
        </div>
        <div className="hh-rise d1">
          <div className="hh-greet">{greet}</div>
          <div className="hh-name">{name}</div>
        </div>
        {subline && <div className="hh-sub hh-rise d2">{subline}</div>}
        {(ctaLabel || dismissLabel) && (
          <div className="hh-acts hh-rise d3">
            {ctaLabel && (
              <button type="button" className="hh-cta" onClick={onCta}>
                {ctaLabel}
              </button>
            )}
            {dismissLabel && (
              <button type="button" className="hh-link" onClick={onDismiss}>
                {dismissLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export interface HomeHeroWalletProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title. @default 'Bayad Wallet' */
  title?: ReactNode;
  /** Trailing hint (e.g. "swipe ›"), in the accessibility-nudged secondary blue. */
  swipeHint?: ReactNode;
  onSwipe?: () => void;
  /** @default 'Current balance' */
  balanceLabel?: ReactNode;
  /** Currency symbol rendered small before the figure. @default '₱' */
  currency?: string;
  /** Preformatted balance figure (mono). */
  balance: string;
  /** Account tier tag (e.g. "Basic account"). */
  tag?: ReactNode;
  /** Action pill label (e.g. "Upgrade"). */
  actionLabel?: ReactNode;
  onAction?: () => void;
}

/**
 * The wallet card that overlaps the Home Hero panel — render it immediately
 * after {@link HomeHero}; its negative top margin rides the panel's bottom
 * padding.
 */
export const HomeHeroWallet = forwardRef<HTMLDivElement, HomeHeroWalletProps>(
  function HomeHeroWallet(
    {
      title = 'Bayad Wallet',
      swipeHint = 'swipe ›',
      onSwipe,
      balanceLabel = 'Current balance',
      currency = '₱',
      balance,
      tag,
      actionLabel,
      onAction,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div ref={ref} className={cx('hh-wallet', className)} {...rest}>
        <div className="hh-w-top">
          <span className="hh-w-t">{title}</span>
          {swipeHint && (
            <button type="button" className="hh-w-swipe" onClick={onSwipe}>
              {swipeHint}
            </button>
          )}
        </div>
        <div className="hh-w-l">{balanceLabel}</div>
        <div className="hh-w-v">
          <span>{currency}</span>
          {balance}
        </div>
        {(tag || actionLabel) && (
          <div className="hh-w-bot">
            {tag && <span className="hh-w-tag">{tag}</span>}
            {actionLabel && (
              <button type="button" className="hh-w-up" onClick={onAction}>
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);
