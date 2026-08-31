import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './alert.css';

export type AlertVariant = 'primary' | 'danger' | 'success' | 'warning';

export interface AlertAction {
  label: string;
  onClick?: () => void;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Tint + icon/title colour. 10% alpha background of the variant colour;
   * body copy stays neutral for legibility.
   * @default 'primary'
   */
  variant?: AlertVariant;
  /** Bold headline. Omit for the compact single-line alert, where the variant colour IS the message. */
  title?: ReactNode;
  /** Leading icon. @default 'bell-ringing' */
  icon?: IconName;
  /** Up to two inline text actions (first brand-coloured, second muted). */
  actions?: AlertAction[];
  /** Body / description copy. */
  children?: ReactNode;
}

/**
 * MaV inline alert (Figma set 52:28340) — a tinted message strip for
 * in-content feedback. Use Toast for transient overlay feedback instead.
 *
 * Guidance:
 * - `danger` for failed payments/verification, `warning` for limits,
 *   `success` for confirmations, `primary` for neutral product notices.
 * - With a `title` the alert goes multiline: title + neutral description.
 *
 * @example
 * <Alert variant="warning" title="Spending limit almost reached">
 *   You have used 90% of your monthly limit.
 * </Alert>
 * <Alert variant="success" actions={[{ label: 'View receipt' }]}>
 *   Payment sent to Amara.
 * </Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'primary', title, icon = 'bell-ringing', actions, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cx('mav-alert', `alert-${variant}`, Boolean(title) && 'is-multiline', className)}
      {...rest}
    >
      <span className="alert-icon">
        <Icon name={icon} aria-hidden />
      </span>
      <div className="alert-main">
        {title ? (
          <div className="alert-body">
            <div className="alert-title">{title}</div>
            {children != null && <div className="alert-desc">{children}</div>}
          </div>
        ) : (
          <p className="alert-single">{children}</p>
        )}
        {actions && actions.length > 0 && (
          <div className="alert-actions">
            {actions.map((a) => (
              <button key={a.label} type="button" className="alert-btn" onClick={a.onClick}>
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
