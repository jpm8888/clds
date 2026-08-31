import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatBubble, ChatThread } from './ChatBubble';

const meta = {
  title: 'Molecules/ChatBubble',
  component: ChatBubble,
  parameters: {
    docs: {
      description: {
        component:
          'Message bubbles for support/P2P chat. Incoming = grey + avatar/name, outgoing = ' +
          'tinted primary (solid blue in dark) with ✓✓ delivery. Wrap a run of bubbles in ' +
          '`<ChatThread>`; reactions and quoted replies are props.',
      },
    },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

const LOREM =
  'Lorem ipsum dolor sit amet consectetur. Sollicitudin tempor donec interdum lobortis gravida.';

export const Thread: Story = {
  args: { children: 'Short Text' },
  render: () => (
    <ChatThread>
      <ChatBubble side="in" avatar="A" name="Allison Allan" time="09:24" short>
        Short Text
      </ChatBubble>
      <ChatBubble side="out" time="09:24" delivered short>
        Short Text
      </ChatBubble>
      <ChatBubble side="in" avatar="A" name="Allison Allan" time="09:26">
        {LOREM}
      </ChatBubble>
      <ChatBubble side="out" time="09:27" delivered>
        {LOREM}
      </ChatBubble>
    </ChatThread>
  ),
};

export const ReactionsAndReplies: Story = {
  args: { children: 'Short Text' },
  render: () => (
    <ChatThread>
      <ChatBubble side="in" time="09:24" short reaction="❤️">
        Short Text
      </ChatBubble>
      <ChatBubble
        side="out"
        time="09:24"
        delivered
        short
        reaction={
          <>
            👍 <span className="n">2</span>
          </>
        }
      >
        Short Text
      </ChatBubble>
      <ChatBubble side="in" time="09:25" short reply={{ who: 'You', text: 'Short text' }}>
        Short Text
      </ChatBubble>
      <ChatBubble
        side="out"
        time="09:26"
        delivered
        reply={{ who: 'Display Name', text: 'Longer text & leave no space at all…' }}
      >
        {LOREM}
      </ChatBubble>
    </ChatThread>
  ),
};

export const Incoming: Story = {
  args: { side: 'in', avatar: 'A', name: 'Allison Allan', time: '09:24', children: LOREM },
};

export const Outgoing: Story = {
  args: { side: 'out', time: '09:25', delivered: true, children: LOREM },
};
