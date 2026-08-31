import { forwardRef, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './pill-tabs.css';

export interface PillTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Pill labels. The label doubles as the id reported by `onChange`. */
  items: string[];
  /** Controlled selected label. Pair with `onChange`. */
  value?: string;
  /** Uncontrolled initial label. Defaults to the first item. */
  defaultValue?: string;
  onChange?: (label: string) => void;
}

/**
 * MaV segmented pill tabs with a gliding highlight (Figma 139:2093).
 * Use for compact 2–4 way switches (e.g. chart ranges: "1W / 1M / 1Y").
 * Sits on a grey track; the white pill glides to the selection.
 *
 * @example
 * <PillTabs items={['1W', '1M', '3M', '1Y']} defaultValue="1M" onChange={setRange} />
 */
export const PillTabs = forwardRef<HTMLDivElement, PillTabsProps>(function PillTabs(
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
      const btn = list.querySelectorAll<HTMLButtonElement>('.gpill')[idx];
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
      className={cx('gpills', className)}
      {...rest}
    >
      <span ref={inkRef} className="gpills-ink" aria-hidden />
      {items.map((label) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={label === selected}
          className={cx('gpill', label === selected && 'on')}
          onClick={() => select(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
});
