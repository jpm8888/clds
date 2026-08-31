import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './chip.css';

export type ChipColor = 'primary' | 'red' | 'green' | 'orange' | 'grey' | 'white';
export type ChipType = 'filled' | 'outline';
export type ChipSize = 'md' | 'sm' | 'xs';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** `red` = danger, `green` = success, `orange` = warning; `grey`/`white` are neutral. @default 'primary' */
  color?: ChipColor;
  /** @default 'filled' */
  type?: ChipType;
  /** md 14px / sm 12px / xs 11px. @default 'md' */
  size?: ChipSize;
  /** Called when the trailing close icon (or chip) is clicked. */
  onClose?: () => void;
  /** Render the trailing close icon. @default true */
  showClose?: boolean;
  children?: ReactNode;
}

/**
 * MaV chip — a compact, dismissible tag (filters, selected recipients,
 * categories). Interactive: renders a <button>. For a static label use Badge.
 *
 * @example
 * <Chip onClose={() => removeFilter('food')}>Food & drink</Chip>
 * <Chip color="grey" showClose={false}>+63 917 •••• 210</Chip>
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    color = 'primary',
    type = 'filled',
    size = 'md',
    onClose,
    showClose = true,
    onClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        'chip',
        size !== 'md' && `chip-${size}`,
        type === 'outline' && 'chip-outline',
        `chip-${color}`,
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        onClose?.();
      }}
      {...rest}
    >
      {children}
      {showClose && <Icon name="x" className="chip-close" aria-hidden />}
    </button>
  );
});
