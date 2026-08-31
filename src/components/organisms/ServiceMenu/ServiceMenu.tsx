import { forwardRef, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './service-menu.css';

/**
 * Built-in service glyphs — one geometric line set on a shared 24px grid
 * (1.8 stroke, round caps and joins), ported verbatim from the MaV
 * `service-menu.html` source so every tile carries the same optical weight.
 */
export type ServiceMenuIconName =
  | 'pay-bills'
  | 'add-money'
  | 'buy-load'
  | 'send-money'
  | 'bank-transfer'
  | 'insurance'
  | 'loans'
  | 'qr-pay'
  | 'electricity'
  | 'water'
  | 'telecoms'
  | 'cable-net';

/* Path data only — fill/stroke/size come from the .svc-ico CSS so the glyph
   inherits the brand color role and inverts cleanly on the emphasized tile. */
const glyphs: Record<ServiceMenuIconName, ReactNode> = {
  'pay-bills': (
    <>
      <path d="M6.5 3.5h7.6L18.5 8v12a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 20V5a1.5 1.5 0 0 1 1.5-1.5z" />
      <path d="M14 3.6V8h4.4" />
      <path d="M8.4 12.4h6M8.4 15.8h3.6" />
    </>
  ),
  'add-money': (
    <>
      <path d="M20 8V6.5A1.5 1.5 0 0 0 18.5 5H5a2 2 0 0 0 0 4h14a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 19 19H5a2 2 0 0 1-2-2V7" />
      <path d="M17 14h.01" />
    </>
  ),
  'buy-load': (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
      <path d="M9 6.5h6" />
    </>
  ),
  'send-money': (
    <>
      <path d="M21 3L10.5 13.5" />
      <path d="M21 3l-6.8 18-3.7-7.5L3 9.8z" />
    </>
  ),
  'bank-transfer': (
    <>
      <path d="M3 9.5L12 4l9 5.5" />
      <path d="M5 10.5v8M9.5 10.5v8M14.5 10.5v8M19 10.5v8" />
      <path d="M3 19.5h18" />
    </>
  ),
  insurance: (
    <>
      <path d="M12 3l7.5 3v6c0 4.7-3.3 7.6-7.5 9-4.2-1.4-7.5-4.3-7.5-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  loans: (
    <>
      <circle cx="12" cy="12" r="7.8" />
      <path d="M10.2 16V8.4h2.6a2.1 2.1 0 0 1 0 4.2h-2.6" />
      <path d="M8.9 10.7h5M8.9 12.6h5" />
    </>
  ),
  'qr-pay': (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <path d="M13.5 13.5h3v3h-3zM20.5 20.5h-3v-3" />
    </>
  ),
  electricity: <path d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6z" />,
  water: (
    <>
      <path d="M12 3.2c3.1 4.1 5.6 6.7 5.6 9.7a5.6 5.6 0 0 1-11.2 0c0-3 2.5-5.6 5.6-9.7z" />
      <path d="M9.4 13.6a2.6 2.6 0 0 0 2.6 2.6" />
    </>
  ),
  telecoms: (
    <>
      <path d="M6.4 6.4a7.9 7.9 0 0 0 0 11.2" />
      <path d="M17.6 6.4a7.9 7.9 0 0 1 0 11.2" />
      <path d="M9.6 9.6a3.4 3.4 0 0 0 0 4.8" />
      <path d="M14.4 9.6a3.4 3.4 0 0 1 0 4.8" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  'cable-net': (
    <>
      <rect x="2.5" y="4.5" width="19" height="12" rx="2" />
      <path d="M8 20.5h8" />
      <path d="M12 16.5v4" />
    </>
  ),
};

export interface ServiceMenuItem {
  /** Stable id, passed to `onSelect`. Doubles as the default glyph key. */
  id: string;
  /** Tile label, e.g. "Pay Bills". */
  label: string;
  /**
   * Built-in glyph name, or any custom node rendered inside the icon chip.
   * When omitted, the built-in glyph whose name matches `id` is used.
   */
  icon?: ServiceMenuIconName | ReactElement;
  /**
   * Emphasised primary-action tile: solid brand chip with an inverted glyph.
   * The source reserves this for a single tile (Pay Bills).
   */
  emphasized?: boolean;
  /** Small count badge pinned to the icon chip, e.g. unpaid-bill count. */
  badge?: string | number;
}

export interface ServiceMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Tiles to render. Defaults to the home services grid
   * ({@link serviceMenuHomeItems}); pass {@link serviceMenuBillCategories}
   * for the category grid behind Pay Bills.
   */
  items?: ServiceMenuItem[];
  /** Called with the tile's id (and the full item) on click. */
  onSelect?: (id: string, item: ServiceMenuItem) => void;
}

/** Default home-grid content from the source demo (Pay Bills emphasised). */
export const serviceMenuHomeItems: ServiceMenuItem[] = [
  { id: 'pay-bills', label: 'Pay Bills', emphasized: true },
  { id: 'add-money', label: 'Add Money' },
  { id: 'buy-load', label: 'Buy Load' },
  { id: 'send-money', label: 'Send Money' },
  { id: 'bank-transfer', label: 'Bank Transfer' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'loans', label: 'Loans' },
  { id: 'qr-pay', label: 'QR Pay' },
];

/** Default bill-category grid content from the source demo. */
export const serviceMenuBillCategories: ServiceMenuItem[] = [
  { id: 'electricity', label: 'Electricity' },
  { id: 'water', label: 'Water' },
  { id: 'telecoms', label: 'Telecoms' },
  { id: 'cable-net', label: 'Cable & Net' },
];

function renderGlyph(item: ServiceMenuItem): ReactNode {
  const icon = item.icon ?? (item.id in glyphs ? (item.id as ServiceMenuIconName) : undefined);
  if (typeof icon === 'string' && icon in glyphs) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {glyphs[icon]}
      </svg>
    );
  }
  return icon;
}

/**
 * Service Menu — the home services grid and the bill-category grid behind
 * Pay Bills. One geometric line set in a translucent brand tint, so the icon
 * chip composites over any surface and needs no dark-mode value; at most one
 * tile is emphasised for the primary action.
 *
 * @example
 * // home services (default content)
 * <ServiceMenu onSelect={(id) => navigate(id)} />
 *
 * // bill categories
 * <ServiceMenu items={serviceMenuBillCategories} onSelect={openBiller} />
 */
export const ServiceMenu = forwardRef<HTMLDivElement, ServiceMenuProps>(function ServiceMenu(
  { items = serviceMenuHomeItems, onSelect, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('svc-menu', className)} {...rest}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cx('svc-tile', item.emphasized && 'svc-tile-key')}
          onClick={() => onSelect?.(item.id, item)}
        >
          <span className="svc-ico">
            {renderGlyph(item)}
            {item.badge != null && item.badge !== '' && (
              <span className="svc-badge">{item.badge}</span>
            )}
          </span>
          <span className="svc-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
});
