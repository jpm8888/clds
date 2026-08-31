import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './spend-limit.css';

export type SpendLimitStatus = 'ok' | 'warn' | 'over';

export interface SpendLimitItem {
  /** Left side of the row, e.g. "₦ 68,000 used". */
  used: string;
  /** Right side of the row, e.g. "of ₦ 100,000". */
  of: string;
  /** Fill percentage 0–100. */
  percent: number;
  /** `ok` = brand fill, `warn` = orange near limit, `over` = red at limit. @default 'ok' */
  status?: SpendLimitStatus;
  /** Note under the track, e.g. "₦ 32,000 remaining" or "Limit reached". */
  note?: string;
}

export interface SpendLimitProps extends HTMLAttributes<HTMLDivElement> {
  /** Block heading, e.g. "Daily limit". */
  heading?: string;
  /** One or more limit gauges. */
  items: SpendLimitItem[];
}

/**
 * Spend-limit gauges — an 8px pill track whose fill escalates
 * brand → warning → danger as the limit is approached.
 *
 * @example
 * <SpendLimit heading="Daily limit" items={[
 *   { used: '₦ 68,000 used', of: 'of ₦ 100,000', percent: 68, note: '₦ 32,000 remaining' },
 *   { used: '₦ 100,000 used', of: 'of ₦ 100,000', percent: 100, status: 'over', note: 'Limit reached' },
 * ]} />
 */
export const SpendLimit = forwardRef<HTMLDivElement, SpendLimitProps>(function SpendLimit(
  { heading, items, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('spend-limit', className)} {...rest}>
      {heading && <div className="spend-head">{heading}</div>}
      {items.map((item, i) => (
        <div className="limit-block" key={i}>
          <div className="limit-row">
            <span className="limit-used">{item.used}</span>
            <span className="limit-of">{item.of}</span>
          </div>
          <div
            className="limit-track"
            role="progressbar"
            aria-valuenow={item.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={cx('limit-fill', `limit-fill-${item.status ?? 'ok'}`)}
              style={{ width: `${Math.min(100, Math.max(0, item.percent))}%` }}
            />
          </div>
          {item.note && (
            <div
              className={cx(
                'limit-note',
                item.status === 'warn' && 'limit-note-warn',
                item.status === 'over' && 'limit-note-over',
              )}
            >
              {item.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export interface SpendBarChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Block heading, e.g. "Weekly spend". */
  heading?: string;
  /** Bar heights as percentages 0–100 (e.g. 7 values for a week). */
  values: number[];
  /** X-axis labels, one per bar (e.g. ['M','T','W','T','F','S','S']). */
  labels?: string[];
  /** Index of the highlighted (brand-colored) bar. */
  activeIndex?: number;
  /** Called with the bar index on click. */
  onBarClick?: (index: number) => void;
}

/**
 * Mini weekly-spend bar chart (96px tall). The active bar is brand-colored;
 * the rest are neutral. Pairs with SpendLimit in a two-column layout.
 */
export const SpendBarChart = forwardRef<HTMLDivElement, SpendBarChartProps>(function SpendBarChart(
  { heading, values, labels, activeIndex, onBarClick, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('spend-chart', className)} {...rest}>
      {heading && <div className="spend-head">{heading}</div>}
      <div className="spend-bar-wrap">
        {values.map((v, i) => (
          <button
            key={i}
            type="button"
            className={cx(
              'spend-bar',
              i === activeIndex ? 'spend-bar-active' : 'spend-bar-inactive',
            )}
            style={{ height: `${Math.min(100, Math.max(0, v))}%` }}
            aria-label={labels?.[i] ? `${labels[i]}: ${v}%` : `${v}%`}
            onClick={onBarClick ? () => onBarClick(i) : undefined}
          />
        ))}
      </div>
      {labels && (
        <div className="spend-labels">
          {labels.map((l, i) => (
            <span key={i} className={cx(i === activeIndex && 'spend-label-active')}>
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});
