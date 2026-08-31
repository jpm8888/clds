import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './empty-state.css';

export type EmptyStateMedia = 'illustration' | 'icon' | 'loader' | 'none';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * What to show above the text: a built-in illustration, a circular brand
   * icon, a loading spinner, or nothing.
   * @default 'none'
   */
  media?: EmptyStateMedia;
  /** Icon shown when media="icon". @default 'check' */
  icon?: IconName;
  /** Replace the media slot entirely (e.g. an <Illustration>). */
  customMedia?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

/**
 * Centred empty/status state for search results, contact panels, and empty
 * lists — optional media above a title + subtitle.
 *
 * @example
 * <EmptyState media="icon" icon="search" title="No results" subtitle="Try a different name or account number." />
 * <EmptyState media="loader" title="Fetching transactions…" />
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { media = 'none', icon = 'check', customMedia, title, subtitle, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('empty', className)} {...rest}>
      {customMedia ??
        (media === 'illustration' ? (
          <svg className="empty-illus" viewBox="0 0 150 120" fill="none" aria-hidden>
            <ellipse cx="75" cy="104" rx="52" ry="9" fill="var(--mav-main-primary)" opacity=".08" />
            <path d="M40 58l35-20 35 20-35 20z" fill="var(--mav-tint-primary-300)" />
            <path d="M40 58v26l35 20V78z" fill="var(--mav-tint-primary-600)" />
            <path d="M110 58v26l-35 20V78z" fill="var(--mav-tint-primary-800)" />
            <rect
              x="60"
              y="60"
              width="8"
              height="8"
              rx="1"
              fill="var(--mav-main-white)"
              opacity=".8"
            />
            <rect
              x="82"
              y="60"
              width="8"
              height="8"
              rx="1"
              fill="var(--mav-main-white)"
              opacity=".55"
            />
            <path d="M63 30h24v10H63z" fill="var(--mav-main-primary)" />
          </svg>
        ) : media === 'icon' ? (
          <span className="empty-icon" aria-hidden>
            <Icon name={icon} size={28} strokeWidth={2.6} />
          </span>
        ) : media === 'loader' ? (
          <span className="empty-loader" role="status" aria-label="Loading" />
        ) : null)}
      {title && <span className="empty-title">{title}</span>}
      {(subtitle ?? children) && <span className="empty-sub">{subtitle ?? children}</span>}
    </div>
  );
});
