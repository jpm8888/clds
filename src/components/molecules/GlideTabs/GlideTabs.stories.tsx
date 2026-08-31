import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlideTabs } from './GlideTabs';

const meta = {
  title: 'Molecules/GlideTabs',
  component: GlideTabs,
  args: { items: ['Income', 'Spending', 'Transfers'] },
  parameters: {
    docs: {
      description: {
        component:
          'Underline tabs with a gliding ink bar that slides between tabs. Lighter than `Tabs` — ' +
          'labels only. Use inside cards for section switches. The glide animation is disabled ' +
          'under `prefers-reduced-motion`.',
      },
    },
  },
} satisfies Meta<typeof GlideTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoSections: Story = { args: { items: ['This month', 'Last month'] } };

export const Preselected: Story = { args: { defaultValue: 'Spending' } };
