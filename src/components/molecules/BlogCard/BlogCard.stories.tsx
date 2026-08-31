import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogCard, BlogListRow } from './BlogCard';
import hero from '../../../assets/illustrations/il-139.svg';

const meta = {
  title: 'Molecules/BlogCard',
  component: BlogCard,
  args: {
    badge: 'Course',
    date: 'Aug 12 ・',
    title: 'How compounding grows your savings faster than you think',
    image: hero,
  },
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
          'Insights content card (Figma 139:2095) on the tinted brand surface — text stays ' +
          'dark in both themes. Also exports BlogListRow, the 335×120 horizontal variant. ' +
          'Toggle `read` to desaturate.',
      },
    },
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Read: Story = { args: { read: true } };

export const ListRow: Story = {
  render: () => (
    <BlogListRow title="What is a money market fund?" meta="4 min read • MyWallSt" image={hero} />
  ),
};

export const ToggleOnClick: Story = {
  render: (args) => {
    const [read, setRead] = useState(false);
    return <BlogCard {...args} read={read} onClick={() => setRead((r) => !r)} />;
  },
};
