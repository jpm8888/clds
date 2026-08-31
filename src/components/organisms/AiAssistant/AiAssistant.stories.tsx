import type { Meta, StoryObj } from '@storybook/react-vite';
import { AiAssistant } from './AiAssistant';

const meta = {
  title: 'Organisms/AiAssistant',
  component: AiAssistant,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
          maxWidth: '100%',
          minHeight: 620,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 36,
          overflow: 'hidden',
          border: '1px solid var(--mav-border-subtle)',
          background: 'var(--mav-bg-default)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A conversational layer over payment history. Every answer resolves to an object the customer can act on — a payable bill, a figure, a chart — because an assistant that only produces sentences is worse than the screen it replaced. Read-only: it never moves money on its own.',
      },
    },
  },
} satisfies Meta<typeof AiAssistant>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three real questions: payable rows with a total, one figure, a trend. */
export const AnswersAreObjects: Story = {};

/** Before the first question — suggestions seed the conversation. */
export const Empty: Story = { args: { messages: [] } };
