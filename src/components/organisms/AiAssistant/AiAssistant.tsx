import { forwardRef, useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './ai-assistant.css';

/* ── answer objects — the reply IS the interface ────────────────────────── */

export interface AiBillItem {
  id: string;
  initials: string;
  name: string;
  /** Due line, e.g. "04 Sep · in 2 days". */
  detail?: string;
  /** Preformatted amount (mono). */
  amount: string;
}

export type AiAnswerObject =
  | {
      /** Payable rows with a running total. */
      type: 'bills';
      items: AiBillItem[];
      totalLabel?: string;
      total?: string;
    }
  | {
      /** One figure with its context. */
      type: 'fact';
      label: string;
      value: string;
      detail?: string;
    }
  | {
      /** A spend trend; the highlighted bar is full brand. */
      type: 'chart';
      headline: string;
      caption?: string;
      bars: { label: string; pct: number; hi?: boolean }[];
    };

export type AiMessage =
  | { kind: 'user'; text: string }
  | {
      kind: 'assistant';
      /** One framing line of prose — the rest is interface. */
      say?: ReactNode;
      object?: AiAnswerObject;
      /** Follow-up suggestion chips under the answer. */
      suggestions?: string[];
    }
  | { kind: 'typing' };

/** The three demo exchanges from the source page. */
export const aiAssistantDemoThread: AiMessage[] = [
  { kind: 'user', text: 'show my pending bills' },
  {
    kind: 'assistant',
    say: (
      <>
        You have <b>3 bills</b> pending. Meralco is the closest.
      </>
    ),
    object: {
      type: 'bills',
      items: [
        { id: 'meralco', initials: 'M', name: 'Meralco', detail: '04 Sep · in 2 days', amount: '₱2,847.50' },
        { id: 'maynilad', initials: 'MW', name: 'Maynilad', detail: '12 Sep', amount: '₱962.80' },
        { id: 'converge', initials: 'C', name: 'Converge', detail: '19 Sep', amount: '₱1,699.00' },
      ],
      totalLabel: 'Total pending',
      total: '₱5,509.30',
    },
  },
  { kind: 'user', text: 'what is pending dues for meralco' },
  {
    kind: 'assistant',
    say: (
      <>
        One bill open for account <b>•••• 8802</b>.
      </>
    ),
    object: {
      type: 'fact',
      label: 'Meralco · pending',
      value: '₱2,847.50',
      detail: 'Due 04 Sep · billed 28 Jul – 27 Aug',
    },
    suggestions: ['Pay now', 'Remind me'],
  },
  { kind: 'user', text: 'how much i paid for electricity' },
  {
    kind: 'assistant',
    say: (
      <>
        You&rsquo;ve paid <b>₱14,206</b> for electricity over 6 months — up 12% on the previous
        six.
      </>
    ),
    object: {
      type: 'chart',
      headline: '₱2,367',
      caption: 'average / month',
      bars: [
        { label: 'Mar', pct: 52 },
        { label: 'Apr', pct: 61 },
        { label: 'May', pct: 48 },
        { label: 'Jun', pct: 74 },
        { label: 'Jul', pct: 83 },
        { label: 'Aug', pct: 100, hi: true },
      ],
    },
  },
  { kind: 'typing' },
];

const sparkIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3l1.8 4.9L19 9.7l-4.4 3 1 5.3-3.6-2.6L8.4 18l1-5.3L5 9.7l5.2-1.8z" />
  </svg>
);

function AnswerObject({
  object,
  onPay,
}: {
  object: AiAnswerObject;
  onPay?: (item: AiBillItem) => void;
}) {
  if (object.type === 'bills') {
    return (
      <div className="aia-card">
        {object.items.map((item) => (
          <div key={item.id} className="aia-ci">
            <div className="aia-ci-logo">{item.initials}</div>
            <div className="aia-ci-main">
              <div className="aia-ci-n">{item.name}</div>
              {item.detail && <div className="aia-ci-d">{item.detail}</div>}
            </div>
            <div className="aia-ci-r">
              <div className="aia-ci-v">{item.amount}</div>
              <button type="button" className="aia-ci-pay" onClick={() => onPay?.(item)}>
                Pay
              </button>
            </div>
          </div>
        ))}
        {object.total && (
          <div className="aia-ci-tot">
            <span className="l">{object.totalLabel ?? 'Total'}</span>
            <span className="v">{object.total}</span>
          </div>
        )}
      </div>
    );
  }
  if (object.type === 'fact') {
    return (
      <div className="aia-fact">
        <div className="aia-fact-l">{object.label}</div>
        <div className="aia-fact-v">{object.value}</div>
        {object.detail && <div className="aia-fact-s">{object.detail}</div>}
      </div>
    );
  }
  return (
    <div className="aia-chart">
      <div className="aia-ch-h">
        <span className="aia-ch-v">{object.headline}</span>
        {object.caption && <span className="aia-ch-d">{object.caption}</span>}
      </div>
      <div className="aia-bars">
        {object.bars.map((b) => (
          <div key={b.label} className={cx('aia-bar', b.hi && 'hi')} style={{ height: `${b.pct}%` }} />
        ))}
      </div>
      <div className="aia-xax">
        {object.bars.map((b) => (
          <span key={b.label}>{b.label}</span>
        ))}
      </div>
    </div>
  );
}

export interface AiAssistantProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
  /** Thread; empty array renders the empty state. */
  messages?: AiMessage[];
  /** Header title. @default 'Assistant' */
  title?: ReactNode;
  /** Safety subline. @default 'Reads your bills · never moves money on its own' */
  subtitle?: ReactNode;
  /** Hide the header when the surrounding screen supplies its own. */
  header?: boolean;
  /** Composer placeholder. @default 'Ask about your bills…' */
  placeholder?: string;
  onSend?: (text: string) => void;
  /** Pay tap on a payable row. */
  onPay?: (item: AiBillItem) => void;
  /** Suggestion-chip tap (also used by the empty state). */
  onSuggestion?: (text: string) => void;
  /** Empty state heading. @default 'Ask about your bills' */
  emptyTitle?: ReactNode;
  emptyText?: ReactNode;
  emptySuggestions?: string[];
}

/**
 * AI Assistant — a conversational layer over payment history. Answers are
 * OBJECTS, not sentences: payable rows with a running total, a single figure
 * with its due date, or a spend trend — one line of prose frames each answer
 * and the rest is interface. Read-only over history: it never moves money on
 * its own.
 *
 * @example
 * <AiAssistant messages={thread} onSend={ask} onPay={(bill) => pay(bill.id)} />
 */
export const AiAssistant = forwardRef<HTMLDivElement, AiAssistantProps>(function AiAssistant(
  {
    messages = aiAssistantDemoThread,
    title = 'Assistant',
    subtitle = 'Reads your bills · never moves money on its own',
    header = true,
    placeholder = 'Ask about your bills…',
    onSend,
    onPay,
    onSuggestion,
    emptyTitle = 'Ask about your bills',
    emptyText = "I can look up what's due, what you've paid, and how your spending is trending.",
    emptySuggestions = ['Show my pending bills', 'Pending dues for Meralco', 'How much for electricity?'],
    className,
    ...rest
  },
  ref,
) {
  const [draft, setDraft] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSend?.(text);
    setDraft('');
  };

  return (
    <div ref={ref} className={cx('aia', className)} {...rest}>
      {header && (
        <div className="aia-head">
          <div className="aia-av">{sparkIcon}</div>
          <div>
            <div className="aia-title">{title}</div>
            {subtitle && <div className="aia-sub">{subtitle}</div>}
          </div>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="aia-empty">
          <div className="aia-em-orb">{sparkIcon}</div>
          <div className="aia-em-t">{emptyTitle}</div>
          <div className="aia-em-s">{emptyText}</div>
          <div className="aia-sugg">
            {emptySuggestions.map((s) => (
              <button key={s} type="button" className="aia-sg" onClick={() => onSuggestion?.(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="aia-thread">
          {messages.map((m, i) => {
            if (m.kind === 'user') {
              return (
                <div key={i} className="aia-me">
                  {m.text}
                </div>
              );
            }
            if (m.kind === 'typing') {
              return (
                <div key={i} className="aia-typing" role="status" aria-label="Assistant is typing">
                  <i />
                  <i />
                  <i />
                </div>
              );
            }
            return (
              <div key={i} className="aia-ai">
                {m.say && <div className="aia-say">{m.say}</div>}
                {m.object && <AnswerObject object={m.object} onPay={onPay} />}
                {m.suggestions && (
                  <div className="aia-sugg">
                    {m.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="aia-sg"
                        onClick={() => onSuggestion?.(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <form className="aia-composer" onSubmit={submit}>
        <input
          className="aia-inp"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          aria-label={placeholder}
        />
        <button type="submit" className="aia-send" aria-label="Send">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h15" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
});
