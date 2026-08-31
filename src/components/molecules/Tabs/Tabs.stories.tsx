import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  args: { items: ['Accounts', 'Cards', 'Savings'], defaultValue: 'Accounts' },
  parameters: {
    docs: {
      description: {
        component:
          'MaV 48px underline tab bar. Controlled via `value`+`onChange` or uncontrolled via ' +
          '`defaultValue`. The active indicator uses `--mav-tabs-active` (blue → lime in dark). ' +
          'Render panel content yourself, keyed by the selected id.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoTabs: Story = { args: { items: ['Overview', 'History'] } };

export const WithIconsAndDot: Story = {
  args: {
    items: [
      { id: 'inbox', label: 'Inbox', icon: 'mail', dot: true },
      { id: 'sent', label: 'Sent', icon: 'send' },
      { id: 'archived', label: 'Archived', disabled: true },
    ],
    defaultValue: 'inbox',
  },
};

export const Scrollable: Story = {
  args: {
    scroll: true,
    items: ['All', 'Transfers', 'Payments', 'Deposits', 'Withdrawals', 'Refunds'],
    defaultValue: 'All',
  },
};

export const Skeleton: Story = { args: { skeleton: true } };
