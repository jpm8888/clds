import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './avatar.css';

export type AvatarSize = '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | number;
export type AvatarShape = 'rounded' | 'squared';
export type AvatarColor = 'grey' | 'primary' | 'red';

const SIZE_MAP: Record<string, number> = {
  '3xl': 96,
  '2xl': 80,
  xl: 64,
  lg: 48,
  md: 40,
  sm: 32,
  xs: 24,
};

function toPx(size: AvatarSize): string {
  if (typeof size === 'number') return `${size}px`;
  return `${SIZE_MAP[size] ?? 40}px`;
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Named size (3xl 96 … xs 24) or a raw pixel number. @default 'md' (40px) */
  size?: AvatarSize;
  /** @default 'rounded' */
  shape?: AvatarShape;
  /** Initials background/text theme (ignored when `src` is set). @default 'grey' */
  color?: AvatarColor;
  /** Image source — takes precedence over `initials`. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Fallback text initials (1–2 characters). */
  initials?: string;
  /** Show the green online-status dot. @default false */
  status?: boolean;
}

/**
 * MaV avatar — user/merchant identity, as an image or text initials.
 *
 * @example
 * <Avatar src={photoUrl} alt="Amara" status />
 * <Avatar initials="JD" color="primary" size="lg" />
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    size = 'md',
    shape = 'rounded',
    color = 'grey',
    src,
    alt = '',
    initials,
    status = false,
    className,
    style,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('avatar', shape, `avatar-${color}`, className)}
      style={{ '--sz': toPx(size), ...style } as CSSProperties}
      {...rest}
    >
      {src ? <img src={src} alt={alt} /> : <span className="avatar-inner">{initials}</span>}
      {status && <span className="avatar-status" />}
    </span>
  );
});

export interface AvatarProfileProps extends HTMLAttributes<HTMLSpanElement> {
  /** Name label rendered under the avatar. */
  name: string;
  /** The <Avatar> (or any node) shown above the name. */
  children?: ReactNode;
}

/**
 * Avatar + name label stacked vertically (Figma "Profile") — quick-send
 * contact rows, recipient pickers.
 *
 * @example
 * <AvatarProfile name="Amara"><Avatar src={amara} size="xl" /></AvatarProfile>
 */
export const AvatarProfile = forwardRef<HTMLSpanElement, AvatarProfileProps>(function AvatarProfile(
  { name, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx('profile', className)} {...rest}>
      {children}
      <span className="name">{name}</span>
    </span>
  );
});

export interface AvatarStackProps extends HTMLAttributes<HTMLDivElement> {
  /** Size applied to every child avatar (px number or CSS length). @default 48 */
  size?: number | string;
  /** Overflow count — renders a trailing "+N" pill. */
  more?: number | string;
  children?: ReactNode;
}

/**
 * Overlapping avatar group with an optional "+N" overflow chip (shared
 * accounts, group payment participants).
 *
 * @example
 * <AvatarStack size={40} more="+3"><Avatar src={a} /><Avatar src={b} /></AvatarStack>
 */
export const AvatarStack = forwardRef<HTMLDivElement, AvatarStackProps>(function AvatarStack(
  { size = 48, more, className, style, children, ...rest },
  ref,
) {
  const px = typeof size === 'number' ? `${size}px` : size;
  return (
    <div
      ref={ref}
      className={cx('avatar-stack', className)}
      style={{ '--sz': px, ...style } as CSSProperties}
      {...rest}
    >
      {children}
      {more != null && <span className="avatar-more">{more}</span>}
    </div>
  );
});
