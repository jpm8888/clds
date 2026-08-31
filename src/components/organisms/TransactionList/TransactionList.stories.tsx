import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionList, TransactionItem } from './TransactionList';

const meta = {
  title: 'Organisms/TransactionList',
  component: TransactionList,
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
          'Transaction history rows: credit amounts green, debit red (same in dark mode). ' +
          'Use signed display strings for amounts; pass a custom `iconSlot` for merchant logos.',
      },
    },
  },
} satisfies Meta<typeof TransactionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <TransactionList>
      <TransactionItem
        title="Salary — GTBank"
        meta="Transfer · Feb 28 · 09:14"
        amount="+₦ 350,000"
        direction="credit"
        status="Credit"
      />
      <TransactionItem
        title="Airtime — MTN"
        meta="Bill payment · Feb 28 · 11:45"
        amount="−₦ 2,000"
        direction="debit"
        status="Debit"
      />
      <TransactionItem
        title="P2P Transfer — James K."
        meta="Send money · Feb 27 · 14:33"
        amount="−₦ 20,000"
        direction="debit"
        status="Pending"
        icon="clock"
      />
      <TransactionItem
        title="Savings — Auto-debit"
        meta="Internal · Feb 27 · 08:00"
        amount="−₦ 5,000"
        direction="debit"
        status="Completed"
        icon="check"
      />
    </TransactionList>
  ),
};

export const SingleRow: Story = {
  args: { children: null },
  render: () => (
    <TransactionList>
      <TransactionItem
        title="Refund — Jumia"
        meta="Purchase refund · Mar 1"
        amount="+₦ 14,300"
        direction="credit"
        status="Credit"
      />
    </TransactionList>
  ),
};
