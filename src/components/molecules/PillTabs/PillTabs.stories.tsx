import type { Meta, StoryObj } from '@storybook/react-vite';
import { PillTabs } from './PillTabs';

const meta = {
  title: 'Molecules/PillTabs',
  component: PillTabs,
  args: { items: ['1W', '1M', '3M', '1Y'], defaultValue: '1M' },
  parameters: {
    docs: {
      description: {
        component:
          'Segmented pill tabs with a gliding highlight. Best for compact 2–4 way switches ' +
          'such as chart ranges or filter modes. Glide animation respects `prefers-reduced-motion`.',
      },
    },
  },
} satisfies Meta<typeof PillTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoOptions: Story = {
  args: { items: ['Personal', 'Business'], defaultValue: 'Personal' },
};
