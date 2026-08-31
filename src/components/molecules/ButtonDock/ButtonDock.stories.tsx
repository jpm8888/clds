import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonDock } from './ButtonDock';

const meta = {
  title: 'Molecules/ButtonDock',
  component: ButtonDock,
  args: { primary: 'Confirm payment' },
  parameters: {
    docs: {
      description: {
        component:
          'Sticky bottom footer for the main mobile CTA — rounded 32px top, elevation shadow, ' +
          'safe-area padding. Use `fixed` to pin to the viewport bottom in a real app; keep exactly ' +
          'one primary action per dock.',
      },
    },
  },
} satisfies Meta<typeof ButtonDock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSecondary: Story = {
  args: { primary: 'Continue', secondary: 'Cancel' },
};

export const WithConsent: Story = {
  args: {
    primary: 'Create account',
    checkbox: (
      <>
        I agree to the <a href="#terms">Terms &amp; Conditions</a>
      </>
    ),
  },
};

export const NoHomeIndicator: Story = { args: { homeIndicator: false } };

export const InPhoneFrame: Story = {
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: 390,
        height: 320,
        maxWidth: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        border: '1px solid var(--mav-border-subtle)',
        background: 'var(--mav-bg-default)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <ButtonDock {...args} style={{ width: '100%' }} />
    </div>
  ),
};
