import {
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './swipe-button.css';

export type SwipeButtonVariant = 'gradient' | 'brand' | 'card';

export interface SwipeButtonProps extends HTMLAttributes<HTMLDivElement> {
  /** Instruction label, e.g. 'Swipe to pay'. */
  label: ReactNode;
  /** Fires once when the thumb is dragged to the end (or Enter/Space on the focused thumb). */
  onConfirm?: () => void;
  /** Label swapped in after confirmation. @default the `label` */
  confirmedLabel?: ReactNode;
  /**
   * `gradient` = brand gradient track (v1), `brand` = brand→peach (v2),
   * `card` = white card track with a brand thumb (v4).
   * @default 'gradient'
   */
  variant?: SwipeButtonVariant;
  /** Fully-rounded pill track and thumb. @default false */
  pill?: boolean;
  disabled?: boolean;
}

/**
 * Swipe-to-confirm control for irreversible fintech actions (send money,
 * confirm payment). Drag the thumb to the end to fire `onConfirm` — it snaps
 * back if released early. Keyboard/screen-reader users press Enter or Space
 * on the focused thumb instead.
 *
 * @example
 * <SwipeButton label="Swipe to pay $128.00" pill onConfirm={submitPayment} />
 */
export function SwipeButton({
  label,
  onConfirm,
  confirmedLabel,
  variant = 'gradient',
  pill = false,
  disabled = false,
  className,
  ...rest
}: SwipeButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const drag = useRef({ active: false, startX: 0, max: 0, x: 0 });
  const [done, setDone] = useState(false);

  const confirm = useCallback(() => {
    if (done || disabled) return;
    setDone(true);
    onConfirm?.();
  }, [done, disabled, onConfirm]);

  const maxTravel = () => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return 0;
    return track.clientWidth - thumb.offsetWidth - 10; /* 2×5px track padding */
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (disabled || done) return;
    drag.current = { active: true, startX: e.clientX, max: maxTravel(), x: 0 };
    thumbRef.current?.classList.add('dragging');
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag.current.active || !thumbRef.current) return;
    const x = Math.min(Math.max(0, e.clientX - drag.current.startX), drag.current.max);
    drag.current.x = x;
    thumbRef.current.style.transform = `translateX(${x}px)`;
  };
  const endDrag = () => {
    if (!drag.current.active || !thumbRef.current) return;
    drag.current.active = false;
    thumbRef.current.classList.remove('dragging');
    const reached = drag.current.max > 0 && drag.current.x >= drag.current.max * 0.92;
    thumbRef.current.style.transform = reached ? `translateX(${drag.current.max}px)` : '';
    if (reached) confirm();
  };
  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (thumbRef.current) thumbRef.current.style.transform = `translateX(${maxTravel()}px)`;
      confirm();
    }
  };

  const variantClass =
    variant === 'brand' ? 'swipe-v2' : variant === 'card' ? 'swipe-v4' : 'swipe-v1';

  return (
    <div
      ref={trackRef}
      className={cx(
        'swipe',
        variantClass,
        pill && 'swipe-pill',
        done && 'swipe-done',
        disabled && 'is-disabled',
        className,
      )}
      {...rest}
    >
      <button
        ref={thumbRef}
        className="swipe-thumb"
        type="button"
        disabled={disabled || done}
        aria-label={typeof label === 'string' ? label : 'Swipe to confirm'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <Icon name={done ? 'check' : 'chevrons-right'} aria-hidden />
      </button>
      <span className="swipe-label" aria-live="polite">
        {done ? (confirmedLabel ?? label) : label}
      </span>
      <span className="swipe-hint" aria-hidden>
        <Icon name="chevrons-right" size={24} />
      </span>
    </div>
  );
}
