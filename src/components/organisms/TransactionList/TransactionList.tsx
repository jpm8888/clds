import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './transaction-list.css';

export type TransactionDirection = 'credit' | 'debit' | 'neutral';

export interface TransactionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Row title, e.g. "Salary — GTBank". */
  title: string;
  /** Meta line, e.g. "Transfer · Feb 28 · 09:14". */
  meta?: string;
  /** Signed display amount, e.g. "+₦ 350,000" or "−₦ 2,000". */
  amount: string;
  /**
   * Colors the amount and icon: `credit` green, `debit` red, `neutral` plain.
   * @default 'neutral'
   */
  direction?: TransactionDirection;
  /** Right-aligned status/date under the amount, e.g. "Credit", "Pending". */
  status?: string;
  /** Icon in the 42px soft tile. Ignored when `iconSlot` is given. */
  icon?: IconName;
  /** Custom icon-tile content (e.g. a merchant logo <img>). */
  iconSlot?: ReactNode;
}

/**
 * One transaction row — 42px soft icon tile, title + meta, signed amount.
 * Compose inside <TransactionList>. Credits are green, debits red
 * (identical in dark mode by design).
 *
 * @example
 * <TransactionItem title="Airtime — MTN" meta="Bill payment · Feb 28"
 *   amount="−₦ 2,000" direction="debit" status="Debit" icon="arrow-up-right" />
 */
export const TransactionItem = forwardRef<HTMLDivElement, TransactionItemProps>(
  function TransactionItem(
    { title, meta, amount, direction = 'neutral', status, icon, iconSlot, className, ...rest },
    ref,
  ) {
    const dirIcon: IconName =
      icon ??
      (direction === 'credit'
        ? 'arrow-down-left'
        : direction === 'debit'
          ? 'arrow-up-right'
          : 'clock');
    return (
      <div ref={ref} className={cx('txn-item', className)} {...rest}>
        <div className={cx('txn-icon', `txn-icon-${direction}`)}>
          {iconSlot ?? <Icon name={dirIcon} size={20} strokeWidth={1.5} aria-hidden />}
        </div>
        <div className="txn-body">
          <div className="txn-name">{title}</div>
          {meta && <div className="txn-meta">{meta}</div>}
        </div>
        <div>
          <div className={cx('txn-amount', direction !== 'neutral' && `txn-amount-${direction}`)}>
            {amount}
          </div>
          {status && <div className="txn-date">{status}</div>}
        </div>
      </div>
    );
  },
);

export interface TransactionListProps extends HTMLAttributes<HTMLDivElement> {
  /** <TransactionItem> rows (or grouped headers between them). */
  children: ReactNode;
}

/**
 * Vertical stack of TransactionItem rows with hairline separators.
 * Pair with a SectionHeader ("Recent activity" + "See all").
 */
export const TransactionList = forwardRef<HTMLDivElement, TransactionListProps>(
  function TransactionList({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx('txn-list', className)} {...rest}>
        {children}
      </div>
    );
  },
);
