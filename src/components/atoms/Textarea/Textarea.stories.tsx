import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  args: { placeholder: 'Write a message…' },
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line input, 8px radius, resizable vertically. Same token-driven ' +
          'states as TextField (`--mav-input-*`).',
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  name: 'Error',
  args: { defaultValue: 'This note is way too long…', errorMessage: 'Maximum 200 characters' },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <Textarea {...args} placeholder="Default" />
      <Textarea {...args} state="focus" placeholder="Focus" />
      <Textarea {...args} state="error" defaultValue="Bad value" />
      <Textarea {...args} disabled placeholder="Disabled" />
    </div>
  ),
};
