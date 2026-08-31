import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AmountInput } from './AmountInput';

const meta = {
  title: 'Molecules/AmountInput',
  component: AmountInput,
  args: { label: 'Amount of Money', defaultValue: 150, step: 50 },
  parameters: {
    docs: {
      description: {
        component:
          '"Enter amount" control for send/top-up flows: big centered figure, round ' +
          '− / + steppers, optional preset chips. Clamps to `min`/`max`.',
      },
    },
  },
} satisfies Meta<typeof AmountInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPresets: Story = {
  args: { presets: [50, 100, 150, 200, 250, 300, 350, 400, 450] },
};

export const ErrorState: Story = {
  name: 'Error (over balance)',
  args: { defaultValue: 5000, error: true },
};

export const Controlled: Story = {
  render: (args) => {
    const [amount, setAmount] = useState(150);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AmountInput {...args} value={amount} onChange={setAmount} presets={[100, 150, 200]} />
        <span style={{ fontSize: 12, color: 'var(--mav-text-description)' }}>state: {amount}</span>
      </div>
    );
  },
};
