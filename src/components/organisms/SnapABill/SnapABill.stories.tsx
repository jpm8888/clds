import type { Meta, StoryObj } from '@storybook/react-vite';
import { SnapABillCapture, SnapABillReview } from './SnapABill';

const meta = {
  title: 'Organisms/SnapABill',
  component: SnapABillCapture,
  decorators: [
    (Story) => (
      <div style={{ width: 343, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Photograph a paper bill; the biller, account number, amount and due date are read off it and confirmed. Bypasses biller integration entirely — for the long tail of billers that were never wired up, the paper is the interface. The viewfinder is image content (deliberately not tokenised); the scan line and hint pick up the brand.',
      },
    },
  },
} satisfies Meta<typeof SnapABillCapture>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Corner brackets guide alignment; the shutter starts the read. */
export const Capture: Story = {};

/** The brand scan line sweeps while the bill is being read. */
export const Scanning: Story = { args: { scanning: true } };

/** Every field correctable; the low-confidence one surfaced for confirmation. */
export const Review: StoryObj = {
  render: () => (
    <div style={{ width: 343, maxWidth: '100%' }}>
      <SnapABillReview />
    </div>
  ),
};
