import { forwardRef, Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './breadcrumb.css';

export interface BreadcrumbAction {
  icon: IconName;
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Trail segments; the last one is the current page (not clickable). */
  crumbs: string[];
  /** Page title rendered under the trail. */
  title?: ReactNode;
  /** Trailing circular icon buttons. */
  actions?: BreadcrumbAction[];
  /** Called with the crumb index when a non-current crumb is clicked. */
  onCrumbClick?: (index: number) => void;
}

/**
 * MaV page header — breadcrumb trail + title with trailing icon actions
 * (Figma 139:2093). Desktop/tablet navigation aid; on phone screens prefer
 * `AppBar` instead.
 *
 * @example
 * <Breadcrumb
 *   crumbs={['Home', 'Accounts', 'Savings']}
 *   title="Savings account"
 *   actions={[{ icon: 'search', label: 'Search' }, { icon: 'info', label: 'Help' }]}
 * />
 */
export const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(function Breadcrumb(
  { crumbs, title, actions = [], onCrumbClick, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('top-header', className)} {...rest}>
      <div>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((c, i) =>
            i === crumbs.length - 1 ? (
              <span key={i} className="bc-current" aria-current="page">
                {c}
              </span>
            ) : (
              <Fragment key={i}>
                <button type="button" className="bc-link" onClick={() => onCrumbClick?.(i)}>
                  {c}
                </button>
                <span className="bc-sep" aria-hidden>
                  /
                </span>
              </Fragment>
            ),
          )}
        </nav>
        {title && <div className="th-title">{title}</div>}
      </div>
      {actions.length > 0 && (
        <div className="th-actions">
          {actions.map((a, i) => (
            <button
              key={i}
              type="button"
              className="th-icon-btn"
              aria-label={a.label}
              onClick={a.onClick}
            >
              <Icon name={a.icon} size={18} strokeWidth={1.7} aria-hidden />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
