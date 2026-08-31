import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta = {
  title: 'Molecules/Toggle',
  component: Toggle,
  args: { label: 'Face ID login' },
  parameters: {
    docs: {
      description: {
        component:
          'Switch (`role="switch"`), 44×24 pill. Active track flips blue→lime in dark. ' +
          'Controlled via `checked` + `onChange`, or uncontrolled via `defaultChecked`.',
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const On: Story = { args: { defaultChecked: true } };

export const TextLeft: Story = { args: { textLeft: true, label: 'Push notifications' } };

export const Controlled: Story = {
  render: (args) => {
    const [on, setOn] = useState(true);
    return <Toggle {...args} checked={on} onChange={setOn} label={on ? 'Enabled' : 'Disabled'} />;
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Toggle label="Off" />
      <Toggle label="On" defaultChecked />
      <Toggle label="Disabled off" disabled />
      <Toggle label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
