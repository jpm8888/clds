import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import opening1 from '../../../assets/brand/splash/opening-1.svg';
import opening2 from '../../../assets/brand/splash/opening-2.svg';
import opening3 from '../../../assets/brand/splash/opening-3.svg';
import './splash.css';

export type SplashVariant = 'light' | 'brand' | 'beam';

const backgrounds: Record<SplashVariant, string> = {
  light: opening1,
  brand: opening2,
  beam: opening3,
};

export interface SplashProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Background art + logo tint. `light` = squares on white, `brand` = brand
   * gradient with white mark, `beam` = light beam.
   * @default 'brand'
   */
  variant?: SplashVariant;
  /** Override the background art (any image URL). */
  backgroundSrc?: string;
  /** Footer legal line. */
  footer?: ReactNode;
  /** Replace the default Fyscal logomark. */
  logo?: ReactNode;
}

/**
 * Splash / opening screen — drifting background art, pulsing glow, and the
 * centred brand mark. Render it full-viewport (or inside a PhoneFrame in
 * docs). Purely decorative; navigate away after your app boot completes.
 *
 * @example
 * <Splash variant="brand" footer="© 2026 Fyscal Technologies. All rights reserved." />
 */
export const Splash = forwardRef<HTMLDivElement, SplashProps>(function Splash(
  { variant = 'brand', backgroundSrc, footer, logo, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('sp-screen', `sp-${variant}`, className)} {...rest}>
      <div
        className="sp-bg"
        style={{ backgroundImage: `url(${backgroundSrc ?? backgrounds[variant]})` }}
        aria-hidden
      />
      <div className="sp-sheen" aria-hidden />
      <div className="sp-glow" aria-hidden />
      <div className="sp-body">
        <div className="sp-mark">
          {logo ?? (
            <svg viewBox="0 0 1024 1024" aria-label="Fyscal Technologies" role="img">
              <path d="M857.946 258.305L831.569 412.58H226.896L253.468 258.305H857.946Z" />
              <path d="M680.165 765.692H517.289L570.089 456.822H733.08L680.165 765.692Z" />
              <path d="M492.872 611.911L217.705 611.202L351.506 633.936L328.929 765.695H166.053L219.277 456.824L519.444 456.493L492.872 611.911Z" />
            </svg>
          )}
        </div>
      </div>
      {footer && <div className="sp-foot">{footer}</div>}
    </div>
  );
});
