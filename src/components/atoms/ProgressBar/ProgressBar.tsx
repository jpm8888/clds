import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './progress-bar.css';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Completion 0–100. @default 0 */
  value?: number;
  /** Greyed-out track with no fill. @default false */
  disabled?: boolean;
  /** Caption rendered left of the track (e.g. "Spent"). */
  label?: string;
  /** Render the percentage right of the track. @default false */
  showValue?: boolean;
}

/**
 * MaV determinate progress bar — 6px track, 8px radius. Used for spend
 * limits, goal progress, upload states.
 *
 * @example
 * <ProgressBar value={62} showValue />
 * <ProgressBar label="Monthly limit" value={80} />
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value = 0, disabled = false, label, showValue = false, className, ...rest },
  ref,
) {
  const clamped = Math.min(100, Math.max(0, value));
  const hasRow = Boolean(label) || showValue;
  const track = (
    <div
      className={cx('pbar', disabled && 'is-disabled')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={disabled ? undefined : clamped}
      aria-label={label ?? 'Progress'}
    >
      {!disabled && <div className="pbar-fill" style={{ width: `${clamped}%` }} />}
    </div>
  );
  if (!hasRow) {
    return (
      <div ref={ref} className={className} {...rest}>
        {track}
      </div>
    );
  }
  return (
    <div ref={ref} className={cx('pbar-row', className)} {...rest}>
      {label && <span className="pbar-label">{label}</span>}
      {track}
      {showValue && <span className="pbar-label right">{clamped}%</span>}
    </div>
  );
});
