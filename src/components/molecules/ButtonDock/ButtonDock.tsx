import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './button-dock.css';

export interface ButtonDockProps extends HTMLAttributes<HTMLDivElement> {
  /** Label of the full-width primary CTA. @default 'Continue' */
  primary?: string;
  /** Click handler for the primary CTA. */
  onPrimary?: () => void;
  /** Optional secondary (outlined) button rendered below the primary. */
  secondary?: string;
  onSecondary?: () => void;
  /** Consent row content, e.g. <>I agree to the <a href="…">Terms</a></>. */
  checkbox?: ReactNode;
  /** Consent checkbox state (uncontrolled initial value). @default true */
  defaultChecked?: boolean;
  /** iOS home indicator bar at the bottom. @default true */
  homeIndicator?: boolean;
  /** Pin to the bottom of the viewport (`position: fixed`). @default false */
  fixed?: boolean;
  /** Replace the built-in buttons entirely (e.g. with <Button size="xl">). */
  children?: ReactNode;
}

/**
 * MaV sticky bottom footer (Figma 267:5230) — the standard home for a mobile
 * screen's main CTA. Rounded 32px top corners, elevation shadow, optional
 * consent checkbox row, secondary action, and iOS home indicator.
 *
 * Every payment/confirmation screen should end in a ButtonDock; keep exactly
 * one primary action in it.
 *
 * @example
 * <ButtonDock primary="Confirm payment" onPrimary={submit} />
 * <ButtonDock
 *   primary="Create account"
 *   checkbox={<>I agree to the <a href="/terms">Terms</a></>}
 * />
 */
export const ButtonDock = forwardRef<HTMLDivElement, ButtonDockProps>(function ButtonDock(
  {
    primary = 'Continue',
    onPrimary,
    secondary,
    onSecondary,
    checkbox,
    defaultChecked = true,
    homeIndicator = true,
    fixed = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div ref={ref} className={cx('dock', fixed && 'dock-fixed', className)} {...rest}>
      <div className="dock-inner">
        {children ?? (
          <>
            {checkbox && (
              <label className="dock-cbx">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                />
                <span className={cx('cbx', checked && 'on')} aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span>{checkbox}</span>
              </label>
            )}
            {secondary ? (
              <div className="dock-btns">
                <button type="button" className="dock-btn" onClick={onPrimary}>
                  {primary}
                </button>
                <button type="button" className="dock-btn secondary" onClick={onSecondary}>
                  {secondary}
                </button>
              </div>
            ) : (
              <button type="button" className="dock-btn" onClick={onPrimary}>
                {primary}
              </button>
            )}
          </>
        )}
      </div>
      {homeIndicator && <div className="home-ind" aria-hidden />}
    </div>
  );
});
