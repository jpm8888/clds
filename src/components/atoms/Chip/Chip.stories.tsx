import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  args: { children: 'Chip', color: 'primary', type: 'filled', size: 'md', showClose: true },
  parameters: {
    docs: {
      description: {
        component:
          'Compact dismissible tag for filters and selections. Renders a <button>; ' +
          'pass `onClose` to handle dismissal. For static labels use Badge.',
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const NoClose: Story = {
  args: { color: 'grey', showClose: false, children: '+63 917 •••• 210' },
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip {...args} color="primary">
        Primary
      </Chip>
      <Chip {...args} color="red">
        Red
      </Chip>
      <Chip {...args} color="green">
        Green
      </Chip>
      <Chip {...args} color="orange">
        Orange
      </Chip>
      <Chip {...args} color="grey">
        Grey
      </Chip>
      <Chip {...args} color="white">
        White
      </Chip>
    </div>
  ),
};

export const Outline: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip {...args} type="outline" color="primary">
        Primary
      </Chip>
      <Chip {...args} type="outline" color="red">
        Red
      </Chip>
      <Chip {...args} type="outline" color="green">
        Green
      </Chip>
      <Chip {...args} type="outline" color="orange">
        Orange
      </Chip>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip {...args} size="md">
        Medium
      </Chip>
      <Chip {...args} size="sm">
        Small
      </Chip>
      <Chip {...args} size="xs">
        XSmall
      </Chip>
    </div>
  ),
};
