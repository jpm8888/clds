import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './coachmark.css';

export type CoachmarkPlacement =
  'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';

export interface CoachmarkProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Which side/corner the dashed pointer connects to. @default 'top' */
  placement?: CoachmarkPlacement;
  title: ReactNode;
  description?: ReactNode;
  /** Current step (1-based) of the tour. @default 1 */
  step?: number;
  /** Total steps in the tour. @default 5 */
  total?: number;
}

const POINTERS: Record<
  CoachmarkPlacement,
  { w: number; h: number; viewBox: string; d: string; cx: number; cy: number; full: boolean }
> = {
  top: { w: 12, h: 44, viewBox: '0 0 12 44', d: 'M6 42V4', cx: 6, cy: 42, full: false },
  'top-left': {
    w: 240,
    h: 60,
    viewBox: '0 0 240 60',
    d: 'M120 56V22H8',
    cx: 120,
    cy: 56,
    full: true,
  },
  'top-right': {
    w: 240,
    h: 60,
    viewBox: '0 0 240 60',
    d: 'M120 56V22H232',
    cx: 120,
    cy: 56,
    full: true,
  },
  bottom: { w: 12, h: 44, viewBox: '0 0 12 44', d: 'M6 2V40', cx: 6, cy: 2, full: false },
  'bottom-left': {
    w: 240,
    h: 60,
    viewBox: '0 0 240 60',
    d: 'M120 4V38H8',
    cx: 120,
    cy: 4,
    full: true,
  },
  'bottom-right': {
    w: 240,
    h: 60,
    viewBox: '0 0 240 60',
    d: 'M120 4V38H232',
    cx: 120,
    cy: 4,
    full: true,
  },
};

function Pointer({ placement }: { placement: CoachmarkPlacement }) {
  const p = POINTERS[placement];
  return (
    <div className="coach-ptr" style={p.full ? { width: '100%' } : undefined} aria-hidden>
      <svg width={p.w} height={p.h} viewBox={p.viewBox}>
        <path d={p.d} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx={p.cx} cy={p.cy} r="5" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * MaV onboarding coachmark (Figma 259:21967) — a dashed pointer + dot
 * connecting a tour tip to its target. White text: render it over a dark
 * scrim (`background: var(--mav-blanket)`), absolutely positioned near the
 * highlighted element. `top*` placements point up (tip sits below the
 * target); `bottom*` point down.
 *
 * @example
 * <div style={{ position: 'fixed', inset: 0, background: 'var(--mav-blanket)' }}>
 *   <Coachmark placement="top" title="Scan to pay" description="Point your camera at any QR" step={2} total={5} />
 * </div>
 */
export const Coachmark = forwardRef<HTMLDivElement, CoachmarkProps>(function Coachmark(
  { placement = 'top', title, description, step = 1, total = 5, className, ...rest },
  ref,
) {
  const pointerFirst = placement.startsWith('top');
  const text = (
    <div className="coach-txt">
      <span className="coach-title">{title}</span>
      {description && <span className="coach-desc">{description}</span>}
      <span className="coach-step">
        ( {step} / {total} )
      </span>
    </div>
  );
  return (
    <div ref={ref} role="tooltip" className={cx('coach', className)} {...rest}>
      {pointerFirst ? (
        <>
          <Pointer placement={placement} />
          {text}
        </>
      ) : (
        <>
          {text}
          <Pointer placement={placement} />
        </>
      )}
    </div>
  );
});
