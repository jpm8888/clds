import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './reconciliation.css';

/* Ops status chip tones. Warning is deliberately absent: it collides with
   warm brand palettes (Bayad's primary is orange) and turns the badge to mud.
   Matched = success, exception = danger, everything else neutral. */
export type ReconStatusTone = 'ok' | 'no' | 'hold';

export interface ReconStatus {
  tone: ReconStatusTone;
  label: string;
}

export interface ReconRow {
  /** Settlement reference, rendered in mono. */
  reference: string;
  biller: string;
  /** Payment rail the transaction took (e.g. "InstaPay P2B"). */
  rail: string;
  /** Posted amount, preformatted (e.g. "₱2,847.50"). */
  posted: string;
  /** Settled amount, preformatted; "—" when no file arrived. */
  settled: string;
  /** Variance, preformatted; zero variances render quiet. */
  variance: string;
  /** True when the variance is a real discrepancy (renders danger-red). */
  varianceBad?: boolean;
  status: ReconStatus;
  /** Row action label (Investigate / Chase / View…). */
  action?: string;
  /** Exception rows tint danger-soft and sort to the top in the source. */
  exception?: boolean;
  /** The row currently opened in the evidence panel. */
  selected?: boolean;
}

export interface ReconStat {
  label: string;
  /** Headline figure, preformatted; rendered in mono. */
  value: string;
  detail?: string;
  detailTone?: 'good' | 'bad';
}

const checkIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const crossIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
function StatusChip({ status }: { status: ReconStatus }) {
  return (
    <span className={cx('bld-recon-chip', status.tone)}>
      {status.tone === 'ok' ? checkIcon : status.tone === 'no' ? crossIcon : null}
      {status.label}
    </span>
  );
}

/* ── demo content from the source page ─────────────────────────────────── */

export const reconDemoStats: ReconStat[] = [
  { label: 'Transactions', value: '48,912', detail: '₱182.4M posted' },
  { label: 'Matched', value: '48,650', detail: '99.46%', detailTone: 'good' },
  { label: 'Exceptions', value: '262', detail: '↑ 48 vs yesterday', detailTone: 'bad' },
  { label: 'Net variance', value: '₱18,430.50', detail: 'unresolved', detailTone: 'bad' },
];

export const reconDemoRows: ReconRow[] = [
  {
    reference: '262387WI4GE1',
    biller: 'Meralco',
    rail: 'InstaPay P2B',
    posted: '₱2,847.50',
    settled: '₱2,845.00',
    variance: '−₱2.50',
    varianceBad: true,
    status: { tone: 'no', label: 'Unmatched' },
    action: 'Investigate',
    exception: true,
  },
  {
    reference: '262388QA7TX0',
    biller: 'Maynilad',
    rail: 'InstaPay P2B',
    posted: '₱962.80',
    settled: '₱962.80',
    variance: '₱0.00',
    status: { tone: 'no', label: 'Source conflict' },
    action: 'Open evidence ↓',
    exception: true,
    selected: true,
  },
  {
    reference: '262390KM2ZB4',
    biller: 'Converge',
    rail: 'GCash',
    posted: '₱1,699.00',
    settled: '—',
    variance: '−₱1,699.00',
    varianceBad: true,
    status: { tone: 'hold', label: 'Awaiting file' },
    action: 'Chase',
    exception: true,
  },
  {
    reference: '262391PL9RS7',
    biller: 'Meralco',
    rail: 'Bayad OTC',
    posted: '₱3,120.00',
    settled: '₱3,120.00',
    variance: '₱0.00',
    status: { tone: 'ok', label: 'Matched' },
    action: 'View',
  },
  {
    reference: '262392HD4NV1',
    biller: 'Angeles Electric',
    rail: 'Maya',
    posted: '₱880.25',
    settled: '₱880.25',
    variance: '₱0.00',
    status: { tone: 'ok', label: 'Matched' },
    action: 'View',
  },
];

export interface ReconciliationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Window-chrome title. */
  windowTitle?: string;
  /** Batch heading (e.g. "Batch — 27 Aug 2026"). */
  title?: ReactNode;
  /** Batch subline (cut-off, rails, closed time). */
  subtitle?: ReactNode;
  /** Stat rail — the batch leads with net variance, not a transaction count. */
  stats?: ReconStat[];
  rows?: ReconRow[];
  /** Called with a row when its action link is clicked. */
  onRowAction?: (row: ReconRow) => void;
  /** Toolbar buttons (defaults: Export CSV ghost + Close batch primary). */
  toolbar?: ReactNode;
}

/**
 * Reconciliation & Settlement — a settlement batch, its exceptions, and the
 * variance between posted and settled. NOT a phone screen: reconciliation is
 * a desk job, so it renders as a fixed-width desktop window and the wrapper
 * scrolls sideways instead of squeezing the table. Exceptions tint and sort
 * to the top; matched rows stay quiet.
 *
 * @example
 * <Reconciliation rows={batch.rows} stats={batch.stats} onRowAction={open} />
 */
export const Reconciliation = forwardRef<HTMLDivElement, ReconciliationProps>(
  function Reconciliation(
    {
      windowTitle = 'Operations · Settlement',
      title = 'Batch — 27 Aug 2026',
      subtitle = 'Cut-off 23:59 PHT · 12 rails · closed 00:42',
      stats = reconDemoStats,
      rows = reconDemoRows,
      onRowAction,
      toolbar,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div ref={ref} className={cx('bld-recon', className)} {...rest}>
        <div className="bld-recon-win">
          <div className="bld-recon-bar">
            <span className="bld-recon-dot" />
            <span className="bld-recon-dot" />
            <span className="bld-recon-dot" />
            <span className="bld-recon-bar-title">{windowTitle}</span>
          </div>
          <div className="bld-recon-tb">
            <div>
              <div className="bld-recon-tb-h">{title}</div>
              <div className="bld-recon-tb-sub">{subtitle}</div>
            </div>
            <div className="bld-recon-sp" />
            {toolbar ?? (
              <>
                <span className="bld-recon-sel">
                  All rails
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
                <span className="bld-recon-sel on">
                  Exceptions only
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
                <button type="button" className="bld-recon-btn ghost">
                  Export CSV
                </button>
                <button type="button" className="bld-recon-btn">
                  Close batch
                </button>
              </>
            )}
          </div>
          <div className="bld-recon-stats">
            {stats.map((s) => (
              <div key={s.label} className="bld-recon-stat">
                <div className="bld-recon-stat-l">{s.label}</div>
                <div className="bld-recon-stat-v">{s.value}</div>
                {s.detail && (
                  <div className={cx('bld-recon-stat-d', s.detailTone)}>{s.detail}</div>
                )}
              </div>
            ))}
          </div>
          <table>
            <colgroup>
              <col className="c-ref" />
              <col className="c-bil" />
              <col className="c-rail" />
              <col className="c-amt" />
              <col className="c-amt" />
              <col className="c-amt" />
              <col className="c-st" />
              <col className="c-act" />
            </colgroup>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Biller</th>
                <th>Rail</th>
                <th className="r">Posted</th>
                <th className="r">Settled</th>
                <th className="r">Variance</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.reference}
                  className={cx(row.exception && 'exc', row.selected && 'sel-row')}
                >
                  <td className="ref">{row.reference}</td>
                  <td>{row.biller}</td>
                  <td>
                    <span className="bld-recon-rail">
                      <i />
                      {row.rail}
                    </span>
                  </td>
                  <td className="r amt">{row.posted}</td>
                  <td className="r amt">{row.settled}</td>
                  <td className={cx('r', 'amt', row.varianceBad ? 'var-x' : 'var-0')}>
                    {row.variance}
                  </td>
                  <td>
                    <StatusChip status={row.status} />
                  </td>
                  <td className="r">
                    {row.action && (
                      <button
                        type="button"
                        className="bld-recon-link"
                        onClick={() => onRowAction?.(row)}
                      >
                        {row.action}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

/* ── evidence panel ─────────────────────────────────────────────────────── */

export interface ReconEvidenceField {
  key: string;
  value: string;
  /** The disputed field — marked danger, because a single disagreement
   * propagates down the ledger rather than staying local. */
  clash?: boolean;
}

export interface ReconEvidenceColumn {
  heading: string;
  fields: ReconEvidenceField[];
}

export const reconDemoEvidence: [ReconEvidenceColumn, ReconEvidenceColumn] = [
  {
    heading: 'Transaction columns',
    fields: [
      { key: 'reference_no', value: '262388QA7TX0' },
      { key: 'amount', value: '962.80' },
      { key: 'running_balance', value: '41,208.65', clash: true },
      { key: 'ending_balance', value: '40,245.85' },
      { key: 'settled_at', value: '2026-08-28T00:07:12Z' },
    ],
  },
  {
    heading: 'particulars (JSON)',
    fields: [
      { key: 'particulars.ref', value: '262388QA7TX0' },
      { key: 'particulars.amt', value: '962.80' },
      { key: 'particulars.run_bal', value: '41,206.15', clash: true },
      { key: 'particulars.end_bal', value: '40,243.35' },
      { key: 'particulars.posted', value: '2026-08-27T21:14:03Z' },
    ],
  },
];

export interface ReconciliationEvidenceProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  windowTitle?: string;
  /** Exception heading (biller · amount). */
  title?: ReactNode;
  subtitle?: ReactNode;
  status?: ReconStatus;
  /** The two disagreeing stores, side by side, disputed fields marked. */
  columns?: [ReconEvidenceColumn, ReconEvidenceColumn];
  /** Advisory note under the evidence. */
  note?: ReactNode;
  /** Action labels; the first is primary. The set forces an explicit choice
   * of source-of-truth rather than an implicit default. */
  actions?: string[];
  onAction?: (action: string) => void;
}

/**
 * Exception evidence — the source-of-truth conflict. Two stores' values for
 * the same transaction side by side with the disputed field marked, so
 * "which one is right?" becomes a decision someone can make and record.
 */
export const ReconciliationEvidence = forwardRef<HTMLDivElement, ReconciliationEvidenceProps>(
  function ReconciliationEvidence(
    {
      windowTitle = 'Operations · Settlement · 262388QA7TX0',
      title = 'Maynilad · ₱962.80',
      subtitle = 'InstaPay P2B · posted 27 Aug 21:14 · settled 28 Aug 00:07',
      status = { tone: 'no', label: 'Source conflict' },
      columns = reconDemoEvidence,
      note = (
        <>
          <b>₱2.50 apart, and neither store is authoritative.</b> Because every row carries
          its own running and ending balance, a single disagreement propagates down the
          ledger rather than staying local. Pick the source of truth once, record the
          decision against the batch, and post a correcting entry — do not silently prefer
          one store.
        </>
      ),
      actions = [
        'Accept columns as source',
        'Accept JSON as source',
        'Post correcting entry',
        'Escalate to ops',
      ],
      onAction,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div ref={ref} className={cx('bld-recon', className)} {...rest}>
        <div className="bld-recon-win">
          <div className="bld-recon-bar">
            <span className="bld-recon-dot" />
            <span className="bld-recon-dot" />
            <span className="bld-recon-dot" />
            <span className="bld-recon-bar-title">{windowTitle}</span>
          </div>
          <div className="bld-recon-tb">
            <div>
              <div className="bld-recon-tb-h">{title}</div>
              <div className="bld-recon-tb-sub">{subtitle}</div>
            </div>
            <div className="bld-recon-sp" />
            <StatusChip status={status} />
          </div>
          <div className="bld-recon-ev">
            {columns.map((col) => (
              <div key={col.heading} className="bld-recon-ev-col">
                <div className="bld-recon-ev-h">{col.heading}</div>
                {col.fields.map((f) => (
                  <div key={f.key} className={cx('bld-recon-kv', f.clash && 'clash')}>
                    <span className="k">{f.key}</span>
                    <span className="v">{f.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {note && (
            <div className="bld-recon-note">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <div className="bld-recon-note-t">{note}</div>
            </div>
          )}
          {actions.length > 0 && (
            <div className="bld-recon-actions">
              {actions.map((a, i) => (
                <button
                  key={a}
                  type="button"
                  className={cx(
                    'bld-recon-btn',
                    i > 0 && 'ghost',
                    i === actions.length - 1 && 'push',
                  )}
                  onClick={() => onAction?.(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
