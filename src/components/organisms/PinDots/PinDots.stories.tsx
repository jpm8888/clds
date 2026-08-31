import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinDots } from './PinDots';

const meta = {
  title: 'Organisms/PinDots',
  component: PinDots,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: { filled: 3 },
  parameters: {
    docs: {
      description: {
        component:
          'PIN-entry dots (controlled — keep the PIN string in the parent). ' +
          'Pass `onKey` to render the paired 3×4 number pad.',
      },
    },
  },
} satisfies Meta<typeof PinDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeOfSix: Story = {};

export const Empty: Story = { args: { filled: 0 } };

export const WithKeypad: Story = {
  render: function WithKeypad(args) {
    const [pin, setPin] = useState('12');
    return (
      <PinDots
        {...args}
        filled={pin.length}
        onKey={(k) => setPin(k === '⌫' ? pin.slice(0, -1) : (pin + k).slice(0, 6))}
      />
    );
  },
};
