import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Atoms/TextField',
  component: TextField,
  args: { placeholder: 'Placeholder' },
  parameters: {
    docs: {
      description: {
        component:
          'Single-line input (`--mav-input-*` tokens). Works controlled or uncontrolled; ' +
          'focus ring and error state re-theme automatically in dark mode. ' +
          'Use `label`/`description` for the standard form row, `errorMessage` for validation.',
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    description: 'We never share your email.',
    placeholder: 'you@bank.com',
    type: 'email',
  },
};

export const WithLabelAction: Story = {
  args: {
    label: 'Password',
    labelAction: (
      <button type="button" className="lbl-btn">
        Forgot?
      </button>
    ),
    type: 'password',
    placeholder: '••••••••',
  },
};

export const WithPrefix: Story = {
  args: { prefix: 'https://', placeholder: 'yourbank.com' },
};

export const WithIcons: Story = {
  args: { leadingIcon: 'mail', trailingIcon: 'eye', placeholder: 'you@bank.com' },
};

export const ErrorState: Story = {
  name: 'Error',
  args: { defaultValue: '$1,500.00', errorMessage: 'Insufficient balance' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380 }}>
      <TextField {...args} size="sm" placeholder="Small" />
      <TextField {...args} size="md" placeholder="Medium (default)" />
      <TextField {...args} size="lg" placeholder="Large" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380 }}>
      <TextField {...args} placeholder="Default" />
      <TextField {...args} state="filled" defaultValue="Filled value" />
      <TextField {...args} state="focus" placeholder="Focus" />
      <TextField {...args} state="error" defaultValue="Bad value" />
      <TextField {...args} disabled placeholder="Disabled" />
    </div>
  ),
};
