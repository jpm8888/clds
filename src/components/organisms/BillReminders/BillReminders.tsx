import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './bill-reminders.css';

/** Reminder status. "Due soon" deliberately uses the brand, not
 * System/Warning — warning-orange collides with the warm Bayad palette.
 * Brand = needs you, danger = overdue, neutral = further out, success = paid. */
export type BillReminderStatus = 'soon' | 'overdue' | 'later' | 'paid';

export interface BillReminder {
  /** Stable id, passed back through callbacks. */
  id: string;
  /** Biller name, e.g. "Meralco". */
  biller: string;
  /** Chip initials on the biller logo tile. */
  initials: string;
  /** Masked account line (mono), e.g. "•••• 8802". */
  account: string;
  /** Preformatted amount (mono), e.g. "₱2,847.50". */
  amount: string;
  /** Due/paid line under the amount, e.g. "Due 04 Sep". */
  dateLabel: string;
  status: BillReminderStatus;
  /** Badge copy, e.g. "Due in 2 days" / "In 10 days" / "Paid". */
  statusLabel: string;
  /** Row action: "Pay now" (solid) for actionable rows, ghost otherwise. */
  actionLabel?: string;
  /** Renders the action as the solid pay button instead of a ghost link. */
  actionSolid?: boolean;
  /** Reminder bell state (per-biller mute). */
  muted?: boolean;
  /** Urgent rows tint with the brand and take the active border. */
  urgent?: boolean;
}

const bellIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 8-3 8h18s-3-1-3-8" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

const statusIcons: Partial<Record<BillReminderStatus, ReactNode>> = {
  soon: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  overdue: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8v5M12 17h.01" />
    </svg>
  ),
  paid: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
};

const statusClass: Record<BillReminderStatus, string> = {
  soon: 'soon',
  overdue: 'over',
  later: 'later',
  paid: 'paid',
};

/** Demo content from the source page. */
export const billRemindersDemo: BillReminder[] = [
  {
    id: 'meralco',
    biller: 'Meralco',
    initials: 'M',
    account: '•••• 8802',
    amount: '₱2,847.50',
    dateLabel: 'Due 04 Sep',
    status: 'soon',
    statusLabel: 'Due in 2 days',
    actionLabel: 'Pay now',
    actionSolid: true,
    urgent: true,
  },
  {
    id: 'maynilad',
    biller: 'Maynilad Water',
    initials: 'MW',
    account: '•••• 4417',
    amount: '₱962.80',
    dateLabel: 'Due 12 Sep',
    status: 'later',
    statusLabel: 'In 10 days',
    actionLabel: 'Details',
  },
  {
    id: 'globe',
    biller: 'Globe Postpaid',
    initials: 'G',
    account: '•••• 2065',
    amount: '₱902.00',
    dateLabel: 'Paid 21 Aug',
    status: 'paid',
    statusLabel: 'Paid',
    actionLabel: 'Receipt',
    muted: true,
  },
];

export interface BillRemindersProps extends HTMLAttributes<HTMLDivElement> {
  reminders?: BillReminder[];
  /** Summary strip label. @default 'Due this month' */
  summaryLabel?: ReactNode;
  /** Summary figure (mono), e.g. "₱4,712.30". */
  summaryValue?: ReactNode;
  /** Right-hand summary line, e.g. "3 reminders". */
  summaryDetail?: ReactNode;
  /** Row action tap (Pay now / Details / Receipt). */
  onAction?: (reminder: BillReminder) => void;
  /** Per-biller bell toggle. Called with the next muted state. */
  onMuteChange?: (reminder: BillReminder, muted: boolean) => void;
}

/**
 * Bill Reminders — what's due, when, and how much, with payment one tap from
 * the reminder itself. Rows sort by urgency, not alphabetically; each carries
 * amount, due date, a status badge, a pay action, and a per-biller mute bell.
 *
 * @example
 * <BillReminders reminders={due} summaryValue="₱4,712.30" summaryDetail="3 reminders"
 *   onAction={(r) => (r.status === 'paid' ? openReceipt(r) : pay(r))} />
 */
export const BillReminders = forwardRef<HTMLDivElement, BillRemindersProps>(
  function BillReminders(
    {
      reminders = billRemindersDemo,
      summaryLabel = 'Due this month',
      summaryValue = '₱4,712.30',
      summaryDetail = `${billRemindersDemo.length} reminders`,
      onAction,
      onMuteChange,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div ref={ref} className={cx('brem', className)} {...rest}>
        <div className="brem-summary">
          <div>
            <div className="brem-sm-l">{summaryLabel}</div>
            <div className="brem-sm-v">{summaryValue}</div>
          </div>
          {summaryDetail && <div className="brem-sm-l">{summaryDetail}</div>}
        </div>
        {reminders.map((r) => (
          <div key={r.id} className={cx('brem-rem', r.urgent && 'urgent')}>
            <div className="brem-top">
              <div className="brem-logo">{r.initials}</div>
              <div>
                <div className="brem-name">{r.biller}</div>
                <div className="brem-acct">{r.account}</div>
              </div>
              <div className="brem-amt">
                <div className="brem-val">{r.amount}</div>
                <div className="brem-date">{r.dateLabel}</div>
              </div>
            </div>
            <div className="brem-bot">
              <span className={cx('brem-badge', statusClass[r.status])}>
                {statusIcons[r.status]}
                {r.statusLabel}
              </span>
              <button
                type="button"
                className={cx('brem-bell', !r.muted && 'on')}
                aria-label={r.muted ? `Unmute ${r.biller} reminders` : `Mute ${r.biller} reminders`}
                aria-pressed={!r.muted}
                onClick={() => onMuteChange?.(r, !r.muted)}
              >
                {bellIcon}
              </button>
              {r.actionLabel && (
                <button
                  type="button"
                  className={cx('brem-pay', !r.actionSolid && 'ghost')}
                  onClick={() => onAction?.(r)}
                >
                  {r.actionLabel}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
);

/* ── setup form ─────────────────────────────────────────────────────────── */

export interface BillReminderChannel {
  id: string;
  title: ReactNode;
  detail?: ReactNode;
  on?: boolean;
}

export interface BillReminderSetupProps extends HTMLAttributes<HTMLDivElement> {
  /** The biller the reminder is for. */
  biller?: Pick<BillReminder, 'biller' | 'initials' | 'account'>;
  onChangeBiller?: () => void;
  /** Lead-time chips. @default ['1 day before', '3 days before', '1 week before'] */
  leadOptions?: string[];
  /** Selected lead option (uncontrolled default: the middle one). */
  lead?: string;
  onLeadChange?: (lead: string) => void;
  /** Notification channels with initial states. */
  channels?: BillReminderChannel[];
  onChannelChange?: (id: string, on: boolean) => void;
  /** Autopay standing-instruction toggle. */
  autopay?: boolean;
  onAutopayChange?: (on: boolean) => void;
}

/**
 * Set up a reminder — lead time as chips rather than a date picker, and
 * autopay offered alongside, because a reminder the customer keeps ignoring
 * is a reminder that should become a standing instruction.
 */
export const BillReminderSetup = forwardRef<HTMLDivElement, BillReminderSetupProps>(
  function BillReminderSetup(
    {
      biller = { biller: 'Meralco', initials: 'M', account: '•••• 8802 · Electricity' },
      onChangeBiller,
      leadOptions = ['1 day before', '3 days before', '1 week before'],
      lead,
      onLeadChange,
      channels = [
        { id: 'push', title: 'Push notification', detail: 'On this device', on: true },
        { id: 'sms', title: 'SMS', detail: '+63 •••• 8265 · works without data', on: true },
        { id: 'email', title: 'Email', detail: 'saurabh@•••••.com' },
      ],
      onChannelChange,
      autopay = false,
      onAutopayChange,
      className,
      ...rest
    },
    ref,
  ) {
    const [leadState, setLeadState] = useState(lead ?? leadOptions[1]);
    const [channelState, setChannelState] = useState<Record<string, boolean>>(() =>
      Object.fromEntries(channels.map((c) => [c.id, !!c.on])),
    );
    const [autopayState, setAutopayState] = useState(autopay);
    const activeLead = lead ?? leadState;

    return (
      <div ref={ref} className={cx('brem-setup', className)} {...rest}>
        <div className="brem-rem" style={{ gap: 0 }}>
          <div className="brem-top">
            <div className="brem-logo">{biller.initials}</div>
            <div>
              <div className="brem-name">{biller.biller}</div>
              <div className="brem-acct">{biller.account}</div>
            </div>
            <div className="brem-amt">
              <button type="button" className="brem-pay ghost" onClick={onChangeBiller}>
                Change
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="brem-f-label">Remind me</div>
          <div className="brem-chips" role="radiogroup" aria-label="Remind me">
            {leadOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={activeLead === opt}
                className={cx('brem-chip', activeLead === opt && 'on')}
                onClick={() => {
                  setLeadState(opt);
                  onLeadChange?.(opt);
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="brem-sheet-h">How to notify</div>
          {channels.map((c) => (
            <div key={c.id} className="brem-row">
              <div>
                <div className="brem-row-t">{c.title}</div>
                {c.detail && <div className="brem-row-s">{c.detail}</div>}
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={channelState[c.id]}
                className={cx('brem-sw', channelState[c.id] && 'on')}
                onClick={() => {
                  const next = !channelState[c.id];
                  setChannelState((s) => ({ ...s, [c.id]: next }));
                  onChannelChange?.(c.id, next);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <div className="brem-sheet-h">Or stop reminding me</div>
          <div className="brem-row">
            <div>
              <div className="brem-row-t">Autopay from wallet</div>
              <div className="brem-row-s">Pay automatically on the due date</div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autopayState}
              className={cx('brem-sw', autopayState && 'on')}
              onClick={() => {
                const next = !autopayState;
                setAutopayState(next);
                onAutopayChange?.(next);
              }}
            />
          </div>
        </div>
      </div>
    );
  },
);
