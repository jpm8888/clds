import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './app-bar.css';

/** Trailing action: the strings `'close'` and `'more'` render built-in icon
 * buttons, any other string renders a text button, and a ReactNode is
 * rendered as-is. */
export type AppBarAction = string | ReactNode;

export interface AppBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Centered screen title. @default 'Screen title' */
  title?: ReactNode;
  /** Status bar clock text. @default '9:41' */
  time?: string;
  /** Render the iOS status bar above the nav row. @default true */
  statusBar?: boolean;
  /** Leading back chevron. @default true */
  back?: boolean;
  onBack?: () => void;
  /** Trailing actions: 'close' | 'more' | text label | ReactNode. */
  actions?: AppBarAction[];
  /** Called with the action index for built-in ('close'/'more'/text) actions. */
  onAction?: (index: number) => void;
  /** Permanently dark bar with lime accent (independent of theme). @default false */
  inverted?: boolean;
  /** Hairline bottom border. @default false */
  bordered?: boolean;
}

const StatusLevels = () => (
  <span className="ab-levels" aria-hidden>
    <svg width="18" height="12" viewBox="0 0 18 12">
      <rect x="0" y="8" width="3" height="4" rx=".5" />
      <rect x="5" y="5" width="3" height="7" rx=".5" />
      <rect x="10" y="2.5" width="3" height="9.5" rx=".5" />
      <rect x="15" y="0" width="3" height="12" rx=".5" />
    </svg>
    <svg width="17" height="12" viewBox="0 0 17 12">
      <path d="M8.5 2.2c2.6 0 5 1 6.8 2.7l-1.4 1.5A7.6 7.6 0 0 0 8.5 4.3 7.6 7.6 0 0 0 3.1 6.4L1.7 4.9A9.7 9.7 0 0 1 8.5 2.2Zm0 3.6c1.6 0 3.1.6 4.2 1.7l-1.5 1.5A3.9 3.9 0 0 0 8.5 9a3.9 3.9 0 0 0-2.7 1L4.3 7.5A6 6 0 0 1 8.5 5.8Zm0 3.5 1.9 2-1.9.5-1.9-.5 1.9-2Z" />
    </svg>
    <svg width="26" height="12" viewBox="0 0 26 12">
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".35"
      />
      <rect x="2" y="2" width="18" height="8" rx="1.5" />
      <rect x="23" y="4" width="1.6" height="4" rx=".8" />
    </svg>
  </span>
);

/**
 * MaV mobile top navigation bar (Figma "❖ Top Navigation" 203:1615) —
 * iOS status bar + 56px row with back control, centered title, and a
 * trailing action slot. One per screen, at the very top.
 *
 * @example
 * <AppBar title="Transfer" onBack={goBack} actions={['close']} />
 * <AppBar title="Card details" actions={['more']} bordered statusBar={false} />
 */
export const AppBar = forwardRef<HTMLElement, AppBarProps>(function AppBar(
  {
    title = 'Screen title',
    time = '9:41',
    statusBar = true,
    back = true,
    onBack,
    actions = [],
    onAction,
    inverted = false,
    bordered = false,
    className,
    ...rest
  },
  ref,
) {
  const renderAction = (a: AppBarAction, i: number) => {
    if (a === 'close')
      return (
        <button
          key={i}
          type="button"
          className="ab-ico"
          aria-label="Close"
          onClick={() => onAction?.(i)}
        >
          <Icon name="x" size={24} aria-hidden />
        </button>
      );
    if (a === 'more')
      return (
        <button
          key={i}
          type="button"
          className="ab-ico"
          aria-label="More"
          onClick={() => onAction?.(i)}
        >
          <Icon name="more-vertical" size={24} aria-hidden />
        </button>
      );
    if (typeof a === 'string')
      return (
        <button key={i} type="button" className="ab-txt" onClick={() => onAction?.(i)}>
          {a}
        </button>
      );
    return <span key={i}>{a}</span>;
  };

  return (
    <header
      ref={ref}
      className={cx('appbar', inverted && 'inverted', bordered && 'bordered', className)}
      {...rest}
    >
      {statusBar && (
        <div className="ab-status" aria-hidden>
          <span className="ab-time">{time}</span>
          <StatusLevels />
        </div>
      )}
      <div className="ab-row">
        <div className="ab-side">
          {back && (
            <button type="button" className="ab-ico" aria-label="Back" onClick={onBack}>
              <Icon name="chevron-left" size={24} aria-hidden />
            </button>
          )}
        </div>
        <div className="ab-title">{title}</div>
        <div className="ab-side after">{actions.map(renderAction)}</div>
      </div>
    </header>
  );
});
