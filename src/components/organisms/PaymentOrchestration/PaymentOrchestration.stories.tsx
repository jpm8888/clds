import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrchestrationTrace, PaymentOrchestration } from './PaymentOrchestration';

const meta = {
  title: 'Organisms/PaymentOrchestration',
  component: PaymentOrchestration,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Which rail a payment takes, why, and what happens when a rail degrades. Rail health first, then the ordered rules acting on it (live hit counts, paused rules stay visible and dimmed), then the phased rollout as a share of traffic. Desktop ops surface — the canvas scrolls sideways at narrow widths.',
      },
    },
  },
} satisfies Meta<typeof PaymentOrchestration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RoutingLive: Story = {};

/** Every rule evaluated — not just the match — plus the failover and its cost. */
export const PaymentTrace: StoryObj = {
  render: () => <OrchestrationTrace />,
};
