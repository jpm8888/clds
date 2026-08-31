import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './textfield.css';

export type TextFieldSize = 'sm' | 'md' | 'lg';
export type TextFieldState = 'filled' | 'focus' | 'error' | 'disabled';

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix'
> {
  /** @default 'md' */
  size?: TextFieldSize;
  /**
   * Force a visual state (mainly for showcases). Interactive focus/disabled
   * work automatically via :focus-within / the `disabled` prop; `error` is
   * usually driven by `errorMessage`.
   */
  state?: TextFieldState;
  /** Label above the field (bold, Inter). */
  label?: ReactNode;
  /** Small action rendered on the label row's right (e.g. "Forgot?"). */
  labelAction?: ReactNode;
  /** Helper text under the label. */
  description?: ReactNode;
  /** Leading text chunk with divider, e.g. `https://`. */
  prefix?: ReactNode;
  /** Icon before the input (20px, subtle tint). */
  leadingIcon?: IconName;
  /** Icon after the input. */
  trailingIcon?: IconName;
  /** Error helper row below the field; also applies the error state. */
  errorMessage?: ReactNode;
  /** Extra class on the outer wrapper (className goes on the field box). */
  wrapperClassName?: string;
}

/**
 * MaV single-line input. 4px radius, bold 14px text, token-driven states
 * (`--mav-input-*`) — focus outline flips blue→lime in dark automatically.
 *
 * Controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) both
 * work; all native input props pass through and `ref` reaches the `<input>`.
 *
 * @example
 * <TextField label="Email" placeholder="you@bank.com" type="email" />
 * <TextField
 *   label="Amount"
 *   prefix="USD"
 *   errorMessage="Insufficient balance"
 * />
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    size = 'md',
    state,
    label,
    labelAction,
    description,
    prefix,
    leadingIcon,
    trailingIcon,
    errorMessage,
    disabled,
    className,
    wrapperClassName,
    id,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isDisabled = disabled ?? state === 'disabled';
  const isError = Boolean(errorMessage) || state === 'error';

  return (
    <div className={cx('field-wrap', wrapperClassName)}>
      {(label ?? description) && (
        <div className="lbl-block">
          {label && (
            <div className="lbl-row">
              <label className="lbl-text" htmlFor={inputId}>
                {label}
              </label>
              {labelAction}
            </div>
          )}
          {description && <span className="lbl-desc">{description}</span>}
        </div>
      )}
      <div
        className={cx(
          'field',
          size !== 'md' && `field-${size}`,
          state === 'filled' && 'is-filled',
          state === 'focus' && 'is-focus',
          isError && 'is-error',
          isDisabled && 'is-disabled',
          className,
        )}
      >
        {leadingIcon && <Icon name={leadingIcon} className="field-icon" strokeWidth={1.8} />}
        {prefix != null && (
          <>
            <span className="field-prefix">{prefix}</span>
            <span className="field-vline" />
          </>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          {...rest}
        />
        {trailingIcon && <Icon name={trailingIcon} className="field-icon" strokeWidth={1.8} />}
      </div>
      {errorMessage && (
        <div className="field-err">
          <Icon name="alert-circle" className="field-icon" strokeWidth={1.8} />
          {errorMessage}
        </div>
      )}
    </div>
  );
});
