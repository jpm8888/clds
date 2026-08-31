import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomNav } from './BottomNav';

const meta = {
  title: 'Organisms/BottomNav',
  component: BottomNav,
  decorators: [
    (Story) => (
      <div style={{ width: 390, maxWidth: '100%', paddingTop: 32 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'App-level bottom tab bar with a gliding top indicator. Place once per app frame. ' +
          'Enable `scan` for the floating QR-pay button (a spacer keeps items clear of it). ' +
          'Active accent flips blue → lime in dark automatically.',
      },
    },
  },
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithScan: Story = { args: { scan: true } };

export const WithDotAndCustomItems: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'history', label: 'History', icon: 'clock', dot: true },
      { id: 'search', label: 'Search', icon: 'search' },
      { id: 'profile', label: 'Profile', icon: 'user' },
    ],
    defaultValue: 'history',
  },
};
