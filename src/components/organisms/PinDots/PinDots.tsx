import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './pin-dots.css';

export interface PinDotsProps extends HTMLAttributes<HTMLDivElement> {
  /** Heading above the dots. @default 'Enter your PIN' */
  label?: string;
  /** Total dots. @default 6 */
  length?: number;
  /** How many are filled (digits entered so far). @default 0 */
  filled?: number;
  /** Renders a 3×4 digit keypad under the dots when set. */
  onKey?: (key: string) => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

/**
 * PIN-entry indicator — filled dots track digits entered; pass `onKey`
 * to render the paired number pad ('0'–'9' and '⌫' backspace).
 *
 * Keep PIN state in the parent; this component is fully controlled.
 *
 * @example
 * const [pin, setPin] = useState('');
 * <PinDots filled={pin.length} onKey={(k) =>
 *   setPin(k === '⌫' ? pin.slice(0, -1) : (pin + k).slice(0, 6))} />
 */
export const PinDots = forwardRef<HTMLDivElement, PinDotsProps>(function PinDots(
  { label = 'Enter your PIN', length = 6, filled = 0, onKey, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('bld-pin', className)} {...rest}>
      <div className="bld-pin-label">{label}</div>
      <div
        className="bld-pin-dots"
        role="status"
        aria-label={`${Math.min(filled, length)} of ${length} digits entered`}
      >
        {Array.from({ length }, (_, i) => (
          <span key={i} className={cx('bld-pin-dot', i < filled && 'on')} />
        ))}
      </div>
      {onKey && (
        <div className="bld-pin-keypad">
          {KEYS.map((k, i) =>
            k === '' ? (
              <span key={i} className="bld-pin-key ghost" />
            ) : (
              <button
                key={i}
                type="button"
                className="bld-pin-key"
                aria-label={k === '⌫' ? 'Delete' : k}
                onClick={() => onKey(k)}
              >
                {k}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
});
