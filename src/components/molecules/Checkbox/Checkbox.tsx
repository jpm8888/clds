import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './checkbox.css';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'children'
> {
  /** Label rendered beside the box (wraps everything in a <label>). */
  label?: ReactNode;
  /** Place the label before the box. @default false */
  textLeft?: boolean;
  /** Shows the mixed (—) state; the underlying input reports `indeterminate`. @default false */
  indeterminate?: boolean;
}

/**
 * MaV checkbox — a real `<input type="checkbox">` under a 20px token-styled
 * box (`--mav-checkbox-*`; fill flips blue→lime in dark). Keyboard and
 * screen-reader semantics come from the native input.
 *
 * Controlled (`checked` + `onChange`) or uncontrolled (`defaultChecked`).
 *
 * @example
 * <Checkbox label="Save this payee" defaultChecked />
 * <Checkbox indeterminate label="Select all transactions" />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, textLeft = false, indeterminate = false, disabled, className, ...rest },
  ref,
) {
  const inner = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const box = (
    <>
      <input
        ref={(el) => {
          inner.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        type="checkbox"
        className="cbx-input"
        disabled={disabled}
        {...rest}
      />
      <span className={cx('cbx', indeterminate && 'is-indeterminate')} aria-hidden>
        <svg className="cb-check" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <svg className="cb-minus" viewBox="0 0 24 24">
          <path d="M5 12h14" />
        </svg>
      </span>
    </>
  );

  if (!label)
    return <label className={cx('cbx-field', disabled && 'is-disabled', className)}>{box}</label>;

  return (
    <label
      className={cx('cbx-field', textLeft && 'text-left', disabled && 'is-disabled', className)}
    >
      {box}
      <span className="nm">{label}</span>
    </label>
  );
});
