import type { Meta, StoryObj } from '@storybook/react-vite';
import { AmountSlider } from './AmountSlider';

const meta = {
  title: 'Organisms/AmountSlider',
  component: AmountSlider,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Loan amount',
    min: 0,
    max: 5000,
    step: 100,
    defaultValue: 3100,
    format: (v: number) => `$${v.toLocaleString()}`,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Range slider for money values (loan amount, transfer limit, budget). ' +
          'Native <input type="range"> underneath — keyboard accessible. ' +
          'Controlled via `value`/`onChange` or uncontrolled via `defaultValue`.',
      },
    },
  },
} satisfies Meta<typeof AmountSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Percent: Story = {
  args: {
    label: 'Savings rate',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 40,
    format: (v: number) => `${v}%`,
  },
};
