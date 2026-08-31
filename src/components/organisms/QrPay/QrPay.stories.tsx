import type { Meta, StoryObj } from '@storybook/react-vite';
import { QrPay } from './QrPay';

const meta = {
  title: 'Organisms/QrPay',
  component: QrPay,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Scan-to-pay QR card. The card stays light in dark mode so scanners keep contrast. ' +
          'The module pattern is decorative — use a real QR encoder for production.',
      },
    },
  },
} satisfies Meta<typeof QrPay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomPayload: Story = {
  args: { label: 'Receive money', sub: 'Share with the sender', payload: 'acct:0123456789' },
};
