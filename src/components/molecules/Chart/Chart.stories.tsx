import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from './Chart';

/* The source page's fixture data (Sun–Thu). */
const EXPENSES = [
  { label: 'Sun', value: 57.89 },
  { label: 'Mon', value: 26.01 },
  { label: 'Tue', value: 45.9 },
  { label: 'Wed', value: 37.0 },
  { label: 'Thu', value: 20.67 },
];
const EARNINGS = [
  { label: 'Sun', value: 20.67 },
  { label: 'Mon', value: 37.0 },
  { label: 'Tue', value: 45.9 },
  { label: 'Wed', value: 26.01 },
  { label: 'Thu', value: 57.89 },
];
const FLAT = EXPENSES.map((d) => ({ label: d.label, value: 20.67 }));

const meta = {
  title: 'Molecules/Chart',
  component: Chart,
  args: { data: EARNINGS, variant: 'gain', title: 'Transaction', dropdownLabel: 'Earnings' },
  parameters: {
    docs: {
      description: {
        component:
          'Dependency-free SVG line chart. Pass `data` as `{label, value}[]`; `variant` maps to ' +
          'the `--mav-chart-*` tokens (gain green · loss red · warning orange · brand → lime in dark). ' +
          'The spline draws itself in on reveal.',
      },
    },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Earnings: Story = {};

export const Expenses: Story = {
  args: { data: EXPENSES, variant: 'loss', dropdownLabel: 'Expenses' },
};

export const Flat: Story = {
  args: { data: FLAT, variant: 'brand', dropdownLabel: 'Earnings' },
};

export const Empty: Story = {
  args: { data: [], variant: 'brand', dropdownLabel: 'Earnings' },
};
