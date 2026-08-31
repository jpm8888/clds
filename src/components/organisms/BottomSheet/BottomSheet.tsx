import {
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './bottom-sheet.css';

export type BottomSheetHeader = 'nav' | 'action' | 'none';

export interface BottomSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Controls visibility. The closed sheet stays mounted (translated off-screen) so the slide animation can run. */
  open: boolean;
  /** Called on blanket click, ✕/back, Escape, drag-down past the threshold, or the header action button. */
  onClose?: () => void;
  /** Sheet title, centered in the header. */
  title?: ReactNode;
  /**
   * Header style: `nav` = back · title · close, `action` = title + text-only
   * action button (fires `onAction`, falls back to `onClose`), `none` = no header
   * (no drag-to-dismiss handle either).
   * @default 'nav'
   */
  header?: BottomSheetHeader;
  /** Label for the `action` header's text button. @default 'Done' */
  actionLabel?: ReactNode;
  /** Handler for the `action` header button. Defaults to `onClose`. */
  onAction?: () => void;
  /** Docked footer content (typically a full-width primary Button). */
  footer?: ReactNode;
  /** Show the home-indicator strip at the sheet base. @default true */
  homeIndicator?: boolean;
  /** Scrollable body content. */
  children?: ReactNode;
}

const DRAG_DISMISS_PX = 120;

/**
 * Bottom sheet — a drawer that rises over a dimmed blanket (32px top radius,
 * `--mav-blanket` scrim). Fills its nearest `position: relative` ancestor:
 * wrap a screen (or a PhoneFrame in stories) and toggle `open`.
 *
 * Interactions: blanket click / ✕ / back / Escape close it; dragging the
 * header down past 120px dismisses; body scroll is locked on the container
 * while open; focus moves into the sheet on open and returns on close.
 * Dark mode is automatic (actions re-theme to lime).
 *
 * @example
 * <BottomSheet open={open} onClose={() => setOpen(false)} title="Confirm payment"
 *   footer={<Button size="xl">Pay $128.00</Button>}>
 *   <p>Send $128.00 to Amara Nwosu?</p>
 * </BottomSheet>
 */
export function BottomSheet({
  open,
  onClose,
  title,
  header = 'nav',
  actionLabel = 'Done',
  onAction,
  footer,
  homeIndicator = true,
  className,
  children,
  ...rest
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const drag = useRef({ active: false, startY: 0, dy: 0 });

  /* Escape to close + focus management */
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    sheetRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  /* Scroll-lock the document while open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Drag-down-to-dismiss on the header */
  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.bs-icon,.bs-textbtn')) return;
    drag.current = { active: true, startY: e.clientY, dy: 0 };
    sheetRef.current?.classList.add('dragging');
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);
  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !sheetRef.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.startY);
    sheetRef.current.style.transform = `translateY(${drag.current.dy}px)`;
  }, []);
  const endDrag = useCallback(() => {
    if (!drag.current.active || !sheetRef.current) return;
    const { dy } = drag.current;
    drag.current.active = false;
    sheetRef.current.classList.remove('dragging');
    sheetRef.current.style.transform = '';
    if (dy > DRAG_DISMISS_PX) onClose?.();
  }, [onClose]);

  return (
    <div className={cx('bs-root', open && 'open', className)} {...rest}>
      <div className="bs-blanket" onClick={onClose} aria-hidden />
      <div
        ref={sheetRef}
        className="bs-sheet"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-hidden={open ? undefined : true}
      >
        {header !== 'none' && (
          <div
            className="bs-head"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {header === 'nav' ? (
              <>
                <button className="bs-icon" onClick={onClose} aria-label="Back" type="button">
                  <Icon name="chevron-left" size={24} />
                </button>
                <span className="ttl">{title}</span>
                <button className="bs-icon" onClick={onClose} aria-label="Close" type="button">
                  <Icon name="x" size={24} />
                </button>
              </>
            ) : (
              <>
                <span className="bs-icon ghost" />
                <span className="ttl">{title}</span>
                <button className="bs-textbtn" onClick={onAction ?? onClose} type="button">
                  {actionLabel}
                </button>
              </>
            )}
          </div>
        )}
        <div className="bs-body">{children}</div>
        {footer && <div className="bs-dock">{footer}</div>}
        {homeIndicator && (
          <div className="bs-home">
            <span />
          </div>
        )}
      </div>
    </div>
  );
}
