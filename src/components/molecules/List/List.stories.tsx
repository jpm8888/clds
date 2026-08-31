import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  List,
  ListRow,
  ListSoftIcon,
  ListAvatar,
  ListStore,
  ListButton,
  ListTag,
  ListCheck,
} from './List';

const meta = {
  title: 'Molecules/List',
  component: List,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Flexible row list (Figma 125:4920): leading media (soft icon chip / avatar / ' +
          'store tile), name + subtitle, trailing accessory (check / button / tag). ' +
          'Rows divide with a 1px subtle rule.',
      },
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Payees: Story = {
  render: () => (
    <List>
      <ListRow
        name="Amara Cruz"
        subtitle="Last sent 2 days ago"
        leading={<ListAvatar initials="AC" background="#6a35ff" />}
        trailing={<ListCheck />}
      />
      <ListRow
        name="Inara Reyes"
        subtitle="BPI ····8110"
        leading={<ListAvatar initials="IR" background="#ff426f" />}
        trailing={<ListButton>Send</ListButton>}
      />
      <ListRow
        name="Mega Santos"
        subtitle="GCash"
        leading={<ListAvatar initials="MS" background="#1e8057" />}
        trailing={<ListTag>New</ListTag>}
      />
    </List>
  ),
};

export const Bills: Story = {
  render: () => (
    <List>
      <ListRow
        name="Electricity"
        subtitle="Due in 3 days"
        leading={<ListSoftIcon icon="card" />}
        trailing={<ListTag>₱1,240</ListTag>}
      />
      <ListRow
        name="Internet"
        subtitle="Autopay on"
        leading={<ListSoftIcon icon="wallet" />}
        trailing={<ListCheck />}
      />
      <ListRow
        name="Streaming"
        subtitle="Netflix · monthly"
        leading={<ListStore label="NFX" background="#e50914" />}
        trailing={<ListButton>Pay</ListButton>}
      />
    </List>
  ),
};
