import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './qr-pay.css';

export interface QrPayProps extends HTMLAttributes<HTMLDivElement> {
  /** Caption under the code. @default 'Scan to pay' */
  label?: string;
  /** Subtext under the caption. @default 'Show this code at the merchant terminal' */
  sub?: string;
  /**
   * Seeds the decorative module pattern so different payloads look different.
   * NOT a real QR encoding — swap in a QR library in production.
   */
  payload?: string;
}

/** Deterministic decorative QR-like module grid (21×21 with finder squares). */
function useQrModules(payload: string) {
  return useMemo(() => {
    const N = 21;
    const c = 7;
    let seed = 0;
    for (let i = 0; i < payload.length; i++) seed = (seed * 31 + payload.charCodeAt(i)) % 97;
    const cells: Array<{ x: number; y: number }> = [];
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if ((x < 7 && y < 7) || (x > N - 8 && y < 7) || (x < 7 && y > N - 8)) continue;
        if ((x * 7 + y * 13 + (x & y) + x + seed) % 3 === 0) cells.push({ x: x * c, y: y * c });
      }
    }
    return { cells, size: N * c, c, N };
  }, [payload]);
}

/**
 * QR / scan-to-pay card — a generated QR-style code on an always-light card
 * (kept light in dark mode for scanner contrast) with a caption.
 *
 * The pattern is decorative; wire a real QR encoder for production payloads.
 *
 * @example
 * <QrPay label="Scan to pay" sub="Show this code at the merchant terminal" payload="acct:0123456789" />
 */
export const QrPay = forwardRef<HTMLDivElement, QrPayProps>(function QrPay(
  {
    label = 'Scan to pay',
    sub = 'Show this code at the merchant terminal',
    payload = 'mav',
    className,
    ...rest
  },
  ref,
) {
  const { cells, size, c, N } = useQrModules(payload);
  const finder = (fx: number, fy: number, key: string) => (
    <g key={key}>
      <rect x={fx * c} y={fy * c} width={c * 7} height={c * 7} rx={4} />
      <rect x={(fx + 1) * c} y={(fy + 1) * c} width={c * 5} height={c * 5} rx={3} fill="#fff" />
      <rect x={(fx + 2) * c} y={(fy + 2) * c} width={c * 3} height={c * 3} rx={2} />
    </g>
  );
  return (
    <div ref={ref} className={cx('bld-qr', className)} {...rest}>
      <div className="bld-qr-card">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={label}
        >
          {cells.map((m) => (
            <rect key={`${m.x}-${m.y}`} x={m.x} y={m.y} width={c} height={c} />
          ))}
          {finder(0, 0, 'tl')}
          {finder(N - 7, 0, 'tr')}
          {finder(0, N - 7, 'bl')}
        </svg>
      </div>
      <div className="bld-qr-cap">{label}</div>
      {sub && <div className="bld-qr-sub">{sub}</div>}
    </div>
  );
});
