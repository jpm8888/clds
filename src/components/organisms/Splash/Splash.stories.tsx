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
  args: { footer: '© 2026 CIS Bayad Center, Inc. All rights reserved.' },
  parameters: {
    docs: {
      description: {
        component:
          'Bayad launch screen — the real lockup with dispersing rings and a determinate progress rail, on a white, brand-gradient, or deep ground. Decorative — navigate away after boot.',
      },
    },
  },
} satisfies Meta<typeof Splash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gradient: Story = { args: { variant: 'gradient' } };
export const Light: Story = { args: { variant: 'light' } };
export const Deep: Story = { args: { variant: 'deep' } };
