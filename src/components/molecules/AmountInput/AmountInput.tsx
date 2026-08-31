import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './amountinput.css';

export interface AmountInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Heading above the amount, e.g. "Amount of Money". */
  label?: ReactNode;
  /** Controlled amount (number). */
  value?: number;
  /** Initial amount for uncontrolled use. @default 0 */
  defaultValue?: number;
  /** Fires with the next amount on every − / + press or preset pick. */
  onChange?: (value: number) => void;
  /** Increment used by the − / + steppers. @default 10 */
  step?: number;
  /** @default 0 */
  min?: number;
  /** @default Infinity */
  max?: number;
  /** Currency prefix shown before the number. @default '$' */
  currency?: string;
  /** Quick-select preset amounts rendered as a 3-column chip grid. */
  presets?: number[];
  /** Paints the amount in the danger color (e.g. over balance). @default false */
  error?: boolean;
  /** Disables steppers and presets. @default false */
  disabled?: boolean;
  /** Custom number formatter. @default value.toLocaleString('en-US') */
  format?: (value: number) => string;
}

/**
 * MaV "enter amount" control — a large centered currency figure flanked by
 * round − / + steppers, with optional quick-select preset chips. Steppers
 * and selected chips re-theme (navy/blue → lime) automatically.
 *
 * Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 *
 * @example
 * <AmountInput
 *   label="Amount of Money"
 *   defaultValue={150}
 *   step={50}
 *   presets={[50, 100, 150, 200, 250, 300]}
 *   onChange={setAmount}
 * />
 */
export function AmountInput({
  label,
  value,
  defaultValue = 0,
  onChange,
  step = 10,
  min = 0,
  max = Infinity,
  currency = '$',
  presets,
  error = false,
  disabled = false,
  format = (v) => v.toLocaleString('en-US'),
  className,
  ...rest
}: AmountInputProps) {
  const [inner, setInner] = useState(defaultValue);
  const amount = value ?? inner;

  function commit(next: number) {
    const clamped = Math.min(max, Math.max(min, next));
    if (value === undefined) setInner(clamped);
    onChange?.(clamped);
  }

  return (
    <div className={cx('amt', className)} {...rest}>
      {label && <div className="amt-title">{label}</div>}
      <div className="amt-row">
        <button
          type="button"
          className="amt-btn"
          aria-label="Decrease amount"
          disabled={disabled || amount <= min}
          onClick={() => commit(amount - step)}
        >
          <Icon name="minus" strokeWidth={2.6} />
        </button>
        <div className={cx('amt-value', error && 'error')} role="status" aria-live="polite">
          {currency}
          {format(amount)}
        </div>
        <button
          type="button"
          className="amt-btn"
          aria-label="Increase amount"
          disabled={disabled || amount >= max}
          onClick={() => commit(amount + step)}
        >
          <Icon name="plus" strokeWidth={2.6} />
        </button>
      </div>
      {presets && presets.length > 0 && (
        <div className="amt-chips">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              className={cx('amt-chip', p === amount && 'on')}
              disabled={disabled}
              aria-pressed={p === amount}
              onClick={() => commit(p)}
            >
              {currency}
              {format(p)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
