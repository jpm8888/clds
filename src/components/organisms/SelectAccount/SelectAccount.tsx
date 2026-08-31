import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './select-account.css';

export interface SelectAccountOption {
  /** Unique id used as the selection value. */
  id: string;
  /** Account display name, e.g. "Everyday Pot". */
  name: string;
  /** Formatted balance string, e.g. "₱ 10,000.00". */
  balance: string;
  /** Locked/unavailable rows can't be selected. @default false */
  disabled?: boolean;
  /** Inline note under a disabled row, e.g. "Locked until 12 Aug". */
  message?: string;
}

export interface SelectAccountProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'title'
> {
  /** Top-nav title. @default 'Select account' */
  title?: ReactNode;
  /** Back-arrow handler; the arrow is hidden when omitted. */
  onBack?: () => void;
  /** Featured account tile: section heading. @default 'Standard Account' */
  featuredLabel?: ReactNode;
  /** Featured account tile: helper line. */
  featuredDescription?: ReactNode;
  /** Featured tile avatar letter/content. */
  featuredAvatar?: ReactNode;
  featuredName?: ReactNode;
  featuredNumber?: ReactNode;
  featuredBalance?: ReactNode;
  /** List section heading. @default 'Accounts List' */
  listTitle?: ReactNode;
  /** Selectable accounts. */
  accounts: SelectAccountOption[];
  /** Controlled selected account id. */
  value?: string;
  /** Uncontrolled initial selection. */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Dock CTA label. @default 'Continue' */
  ctaLabel?: ReactNode;
  /** Dock CTA handler — receives the selected account id. */
  onConfirm?: (id: string | undefined) => void;
}

/**
 * "Select source of funds" screen — top nav, featured standard-account tile,
 * radio-selectable account list (with locked rows and inline messages), and
 * a bottom button dock. Ported from MaV select-account.html (Figma 354:1868).
 *
 * @example
 * <SelectAccount
 *   accounts={[
 *     { id: 'k', name: 'Mr. K', balance: '₱ 10,000.00' },
 *     { id: 'lock', name: 'Locked Pot', balance: '₱ 10,000.00', disabled: true, message: 'Locked until 12 Aug' },
 *   ]}
 *   defaultValue="k"
 *   onConfirm={(id) => pay(id)}
 * />
 */
export const SelectAccount = forwardRef<HTMLDivElement, SelectAccountProps>(function SelectAccount(
  {
    title = 'Select account',
    onBack,
    featuredLabel = 'Standard Account',
    featuredDescription = 'Choose the account to transfer from.',
    featuredAvatar = 'M',
    featuredName = 'Money Saving',
    featuredNumber = '***-***432-1',
    featuredBalance,
    listTitle = 'Accounts List',
    accounts,
    value,
    defaultValue,
    onChange,
    ctaLabel = 'Continue',
    onConfirm,
    className,
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue);
  const selected = value ?? internal;
  const pick = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };
  return (
    <div ref={ref} className={cx('sof-screen', className)} {...rest}>
      <div className="sof-topnav">
        {onBack && (
          <button type="button" className="sof-nav-ic" aria-label="Back" onClick={onBack}>
            <Icon name="chevron-left" />
          </button>
        )}
        <div className="sof-nav-title">{title}</div>
        <span style={{ width: 32 }} aria-hidden />
      </div>
      <div className="sof-body">
        <div className="sof-card">
          <div>
            <div className="sof-sec-title sm">{featuredLabel}</div>
            <div className="sof-sec-desc">{featuredDescription}</div>
          </div>
          <div className="sof-tile">
            <span className="sof-avatar" aria-hidden>
              {featuredAvatar}
            </span>
            <div className="sof-info">
              <span className="sof-name">{featuredName}</span>
              <span className="sof-num">{featuredNumber}</span>
              {featuredBalance && <span className="sof-bal">{featuredBalance}</span>}
            </div>
          </div>
        </div>
        <div className="sof-card">
          <div className="sof-sec-title">{listTitle}</div>
          <div className="sof-list" role="radiogroup" aria-label="Accounts">
            {accounts.map((a) => (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={selected === a.id}
                className={cx('sof-row', selected === a.id && 'selected', a.disabled && 'disabled')}
                disabled={a.disabled}
                onClick={() => pick(a.id)}
              >
                <span className="sof-row-ic" aria-hidden>
                  <Icon name="card" />
                </span>
                <div className="sof-info">
                  <span className="sof-name">{a.name}</span>
                  <span className="sof-bal">{a.balance}</span>
                  {a.message && (
                    <span className="sof-msg">
                      <Icon name="lock" size={12} aria-hidden />
                      {a.message}
                    </span>
                  )}
                </div>
                <span
                  className={cx('sof-rdo', selected === a.id && 'active', a.disabled && 'disabled')}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="sof-dock">
        <button type="button" className="sof-cta" onClick={() => onConfirm?.(selected)}>
          {ctaLabel}
        </button>
        <div className="sof-home" aria-hidden />
      </div>
    </div>
  );
});
