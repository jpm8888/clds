import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          '1px separating rule. Color flips automatically in dark mode. ' +
          'Use `label` for "or continue with" style separators on auth screens.',
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <p>Above the rule</p>
      <Divider {...args} />
      <p>Below the rule</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 48 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const Labelled: Story = {
  args: { label: 'or continue with' },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Divider {...args} />
    </div>
  ),
};
