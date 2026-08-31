import { forwardRef, type HTMLAttributes } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './linked-accounts.css';

export interface LinkedAccount {
  /** 1–2 letter monogram shown in the 40px logo tile, e.g. "GT". */
  initials: string;
  /** Bank name, e.g. "GTBank". */
  bank: string;
  /** Account number (rendered in the mono font). */
  number: string;
  /** Display balance, e.g. "₦ 284,500". */
  balance: string;
  /** Small tag under the balance, e.g. "Primary", "Savings". */
  tag?: string;
  onClick?: () => void;
}

export interface LinkedAccountsProps extends HTMLAttributes<HTMLDivElement> {
  accounts: LinkedAccount[];
  /** Renders a dashed "add account" card at the end when set. */
  onAdd?: () => void;
  /** @default 'Add bank account' */
  addLabel?: string;
}

/**
 * Linked external bank accounts — monogram tile, bank + mono account number,
 * balance with a tag. The optional dashed card invites linking another bank.
 *
 * @example
 * <LinkedAccounts
 *   accounts={[
 *     { initials: 'GT', bank: 'GTBank', number: '0123456789', balance: '₦ 284,500', tag: 'Primary' },
 *   ]}
 *   onAdd={() => openLinkFlow()}
 * />
 */
export const LinkedAccounts = forwardRef<HTMLDivElement, LinkedAccountsProps>(
  function LinkedAccounts(
    { accounts, onAdd, addLabel = 'Add bank account', className, ...rest },
    ref,
  ) {
    return (
      <div ref={ref} className={cx('acc-list', className)} {...rest}>
        {accounts.map((a) => (
          <div key={a.bank + a.number} className="acc-card" onClick={a.onClick}>
            <div className="acc-logo">{a.initials}</div>
            <div className="acc-info">
              <div className="acc-bank">{a.bank}</div>
              <div className="acc-num">{a.number}</div>
            </div>
            <div>
              <div className="acc-bal">{a.balance}</div>
              {a.tag && <div className="acc-bal-sub">{a.tag}</div>}
            </div>
          </div>
        ))}
        {onAdd && (
          <button type="button" className="acc-card acc-add" onClick={onAdd}>
            <div>
              <Icon name="plus" size={16} strokeWidth={1.8} aria-hidden />
              {addLabel}
            </div>
          </button>
        )}
      </div>
    );
  },
);
