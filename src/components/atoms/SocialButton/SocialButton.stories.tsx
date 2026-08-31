import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialButton } from './SocialButton';

/* Inline demo logo (Google "G") so stories don't depend on remote assets. */
const googleG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.4 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3z"/><path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7L19.6 3A11.5 11.5 0 0 0 1.8 7.3l3.8 3c.9-2.7 3.4-4.7 6.4-4.7z"/></svg>`,
  );

const meta = {
  title: 'Atoms/SocialButton',
  component: SocialButton,
  args: { children: 'Continue with Google', brandSrc: googleG, size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'White card sign-in button with a brand logo slot. Used on auth screens; ' +
          'pass any logo via `brandSrc`.',
      },
    },
  },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconOnly: Story = {
  args: { iconOnly: true, children: undefined, 'aria-label': 'Sign in with Google' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <SocialButton {...args} size="sm">
        Small
      </SocialButton>
      <SocialButton {...args} size="md">
        Medium
      </SocialButton>
      <SocialButton {...args} size="lg">
        Large
      </SocialButton>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <SocialButton {...args}>Default</SocialButton>
      <SocialButton {...args} className="is-focus">
        Focus
      </SocialButton>
      <SocialButton {...args} disabled>
        Disabled
      </SocialButton>
    </div>
  ),
};
