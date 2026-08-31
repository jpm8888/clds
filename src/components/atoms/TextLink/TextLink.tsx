import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './text-link.css';

export type TextLinkVariant = 'primary' | 'secondary' | 'tertiary';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** `primary` brand color, `secondary` ink, `tertiary` brand→ink on hover. @default 'primary' */
  variant?: TextLinkVariant;
  /** Small size (16px icons, same text). @default 'md' */
  size?: 'md' | 'sm';
  /** Icon before the label. */
  leadingIcon?: IconName;
  /** Icon after the label (e.g. chevron-right for "See all"). */
  trailingIcon?: IconName;
  /** Disabled visual + blocks clicks. @default false */
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * MaV text link — inline navigation/action text with no underline in any
 * state. Renders an <a>; for links without an href (pure actions) prefer
 * <Button variant="clear">.
 *
 * @example
 * <TextLink href="/transactions" trailingIcon="chevron-right">See all</TextLink>
 * <TextLink variant="secondary" href="/help">Need help?</TextLink>
 */
export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(function TextLink(
  {
    variant = 'primary',
    size = 'md',
    leadingIcon,
    trailingIcon,
    disabled = false,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx(
        'tlink',
        size === 'sm' && 'tlink-sm',
        `tlink-${variant}`,
        disabled && 'is-disabled',
        className,
      )}
      aria-disabled={disabled || undefined}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} aria-hidden />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} aria-hidden />}
    </a>
  );
});
