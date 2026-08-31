import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Molecules/Checkbox',
  component: Checkbox,
  args: { label: 'Save this payee' },
  parameters: {
    docs: {
      description: {
        component:
          'Native-input checkbox with token-styled box. Works controlled ' +
          '(`checked` + `onChange`) or uncontrolled (`defaultChecked`); ' +
          '`indeterminate` renders the mixed state.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all transactions' },
};

export const TextLeft: Story = { args: { textLeft: true, label: 'Enable notifications' } };

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Checkbox {...args} label="Default" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
};
