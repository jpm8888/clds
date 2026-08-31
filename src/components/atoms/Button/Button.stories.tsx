import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Button', variant: 'primary', size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'MaV action button (Figma set 52:24315). One `primary` per screen; ' +
          '`xl` is the full-width dock CTA. Brand flips blue→lime in dark mode automatically.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Clear: Story = { args: { variant: 'clear', children: 'Text button' } };

export const Swipe: Story = { args: { variant: 'swipe', children: 'Swipe up to pay' } };

export const WithIcons: Story = {
  args: { leadingIcon: 'plus', children: 'Add account' },
};

export const IconOnly: Story = {
  args: { iconOnly: true, leadingIcon: 'bell', 'aria-label': 'Notifications', children: undefined },
};

export const Loading: Story = { args: { loading: true, children: 'Processing…' } };

export const FullWidthDock: Story = {
  name: 'XL (dock CTA)',
  args: { size: 'xl', children: 'Confirm payment' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args} size="xs">
        XS
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args}>Default</Button>
      <Button {...args} className="is-focus">
        Focus
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
    </div>
  ),
};
