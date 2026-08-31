import { Fragment, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import './stepper.css';

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Step labels in order, e.g. ['Amount', 'Recipient', 'Review']. */
  steps: string[];
  /** Index of the current step; earlier steps render as done. @default 0 */
  active?: number;
}

/**
 * MaV progress stepper — numbered circles joined by connectors; completed
 * steps show a check, the active step gets a soft brand halo. Use it on
 * multi-step flows (send money, onboarding).
 *
 * @example
 * <Stepper steps={['Amount', 'Recipient', 'Review', 'Done']} active={1} />
 */
export function Stepper({ steps, active = 0, className, ...rest }: StepperProps) {
  return (
    <div className={cx('step-row', className)} {...rest}>
      {steps.map((label, i) => {
        const state = i < active ? 'done' : i === active ? 'active' : 'todo';
        return (
          <Fragment key={label}>
            <div className="step-item">
              <div
                className={`step-circle step-${state}`}
                aria-current={state === 'active' ? 'step' : undefined}
              >
                {state === 'done' ? '✓' : i + 1}
              </div>
              <span className={cx('step-lbl', state === 'active' && 'on')}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className={cx('step-conn', i < active && 'done')} />}
          </Fragment>
        );
      })}
    </div>
  );
}
