import type { Meta, StoryObj } from '@storybook/react-vite';
import { Reconciliation, ReconciliationEvidence } from './Reconciliation';

const meta = {
  title: 'Organisms/Reconciliation',
  component: Reconciliation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A settlement batch, its exceptions, and the evidence needed to clear them. A desk job — wide tables and dense rows — framed as a desktop window rather than a phone; the canvas scrolls sideways at narrow widths. Warning-orange is deliberately unused so status stays readable under the warm Bayad brand.',
      },
    },
  },
} satisfies Meta<typeof Reconciliation>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Variance-led stats, exceptions tinted and first, posted vs settled per row. */
export const SettlementBatch: Story = {};

/** The source-of-truth conflict: two stores side by side, disputed field marked. */
export const ExceptionEvidence: StoryObj = {
  render: () => <ReconciliationEvidence />,
};
