import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwipeButton } from './SwipeButton';

const meta = {
  title: 'Molecules/SwipeButton',
  component: SwipeButton,
  args: { label: 'Swipe to pay' },
  parameters: {
    docs: {
      description: {
        component:
          'Swipe-to-confirm for irreversible actions (send money, confirm payment). Drag ' +
          'the thumb to the end to fire `onConfirm`; it snaps back if released early. ' +
          'Enter/Space on the focused thumb confirms for keyboard users.',
      },
    },
  },
} satisfies Meta<typeof SwipeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gradient: Story = {
  args: { confirmedLabel: 'Payment sent ✓' },
};

export const Pill: Story = {
  args: { pill: true, confirmedLabel: 'Confirmed' },
};

export const Card: Story = {
  args: { variant: 'card', label: 'Swipe to confirm' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
