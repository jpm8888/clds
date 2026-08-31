import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination, type PaginationProps } from './Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  args: { type: 'group', pages: 5, page: 2 },
  parameters: {
    docs: {
      description: {
        component:
          'Controlled pagination (Figma 203:3134) — pass `page` (1-based) + `onPageChange`. ' +
          'The active indicator glides between numbers and re-themes blue → lime. ' +
          'Use `dots` for onboarding steps and carousels.',
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(props: Omit<PaginationProps, 'page'> & { page?: number }) {
  const [page, setPage] = useState(props.page ?? 1);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
}

export const Group: Story = { render: (args) => <Controlled {...args} /> };

export const Clear: Story = {
  args: { type: 'clear' },
  render: (args) => <Controlled {...args} />,
};

export const WithGap: Story = {
  args: { pages: [1, 2, 3, '…', 8] },
  render: (args) => <Controlled {...args} />,
};

export const Count: Story = {
  args: { type: 'count', pages: 8, page: 3 },
  render: (args) => <Controlled {...args} />,
};

export const Dots: Story = {
  args: { type: 'dots', pages: 4, page: 1 },
  render: (args) => <Controlled {...args} />,
};
