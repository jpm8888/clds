import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  args: { children: 'Badge', color: 'primary', type: 'filled', size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'Static label for statuses, counts and tags. `red`/`green`/`orange` map to the ' +
          'danger/success/warning tokens. Not interactive — use Chip for dismissible tags.',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithDot: Story = { args: { color: 'green', dot: true, children: 'Completed' } };

export const WithIcon: Story = {
  args: { color: 'orange', icon: 'alert-triangle', children: 'Pending' },
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge {...args} color="primary">
        Primary
      </Badge>
      <Badge {...args} color="red">
        Overdue
      </Badge>
      <Badge {...args} color="green">
        Paid
      </Badge>
      <Badge {...args} color="orange">
        Pending
      </Badge>
    </div>
  ),
};

export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge {...args} type="filled">
        Filled
      </Badge>
      <Badge {...args} type="outline">
        Outline
      </Badge>
      <Badge {...args} type="clear">
        Clear
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="xs">
        XSmall
      </Badge>
    </div>
  ),
};
