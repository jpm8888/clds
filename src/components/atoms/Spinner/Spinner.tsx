import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './spinner.css';

export type SpinnerSize = 'lg' | 'md' | 'sm' | 'xs';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** lg 48 / md 32 / sm 24 / xs 16 px. @default 'md' */
  size?: SpinnerSize;
  /** Accessible label announced to screen readers. @default 'Loading' */
  label?: string;
}

/**
 * MaV comet spinner — CSS-only loading ring in the brand color (blue,
 * lime in dark mode). Tint a specific instance by overriding
 * `--mav-loader-spin` locally (e.g. white inside a primary button).
 *
 * @example
 * <Spinner />
 * <Spinner size="xs" style={{ '--mav-loader-spin': '#fff' } as React.CSSProperties} />
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', label = 'Loading', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('loader', `loader-${size}`, className)}
      role="status"
      aria-label={label}
      {...rest}
    />
  );
});
