import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './list.css';

/**
 * MaV list container — a vertical stack of ListRow items divided by a 1px
 * subtle rule (Figma 125:4920). Compose rows from the accessory parts:
 * ListSoftIcon / ListAvatar / ListStore (leading), ListCheck / ListButton /
 * ListTag (trailing).
 *
 * @example
 * <List>
 *   <ListRow name="Electricity" subtitle="Due in 3 days"
 *     leading={<ListSoftIcon icon="card" />} trailing={<ListTag>₱1,240</ListTag>} />
 *   <ListRow name="Amara Cruz" subtitle="Sent you money"
 *     leading={<ListAvatar initials="AC" background="#6a35ff" />}
 *     trailing={<ListCheck />} />
 * </List>
 */
export const List = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function List(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('list', className)} {...rest}>
      {children}
    </div>
  );
});

export interface ListRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Primary line (14px medium). */
  name?: ReactNode;
  /** Secondary line (12px muted). */
  subtitle?: ReactNode;
  /** Leading slot — ListSoftIcon, ListAvatar, ListStore, or any node. */
  leading?: ReactNode;
  /** Trailing slot — ListCheck, ListButton, ListTag, or any node. */
  trailing?: ReactNode;
}

/** A single list row. Every slot is optional. */
export const ListRow = forwardRef<HTMLDivElement, ListRowProps>(function ListRow(
  { name, subtitle, leading, trailing, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('li', className)} {...rest}>
      {leading}
      <div className="li-body">
        {name != null && <span className="li-name">{name}</span>}
        {subtitle != null && <span className="li-sub">{subtitle}</span>}
        {children}
      </div>
      {trailing}
    </div>
  );
});

export interface ListSoftIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Icon shown inside the soft brand-tinted chip. */
  icon?: IconName;
}

/** Leading slot: a soft brand-tinted 8px-radius icon chip. */
export const ListSoftIcon = forwardRef<HTMLSpanElement, ListSoftIconProps>(function ListSoftIcon(
  { icon, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx('li-softic', className)} {...rest}>
      {icon ? <Icon name={icon} size={24} strokeWidth={1.6} aria-hidden /> : children}
    </span>
  );
});

export interface ListAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** One-or-two letter initials. */
  initials: string;
  /** Background colour behind the white initials (any CSS colour). */
  background?: string;
}

/** Leading slot: a 40px circular initials avatar. */
export const ListAvatar = forwardRef<HTMLSpanElement, ListAvatarProps>(function ListAvatar(
  { initials, background, className, style, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('li-avatar', className)}
      style={{ background, ...style }}
      {...rest}
    >
      {initials}
    </span>
  );
});

export interface ListStoreProps extends HTMLAttributes<HTMLSpanElement> {
  /** Short monogram label, e.g. 'NFX'. */
  label: string;
  background?: string;
}

/** Leading slot: a 34px square store-logo tile. */
export const ListStore = forwardRef<HTMLSpanElement, ListStoreProps>(function ListStore(
  { label, background, className, style, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('li-store', className)}
      style={{ background, ...style }}
      {...rest}
    >
      {label}
    </span>
  );
});

/** Trailing slot: ghost outline button. */
export const ListButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function ListButton({ className, children, ...rest }, ref) {
    return (
      <button ref={ref} type="button" className={cx('li-btn', className)} {...rest}>
        {children}
      </button>
    );
  },
);

/** Trailing slot: neutral tag pill. */
export const ListTag = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function ListTag({ className, children, ...rest }, ref) {
    return (
      <span ref={ref} className={cx('li-tag', className)} {...rest}>
        {children}
      </span>
    );
  },
);

/** Trailing slot: check mark. */
export function ListCheck({ className, ...rest }: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={cx('li-check', className)} aria-hidden {...rest}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
