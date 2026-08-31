import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './snap-a-bill.css';

const paperBars = [22, 15, 26, 12, 24, 18, 26, 14];

export interface SnapABillCaptureProps extends HTMLAttributes<HTMLDivElement> {
  /** Scanning state: the brand scan line sweeps and the hint fills brand. */
  scanning?: boolean;
  /** Hint pill over the feed. Defaults follow the scanning state. */
  hint?: ReactNode;
  /** Shutter tap — start the read. */
  onShutter?: () => void;
  /** Gallery-upload side control. */
  onGallery?: () => void;
  /** Torch side control. */
  onTorch?: () => void;
}

/**
 * Snap a Bill — capture. The viewfinder shows a photographed paper bill
 * (image content, deliberately not tokenised) with white corner brackets;
 * the scan line and hint pick up the brand. Corner brackets guide alignment,
 * the shutter starts the read.
 */
export const SnapABillCapture = forwardRef<HTMLDivElement, SnapABillCaptureProps>(
  function SnapABillCapture(
    { scanning, hint, onShutter, onGallery, onTorch, className, ...rest },
    ref,
  ) {
    return (
      <div ref={ref} className={className} {...rest}>
        <div className={cx('sab-cam', scanning && 'scanning')}>
          <div className="sab-noise" aria-hidden />
          <div className="sab-paper" aria-hidden>
            <div className="sab-paper-brand" />
            <div className="sab-paper-rule s" />
            <div className="sab-paper-rule l" />
            <div className="sab-paper-rule m" />
            <div className="sab-paper-amt" />
            <div className="sab-paper-rule m" />
            <div className="sab-paper-rule s" />
            <div className="sab-paper-foot">
              {paperBars.map((h, i) => (
                <span key={i} className="sab-paper-bar" style={{ height: h }} />
              ))}
            </div>
          </div>
          <div className="sab-bracket tl" aria-hidden />
          <div className="sab-bracket tr" aria-hidden />
          <div className="sab-bracket bl" aria-hidden />
          <div className="sab-bracket br" aria-hidden />
          <div className="sab-scanline" aria-hidden />
          <div className="sab-hint" role="status">
            {hint ?? (scanning ? 'Reading your bill…' : 'Fit the whole bill inside the frame')}
          </div>
        </div>
        <div className="sab-shutter-row">
          <button type="button" className="sab-side" aria-label="Upload from gallery" onClick={onGallery}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.6" />
              <path d="M21 16l-5-5-6 6" />
            </svg>
          </button>
          <button type="button" className="sab-shutter" aria-label="Capture bill" onClick={onShutter}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
              <circle cx="12" cy="12" r="3.2" />
            </svg>
          </button>
          <button type="button" className="sab-side" aria-label="Torch" onClick={onTorch}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13 2L5 14h5l-1 8 8-12h-5z" />
            </svg>
          </button>
        </div>
      </div>
    );
  },
);

export interface SnapABillField {
  /** Uppercase micro label, e.g. "Account number". */
  label: string;
  /** Extracted value (mono), e.g. "0420 1533 8802". */
  value: string;
  /** Editable fields show an Edit link. */
  editable?: boolean;
  /** Low-confidence: brand-tinted and surfaced for confirmation rather than
   * silently accepted — a wrong account number pays the wrong subscriber. */
  confirm?: boolean;
  /** Warning line under the field (e.g. why confirmation is asked). */
  note?: ReactNode;
  /** Render in the half-width two-up grid with the next `half` field. */
  half?: boolean;
}

export const snapABillDemoFields: SnapABillField[] = [
  {
    label: 'Account number',
    value: '0420 1533 8802',
    editable: true,
    confirm: true,
    note: 'Please confirm — the last four digits were faint',
  },
  { label: 'Amount due', value: '₱2,847.50', half: true },
  { label: 'Due date', value: '04 Sep', half: true },
  { label: 'Billing period', value: '28 Jul – 27 Aug 2026', editable: true },
];

export interface SnapABillReviewProps extends HTMLAttributes<HTMLDivElement> {
  /** Matched biller name, e.g. "Meralco". */
  biller?: string;
  /** Chip initials for the biller tile. */
  initials?: string;
  /** Match subline, e.g. "Electricity · matched from bill". */
  matchDetail?: ReactNode;
  fields?: SnapABillField[];
  onEdit?: (field: SnapABillField) => void;
  /** @default 'Total to pay' */
  totalLabel?: ReactNode;
  /** Preformatted total (mono). */
  total?: string;
  /** Trailing note in the total strip, e.g. "No service fee". */
  totalDetail?: ReactNode;
}

const noteIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
  </svg>
);

function Field({ f, onEdit }: { f: SnapABillField; onEdit?: (f: SnapABillField) => void }) {
  return (
    <div>
      <div className="sab-f-label">{f.label}</div>
      <div className={cx('sab-field', f.confirm && 'confirm')}>
        <span className="sab-f-val">{f.value}</span>
        {f.editable && (
          <button type="button" className="sab-f-edit" onClick={() => onEdit?.(f)}>
            Edit
          </button>
        )}
      </div>
      {f.note && (
        <div className="sab-f-note">
          {noteIcon}
          {f.note}
        </div>
      )}
    </div>
  );
}

/**
 * Snap a Bill — extracted details. What was read off the bill, with every
 * field correctable; low-confidence fields are surfaced for confirmation.
 * Compose the confirm CTA with `<ButtonDock><Button size="xl">` below it.
 */
export const SnapABillReview = forwardRef<HTMLDivElement, SnapABillReviewProps>(
  function SnapABillReview(
    {
      biller = 'Meralco',
      initials = 'M',
      matchDetail = 'Electricity · matched from bill',
      fields = snapABillDemoFields,
      onEdit,
      totalLabel = 'Total to pay',
      total = '₱2,847.50',
      totalDetail = 'No service fee',
      className,
      ...rest
    },
    ref,
  ) {
    const rows: ReactNode[] = [];
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      if (!f) continue;
      const next = fields[i + 1];
      if (f.half && next?.half) {
        rows.push(
          <div key={f.label} className="sab-grid2">
            <Field f={f} onEdit={onEdit} />
            <Field f={next} onEdit={onEdit} />
          </div>,
        );
        i++;
      } else {
        rows.push(<Field key={f.label} f={f} onEdit={onEdit} />);
      }
    }
    return (
      <div ref={ref} className={cx('sab-review', className)} {...rest}>
        <div className="sab-detected">
          <div className="sab-det-logo">{initials}</div>
          <div>
            <div className="sab-det-name">{biller}</div>
            {matchDetail && <div className="sab-det-sub">{matchDetail}</div>}
          </div>
          <div className="sab-det-tick">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>
        {rows}
        {total && (
          <div className="sab-total">
            <div>
              <div className="sab-total-l">{totalLabel}</div>
              <div className="sab-total-v">{total}</div>
            </div>
            {totalDetail && <div className="sab-total-l">{totalDetail}</div>}
          </div>
        )}
      </div>
    );
  },
);
