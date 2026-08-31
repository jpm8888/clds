import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpendLimit, SpendBarChart } from './SpendLimit';

const meta = {
  title: 'Organisms/SpendLimit',
  component: SpendLimit,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    heading: 'Daily limit',
    items: [
      { used: '₦ 68,000 used', of: 'of ₦ 100,000', percent: 68, note: '₦ 32,000 remaining' },
      {
        used: '₦ 88,000 used',
        of: 'of ₦ 100,000',
        percent: 88,
        status: 'warn',
        note: '⚠ Near limit — ₦ 12,000 left',
      },
      {
        used: '₦ 100,000 used',
        of: 'of ₦ 100,000',
        percent: 100,
        status: 'over',
        note: 'Limit reached',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Spend-limit gauges (fill escalates brand → warning → danger) plus the companion ' +
          'SpendBarChart for weekly spend. Compose the two side by side on a spending screen.',
      },
    },
  },
} satisfies Meta<typeof SpendLimit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Limits: Story = {};

export const WeeklySpend: Story = {
  render: () => (
    <SpendBarChart
      heading="Weekly spend"
      values={[38, 55, 30, 72, 100, 48, 60]}
      labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
      activeIndex={4}
    />
  ),
};

export const Combined: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <SpendLimit {...args} />
      </div>
      <div style={{ flex: 1, minWidth: 260 }}>
        <SpendBarChart
          heading="Weekly spend"
          values={[38, 55, 30, 72, 100, 48, 60]}
          labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
          activeIndex={4}
        />
      </div>
    </div>
  ),
};
