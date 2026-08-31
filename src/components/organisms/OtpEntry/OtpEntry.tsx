import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './otp-entry.css';

export interface OtpEntryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** @default 'One time PIN' */
  title?: string;
  /** Description; embed the masked phone in <b> for emphasis. */
  description?: ReactNode;
  /** Number of code slots. @default 6 */
  length?: number;
  /** `box` = outlined slots, `boxless` = underline slots. @default 'box' */
  variant?: 'box' | 'boxless';
  /** Seconds on the resend countdown. @default 32 */
  resendSeconds?: number;
  /** Shows the error state + message on all slots. */
  error?: string;
  /** Fires on every change with the code so far. */
  onChange?: (code: string) => void;
  /** Fires when Verify is pressed with the complete code. */
  onVerify?: (code: string) => void;
  /** Fires when Resend is pressed (countdown restarts automatically). */
  onResend?: () => void;
  /** @default 'Verify' */
  verifyLabel?: string;
}

/**
 * OTP verification screen — header, auto-advancing code slots (typing moves
 * forward, backspace moves back, paste fills), a resend countdown, and a
 * Verify CTA that enables once the code is complete.
 *
 * @example
 * <OtpEntry
 *   description={<>Enter the code sent to <b>+1 223 242 321</b></>}
 *   onVerify={(code) => submit(code)}
 * />
 */
export const OtpEntry = forwardRef<HTMLDivElement, OtpEntryProps>(function OtpEntry(
  {
    title = 'One time PIN',
    description,
    length = 6,
    variant = 'box',
    resendSeconds = 32,
    error,
    onChange,
    onVerify,
    onResend,
    verifyLabel = 'Verify',
    className,
    ...rest
  },
  ref,
) {
  const [digits, setDigits] = useState<string[]>(() => Array<string>(length).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const code = digits.join('');
  const complete = code.length === length;

  const update = (next: string[]) => {
    setDigits(next);
    onChange?.(next.join(''));
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/[^0-9]/g, '').slice(0, 1);
    const next = [...digits];
    next[i] = d;
    update(next);
    if (d && i < length - 1) inputs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const onPaste = (i: number) => (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData('text')
      .replace(/[^0-9]/g, '')
      .slice(0, length);
    const next = [...digits];
    for (let k = 0; k < text.length && i + k < length; k++) next[i + k] = text[k]!;
    update(next);
    inputs.current[Math.min(i + text.length, length - 1)]?.focus();
  };

  const timeLabel = `${String(Math.floor(Math.max(0, secondsLeft) / 60)).padStart(2, '0')}:${String(
    Math.max(0, secondsLeft) % 60,
  ).padStart(2, '0')}`;

  return (
    <div ref={ref} className={cx('otpe-screen', className)} {...rest}>
      <div className="otpe-header">
        <div className="otpe-title">{title}</div>
        {description && <div className="otpe-desc">{description}</div>}
      </div>
      <div className="otpe-field">
        <div className="otpe-slots">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              className={cx(
                variant === 'box' ? 'otpe-slot' : 'otpe-slot2',
                d !== '' && 'filled',
                error && 'error',
              )}
              value={d}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1} of ${length}`}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={onKeyDown(i)}
              onPaste={onPaste(i)}
            />
          ))}
        </div>
        {error && (
          <div className="otpe-err">
            <Icon name="alert-circle" size={18} strokeWidth={1.8} aria-hidden />
            {error}
          </div>
        )}
        <div className="otpe-resend">
          <div className="otpe-timer">
            <span className="lbl">Reset in</span>
            <span className="t">{timeLabel}</span>
          </div>
          <button
            type="button"
            className="otpe-resend-btn"
            disabled={secondsLeft > 0}
            onClick={() => {
              setSecondsLeft(resendSeconds);
              onResend?.();
            }}
          >
            Resend Code
          </button>
        </div>
      </div>
      <button
        type="button"
        className={cx('otpe-verify', complete && 'on')}
        disabled={!complete}
        onClick={() => onVerify?.(code)}
      >
        {verifyLabel}
      </button>
    </div>
  );
});
