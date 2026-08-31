import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './badge.css';

export type BadgeColor = 'primary' | 'red' | 'green' | 'orange';
export type BadgeType = 'filled' | 'outline' | 'clear';
export type BadgeSize = 'md' | 'sm' | 'xs';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic color. `red` = danger, `green` = success, `orange` = warning
   * (color names mirror the Figma variants; the underlying tokens are
   * --mav-badge-danger/success/warning-*).
   * @default 'primary'
   */
  color?: BadgeColor;
  /** `filled` solid/soft bg, `outline` 1px colored border, `clear` text only. @default 'filled' */
  type?: BadgeType;
  /** md 14px / sm 12px / xs 11px. @default 'md' */
  size?: BadgeSize;
  /** Leading colored dot (status style). @default false */
  dot?: boolean;
  /** Leading icon from the MaV registry (sized to the text). */
  icon?: IconName;
  children?: ReactNode;
}

/**
 * MaV badge — labels and categorizes information (statuses, counts, tags).
 * Static, not interactive — for dismissible tags use Chip.
 *
 * @example
 * <Badge color="green" dot>Completed</Badge>
 * <Badge color="red" type="outline">Overdue</Badge>
 * <Badge color="orange" icon="alert-triangle" size="sm">Pending</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    color = 'primary',
    type = 'filled',
    size = 'md',
    dot = false,
    icon,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx(
        'b',
        size !== 'md' && `b-${size}`,
        type === 'outline' && 'b-outline',
        type === 'clear' && 'b-clear',
        `b-${color}`,
        className,
      )}
      {...rest}
    >
      {dot && <span className="b-dot" />}
      {icon && <Icon name={icon} className="ic" aria-hidden />}
      {children}
    </span>
  );
});
