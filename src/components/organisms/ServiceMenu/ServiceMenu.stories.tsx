import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceMenu, serviceMenuBillCategories, serviceMenuHomeItems } from './ServiceMenu';

const meta = {
  title: 'Organisms/ServiceMenu',
  component: ServiceMenu,
  decorators: [
    (Story) => (
      <div style={{ width: 347, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The home services grid and the bill-category grid behind Pay Bills. One geometric line set in a translucent brand tint — the chip composites over any surface and needs no dark-mode value; one tile is emphasised for the primary action.',
      },
    },
  },
} satisfies Meta<typeof ServiceMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeServices: Story = { args: { items: serviceMenuHomeItems } };

export const BillCategories: Story = { args: { items: serviceMenuBillCategories } };

export const WithBadge: Story = {
  args: {
    items: serviceMenuHomeItems.map((it) =>
      it.id === 'pay-bills' ? { ...it, badge: 3 } : it,
    ),
  },
};
