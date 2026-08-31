import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  args: { variant: 'primary', children: 'Your statement for August is ready.' },
  parameters: {
    docs: {
      description: {
        component:
          'Inline tinted message strip for in-content feedback (Figma 52:28340). ' +
          'Icon + title carry the variant colour; body copy stays neutral. ' +
          'Use Toast for transient overlay feedback.',
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithTitle: Story = {
  args: {
    variant: 'warning',
    title: 'Spending limit almost reached',
    children: 'You have used 90% of your monthly limit.',
  },
};

export const WithActions: Story = {
  args: {
    variant: 'success',
    children: 'Payment sent to Amara.',
    actions: [{ label: 'View receipt' }, { label: 'Dismiss' }],
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Alert variant="primary">Your statement for August is ready.</Alert>
      <Alert variant="success">Transfer completed successfully.</Alert>
      <Alert variant="warning">Card expires next month.</Alert>
      <Alert variant="danger">Payment failed — insufficient funds.</Alert>
    </div>
  ),
};
