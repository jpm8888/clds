import type { Meta, StoryObj } from '@storybook/react-vite';
import { BillReminders, BillReminderSetup } from './BillReminders';

const meta = {
  title: 'Organisms/BillReminders',
  component: BillReminders,
  decorators: [
    (Story) => (
      <div style={{ width: 343, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'What’s due, when, and how much — with payment one tap from the reminder itself. Sorted by urgency; "due soon" uses the brand rather than warning-orange so it survives the warm Bayad palette. The bell mutes a single biller.',
      },
    },
  },
} satisfies Meta<typeof BillReminders>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyReminders: Story = {};

/** Lead time as chips, channels as switches, autopay as the standing-instruction escape hatch. */
export const Setup: StoryObj = {
  render: () => (
    <div style={{ width: 343, maxWidth: '100%' }}>
      <BillReminderSetup />
    </div>
  ),
};
