import type { Meta, StoryObj } from '@storybook/react-vite';
import { DonutChart } from './DonutChart';

const meta = {
  title: 'Organisms/DonutChart',
  component: DonutChart,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    total: '$1,248',
    data: [
      { label: 'Bills', value: 38 },
      { label: 'Food', value: 27 },
      { label: 'Shopping', value: 20 },
      { label: 'Other', value: 15 },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Spend-by-category ring with centred total and legend. Values are percentages ' +
          '(≤ 100 combined); the default palette is brand / periwinkle / lime / neutral.',
      },
    },
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoLegend: Story = { args: { showLegend: false } };

export const CustomColors: Story = {
  args: {
    total: '₦86K',
    caption: 'this month',
    data: [
      { label: 'Transfers', value: 52, color: 'var(--mav-main-primary)' },
      { label: 'Airtime', value: 30, color: 'var(--mav-system-warning)' },
      { label: 'Fees', value: 18, color: 'var(--mav-system-danger)' },
    ],
  },
};
