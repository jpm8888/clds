import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageInput } from './MessageInput';

const meta = {
  title: 'Molecules/MessageInput',
  component: MessageInput,
  parameters: {
    docs: {
      description: {
        component:
          'Message composer with attach/emoji/mention tools and a send button that lights up ' +
          'once there is content. `onSend` fires with the trimmed text and clears the field ' +
          '(uncontrolled mode).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  args: { defaultValue: 'On my way — sending the payment now.' },
};

export const ErrorState: Story = {
  name: 'Error',
  args: { error: true, defaultValue: 'Message failed to send' },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Chat unavailable' },
};
