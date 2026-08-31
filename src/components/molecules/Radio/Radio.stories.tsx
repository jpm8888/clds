import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Molecules/Radio',
  component: Radio,
  args: { label: 'Everyday checking', name: 'demo' },
  parameters: {
    docs: {
      description: {
        component:
          'Native radio under a token-styled 20px ring. Group options with a shared `name`.',
      },
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Radio name="acct" value="checking" label="Everyday checking · $2,304.50" defaultChecked />
      <Radio name="acct" value="savings" label="High-yield savings · $12,000.00" />
      <Radio name="acct" value="credit" label="Platinum credit · $840.20" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Radio name="s1" label="Default" />
      <Radio name="s2" label="Selected" defaultChecked />
      <Radio name="s3" label="Disabled" disabled />
      <Radio name="s4" label="Disabled + selected" disabled defaultChecked />
    </div>
  ),
};
