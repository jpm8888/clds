import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './receipt-detail.css';

export interface ReceiptRow {
  label: string;
  value: string;
}

export interface ReceiptDetailProps extends HTMLAttributes<HTMLDivElement> {
  /** `out` = sent (danger tint), `in` = received (success tint). @default 'out' */
  direction?: 'in' | 'out';
  /** Signed display amount, e.g. "−₦20,000" / "+₦350,000". */
  amount: string;
  /** Counterparty name under the amount. */
  name?: string;
  /** Status pill text; hidden when omitted. @default 'Completed' */
  status?: string;
  /** Key-value rows (To, Reference, Date, Fee, Method…). */
  rows: ReceiptRow[];
}

/**
 * Transaction receipt — direction icon, hero amount, status pill, and
 * key-value rows on a tinted panel. Sent = red tint, received = green.
 *
 * @example
 * <ReceiptDetail direction="in" amount="+₦350,000" name="James K." rows={[
 *   { label: 'Reference', value: 'TRX-9F2A81C4' },
 *   { label: 'Fee', value: '₦0.00' },
 * ]} />
 */
export const ReceiptDetail = forwardRef<HTMLDivElement, ReceiptDetailProps>(function ReceiptDetail(
  { direction = 'out', amount, name, status = 'Completed', rows, className, ...rest },
  ref,
) {
  const received = direction === 'in';
  return (
    <div ref={ref} className={cx('bld-txnd', className)} {...rest}>
      <div className="bld-txnd-top">
        <span className={cx('bld-txnd-ic', received ? 'in' : 'out')}>
          <svg viewBox="0 0 24 24" aria-hidden>
            {received ? <path d="M17 10H3M10 3L3 10l7 7" /> : <path d="M3 10h14M10 3l7 7-7 7" />}
          </svg>
        </span>
        <div className={cx('bld-txnd-amt', received && 'in')}>{amount}</div>
        {name && <div className="bld-txnd-name">{name}</div>}
        {status && <span className="bld-txnd-badge">{status}</span>}
      </div>
      <div className="bld-txnd-rows">
        {rows.map((r) => (
          <div className="bld-txnd-row" key={r.label}>
            <span>{r.label}</span>
            <b>{r.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
});
