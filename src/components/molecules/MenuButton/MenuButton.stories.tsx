import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuButton } from './MenuButton';

const meta = {
  title: 'Molecules/MenuButton',
  component: MenuButton,
  args: { icon: 'send', label: 'Send', variant: 'secondary', size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'Circular quick-action button with a label below — the home-screen ' +
          '"Send / Pay / Top-up" row. `primary` is the deep-navy accent circle.',
      },
    },
  },
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const QuickActionsRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20 }}>
      <MenuButton icon="send" label="Send" variant="primary" />
      <MenuButton icon="qr-code" label="Scan" />
      <MenuButton icon="wallet" label="Top-up" />
      <MenuButton icon="receipt" label="Bills" variant="tertiary" />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 20 }}>
      <MenuButton {...args} variant="primary" label="Primary" />
      <MenuButton {...args} variant="secondary" label="Secondary" />
      <MenuButton {...args} variant="tertiary" label="Tertiary" />
    </div>
  ),
};

export const Small: Story = {
  args: { size: 'sm', label: undefined, 'aria-label': 'Send money' },
};
