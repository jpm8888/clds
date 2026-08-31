import { forwardRef, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './bottom-nav.css';

export interface BottomNavItem {
  /** Stable identifier reported by `onChange`. */
  id: string;
  label: string;
  icon: IconName;
  /** Red notification dot on the icon. @default false */
  dot?: boolean;
  /** Numeric count badge on the icon (e.g. unread activity). Wins over `dot`. */
  badge?: string | number;
}

export interface BottomNavProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Nav destinations (3–5 items). @default Home/Statistic/Cards/Profile */
  items?: BottomNavItem[];
  /** Controlled active item id. Pair with `onChange`. */
  value?: string;
  /** Uncontrolled initial item id. Defaults to the first item. */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Floating circular Scan (QR) button in the middle. @default false */
  scan?: boolean;
  onScan?: () => void;
}

const DEFAULT_ITEMS: BottomNavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'statistic', label: 'Statistic', icon: 'chart-line' },
  { id: 'cards', label: 'Cards', icon: 'card' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

/**
 * MaV bottom navigation bar (Figma 139:2093) — the app-level tab bar with a
 * gliding top indicator, per-item icon+label, notification dots, and an
 * optional floating Scan button for QR pay.
 *
 * Place once per app frame, below the scrollable screen content. With
 * `scan`, a spacer is inserted mid-list so the floating button never covers
 * an item.
 *
 * @example
 * <BottomNav scan onScan={openScanner} value={route} onChange={navigate} />
 */
export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(function BottomNav(
  {
    items = DEFAULT_ITEMS,
    value,
    defaultValue,
    onChange,
    scan = false,
    onScan,
    className,
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState(() => defaultValue ?? items[0]?.id);
  const selected = value ?? internal;
  const rootRef = useRef<HTMLElement | null>(null);
  const inkRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const ink = inkRef.current;
    if (!root || !ink) return;
    const position = () => {
      const btn = root.querySelector<HTMLButtonElement>(`.bnav-item[data-id="${selected}"]`);
      if (!btn) return;
      ink.style.transform = `translateX(${btn.offsetLeft + btn.offsetWidth / 2 - 12}px)`;
    };
    position();
    const ro = new ResizeObserver(position);
    ro.observe(root);
    return () => ro.disconnect();
  }, [items, selected, scan]);

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  const spacerAt = scan ? Math.ceil(items.length / 2) : -1;

  return (
    <nav
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cx('bnav', className)}
      {...rest}
    >
      <span ref={inkRef} className="bnav-ink" aria-hidden />
      {items.flatMap((it, i) => {
        const btn = (
          <button
            key={it.id}
            type="button"
            data-id={it.id}
            aria-current={it.id === selected ? 'page' : undefined}
            className={cx('bnav-item', it.id === selected && 'on')}
            onClick={() => select(it.id)}
          >
            <Icon name={it.icon} size={24} strokeWidth={it.id === selected ? 2.1 : 1.9} aria-hidden />
            {it.badge != null && it.badge !== '' ? (
              <span className="bnav-badge" aria-label={`${it.badge} new`}>
                {it.badge}
              </span>
            ) : (
              it.dot && <span className="bnav-dot" aria-label="New activity" />
            )}
            <span className="lbl">{it.label}</span>
          </button>
        );
        return i === spacerAt
          ? [<span key={`spacer-${i}`} className="bnav-item spacer" aria-hidden />, btn]
          : [btn];
      })}
      {scan && (
        <button type="button" className="bnav-scan" aria-label="Scan to pay" onClick={onScan}>
          <Icon name="scan" size={26} aria-hidden />
        </button>
      )}
    </nav>
  );
});
