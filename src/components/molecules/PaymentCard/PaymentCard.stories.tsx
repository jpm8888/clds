import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaymentCard, paymentCardSkins } from './PaymentCard';

const meta = {
  title: 'Molecules/PaymentCard',
  component: PaymentCard,
  args: {
    number: '4485 1174 9027 8110',
    holder: 'Amara Cruz',
    expiry: '09/27',
    skin: 'skin-1',
  },
  argTypes: {
    skin: { control: 'select', options: Object.keys(paymentCardSkins) },
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
          'Card face with a swappable skin and a legibility scrim. Does not re-theme ' +
          '(physical-card visual). Use masked sample data only. Full 16-skin set lives ' +
          'in the source repo; pass any image URL as `skin`.',
      },
    },
  },
} satisfies Meta<typeof PaymentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skins: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(Object.keys(paymentCardSkins) as Array<keyof typeof paymentCardSkins>).map((s) => (
        <PaymentCard key={s} {...args} skin={s} />
      ))}
    </div>
  ),
};

export const MaskedNumber: Story = {
  args: { number: '•••• •••• •••• 8110' },
};
