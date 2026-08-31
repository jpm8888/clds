import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './chart.css';

export type ChartVariant = 'gain' | 'loss' | 'warning' | 'brand';

export interface ChartPoint {
  /** X-axis caption (e.g. 'Mon'). */
  label: string;
  /** Value plotted (and printed above the point when `showValues`). */
  value: number;
}

export interface ChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Points to plot, left to right. Empty array renders the empty state. */
  data: ChartPoint[];
  /**
   * Line color semantics: `gain` green, `loss` red, `warning` orange,
   * `brand` primary (→ lime in dark).
   * @default 'brand'
   */
  variant?: ChartVariant;
  /** Card heading. @default 'Transaction' */
  title?: ReactNode;
  /** Dropdown label in the header (e.g. 'Earnings'). Omit to hide the dropdown. */
  dropdownLabel?: ReactNode;
  /** Fires when the header dropdown is clicked. */
  onDropdownClick?: () => void;
  /** Format for the printed point values. @default v => `$${v.toFixed(2)}` */
  formatValue?: (value: number) => string;
  /** Print each point's value above it. @default true */
  showValues?: boolean;
  /** Caption shown when `data` is empty. @default 'No transactions yet' */
  emptyLabel?: ReactNode;
}

/* Source geometry (viewBox 340×208) */
const VB_W = 340;
const Y_TOP = 44;
const Y_BOT = 150;
const BASE = 178;
const DAY_Y = 195;
const X_PAD = 16;

/** Catmull-Rom → cubic bézier smooth spline (from the source page). */
function spline(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return '';
  let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? pts[i + 1]!;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/**
 * Transaction line chart — a smooth spline with gradient area fill, dashed
 * guides, haloed points and value labels, drawn dependency-free in SVG.
 * The spline draws itself in when it enters the viewport. Colors route
 * through the `--mav-chart-*` tokens (`brand` re-themes blue → lime in dark).
 *
 * @example
 * <Chart
 *   variant="gain"
 *   dropdownLabel="Earnings"
 *   data={[
 *     { label: 'Sun', value: 20.67 }, { label: 'Mon', value: 37 },
 *     { label: 'Tue', value: 45.9 }, { label: 'Wed', value: 26.01 },
 *     { label: 'Thu', value: 57.89 },
 *   ]}
 * />
 */
export function Chart({
  data,
  variant = 'brand',
  title = 'Transaction',
  dropdownLabel,
  onDropdownClick,
  formatValue = (v) => `$${v.toFixed(2)}`,
  showValues = true,
  emptyLabel = 'No transactions yet',
  className,
  ...rest
}: ChartProps) {
  const gid = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  /* draw-in when the chart scrolls into view (no IO → render revealed) */
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = svgRef.current;
    if (!node || revealed) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [revealed]);

  const n = data.length;
  const max = Math.max(...data.map((d) => d.value), 1);
  const domain = max * 1.2; /* headroom like the source's fixed 70-domain */
  const xs = (i: number) => (n === 1 ? VB_W / 2 : X_PAD + (i * (VB_W - 2 * X_PAD)) / (n - 1));
  const yOf = (v: number) => Y_BOT - (v / domain) * (Y_BOT - Y_TOP);
  const pts = data.map((d, i) => ({ x: xs(i), y: yOf(d.value) }));
  const lineD = spline(pts);
  const areaD =
    pts.length > 0 ? `${lineD} L ${pts[pts.length - 1]!.x} ${BASE} L ${pts[0]!.x} ${BASE} Z` : '';

  return (
    <div className={cx('chart-card', `chart--${variant}`, className)} {...rest}>
      <div className="chart-head">
        <h3 className="chart-title">{title}</h3>
        {dropdownLabel != null && (
          <button className="chart-drop" type="button" onClick={onDropdownClick}>
            <span>{dropdownLabel}</span>
            <Icon name="chevron-down" size={18} />
          </button>
        )}
      </div>
      <div className="chart-plot">
        <svg
          ref={svgRef}
          className={cx('chart-svg', revealed && 'in', n === 0 && 'is-empty')}
          viewBox="0 0 340 208"
          role="img"
          aria-label={typeof title === 'string' ? title : 'Line chart'}
        >
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.30" />
              <stop offset="0.55" stopColor="currentColor" stopOpacity="0.10" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line className="chart-base" x1={X_PAD - 2} y1={BASE} x2={VB_W - X_PAD + 2} y2={BASE} />
          <g className="chart-data">
            {pts.map((p, i) => (
              <line key={`g${i}`} className="chart-guide" x1={p.x} x2={p.x} y1={0} y2={BASE} />
            ))}
            {n > 0 && <path className="chart-area" d={areaD} fill={`url(#${gid})`} />}
            {n > 0 && <path className="chart-line" d={lineD} pathLength={1} />}
            {pts.map((p, i) => (
              <g key={`p${i}`} className="chart-pt">
                <g
                  className="chart-dot-g"
                  style={{ transitionDelay: revealed ? `${0.42 + i * 0.11}s` : undefined }}
                >
                  <circle className="chart-halo" cx={p.x} cy={p.y} r={6} />
                  <circle className="chart-dot" cx={p.x} cy={p.y} r={3.6} />
                </g>
                {showValues && (
                  <text
                    className="chart-val"
                    x={p.x}
                    y={p.y - 14}
                    style={{ transitionDelay: revealed ? `${0.5 + i * 0.11}s` : undefined }}
                  >
                    {formatValue(data[i]!.value)}
                  </text>
                )}
              </g>
            ))}
          </g>
          {data.map((d, i) => (
            <text key={`d${i}`} className="chart-day" x={xs(i)} y={DAY_Y}>
              {d.label}
            </text>
          ))}
          {n === 0 && (
            <text className="chart-empty" x={VB_W / 2} y={yOf(domain * 0.43)}>
              {emptyLabel}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}
