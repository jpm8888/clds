import type { Meta, StoryObj } from '@storybook/react-vite';
import { Balance } from './Balance';

const meta = {
  title: 'Molecules/Balance',
  component: Balance,
  args: { amount: '$82,758.10', trend: '+24% this month' },
  parameters: {
    docs: {
      description: {
        component:
          'Available-balance hero for dashboard screens. Click the eye to mask the amount. ' +
          'Pair with full-width `actions` (Send/Request) or round `quickActions`.',
      },
    },
  },
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SendRequest: Story = {
  args: {
    actions: [
      { label: 'Send', icon: 'arrow-up-right', variant: 'primary' },
      { label: 'Request', icon: 'arrow-down-left' },
    ],
  },
};

export const QuickActions: Story = {
  args: {
    quickActions: [
      { label: 'Top up', icon: 'plus' },
      { label: 'Send', icon: 'arrow-up-right' },
      { label: 'Request', icon: 'arrow-down-left' },
      { label: 'More', icon: 'more-horizontal' },
    ],
  },
};

export const AmountOnly: Story = {
  args: { trend: undefined },
};
