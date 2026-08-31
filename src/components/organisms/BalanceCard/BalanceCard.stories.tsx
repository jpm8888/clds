import type { Meta, StoryObj } from '@storybook/react-vite';
import { BalanceCard } from './BalanceCard';

const meta = {
  title: 'Organisms/BalanceCard',
  component: BalanceCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Available Balance',
    amount: '₦ 284,500.00',
    sub: 'Last updated: just now',
    actions: [
      { icon: 'plus', label: 'Add Money' },
      { icon: 'arrow-left', label: 'Send' },
      { icon: 'clock', label: 'History' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Hero wallet card for the top of a dashboard. Gradient variant keeps white text in ' +
          'both themes; `dark` variant is an always-dark savings card with lime accents. ' +
          'Max 3 quick actions.',
      },
    },
  },
} satisfies Meta<typeof BalanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gradient: Story = {};

export const Dark: Story = {
  args: {
    variant: 'dark',
    label: 'Savings',
    amount: '₦ 120,000',
    sub: '+₦5,000 this month',
    actions: [
      { icon: 'plus', label: 'Deposit' },
      { icon: 'arrow-right', label: 'Withdraw' },
    ],
  },
};

export const NoActions: Story = {
  args: { actions: undefined, sub: 'Across 3 linked accounts' },
};
