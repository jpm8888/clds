import type { Meta, StoryObj } from '@storybook/react-vite';
import { Splash } from './Splash';

const meta = {
  title: 'Organisms/Splash',
  component: Splash,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 288,
          height: 610,
          borderRadius: 34,
          overflow: 'hidden',
          border: '1px solid var(--mav-border-subtle)',
          boxShadow: 'var(--mav-shadow-lg)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: { footer: '© 2026 Fyscal Technologies. All rights reserved.' },
  parameters: {
    docs: {
      description: {
        component:
          'App launch screen with the bundled background art (light squares / brand gradient / beam). Decorative — navigate away after boot.',
      },
    },
  },
} satisfies Meta<typeof Splash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = { args: { variant: 'brand' } };
export const Light: Story = { args: { variant: 'light' } };
export const Beam: Story = { args: { variant: 'beam' } };
