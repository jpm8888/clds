import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './button-group.css';

export type ButtonGroupSize = 'sm' | 'md' | 'lg';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'md' */
  size?: ButtonGroupSize;
  /** <ButtonGroupItem> children. */
  children?: ReactNode;
}

/**
 * MaV segmented button group — a bordered pill of equal sibling actions
 * separated by 1px rules (e.g. filter segments, export/share toolbars).
 *
 * @example
 * <ButtonGroup>
 *   <ButtonGroupItem leadingIcon="download">Export</ButtonGroupItem>
 *   <ButtonGroupItem leadingIcon="share">Share</ButtonGroupItem>
 * </ButtonGroup>
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      className={cx('btn-group', size !== 'md' && `btn-group-${size}`, className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon before the label. */
  leadingIcon?: IconName;
  /** Square icon-only segment — pass `aria-label`. @default false */
  iconOnly?: boolean;
  /** Leading checkbox visual (multi-select segments). @default false */
  check?: boolean;
  children?: ReactNode;
}

/** One segment inside a ButtonGroup. */
export const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  function ButtonGroupItem(
    { leadingIcon, iconOnly = false, check = false, className, children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cx('bg-item', iconOnly && 'bg-item-icononly', className)}
        {...rest}
      >
        {check && <span className="bg-check" aria-hidden />}
        {leadingIcon && <Icon name={leadingIcon} aria-hidden />}
        {children}
      </button>
    );
  },
);
