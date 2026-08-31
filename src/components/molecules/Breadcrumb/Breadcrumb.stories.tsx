import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  args: {
    crumbs: ['Home', 'Accounts', 'Savings'],
    title: 'Savings account',
    actions: [
      { icon: 'search', label: 'Search' },
      { icon: 'info', label: 'Help' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Breadcrumb trail + page title with trailing icon actions. Desktop/tablet header — ' +
          'phone screens use `AppBar` instead. The last crumb is the current page.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TrailOnly: Story = {
  args: { crumbs: ['Home', 'Settings', 'Security'], title: undefined, actions: [] },
};

export const NoActions: Story = {
  args: { actions: [] },
};
