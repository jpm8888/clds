import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './amount-slider.css';

export interface AmountSliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Header label, e.g. "Loan amount". @default 'Amount' */
  label?: string;
  /** Numeric minimum. @default 0 */
  min?: number;
  /** Numeric maximum. @default 100 */
  max?: number;
  /** Step between values. @default 1 */
  step?: number;
  /** Controlled value; use `defaultValue` + `onChange` for uncontrolled. */
  value?: number;
  /** Initial value when uncontrolled. @default min */
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Formats the header value and end labels, e.g. (v) => `$${v.toLocaleString()}`. */
  format?: (value: number) => string;
}

/**
 * Amount slider — choose a value in a range (loan amount, transfer limit,
 * budget). Accent-filled track, white knob, min/max end labels. Backed by a
 * native <input type="range"> so keyboard and screen-reader support is free.
 *
 * @example
 * <AmountSlider label="Loan amount" min={0} max={5000} step={100}
 *   defaultValue={3100} format={(v) => `$${v.toLocaleString()}`} />
 */
export const AmountSlider = forwardRef<HTMLDivElement, AmountSliderProps>(function AmountSlider(
  {
    label = 'Amount',
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    onChange,
    format = (v) => String(v),
    className,
    ...rest
  },
  ref,
) {
  const [inner, setInner] = useState(defaultValue ?? min);
  const current = value ?? inner;
  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100;
  return (
    <div ref={ref} className={cx('bld-slider', className)} {...rest}>
      <div className="bld-slider-top">
        <span className="bld-slider-lbl">{label}</span>
        <b className="bld-slider-val">{format(current)}</b>
      </div>
      <div className="bld-slider-track">
        <div className="bld-slider-fill" style={{ width: `${pct}%` }} />
        <input
          className="bld-slider-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          aria-label={label}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (value === undefined) setInner(v);
            onChange?.(v);
          }}
        />
        <span className="bld-slider-knob" style={{ left: `${pct}%` }} />
      </div>
      <div className="bld-slider-ends">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
});
