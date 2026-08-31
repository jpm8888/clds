import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'clear' | 'swipe';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style. `primary` = filled brand, `secondary` = outlined,
   * `clear` = text-only (zero padding), `swipe` = bottom-sheet trigger bar
   * (rounded top corners only).
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * `md` is the 40px default. `xl` is the full-width dock CTA
   * (max-width 343px) used at the bottom of mobile screens.
   * @default 'md'
   */
  size?: ButtonSize;
  /** Square icon-only button — pass `aria-label` when there is no text. @default false */
  iconOnly?: boolean;
  /** Icon rendered before the label (20px at every size). */
  leadingIcon?: IconName;
  /** Icon rendered after the label. */
  trailingIcon?: IconName;
  /** Shows a spinner before the label and disables the button. @default false */
  loading?: boolean;
  children?: ReactNode;
}

/**
 * MaV action button. 4px radius, medium weight, 20px icons at every size.
 *
 * Guidance:
 * - One `primary` button per screen; pair with `secondary`/`clear` actions.
 * - Use `size="xl"` inside a ButtonDock for the main mobile CTA.
 * - Dark mode is automatic (brand flips to lime) — never restyle per theme.
 *
 * @example
 * <Button leadingIcon="plus">Add account</Button>
 * <Button variant="secondary" size="sm">Cancel</Button>
 * <Button variant="clear" trailingIcon="chevron-right">See all</Button>
 * <Button iconOnly leadingIcon="bell" aria-label="Notifications" />
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    iconOnly = false,
    leadingIcon,
    trailingIcon,
    loading = false,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx(
        'mav-btn',
        `mav-btn-${variant}`,
        size !== 'md' && `mav-btn-${size}`,
        iconOnly && 'mav-btn-icononly',
        className,
      )}
      disabled={disabled ?? loading}
      {...rest}
    >
      {loading ? (
        <span className="mav-btn-spinner" aria-hidden />
      ) : (
        leadingIcon && <Icon name={leadingIcon} aria-hidden />
      )}
      {children}
      {trailingIcon && <Icon name={trailingIcon} aria-hidden />}
    </button>
  );
});
