import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './radio.css';

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'children'
> {
  /** Label rendered beside the ring. */
  label?: ReactNode;
}

/**
 * MaV radio button — native `<input type="radio">` under a 20px ring whose
 * dot uses `--mav-icon-active` (blue→lime in dark). Group radios by giving
 * them the same `name`.
 *
 * @example
 * <Radio name="account" value="checking" label="Everyday checking" defaultChecked />
 * <Radio name="account" value="savings" label="Savings" />
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, disabled, className, ...rest },
  ref,
) {
  return (
    <label className={cx('rdo-field', disabled && 'is-disabled', className)}>
      <input ref={ref} type="radio" className="rdo-input" disabled={disabled} {...rest} />
      <span className="rdo" aria-hidden />
      {label && <span className="nm">{label}</span>}
    </label>
  );
});
