import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './balance.css';

export interface BalanceAction {
  /** Button label. */
  label: ReactNode;
  /** Icon before the label. */
  icon?: IconName;
  /** `primary` filled brand / `secondary` outlined. @default 'secondary' */
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export interface BalanceQuickAction {
  /** Caption under the round button. */
  label: ReactNode;
  icon: IconName;
  onClick?: () => void;
}

export interface BalanceProps extends HTMLAttributes<HTMLDivElement> {
  /** Small caption above the amount. @default 'Available balance' */
  label?: ReactNode;
  /** Formatted amount string, e.g. '$82,758.10'. */
  amount: string;
  /** Trend caption rendered as a success badge, e.g. '+24% this month'. */
  trend?: ReactNode;
  /** Show the privacy eye that masks the amount. @default true */
  eyeToggle?: boolean;
  /** Full-width action buttons under the amount (Send / Request pair). */
  actions?: BalanceAction[];
  /** Row of round quick actions (Top up / Send / …) — alternative to `actions`. */
  quickActions?: BalanceQuickAction[];
}

/**
 * Available-balance hero — the amount as the star of a dashboard screen:
 * label, 32px bold amount with a privacy eye (click to mask), a success
 * trend badge, and either full-width action buttons or round quick actions.
 *
 * @example
 * <Balance
 *   amount="$82,758.10"
 *   trend="+24% this month"
 *   actions={[
 *     { label: 'Send', icon: 'arrow-up-right', variant: 'primary' },
 *     { label: 'Request', icon: 'arrow-down-left' },
 *   ]}
 * />
 */
export const Balance = forwardRef<HTMLDivElement, BalanceProps>(function Balance(
  {
    label = 'Available balance',
    amount,
    trend,
    eyeToggle = true,
    actions,
    quickActions,
    className,
    ...rest
  },
  ref,
) {
  const [masked, setMasked] = useState(false);
  return (
    <div ref={ref} className={cx('bal-hero', className)} {...rest}>
      <div className="bal-head">
        <div className="bal-label">{label}</div>
        <div className="amt-row">
          <span className={cx('bal-amount', masked && 'masked')}>{masked ? '••••••' : amount}</span>
          {eyeToggle && (
            <button
              className="bal-eye"
              type="button"
              aria-label={masked ? 'Show balance' : 'Hide balance'}
              aria-pressed={masked}
              onClick={() => setMasked((m) => !m)}
            >
              <Icon name={masked ? 'eye-off' : 'eye'} strokeWidth={1.7} />
            </button>
          )}
        </div>
        {trend != null && <span className="bal-badge">{trend}</span>}
      </div>
      {actions && actions.length > 0 && (
        <div className="bal-actions">
          {actions.map((a, i) => (
            <button
              key={i}
              className={cx('bal-btn', a.variant === 'primary' ? 'primary' : 'secondary')}
              type="button"
              onClick={a.onClick}
            >
              {a.icon && <Icon name={a.icon} aria-hidden />}
              {a.label}
            </button>
          ))}
        </div>
      )}
      {quickActions && quickActions.length > 0 && (
        <div className="bal-quick">
          {quickActions.map((a, i) => (
            <div key={i} className="q">
              <button
                className="q-btn"
                type="button"
                onClick={a.onClick}
                aria-label={typeof a.label === 'string' ? a.label : undefined}
              >
                <Icon name={a.icon} aria-hidden />
              </button>
              <span className="q-lbl">{a.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
