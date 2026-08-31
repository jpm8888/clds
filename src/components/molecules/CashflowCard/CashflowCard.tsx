import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './cashflow-card.css';

export interface CashflowCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card heading (header row). @default 'Cashflow' */
  title?: ReactNode;
  /** Wallet caption inside the panel. @default 'Available balance' */
  walletName?: ReactNode;
  /** Formatted amount, e.g. '$82,758.10'. */
  amount: string;
  /** Header text action (e.g. 'Detail'). Renders when `onDetail` or this is set. */
  detailLabel?: ReactNode;
  /** Fires when the header text action is clicked. */
  onDetail?: () => void;
  /** Panel action button label (e.g. 'Top up'). Omit to hide. */
  actionLabel?: ReactNode;
  /** Icon on the panel action button. @default 'plus' */
  actionIcon?: IconName;
  onAction?: () => void;
  /** Segments rendered as a gliding control above the panel (Detail variant). */
  segments?: string[];
  /** Controlled active segment. */
  activeSegment?: string;
  onSegmentChange?: (segment: string) => void;
  /** Income figure — green. e.g. '+$20,000'. */
  income?: string;
  /** Expense figure — red. e.g. '−$5,200'. */
  expense?: string;
}

/**
 * Compact cashflow/wallet card for dashboards: soft-surface shell, a white
 * panel with the wallet amount (+ optional action button), an optional
 * Main/Secondary segmented control, and an income/expense split colored by
 * the gain/loss tokens.
 *
 * @example
 * <CashflowCard
 *   amount="$82,758.10"
 *   segments={['Main', 'Secondary']}
 *   actionLabel="Top up"
 *   income="+$20,000"
 *   expense="−$5,200"
 * />
 */
export const CashflowCard = forwardRef<HTMLDivElement, CashflowCardProps>(function CashflowCard(
  {
    title = 'Cashflow',
    walletName = 'Available balance',
    amount,
    detailLabel,
    onDetail,
    actionLabel,
    actionIcon = 'plus',
    onAction,
    segments,
    activeSegment,
    onSegmentChange,
    income,
    expense,
    className,
    ...rest
  },
  ref,
) {
  const [innerSeg, setInnerSeg] = useState(segments?.[0]);
  const active = activeSegment ?? innerSeg;

  return (
    <div ref={ref} className={cx('cf', className)} {...rest}>
      <div className={cx('cf-head', (detailLabel != null || onDetail) && 'between')}>
        <span className="cf-title">{title}</span>
        {(detailLabel != null || onDetail) && (
          <button className="cf-detail" type="button" onClick={onDetail}>
            {detailLabel ?? 'Detail'}
          </button>
        )}
      </div>
      {segments && segments.length > 0 && (
        <div className="cf-seg" role="tablist">
          {segments.map((s) => (
            <button
              key={s}
              className={cx('s', s === active && 'active')}
              role="tab"
              aria-selected={s === active}
              type="button"
              onClick={() => {
                if (activeSegment === undefined) setInnerSeg(s);
                onSegmentChange?.(s);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="cf-panel">
        <div className="cf-wallet">
          <span className="w-name">{walletName}</span>
          <span className="w-amt">{amount}</span>
        </div>
        {actionLabel != null && (
          <button className="cf-change" type="button" onClick={onAction}>
            <Icon name={actionIcon} aria-hidden />
            {actionLabel}
          </button>
        )}
      </div>
      {(income != null || expense != null) && (
        <div className="cf-split">
          <div className="col">
            <span className="k">Income</span>
            <span className="v gain">{income}</span>
          </div>
          <div className="vr" />
          <div className="col">
            <span className="k">Expense</span>
            <span className="v loss">{expense}</span>
          </div>
        </div>
      )}
    </div>
  );
});
