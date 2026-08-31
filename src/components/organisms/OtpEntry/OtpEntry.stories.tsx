import type { Meta, StoryObj } from '@storybook/react-vite';
import { OtpEntry } from './OtpEntry';

const meta = {
  title: 'Organisms/OtpEntry',
  component: OtpEntry,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    description: (
      <>
        Please enter the one time PIN (OTP) that was sent to <b>+1&nbsp;223&nbsp;242&nbsp;321</b>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        component:
          'OTP verification screen. Slots auto-advance (backspace moves back, paste fills), ' +
          'the countdown gates Resend, and Verify enables once the code is complete. ' +
          'Focus ring and Verify flip to lime in dark mode.',
      },
    },
  },
} satisfies Meta<typeof OtpEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Box: Story = {};

export const Boxless: Story = {
  args: { variant: 'boxless', description: 'Boxless variant — underline slots.' },
};

export const ErrorState: Story = {
  args: { error: 'Incorrect code, try again' },
};

export const FourDigits: Story = {
  args: { length: 4, resendSeconds: 10 },
};
