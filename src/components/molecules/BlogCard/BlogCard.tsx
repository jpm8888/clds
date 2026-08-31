import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './blog-card.css';

export interface BlogCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** Badge label over the hero. @default 'Course' */
  badge?: ReactNode;
  /** Date / kicker line above the title. */
  date?: ReactNode;
  /** Two-line clamped title. */
  title: ReactNode;
  /** Hero image src (falls back to a dark panel when omitted). */
  image?: string;
  /** Read state — desaturates the image and mutes the text. @default false */
  read?: boolean;
  /** @default 'Read more' */
  moreLabel?: ReactNode;
}

/**
 * MaV blog card (Figma 139:2095) — 260px insights card: full-bleed hero,
 * primary badge, date, two-line title, "Read more ›". Toggling `read`
 * desaturates the card and pops in a check.
 *
 * The whole card is a <button>; wire `onClick` to open the article.
 *
 * @example
 * <BlogCard badge="Course" date="Aug 12" title="How compounding grows your savings"
 *   image={hero} onClick={openArticle} />
 */
export const BlogCard = forwardRef<HTMLButtonElement, BlogCardProps>(function BlogCard(
  {
    badge = 'Course',
    date,
    title,
    image,
    read = false,
    moreLabel = 'Read more',
    className,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx('blog-card', read && 'read', className)}
      {...rest}
    >
      <div className="thumb">{image && <img src={image} alt="" />}</div>
      <span className="blog-badge">{badge}</span>
      <span className="blog-check">
        <Icon name="check" size={13} strokeWidth={3} aria-hidden />
      </span>
      <div className="body">
        {date != null && <p className="blog-date">{date}</p>}
        <div className="bstack">
          <h4 className="blog-title">{title}</h4>
        </div>
        <span className="blog-more">
          {moreLabel}
          <Icon name="chevron-right" size={12} strokeWidth={2.2} aria-hidden />
        </span>
      </div>
    </button>
  );
});

export interface BlogListRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** @default 'Blog' */
  badge?: ReactNode;
  title: ReactNode;
  /** Meta line, e.g. '4 min read • MyWallSt'. */
  meta?: ReactNode;
  /** Right-side square thumbnail src. */
  image?: string;
  read?: boolean;
}

/**
 * MaV blog list row — the 335×120 horizontal variant with a right-side
 * thumbnail that fades into the tinted surface.
 *
 * @example
 * <BlogListRow title="What is a money market fund?" meta="4 min read • MyWallSt" image={thumb} />
 */
export const BlogListRow = forwardRef<HTMLButtonElement, BlogListRowProps>(function BlogListRow(
  { badge = 'Blog', title, meta, image, read = false, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx('blog-list', read && 'read', className)}
      {...rest}
    >
      <span className="blog-badge">{badge}</span>
      <span className="blog-check">
        <Icon name="check" size={13} strokeWidth={3} aria-hidden />
      </span>
      <div className="thumb">{image && <img src={image} alt="" />}</div>
      <div className="bstack">
        <h4 className="blog-title">{title}</h4>
        {meta != null && <p className="blog-meta">{meta}</p>}
      </div>
    </button>
  );
});
