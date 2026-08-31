import {
  useRef,
  useState,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './otpinput.css';

export type OtpInputVariant = 'boxed' | 'boxless';

export interface OtpInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** `boxed` = 48×48 outlined slots; `boxless` = digit over an underline. @default 'boxed' */
  variant?: OtpInputVariant;
  /** Number of digits — typically 4 or 6. @default 6 */
  length?: number;
  /** Controlled code (digits only, may be partial). */
  value?: string;
  /** Initial code for uncontrolled use. */
  defaultValue?: string;
  /** Fires with the full (possibly partial) code on every edit. */
  onChange?: (code: string) => void;
  /** Fires once when all slots are filled. */
  onComplete?: (code: string) => void;
  /** Marks every slot as invalid. Set automatically by `errorMessage`. @default false */
  error?: boolean;
  /** Error row rendered below the group. */
  errorMessage?: ReactNode;
  /** @default false */
  disabled?: boolean;
  /** Focus the first slot on mount. @default false */
  autoFocus?: boolean;
  /** Accessible label for the group. @default 'One-time passcode' */
  'aria-label'?: string;
}

/**
 * MaV one-time-passcode entry. Auto-advances between slots, supports
 * backspace navigation and pasting a full code; digits only. Focus outline
 * flips blue→lime in dark mode.
 *
 * Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`);
 * `onComplete` fires when the last digit lands.
 *
 * @example
 * <OtpInput length={6} onComplete={(code) => verify(code)} />
 * <OtpInput length={4} variant="boxless" errorMessage="Incorrect code — 2 attempts left" />
 */
export function OtpInput({
  variant = 'boxed',
  length = 6,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  error = false,
  errorMessage,
  disabled = false,
  autoFocus = false,
  className,
  'aria-label': ariaLabel = 'One-time passcode',
  ...rest
}: OtpInputProps) {
  const [inner, setInner] = useState(defaultValue.replace(/\D/g, '').slice(0, length));
  const code = (value ?? inner).replace(/\D/g, '').slice(0, length);
  const slots = useRef<Array<HTMLInputElement | null>>([]);
  const isError = error || Boolean(errorMessage);
  const boxless = variant === 'boxless';

  function commit(next: string) {
    if (value === undefined) setInner(next);
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  }

  function setDigit(index: number, digit: string) {
    const chars = Array.from({ length }, (_, i) => code[i] ?? '');
    chars[index] = digit;
    commit(chars.join('').slice(0, length));
  }

  function handleInput(index: number, raw: string) {
    const digits = raw.replace(/\D/g, '');
    if (!digits) {
      setDigit(index, '');
      return;
    }
    if (digits.length > 1) {
      // A multi-char entry (e.g. autofill) — spread from this slot.
      const next = (code.slice(0, index) + digits).slice(0, length);
      commit(next);
      slots.current[Math.min(next.length, length - 1)]?.focus();
      return;
    }
    setDigit(index, digits);
    if (index < length - 1) slots.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !(code[index] ?? '')) {
      e.preventDefault();
      if (index > 0) {
        setDigit(index - 1, '');
        slots.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      slots.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      slots.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!digits) return;
    e.preventDefault();
    commit(digits);
    slots.current[Math.min(digits.length, length - 1)]?.focus();
  }

  return (
    <div role="group" aria-label={ariaLabel} {...rest} className={className}>
      <div className="otp-group">
        {Array.from({ length }, (_, i) => {
          const digit = code[i] ?? '';
          const slotCls = cx(
            boxless ? 'otp2' : 'otp',
            digit && 'filled',
            isError && 'error',
            disabled && 'disabled',
          );
          const input = (
            <input
              key={i}
              ref={(el) => {
                slots.current[i] = el;
              }}
              className={boxless ? 'd' : slotCls}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={length}
              value={digit}
              disabled={disabled}
              aria-label={`Digit ${i + 1} of ${length}`}
              aria-invalid={isError || undefined}
              autoFocus={autoFocus && i === 0}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
            />
          );
          return boxless ? (
            <div key={i} className={slotCls}>
              {input}
              <span className="u" />
            </div>
          ) : (
            input
          );
        })}
      </div>
      {errorMessage && (
        <div className="otp-err-msg">
          <Icon name="alert-circle" strokeWidth={1.8} />
          {errorMessage}
        </div>
      )}
    </div>
  );
}
