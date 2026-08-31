import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  args: {
    title: 'No results',
    subtitle: 'Try a different name or account number.',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Centred empty/status state for search results, contact panels, and empty lists. Use media="loader" as an inline loading state.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithIcon: Story = { args: { media: 'icon', icon: 'search' } };
export const WithIllustration: Story = {
  args: {
    media: 'illustration',
    title: 'Nothing here yet',
    subtitle: 'Your transactions will appear here.',
  },
};
export const Loading: Story = {
  args: { media: 'loader', title: 'Fetching transactions…', subtitle: undefined },
};
