import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './divider.css';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Centre a small uppercase label on the rule (e.g. "or continue with"). */
  label?: string;
}

/**
 * MaV divider — a 1px rule separating content. Horizontal renders an <hr>,
 * vertical a <div> stretching to its row height. With `label`, renders the
 * label centred between two rules.
 *
 * @example
 * <Divider />
 * <Divider label="or continue with" />
 * <div style={{ display: 'flex' }}>…<Divider orientation="vertical" />…</div>
 */
export const Divider = forwardRef<HTMLElement, DividerProps>(function Divider(
  { orientation = 'horizontal', label, className, ...rest },
  ref,
) {
  if (label) {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cx('dv-labelled', className)}
        role="separator"
        {...rest}
      >
        <span className="dv dv-h" style={{ flex: 1 }} />
        <span className="lbl">{label}</span>
        <span className="dv dv-h" style={{ flex: 1 }} />
      </div>
    );
  }
  if (orientation === 'vertical') {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cx('dv', 'dv-v', className)}
        role="separator"
        aria-orientation="vertical"
        {...rest}
      />
    );
  }
  return (
    <hr ref={ref as React.Ref<HTMLHRElement>} className={cx('dv', 'dv-h', className)} {...rest} />
  );
});
