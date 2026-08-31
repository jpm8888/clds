import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './menu-button.css';

export type MenuButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type MenuButtonSize = 'sm' | 'md';

export interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` deep-navy fill, `secondary` grey fill, `tertiary` outlined. @default 'secondary' */
  variant?: MenuButtonVariant;
  /** md 50px / sm 40px circle. @default 'md' */
  size?: MenuButtonSize;
  /** Icon inside the circle. */
  icon: IconName;
  /** Label rendered under the circle. Omit for icon-only (pass `aria-label`). */
  label?: string;
}

/**
 * MaV circular menu button — home-screen quick actions ("Send", "Pay",
 * "Top-up"). Icon in a colored circle with an optional label below.
 *
 * @example
 * <MenuButton icon="send" label="Send" variant="primary" />
 * <MenuButton icon="qr-code" label="Scan" />
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { variant = 'secondary', size = 'md', icon, label, className, ...rest },
  ref,
) {
  const circle = (
    <button
      ref={ref}
      type="button"
      className={cx('menu-btn', size === 'sm' && 'menu-btn-sm', `menu-btn-${variant}`, className)}
      aria-label={label ? undefined : rest['aria-label']}
      {...rest}
    >
      <Icon name={icon} aria-hidden />
    </button>
  );
  if (!label) return circle;
  return (
    <span className="menu-btn-wrap">
      {circle}
      <span>{label}</span>
    </span>
  );
});
