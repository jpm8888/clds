import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './datepicker.css';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysIn = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const mondayOffset = (y: number, m: number) => (new Date(y, m, 1).getDay() + 6) % 7;
const keyOf = (d: Date | null | undefined) =>
  d ? d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate() : 0;
const sameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && keyOf(a) === keyOf(b);

export interface DatepickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Controlled selected date. Pair with `onChange`. */
  value?: Date | null;
  /** Uncontrolled initial selection. */
  defaultValue?: Date | null;
  /** Fires with the picked date. */
  onChange?: (date: Date) => void;
  /** Earliest selectable date (inclusive). Days before render disabled. */
  min?: Date;
  /** Latest selectable date (inclusive). */
  max?: Date;
}

/**
 * Calendar card for picking a single date — month pager header, weekday row,
 * 7-column day grid. The selected fill uses the primary token (blue → lime
 * in dark). Clicking the month label opens a year grid; arrow keys move the
 * focused day (Enter/Space selects).
 *
 * @example
 * <Datepicker defaultValue={new Date(2026, 7, 31)} onChange={setDueDate} />
 */
export function Datepicker({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  className,
  ...rest
}: DatepickerProps) {
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : inner;

  const initial = selected ?? new Date();
  const [viewY, setViewY] = useState(initial.getFullYear());
  const [viewM, setViewM] = useState(initial.getMonth());
  const [picking, setPicking] = useState(false);
  const [yearBase, setYearBase] = useState(initial.getFullYear() - 13);
  const [focusKey, setFocusKey] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const isDisabled = useCallback(
    (d: Date) => (min && keyOf(d) < keyOf(min)) || (max && keyOf(d) > keyOf(max)) || false,
    [min, max],
  );

  const pick = (d: Date) => {
    if (isDisabled(d)) return;
    if (d.getMonth() !== viewM) {
      setViewY(d.getFullYear());
      setViewM(d.getMonth());
    }
    if (value === undefined) setInner(d);
    onChange?.(d);
  };

  const page = (dir: number) => {
    if (picking) {
      setYearBase((b) => b + dir * 28);
      return;
    }
    const d = new Date(viewY, viewM + dir, 1);
    setViewY(d.getFullYear());
    setViewM(d.getMonth());
  };

  /* Arrow-key day navigation */
  const moveFocus = (from: Date, days: number) => {
    const next = new Date(from.getFullYear(), from.getMonth(), from.getDate() + days);
    if (next.getMonth() !== viewM || next.getFullYear() !== viewY) {
      setViewY(next.getFullYear());
      setViewM(next.getMonth());
    }
    setFocusKey(keyOf(next));
  };
  const onGridKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.dp-day[data-key]');
    if (!btn) return;
    const k = Number(btn.dataset.key);
    const from = new Date(Math.floor(k / 10000), Math.floor((k % 10000) / 100), k % 100);
    const step: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    const days = step[e.key];
    if (days) {
      e.preventDefault();
      moveFocus(from, days);
    }
  };
  useEffect(() => {
    if (focusKey == null) return;
    gridRef.current?.querySelector<HTMLButtonElement>(`.dp-day[data-key="${focusKey}"]`)?.focus();
  }, [focusKey, viewM, viewY]);

  const off = mondayOffset(viewY, viewM);
  const rows = Math.ceil((off + daysIn(viewY, viewM)) / 7);
  const cells = [];
  for (let i = 0; i < rows * 7; i++) {
    const date = new Date(viewY, viewM, i - off + 1);
    const out = date.getMonth() !== viewM;
    const dis = isDisabled(date);
    cells.push(
      <div key={i} className="dp-cell">
        <button
          type="button"
          className={cx('dp-day', out && 'out', sameDay(date, selected) && 'sel')}
          disabled={dis}
          data-key={keyOf(date)}
          tabIndex={sameDay(date, selected) || (selected == null && i === off) ? 0 : -1}
          aria-pressed={sameDay(date, selected) || undefined}
          aria-label={date.toDateString()}
          onClick={() => pick(date)}
        >
          {date.getDate()}
        </button>
      </div>,
    );
  }

  const years = Array.from({ length: 28 }, (_, i) => yearBase + i);

  return (
    <div className={cx('dp', className)} {...rest}>
      <div className="dp-head">
        <button className="dp-nav" type="button" aria-label="Previous" onClick={() => page(-1)}>
          <Icon name="chevron-left" size={18} />
        </button>
        <button
          className="dp-month"
          type="button"
          aria-label="Choose year"
          onClick={() => {
            setPicking((p) => !p);
            setYearBase(viewY - 13);
          }}
        >
          {MONTHS[viewM]} {viewY} <Icon name={picking ? 'chevron-up' : 'chevron-down'} size={16} />
        </button>
        <button className="dp-nav" type="button" aria-label="Next" onClick={() => page(1)}>
          <Icon name="chevron-right" size={18} />
        </button>
      </div>
      {picking ? (
        <div className="dp-years">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={cx('dp-year', y === viewY && 'sel')}
              onClick={() => {
                setViewY(y);
                setPicking(false);
              }}
            >
              {y}
            </button>
          ))}
        </div>
      ) : (
        <div
          className="dp-grid"
          ref={gridRef}
          role="grid"
          aria-label={`${MONTHS[viewM]} ${viewY}`}
          onKeyDown={onGridKeyDown}
        >
          {WEEKDAYS.map((w) => (
            <div key={w} className="dp-cell">
              <span className="dp-wd">{w}</span>
            </div>
          ))}
          {cells}
        </div>
      )}
    </div>
  );
}
