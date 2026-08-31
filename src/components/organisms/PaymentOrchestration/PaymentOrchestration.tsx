import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
/* Shared ops primitives (window chrome, toolbar, chips, buttons) live in
   Reconciliation's stylesheet — lifted rather than copied a second time. */
import '../Reconciliation/reconciliation.css';
import './payment-orchestration.css';

export type RailHealth = 'ok' | 'degraded' | 'off';

export interface OrchestrationRail {
  name: string;
  health: RailHealth;
  /** Headline success figure (mono), e.g. "99.2%"; "—" when off. */
  value: string;
  /** Detail line, e.g. "1.4s median". Renders danger when degraded. */
  detail: string;
  /** Six sparkline bar heights, 0–100; the last one highlights. */
  spark: number[];
}

export interface OrchestrationRule {
  order: number;
  /** Condition; wrap literals in <code>. */
  condition: ReactNode;
  /** Destination rail / behaviour. */
  destination: ReactNode;
  /** Live hit count, e.g. "612 hits · 14.9%" — or "paused". */
  hits: string;
  /** Paused rules stay visible and dimmed rather than disappearing. */
  enabled: boolean;
}

export interface OrchestrationTraceStep {
  tone: 'ok' | 'fail' | 'idle';
  title: ReactNode;
  detail?: ReactNode;
  /** Elapsed time (mono), e.g. "5,004ms". */
  at: string;
}

/* ── demo content from the source page ─────────────────────────────────── */

export const orchestrationDemoRails: OrchestrationRail[] = [
  { name: 'InstaPay P2B', health: 'ok', value: '99.2%', detail: '1.4s median', spark: [60, 72, 65, 80, 74, 88] },
  { name: 'GCash', health: 'degraded', value: '91.6%', detail: 'degraded · 6.2s median', spark: [82, 78, 60, 44, 31, 26] },
  { name: 'Maya', health: 'ok', value: '98.8%', detail: '2.1s median', spark: [70, 66, 74, 71, 78, 76] },
  { name: 'Bayad rail', health: 'ok', value: '99.7%', detail: '0.9s median', spark: [88, 90, 86, 92, 89, 94] },
  { name: 'Bank direct', health: 'off', value: '—', detail: 'off-hours · resumes 06:00', spark: [20, 18, 16, 14, 12, 10] },
];

export const orchestrationDemoRules: OrchestrationRule[] = [
  {
    order: 1,
    condition: (
      <>
        Payer <code>msisdn</code> in migration whitelist
      </>
    ),
    destination: 'Bayad rail · EMI',
    hits: '612 hits · 14.9%',
    enabled: true,
  },
  {
    order: 2,
    condition: (
      <>
        Rail success <code>&lt; 95%</code> over 5 min
      </>
    ),
    destination: 'Failover · next healthy',
    hits: '338 hits · 8.2%',
    enabled: true,
  },
  {
    order: 3,
    condition: (
      <>
        Biller <code>category = electricity</code> and amount <code>&gt; ₱2,000</code>
      </>
    ),
    destination: 'InstaPay P2B',
    hits: '1,904 hits · 46.2%',
    enabled: true,
  },
  {
    order: 4,
    condition: (
      <>
        Source <code>= Asenso agent</code>
      </>
    ),
    destination: 'Bayad rail',
    hits: 'paused',
    enabled: false,
  },
  {
    order: 5,
    condition: 'Everything else',
    destination: 'Cheapest healthy rail',
    hits: '1,264 hits · 30.7%',
    enabled: true,
  },
];

export interface PaymentOrchestrationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  windowTitle?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Rail health leads — the rules are only as good as the rails under them. */
  rails?: OrchestrationRail[];
  /** Ordered rules with live hit counts; first match wins. */
  rules?: OrchestrationRule[];
  rulesHeading?: ReactNode;
  onRuleToggle?: (rule: OrchestrationRule, enabled: boolean) => void;
  /** Rollout strip: share of traffic on the new path (0–100). */
  rolloutTitle?: ReactNode;
  rolloutDetail?: ReactNode;
  rolloutNewPct?: number;
  rolloutLegend?: ReactNode;
  toolbar?: ReactNode;
}

const pulseClass: Record<RailHealth, string | undefined> = {
  ok: undefined,
  degraded: 'warn',
  off: 'off',
};

/**
 * Payment Orchestration — which rail a payment takes, why, and what happens
 * when a rail degrades. Rail health first, then the ordered rules acting on
 * it, with live hit counts so an operator sees which rule is doing the work.
 * The phased rollout renders as a share of traffic, not a feature flag.
 * Desktop ops surface; the wrapper scrolls sideways at narrow widths.
 */
export const PaymentOrchestration = forwardRef<HTMLDivElement, PaymentOrchestrationProps>(
  function PaymentOrchestration(
    {
      windowTitle = 'Operations · Orchestration',
      title = 'Routing — live',
      subtitle = 'Last 15 minutes · 4,118 payments routed',
      rails = orchestrationDemoRails,
      rules = orchestrationDemoRules,
      rulesHeading = 'Routing rules — evaluated in order, first match wins',
      onRuleToggle,
      rolloutTitle = 'Migration rollout',
      rolloutDetail = 'whitelisted numbers routed to the new path · phase 2 of 5',
      rolloutNewPct = 14.9,
      rolloutLegend,
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
                  Last 15 min
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
                <button type="button" className="bld-recon-btn ghost">
                  Simulate
                </button>
                <button type="button" className="bld-recon-btn">
                  New rule
                </button>
              </>
            )}
          </div>

          <div className="bld-orch-rails">
            {rails.map((rl) => (
              <div key={rl.name} className="bld-orch-rl">
                <div className="bld-orch-rl-top">
                  <span className={cx('bld-orch-pulse', pulseClass[rl.health])} />
                  <span className="bld-orch-rl-n">{rl.name}</span>
                </div>
                <div className="bld-orch-rl-v">{rl.value}</div>
                <div className={cx('bld-orch-rl-d', rl.health === 'degraded' && 'bad')}>
                  {rl.detail}
                </div>
                <div className="bld-orch-spark" aria-hidden>
                  {rl.spark.map((h, i) => (
                    <i
                      key={i}
                      className={cx(i === rl.spark.length - 1 && rl.health !== 'off' && 'hi')}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bld-orch-sec-h">{rulesHeading}</div>
          <div className="bld-orch-rules">
            {rules.map((rule) => (
              <div key={rule.order} className={cx('bld-orch-rule', !rule.enabled && 'off')}>
                <span className="bld-orch-grip" aria-hidden>
                  ⣿
                </span>
                <span className="bld-orch-ord">{rule.order}</span>
                <span className="bld-orch-cond">{rule.condition}</span>
                <span className="bld-orch-arrow" aria-hidden>
                  →
                </span>
                <span className="bld-orch-dest">{rule.destination}</span>
                <span className="bld-orch-hits">{rule.hits}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={rule.enabled}
                  aria-label={`Rule ${rule.order}`}
                  className={cx('bld-orch-sw', rule.enabled && 'on')}
                  onClick={() => onRuleToggle?.(rule, !rule.enabled)}
                />
              </div>
            ))}
          </div>

          <div className="bld-orch-rollout">
            <div className="bld-orch-ro-h">
              <span className="bld-orch-ro-t">{rolloutTitle}</span>
              <span className="bld-orch-ro-s">{rolloutDetail}</span>
            </div>
            <div className="bld-orch-bar" aria-hidden>
              <i className="new" style={{ width: `${rolloutNewPct}%` }} />
              <i className="old" style={{ width: `${100 - rolloutNewPct}%` }} />
            </div>
            <div className="bld-orch-legend">
              {rolloutLegend ?? (
                <>
                  <span>
                    <i style={{ background: 'var(--mav-btn-primary-default)' }} />
                    New path — 14.9% (612)
                  </span>
                  <span>
                    <i style={{ background: 'var(--mav-system-natural)' }} />
                    Existing stack — 85.1% (3,506)
                  </span>
                  <span>Rollback trigger: success &lt; 98% over 10 min</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

/* ── trace ──────────────────────────────────────────────────────────────── */

export const orchestrationDemoTrace: OrchestrationTraceStep[] = [
  {
    tone: 'ok',
    title: 'Accepted',
    detail: (
      <>
        Biller Converge · category <code>internet</code> · source app
      </>
    ),
    at: '0ms',
  },
  {
    tone: 'idle',
    title: 'Rules 1, 3, 4 did not match',
    detail: 'Not whitelisted · category is not electricity · not an Asenso payment',
    at: '3ms',
  },
  {
    tone: 'ok',
    title: 'Rule 5 matched — cheapest healthy rail',
    detail: 'GCash selected · ₱1.80 per txn · health 96.4% at decision time',
    at: '5ms',
  },
  {
    tone: 'fail',
    title: 'GCash timed out',
    detail: 'No response in 5,000ms · rail health fell to 91.6% during the attempt',
    at: '5,004ms',
  },
  {
    tone: 'ok',
    title: 'Rule 2 matched — failover',
    detail: 'Re-routed to InstaPay P2B · idempotency key reused',
    at: '5,011ms',
  },
  {
    tone: 'ok',
    title: 'Settled on InstaPay P2B',
    detail: (
      <>
        Confirmation <code>IP-8841203</code> · posted to ledger
      </>
    ),
    at: '7,412ms',
  },
];

export const orchestrationDemoOutcome: { label: ReactNode; value: string }[] = [
  { label: 'Intended rail', value: 'GCash · ₱1.80' },
  { label: 'Actual rail', value: 'InstaPay P2B · ₱2.40' },
  { label: 'Cost of failover', value: '+₱0.60' },
  { label: 'Added latency', value: '+5.0s' },
  { label: 'Duplicate risk', value: 'none · key reused' },
  { label: 'Customer impact', value: 'none · single confirmation' },
];

export interface OrchestrationTraceProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  windowTitle?: string;
  /** Payment heading (reference · biller · amount). */
  title?: ReactNode;
  subtitle?: ReactNode;
  statusLabel?: string;
  /** Every rule that was evaluated — not just the one that matched. Without
   * the rejected rules the trace is unfalsifiable; with them it's an audit
   * record. */
  steps?: OrchestrationTraceStep[];
  /** Cost & outcome key/values beside the path. */
  outcome?: { label: ReactNode; value: string }[];
  /** Advisory strip under the outcome (aggregate failover cost + action). */
  advisory?: ReactNode;
}

const traceIcons: Record<OrchestrationTraceStep['tone'], ReactNode> = {
  ok: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  fail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  idle: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
};

/**
 * "Why did this payment go that way?" — the trace shows every rule evaluated,
 * the rail that failed, and the failover that saved it, with timings and the
 * cost delta of the detour.
 */
export const OrchestrationTrace = forwardRef<HTMLDivElement, OrchestrationTraceProps>(
  function OrchestrationTrace(
    {
      windowTitle = 'Operations · Orchestration · trace',
      title = '262390KM2ZB4 · Converge · ₱1,699.00',
      subtitle = '27 Aug 21:19:04 PHT · settled on failover after 7.4s',
      statusLabel = 'Settled',
      steps = orchestrationDemoTrace,
      outcome = orchestrationDemoOutcome,
      advisory,
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
            <span className="bld-recon-chip ok">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {statusLabel}
            </span>
            <button type="button" className="bld-recon-btn ghost">
              Copy trace
            </button>
          </div>
          <div className="bld-orch-split">
            <div>
              <div className="bld-orch-sec-h">Path</div>
              <div className="bld-orch-trace">
                {steps.map((s, i) => (
                  <div key={i} className="bld-orch-step">
                    <span className={cx('bld-orch-pin', s.tone !== 'ok' && s.tone)}>
                      {traceIcons[s.tone]}
                    </span>
                    <div>
                      <div className="bld-orch-st-t">{s.title}</div>
                      {s.detail && <div className="bld-orch-st-d">{s.detail}</div>}
                    </div>
                    <span className="bld-orch-ms">{s.at}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bld-orch-sec-h">Cost &amp; outcome</div>
              <div className="bld-orch-trace">
                {outcome.map((o, i) => (
                  <div key={i} className="bld-orch-kv">
                    <span className="bld-orch-cond">{o.label}</span>
                    <span className="bld-orch-hits">{o.value}</span>
                  </div>
                ))}
              </div>
              <div
                className="bld-orch-rollout"
                style={{ borderTop: '1px solid var(--mav-divider-default)' }}
              >
                {advisory ?? (
                  <>
                    <div className="bld-orch-ro-t">
                      338 payments failed over in the last 15 minutes
                    </div>
                    <div className="bld-orch-ro-s" style={{ marginTop: 5 }}>
                      All from GCash. At ₱0.60 each that is ₱202.80 of avoidable cost, and the
                      rail has been degraded for 11 minutes.
                    </div>
                    <div style={{ marginTop: 11 }}>
                      <button type="button" className="bld-recon-btn">
                        Take GCash out of rotation
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
