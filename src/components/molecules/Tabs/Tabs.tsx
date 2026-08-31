import { forwardRef, useState, type HTMLAttributes } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './tabs.css';

export interface TabItem {
  /** Stable identifier reported by `onChange`. */
  id: string;
  label: string;
  /** Optional leading icon (22px). */
  icon?: IconName;
  /** Red notification dot after the label. @default false */
  dot?: boolean;
  /** @default false */
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tabs to render. Strings are shorthand for `{ id: s, label: s }`. */
  items: Array<TabItem | string>;
  /** Controlled selected tab id. Pair with `onChange`. */
  value?: string;
  /** Uncontrolled initial tab id. Defaults to the first enabled item. */
  defaultValue?: string;
  /** Called with the tab id when the user selects a tab. */
  onChange?: (id: string) => void;
  /** Horizontal scrolling with intrinsic-width tabs (5+ tabs). @default false */
  scroll?: boolean;
  /** Loading placeholder bars instead of labels. @default false */
  skeleton?: boolean;
}

const normalize = (it: TabItem | string): TabItem =>
  typeof it === 'string' ? { id: it, label: it } : it;

/**
 * MaV 48px underline tab bar (Figma 901:22860). Full-width rail with a
 * per-tab active indicator; supports icons, notify dots, disabled tabs,
 * scrollable overflow, and a skeleton state.
 *
 * Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 * Render your own panel content keyed by the selected id.
 *
 * @example
 * <Tabs items={['Accounts', 'Cards']} defaultValue="Accounts" onChange={setTab} />
 * <Tabs items={[{ id: 'inbox', label: 'Inbox', dot: true }, { id: 'sent', label: 'Sent' }]} />
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, value, defaultValue, onChange, scroll = false, skeleton = false, className, ...rest },
  ref,
) {
  const tabs = items.map(normalize);
  const [internal, setInternal] = useState(() => defaultValue ?? tabs.find((t) => !t.disabled)?.id);
  const selected = value ?? internal;

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  return (
    <div
      ref={ref}
      role="tablist"
      className={cx('tabs', scroll && 'tabs-scroll', className)}
      {...rest}
    >
      {tabs.map((t) =>
        skeleton ? (
          <span key={t.id} className="tab">
            <span className="tab-skel" />
          </span>
        ) : (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === selected}
            disabled={t.disabled}
            className={cx('tab', t.id === selected && 'selected', t.disabled && 'disabled')}
            onClick={() => select(t.id)}
          >
            <span className="tab-label">
              {t.icon && <Icon name={t.icon} size={22} strokeWidth={1.8} aria-hidden />}
              {t.label}
              {t.dot && <span className="tab-dot" aria-label="New activity" />}
            </span>
          </button>
        ),
      )}
    </div>
  );
});
