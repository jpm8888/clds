import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import bayadLockup from '../../../assets/brand/bayad/logo-vertical.png';
import './splash.css';

export type SplashVariant = 'light' | 'gradient' | 'deep';

export interface SplashProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ground treatment. `light` = white with a warm brand wash, `gradient` =
   * the brand CTA gradient (orange → blue), `deep` = the deep pressed shade.
   * On the coloured grounds the mark sits on a white plate — the squircle is
   * brand orange and would otherwise disappear into its own colour.
   * @default 'gradient'
   */
  variant?: SplashVariant;
  /** Transient status line under the progress rail. @default 'Securing your session' */
  hint?: ReactNode;
  /** Footer legal line. */
  footer?: ReactNode;
  /** Replace the default Bayad lockup. */
  logo?: ReactNode;
}

/**
 * Splash / opening screen — the centred brand lockup with dispersing rings,
 * a determinate progress rail, and (on the gradient ground) a slow light
 * sweep. Render it full-viewport (or inside a PhoneFrame in docs). The
 * at-rest state is the reduced-motion state: mark visible, rail full,
 * footer legible — motion is added, never depended on. Navigate away after
 * your app boot completes.
 *
 * @example
 * <Splash variant="gradient" footer="© 2026 CIS Bayad Center, Inc. All rights reserved." />
 */
export const Splash = forwardRef<HTMLDivElement, SplashProps>(function Splash(
  {
    variant = 'gradient',
    hint = 'Securing your session',
    footer,
    logo,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div ref={ref} className={cx('sp-screen', `sp-${variant}`, 'sp-play', className)} {...rest}>
      <div className="sp-wash" aria-hidden />
      <div className="sp-sheen" aria-hidden />
      <div className="sp-body">
        <div className="sp-markwrap">
          <span className="sp-ring" aria-hidden />
          <span className="sp-ring" aria-hidden />
          <span className="sp-mark">
            {logo ?? <img src={bayadLockup} alt="Bayad" width={478} height={500} />}
          </span>
        </div>
        <div className="sp-load">
          <div className="sp-rail" aria-hidden>
            <div className="sp-fill" />
          </div>
          {hint && <div className="sp-hint">{hint}</div>}
        </div>
      </div>
      {footer && <div className="sp-foot">{footer}</div>}
    </div>
  );
});
