import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './donut-chart.css';

export interface DonutSegment {
  label: string;
  /** Share as a percentage — segments should sum to ≤ 100. */
  value: number;
  /** CSS color; defaults cycle through the MaV data palette. */
  color?: string;
}

export interface DonutChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Segments, largest first reads best. */
  data: DonutSegment[];
  /** Centre value, e.g. "$1,248". */
  total: string;
  /** Centre caption. @default 'spent' */
  caption?: string;
  /** Hide the legend column. @default true */
  showLegend?: boolean;
}

/* Default palette from the source: brand, periwinkle, lime, neutral. */
const PALETTE = [
  'var(--mav-main-primary)',
  'var(--mav-main-tertiary-1)',
  '#a1ff5b' /* one-off: brand lime accent */,
  '#d7dbe3' /* one-off: neutral remainder */,
];

const CIRCUMFERENCE = 326.726; // 2π × r(52)

/**
 * Spend-by-category donut — data-driven SVG ring with a centred total and a
 * colour legend. Percentages, not raw amounts (format totals yourself).
 *
 * @example
 * <DonutChart total="$1,248" data={[
 *   { label: 'Bills', value: 38 }, { label: 'Food', value: 27 },
 *   { label: 'Shopping', value: 20 }, { label: 'Other', value: 15 },
 * ]} />
 */
export const DonutChart = forwardRef<HTMLDivElement, DonutChartProps>(function DonutChart(
  { data, total, caption = 'spent', showLegend = true, className, ...rest },
  ref,
) {
  let offset = 0;
  const segments = data.map((d, i) => {
    const len = (d.value / 100) * CIRCUMFERENCE;
    const seg = {
      key: d.label,
      color: d.color ?? PALETTE[i % PALETTE.length]!,
      dasharray: `${len.toFixed(1)} ${(CIRCUMFERENCE - len).toFixed(1)}`,
      dashoffset: (-offset).toFixed(1),
    };
    offset += len;
    return seg;
  });
  return (
    <div ref={ref} className={cx('bld-donut', className)} {...rest}>
      <div className="bld-dn-chart">
        <svg viewBox="0 0 120 120" role="img" aria-label={`${total} ${caption}`}>
          <circle className="bld-dn-track" cx="60" cy="60" r="52" fill="none" strokeWidth="16" />
          {segments.map((s) => (
            <circle
              key={s.key}
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="16"
              stroke={s.color}
              strokeDasharray={s.dasharray}
              strokeDashoffset={s.dashoffset}
            />
          ))}
        </svg>
        <div className="bld-dn-center">
          <span className="v">{total}</span>
          <span className="k">{caption}</span>
        </div>
      </div>
      {showLegend && (
        <div className="bld-dn-legend">
          {data.map((d, i) => (
            <div className="bld-dn-li" key={d.label}>
              <span
                className="bld-dn-dot"
                style={{ background: d.color ?? PALETTE[i % PALETTE.length] }}
              />
              <span className="bld-dn-name">{d.label}</span>
              <span className="bld-dn-pct">{d.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
