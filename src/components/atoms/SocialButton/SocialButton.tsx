import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './social-button.css';

export type SocialButtonSize = 'sm' | 'md' | 'lg';

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default 'md' */
  size?: SocialButtonSize;
  /** Brand logo image URL (Google "G", Apple, Facebook…). 24px, 20px at sm. */
  brandSrc?: string;
  /** Alt for the brand logo (empty = decorative). @default '' */
  brandAlt?: string;
  /** Square logo-only button — pass `aria-label`. @default false */
  iconOnly?: boolean;
  children?: ReactNode;
}

/**
 * MaV social sign-in button — white card with a brand logo slot. Used on
 * auth screens ("Continue with Google/Apple").
 *
 * @example
 * <SocialButton brandSrc={googleLogo}>Continue with Google</SocialButton>
 * <SocialButton iconOnly brandSrc={appleLogo} aria-label="Sign in with Apple" />
 */
export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(function SocialButton(
  { size = 'md', brandSrc, brandAlt = '', iconOnly = false, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        'social-btn',
        size !== 'md' && `social-btn-${size}`,
        iconOnly && 'social-btn-icononly',
        className,
      )}
      {...rest}
    >
      {brandSrc && <img src={brandSrc} alt={brandAlt} />}
      {children}
    </button>
  );
});
