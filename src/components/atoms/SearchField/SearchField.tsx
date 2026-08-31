import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './searchfield.css';

export type SearchFieldState = 'focus' | 'error';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Force a visual state (showcases); real focus works natively. */
  state?: SearchFieldState;
  /** Label above the field. */
  label?: ReactNode;
  /** Renders the × clear affordance; wire `onClear` to reset your value. */
  clearable?: boolean;
  /** Called when the clear affordance is pressed. */
  onClear?: () => void;
  /** Error text below the field; also applies the error state. */
  errorMessage?: ReactNode;
  /** Extra class on the outer wrapper (className goes on the search box). */
  wrapperClassName?: string;
}

/**
 * MaV search input with leading magnifier and optional clear affordance.
 * Controlled and uncontrolled use both work; `ref` reaches the `<input>`.
 *
 * @example
 * <SearchField placeholder="Search transactions…" clearable onClear={() => setQ('')} />
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    state,
    label,
    clearable = false,
    onClear,
    errorMessage,
    className,
    wrapperClassName,
    placeholder = 'Search…',
    ...rest
  },
  ref,
) {
  const isError = Boolean(errorMessage) || state === 'error';
  return (
    <div className={cx('fc-field', wrapperClassName)}>
      {label && <span className="fc-flabel">{label}</span>}
      <div
        className={cx('srch', state === 'focus' && 'is-focus', isError && 'is-error', className)}
      >
        <Icon name="search" size={18} strokeWidth={1.8} className="srch-icon" />
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          aria-invalid={isError || undefined}
          {...rest}
        />
        {clearable && (
          <button type="button" className="srch-clear" aria-label="Clear search" onClick={onClear}>
            ×
          </button>
        )}
      </div>
      {errorMessage && <span className="fc-err">{errorMessage}</span>}
    </div>
  );
});
