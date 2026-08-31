import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './phone-frame.css';

export interface PhoneFrameProps extends HTMLAttributes<HTMLDivElement> {
  /** Renders the 9:41 status bar at the top of the screen. @default true */
  statusBar?: boolean;
  /** Renders the home indicator pinned to the bottom of the screen. @default false */
  homeIndicator?: boolean;
  /** Screen content. Position `absolute; inset:0` children fill the screen. */
  children?: ReactNode;
}

/**
 * Presentational 330×640 device bezel for staging mobile organisms
 * (BottomSheet, splash/auth screens) in Storybook and demos. Purely visual —
 * ship real apps full-viewport instead.
 *
 * @example
 * <PhoneFrame homeIndicator>
 *   <BottomSheet open onClose={...} title="Confirm payment">…</BottomSheet>
 * </PhoneFrame>
 */
export const PhoneFrame = forwardRef<HTMLDivElement, PhoneFrameProps>(function PhoneFrame(
  { statusBar = true, homeIndicator = false, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('phone', className)} {...rest}>
      <div className="phone-screen">
        {statusBar && (
          <div className="phone-status">
            <span>9:41</span>
            <span className="dots">
              <i />
            </span>
          </div>
        )}
        {children}
        {homeIndicator && (
          <div className="phone-home">
            <span />
          </div>
        )}
      </div>
    </div>
  );
});
