import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkedAccounts } from './LinkedAccounts';

const meta = {
  title: 'Organisms/LinkedAccounts',
  component: LinkedAccounts,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    accounts: [
      {
        initials: 'GT',
        bank: 'GTBank',
        number: '0123456789',
        balance: '₦ 284,500',
        tag: 'Primary',
      },
      {
        initials: 'ZN',
        bank: 'Zenith Bank',
        number: '9876543210',
        balance: '₦ 50,000',
        tag: 'Savings',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Linked external bank accounts with an optional dashed "add" card. ' +
          'Account numbers render in the mono font.',
      },
    },
  },
} satisfies Meta<typeof LinkedAccounts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAddCard: Story = {
  args: { onAdd: () => {} },
};
