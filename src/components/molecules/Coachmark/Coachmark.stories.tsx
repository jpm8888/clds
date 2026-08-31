import type { Meta, StoryObj } from '@storybook/react-vite';
import { Coachmark } from './Coachmark';

const meta = {
  title: 'Molecules/Coachmark',
  component: Coachmark,
  args: {
    title: 'Scan to pay',
    description: 'Point your camera at any QR code',
    step: 2,
    total: 5,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#141414',
          borderRadius: 12,
          padding: '20px 16px',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 180,
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Onboarding tour tip with a dashed pointer. White text — always render over a dark ' +
          'scrim (`var(--mav-blanket)`), positioned near the highlighted target. `top*` ' +
          'placements point up at a target above the tip.',
      },
    },
  },
} satisfies Meta<typeof Coachmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};

export const TopLeft: Story = { args: { placement: 'top-left' } };

export const Bottom: Story = { args: { placement: 'bottom' } };

export const BottomRight: Story = { args: { placement: 'bottom-right' } };
