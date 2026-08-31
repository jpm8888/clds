import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './toast.css';

export type ToastTone = 'primary' | 'danger' | 'warning' | 'success';

/* Source page classes name the tones by colour. */
const TONE_CLASS: Record<ToastTone, string> = {
  primary: 'toast-primary',
  danger: 'toast-red',
  warning: 'toast-orange',
  success: 'toast-green',
};

const TONE_ICON: Record<ToastTone, IconName> = {
  primary: 'bell',
  danger: 'alert-circle',
  warning: 'alert-triangle',
  success: 'check-circle',
};

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Icon-chip tint. @default 'primary' */
  tone?: ToastTone;
  /** Headline (bold; medium weight when there is no description). */
  title: ReactNode;
  /** Secondary line under the title. */
  description?: ReactNode;
  /** Override the tone's default icon. */
  icon?: IconName;
  /** Trailing text-button label. */
  action?: string;
  onAction?: () => void;
  /** Renders the ✕ button when provided. */
  onClose?: () => void;
}

/**
 * MaV toast (Figma page 85:5234) — a floating card with a soft-tinted icon
 * chip for transient feedback. Anchor it near a screen edge yourself
 * (position: fixed; z-index: var(--mav-z-toast)); the design system ships
 * the card only, not a toast manager.
 *
 * @example
 * <Toast tone="success" title="Money sent" description="₱2,500.00 to Amara"
 *        action="View" onClose={() => {}} />
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { tone = 'primary', title, description, icon, action, onAction, onClose, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cx('toast', TONE_CLASS[tone], !description && 'toast-1line', className)}
      {...rest}
    >
      <div className="toast-lead">
        <span className="toast-ic">
          <Icon name={icon ?? TONE_ICON[tone]} aria-hidden />
        </span>
        <div className="toast-body">
          <div className="toast-title">{title}</div>
          {description != null && <div className="toast-desc">{description}</div>}
        </div>
      </div>
      {action && (
        <button type="button" className="toast-btn" onClick={onAction}>
          {action}
        </button>
      )}
      {onClose && (
        <button type="button" className="toast-x" aria-label="Dismiss" onClick={onClose}>
          <Icon name="x" size={24} strokeWidth={1.8} aria-hidden />
        </button>
      )}
    </div>
  );
});

export interface ToastNotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Buttons stacked in the right-side rail (e.g. Confirm / Dismiss). */
  actions: AlertLikeAction[];
}

interface AlertLikeAction {
  label: string;
  onClick?: () => void;
}

/**
 * Notification toast — title + description with a right-side button rail.
 * Use for actionable pushes (approve login, confirm payee).
 *
 * @example
 * <ToastNotification title="New login request" description="Chrome · Manila"
 *   actions={[{ label: 'Approve' }, { label: 'Deny' }]} />
 */
export const ToastNotification = forwardRef<HTMLDivElement, ToastNotificationProps>(
  function ToastNotification({ title, description, actions, className, ...rest }, ref) {
    return (
      <div ref={ref} role="status" className={cx('ntoast', className)} {...rest}>
        <div className="ntoast-body">
          <div className="ntoast-title">{title}</div>
          {description != null && <div className="ntoast-desc">{description}</div>}
        </div>
        <div className="ntoast-actions">
          {actions.map((a) => (
            <button key={a.label} type="button" className="ntoast-btn" onClick={a.onClick}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

export type SnackbarStatus = 'success' | 'error' | 'info' | 'warning';

const SNACK_ICON: Record<SnackbarStatus, IconName> = {
  success: 'check',
  error: 'alert-triangle',
  info: 'info',
  warning: 'alert-triangle',
};

export interface SnackbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Status-dot colour + icon. @default 'success' */
  status?: SnackbarStatus;
  title: ReactNode;
  description?: ReactNode;
  /** Trailing accent text action (lime on the dark surface). */
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
}

/**
 * Snackbar — the compact floating dark mini-toast (from feedback.html).
 * Invariant dark surface in both themes; the action reads in brand lime.
 *
 * @example
 * <Snackbar status="success" title="Card frozen" action="Undo" />
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function Snackbar(
  { status = 'success', title, description, action, onAction, onClose, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cx('mav-toast', `snack-${status}`, className)}
      {...rest}
    >
      <span className="snack-icon">
        <Icon name={SNACK_ICON[status]} size={12} strokeWidth={2.6} aria-hidden />
      </span>
      <div className="snack-body">
        <div className="snack-title">{title}</div>
        {description != null && <div className="snack-desc">{description}</div>}
      </div>
      {action && (
        <button type="button" className="snack-action" onClick={onAction}>
          {action}
        </button>
      )}
      {onClose && (
        <button type="button" className="snack-close" aria-label="Dismiss" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
});
