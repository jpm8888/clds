import { forwardRef, useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './pagination.css';

export type PaginationType = 'group' | 'clear' | 'count' | 'dots';
export type PaginationNav = 'both' | 'icon' | 'label' | 'none';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * `group` connected bar · `clear` spaced pills · `count` "Page X of Y" ·
   * `dots` carousel dots.
   * @default 'group'
   */
  type?: PaginationType;
  /**
   * Page count, or an explicit item list with gaps for group/clear
   * (e.g. [1, 2, 3, '…', 8]).
   * @default 5
   */
  pages?: number | Array<number | '…'>;
  /** Current page, 1-based. */
  page: number;
  onPageChange?: (page: number) => void;
  /** Prev/next rendering for group/clear/count. @default 'both' */
  nav?: PaginationNav;
}

function navBody(dir: 'prev' | 'next', mode: PaginationNav): ReactNode {
  const ico = (
    <Icon
      name={dir === 'prev' ? 'chevron-left' : 'chevron-right'}
      className={dir === 'prev' ? 'ic-prev' : 'ic-next'}
      size={18}
      aria-hidden
    />
  );
  const lbl = dir === 'prev' ? 'Previous' : 'Next';
  if (mode === 'icon') return ico;
  if (mode === 'label') return lbl;
  return dir === 'prev' ? (
    <>
      {ico}
      <span>{lbl}</span>
    </>
  ) : (
    <>
      <span>{lbl}</span>
      {ico}
    </>
  );
}

/**
 * MaV pagination (Figma 203:3134). Controlled: pass `page` (1-based) and
 * `onPageChange`. The active indicator glides between numbers; use `dots`
 * for onboarding/carousel screens.
 *
 * @example
 * <Pagination pages={8} page={page} onPageChange={setPage} />
 * <Pagination type="dots" pages={4} page={step} onPageChange={setStep} />
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  { type = 'group', pages = 5, page, onPageChange, nav = 'both', className, ...rest },
  ref,
) {
  const listRef = useRef<HTMLDivElement>(null);

  /* Glide the indicator under the active number (group/clear). */
  useLayoutEffect(() => {
    const wrap = listRef.current;
    if (!wrap) return;
    const ind = wrap.querySelector<HTMLElement>('.pg-ind');
    const active = wrap.querySelector<HTMLElement>('.pg-num.active');
    if (!ind) return;
    if (!active) {
      ind.style.opacity = '0';
      return;
    }
    ind.style.opacity = '1';
    ind.style.width = `${active.offsetWidth - (type === 'clear' ? 0 : 8)}px`;
    ind.style.transform = `translateX(${active.offsetLeft + (type === 'clear' ? 0 : 4)}px)`;
  }, [page, pages, type, nav]);

  const count = typeof pages === 'number' ? pages : pages.filter((p) => p !== '…').length;

  if (type === 'dots') {
    const n = typeof pages === 'number' ? pages : count;
    return (
      <div ref={ref} className={cx('pg', className)} {...rest}>
        <div className="pg-dots">
          {Array.from({ length: n }, (_, i) => (
            <button
              key={i}
              type="button"
              className={cx('pg-dot', i + 1 === page && 'on')}
              aria-label={`Page ${i + 1}`}
              aria-current={i + 1 === page ? 'page' : undefined}
              onClick={() => onPageChange?.(i + 1)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'count') {
    const total = typeof pages === 'number' ? pages : count;
    return (
      <div ref={ref} className={cx('pg', className)} {...rest}>
        <div className="pg-count">
          <button
            type="button"
            className="pg-btn nav"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
          >
            {navBody('prev', nav === 'none' ? 'both' : nav)}
          </button>
          <span className="pg-label">
            Page {page} of {total}
          </span>
          <button
            type="button"
            className="pg-btn nav"
            disabled={page >= total}
            onClick={() => onPageChange?.(page + 1)}
          >
            {navBody('next', nav === 'none' ? 'both' : nav)}
          </button>
        </div>
      </div>
    );
  }

  const items: Array<number | '…'> =
    typeof pages === 'number' ? Array.from({ length: pages }, (_, i) => i + 1) : pages;
  const last = items.reduce<number>((m, p) => (typeof p === 'number' && p > m ? p : m), 1);

  return (
    <div ref={ref} className={cx('pg', className)} {...rest}>
      <div className={type === 'group' ? 'pg-group' : 'pg-clear'} ref={listRef}>
        <span className="pg-ind" />
        {nav !== 'none' && (
          <button
            type="button"
            className="pg-item nav"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
          >
            {navBody('prev', nav)}
          </button>
        )}
        {items.map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className="pg-item gap">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cx('pg-item', 'pg-num', p === page && 'active')}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onPageChange?.(p)}
            >
              {p}
            </button>
          ),
        )}
        {nav !== 'none' && (
          <button
            type="button"
            className="pg-item nav"
            disabled={page >= last}
            onClick={() => onPageChange?.(page + 1)}
          >
            {navBody('next', nav)}
          </button>
        )}
      </div>
    </div>
  );
});
