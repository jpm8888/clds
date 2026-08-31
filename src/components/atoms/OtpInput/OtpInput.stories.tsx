import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OtpInput } from './OtpInput';

const meta = {
  title: 'Atoms/OtpInput',
  component: OtpInput,
  args: { length: 6 },
  parameters: {
    docs: {
      description: {
        component:
          'One-time-passcode entry with auto-advance, backspace navigation and paste ' +
          'support. `onComplete` fires when the last digit lands — call your verify ' +
          'endpoint there. Boxed (default) and boxless (underline) variants.',
      },
    },
  },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FourDigits: Story = { args: { length: 4 } };

export const Boxless: Story = { args: { variant: 'boxless', defaultValue: '12' } };

export const ErrorState: Story = {
  name: 'Error',
  args: { defaultValue: '482913', errorMessage: 'Incorrect code — 2 attempts left' },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: '48' } };

export const Controlled: Story = {
  render: (args) => {
    const [code, setCode] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <OtpInput {...args} value={code} onChange={setCode} />
        <span style={{ font: '12px var(--mav-font-mono)', color: 'var(--mav-text-description)' }}>
          value: “{code}”
        </span>
      </div>
    );
  },
};
