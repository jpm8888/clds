import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './textarea.css';

export type TextareaState = 'focus' | 'error' | 'disabled';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Force a visual state (showcases); real focus/disabled work natively. */
  state?: TextareaState;
  /** Error helper row below the textarea; also applies the error state. */
  errorMessage?: ReactNode;
  /** Extra class on the outer wrapper (className goes on the textarea). */
  wrapperClassName?: string;
}

/**
 * MaV multi-line text input. 8px radius, vertical resize, min-height 160px.
 * Controlled and uncontrolled use both work; `ref` reaches the `<textarea>`.
 *
 * @example
 * <Textarea placeholder="Add a note for the recipient…" />
 * <Textarea errorMessage="Message is too long" defaultValue="…" />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { state, errorMessage, disabled, className, wrapperClassName, ...rest },
  ref,
) {
  const isDisabled = disabled ?? state === 'disabled';
  const isError = Boolean(errorMessage) || state === 'error';
  return (
    <div className={cx('ta-wrap', wrapperClassName)}>
      <textarea
        ref={ref}
        className={cx(
          'ta',
          state === 'focus' && 'is-focus',
          isError && 'is-error',
          isDisabled && 'is-disabled',
          className,
        )}
        disabled={isDisabled}
        aria-invalid={isError || undefined}
        {...rest}
      />
      {errorMessage && (
        <div className="field-err">
          <Icon name="alert-circle" className="field-icon" strokeWidth={1.8} />
          {errorMessage}
        </div>
      )}
    </div>
  );
});
