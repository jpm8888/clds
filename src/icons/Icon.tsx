import { forwardRef, type SVGAttributes } from 'react';
import { iconPaths, type IconName } from './paths';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Icon to render, from the typed MaV registry. */
  name: IconName;
  /**
   * Pixel size. Buttons and inputs use 20; dense rows 16; feature tiles 24.
   * @default 20
   */
  size?: number;
  /**
   * Stroke width. The doc set uses 1.7, component glyphs 2.
   * @default 2
   */
  strokeWidth?: number;
}

/**
 * Line icon from the MaV registry. Inherits `currentColor`, so it re-themes
 * with the surrounding text automatically — tint via CSS `color`.
 *
 * Decorative icons (next to a label) are `aria-hidden` by default; pass an
 * `aria-label` (and role="img" is applied) when the icon stands alone.
 *
 * @example
 * <Icon name="qr-code" />
 * <Icon name="bell" size={24} aria-label="Notifications" />
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 20, strokeWidth = 2, 'aria-label': ariaLabel, ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      {...rest}
    >
      {iconPaths[name]}
    </svg>
  );
});
