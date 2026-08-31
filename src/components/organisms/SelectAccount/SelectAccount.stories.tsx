import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectAccount } from './SelectAccount';

const meta = {
  title: 'Organisms/SelectAccount',
  component: SelectAccount,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, minHeight: 640, display: 'flex', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Full "select source of funds" screen: featured account tile, radio-selectable account list with locked rows, bottom CTA dock. Controlled via value/onChange or uncontrolled via defaultValue.',
      },
    },
  },
  args: {
    featuredBalance: '₱ 10,000.00',
    accounts: [
      { id: 'mrk', name: 'Mr. K', balance: '₱ 10,000.00' },
      { id: 'everyday', name: 'Everyday Pot', balance: '₱ 4,250.00' },
      { id: 'holiday', name: 'Holiday Fund', balance: '₱ 82,000.00' },
      {
        id: 'locked',
        name: 'Locked Pot',
        balance: '₱ 10,000.00',
        disabled: true,
        message: 'Locked until 12 Aug',
      },
      {
        id: 'fixed',
        name: 'Fixed Deposit',
        balance: '₱ 250,000.00',
        disabled: true,
        message: 'Not available for transfer',
      },
    ],
    defaultValue: 'mrk',
  },
} satisfies Meta<typeof SelectAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoSelection: Story = { args: { defaultValue: undefined } };

export const WithBack: Story = { args: { onBack: () => {} } };
