import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppBar } from './AppBar';

const meta = {
  title: 'Organisms/AppBar',
  component: AppBar,
  args: { title: 'Transfer' },
  decorators: [
    (Story) => (
      <div style={{ width: 390, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Mobile top navigation bar: iOS status bar + 56px row with back, centered title, and ' +
          'trailing actions (`close`, `more`, a text label, or any node). One per screen. ' +
          'Use `inverted` for a permanently dark bar with lime accent.',
      },
    },
  },
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: { title: 'Card details', actions: ['Edit', 'more'] },
};

export const CloseOnly: Story = {
  args: { title: 'Scan to pay', back: false, actions: ['close'] },
};

export const Inverted: Story = { args: { inverted: true, actions: ['more'] } };

export const BorderedNoStatusBar: Story = {
  args: { bordered: true, statusBar: false, title: 'Settings' },
};
