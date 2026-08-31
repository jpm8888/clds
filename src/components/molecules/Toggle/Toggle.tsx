import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './toggle.css';

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'children'
> {
  /** Controlled on/off state. */
  checked?: boolean;
  /** Initial state for uncontrolled use. @default false */
  defaultChecked?: boolean;
  /** Fires with the next state on every flip. */
  onChange?: (checked: boolean) => void;
  /** Label rendered beside the pill. */
  label?: ReactNode;
  /** Place the label before the pill. @default false */
  textLeft?: boolean;
}

/**
 * MaV switch — a 44×24 pill `<button role="switch">`. Active track uses
 * `--mav-toggle-active-bg` (blue→lime in dark).
 *
 * Controlled (`checked` + `onChange`) or uncontrolled (`defaultChecked`).
 *
 * @example
 * <Toggle label="Face ID login" defaultChecked />
 * <Toggle checked={notify} onChange={setNotify} label="Push notifications" />
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    checked,
    defaultChecked = false,
    onChange,
    label,
    textLeft = false,
    disabled,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  const [inner, setInner] = useState(defaultChecked);
  const isOn = checked ?? inner;

  const pill = (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isOn}
      className={cx('tgl', isOn && 'on', !label && className)}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (checked === undefined) setInner(!isOn);
        onChange?.(!isOn);
      }}
      {...rest}
    />
  );

  if (!label) return pill;

  return (
    <label
      className={cx('tgl-field', textLeft && 'text-left', disabled && 'is-disabled', className)}
    >
      {pill}
      <span className="nm">{label}</span>
    </label>
  );
});
