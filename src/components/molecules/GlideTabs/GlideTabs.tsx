import { forwardRef, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './glide-tabs.css';

export interface GlideTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab labels. The label doubles as the id reported by `onChange`. */
  items: string[];
  /** Controlled selected label. Pair with `onChange`. */
  value?: string;
  /** Uncontrolled initial label. Defaults to the first item. */
  defaultValue?: string;
  onChange?: (label: string) => void;
}

/**
 * MaV underline tabs with a gliding ink bar that slides between tabs
 * (Figma 139:2093). Lighter-weight than `Tabs` — labels only, ideal for
 * section switches inside a card (e.g. "Income / Spending").
 *
 * The indicator position is measured, so the transition is gated behind
 * `prefers-reduced-motion` in CSS.
 *
 * @example
 * <GlideTabs items={['Income', 'Spending', 'Transfers']} onChange={setSection} />
 */
export const GlideTabs = forwardRef<HTMLDivElement, GlideTabsProps>(function GlideTabs(
  { items, value, defaultValue, onChange, className, ...rest },
  ref,
) {
  const [internal, setInternal] = useState(() => defaultValue ?? items[0]);
  const selected = value ?? internal;
  const listRef = useRef<HTMLDivElement | null>(null);
  const inkRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const ink = inkRef.current;
    if (!list || !ink) return;
    const position = () => {
      const idx = Math.max(
        0,
        items.findIndex((l) => l === selected),
      );
      const btn = list.querySelectorAll<HTMLButtonElement>('.gtab')[idx];
      if (!btn) return;
      ink.style.width = `${btn.offsetWidth}px`;
      ink.style.transform = `translateX(${btn.offsetLeft}px)`;
    };
    position();
    const ro = new ResizeObserver(position);
    ro.observe(list);
    return () => ro.disconnect();
  }, [items, selected]);

  const select = (label: string) => {
    if (value === undefined) setInternal(label);
    onChange?.(label);
  };

  return (
    <div
      ref={(node) => {
        listRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      role="tablist"
      className={cx('gtabs', className)}
      {...rest}
    >
      {items.map((label) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={label === selected}
          className={cx('gtab', label === selected && 'on')}
          onClick={() => select(label)}
        >
          {label}
        </button>
      ))}
      <span ref={inkRef} className="gtabs-ink" aria-hidden />
    </div>
  );
});
