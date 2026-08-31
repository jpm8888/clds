import type { Meta, StoryObj } from '@storybook/react-vite';
import { CashflowCard } from './CashflowCard';

const meta = {
  title: 'Molecules/CashflowCard',
  component: CashflowCard,
  args: { amount: '$82,758.10' },
  parameters: {
    docs: {
      description: {
        component:
          'Compact wallet card for dashboards. Variants build up by props: header action ' +
          '(`detailLabel`), panel button (`actionLabel`), Main/Secondary `segments`, and an ' +
          'income/expense split colored by the gain/loss tokens.',
      },
    },
  },
} satisfies Meta<typeof CashflowCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { detailLabel: 'Detail' },
};

export const WithButton: Story = {
  args: { actionLabel: 'Top up' },
};

export const Detail: Story = {
  args: {
    segments: ['Main', 'Secondary'],
    actionLabel: 'Top up',
    income: '+$20,000',
    expense: '−$5,200',
  },
};
