import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './balance-card.css';

export interface BalanceCardAction {
  /** Icon from the MaV registry (rendered at 18px). */
  icon: IconName;
  label: string;
  onClick?: () => void;
}

export interface BalanceCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `gradient` = brand blue→secondary gradient (the hero wallet card);
   * `dark` = always-dark savings card with lime accents.
   * @default 'gradient'
   */
  variant?: 'gradient' | 'dark';
  /** Small uppercase label, e.g. "Available Balance". */
  label: string;
  /** The hero amount, e.g. "₦ 284,500.00". Rendered at 36px bold. */
  amount: ReactNode;
  /** Secondary line under the amount, e.g. "Last updated: just now". */
  sub?: ReactNode;
  /** Decorative element in the top-right corner (icon, trend arrow…). */
  trailing?: ReactNode;
  /** Quick actions rendered as translucent buttons along the bottom. */
  actions?: BalanceCardAction[];
}

/**
 * Hero balance card — the anchor of a wallet/dashboard screen. 343px wide,
 * 20px radius, saturated gradient with white text in both themes.
 *
 * Guidance: one BalanceCard at the top of a dashboard; put 2–3 quick
 * actions max (Add money / Send / History).
 *
 * @example
 * <BalanceCard
 *   label="Available Balance"
 *   amount="₦ 284,500.00"
 *   sub="Last updated: just now"
 *   actions={[
 *     { icon: 'plus', label: 'Add Money' },
 *     { icon: 'arrow-left', label: 'Send' },
 *     { icon: 'clock', label: 'History' },
 *   ]}
 * />
 */
export const BalanceCard = forwardRef<HTMLDivElement, BalanceCardProps>(function BalanceCard(
  { variant = 'gradient', label, amount, sub, trailing, actions, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('balance-card', variant === 'dark' && 'balance-card-dk', className)}
      {...rest}
    >
      <div className="bal-row">
        <div>
          <div className="bal-label">{label}</div>
          <div className="bal-amount">{amount}</div>
          {sub && <div className="bal-sub">{sub}</div>}
        </div>
        {trailing}
      </div>
      {actions && actions.length > 0 && (
        <div className="bal-actions">
          {actions.map((a) => (
            <button key={a.label} type="button" className="bal-btn" onClick={a.onClick}>
              <Icon name={a.icon} size={18} aria-hidden />
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
