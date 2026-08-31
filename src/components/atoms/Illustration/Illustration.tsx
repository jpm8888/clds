import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './illustration.css';
import il138 from '../../../assets/illustrations/il-138.svg';
import il139 from '../../../assets/illustrations/il-139.svg';
import il140 from '../../../assets/illustrations/il-140.svg';
import il141 from '../../../assets/illustrations/il-141.svg';
import il142 from '../../../assets/illustrations/il-142.svg';
import il150 from '../../../assets/illustrations/il-150.svg';
import il156 from '../../../assets/illustrations/il-156.svg';
import il157 from '../../../assets/illustrations/il-157.svg';
import il158 from '../../../assets/illustrations/il-158.svg';
import il168 from '../../../assets/illustrations/il-168.svg';

/** The illustrations bundled with the package (subset of the ~40-piece MaV
 * isometric set; the full library lives in the MaV source repo). */
export const illustrationSources = {
  'il-138': il138,
  'il-139': il139,
  'il-140': il140,
  'il-141': il141,
  'il-142': il142,
  'il-150': il150,
  'il-156': il156,
  'il-157': il157,
  'il-158': il158,
  'il-168': il168,
} as const;

export type IllustrationName = keyof typeof illustrationSources;

export const illustrationNames = Object.keys(illustrationSources) as IllustrationName[];

export interface IllustrationProps extends HTMLAttributes<HTMLSpanElement> {
  /** One of the bundled illustrations. Ignored when `src` is given. */
  name?: IllustrationName;
  /** Escape hatch: any image URL (e.g. an illustration copied from the MaV source repo). */
  src?: string;
  /** Alt text — leave empty for decorative use. @default '' */
  alt?: string;
  /** Rendered width in px (height scales to fit). @default 160 */
  size?: number;
}

/**
 * MaV isometric illustration — empty states, onboarding, feature intros.
 * Decorative by default (empty alt).
 *
 * @example
 * <Illustration name="il-140" size={180} />
 * <Illustration src={customUrl} alt="Savings goal" />
 */
export const Illustration = forwardRef<HTMLSpanElement, IllustrationProps>(function Illustration(
  { name, src, alt = '', size = 160, className, style, ...rest },
  ref,
) {
  const url = src ?? (name ? illustrationSources[name] : undefined);
  return (
    <span ref={ref} className={cx('ill', className)} style={{ width: size, ...style }} {...rest}>
      {url && <img src={url} alt={alt} />}
    </span>
  );
});
