import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReceiptDetail } from './ReceiptDetail';

const rows = [
  { label: 'To', value: 'James K. · •••• 8891' },
  { label: 'Reference', value: 'TRX-9F2A81C4' },
  { label: 'Date', value: '27 Jul 2026, 14:33' },
  { label: 'Fee', value: '₦0.00' },
  { label: 'Method', value: 'Instant transfer' },
];

const meta = {
  title: 'Organisms/ReceiptDetail',
  component: ReceiptDetail,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: { direction: 'out', amount: '−₦20,000', name: 'James K.', rows },
  parameters: {
    docs: {
      description: {
        component:
          'Transaction receipt for a detail screen or confirmation bottom sheet. ' +
          '`direction="in"` tints the icon and amount green; `"out"` red.',
      },
    },
  },
} satisfies Meta<typeof ReceiptDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sent: Story = {};

export const Received: Story = {
  args: { direction: 'in', amount: '+₦350,000' },
};
