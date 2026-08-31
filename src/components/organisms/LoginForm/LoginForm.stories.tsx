import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginForm } from './LoginForm';

const meta = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
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
          'Full sign-in / sign-up screen. Self-contained (own input state, values handed to ' +
          '`onSubmit`). Configure `fields` for sign-up; the CTA and checkbox re-theme in dark.',
      },
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {
    footer: (
      <>
        Don&apos;t have an account? <a href="#signup">Sign up</a>
      </>
    ),
  },
};

export const SignUp: Story = {
  args: {
    title: 'Create account',
    subtitle: 'Join in a minute.',
    submitLabel: 'Create account',
    socialProviders: [],
    fields: [
      { name: 'name', label: 'Full name', placeholder: 'Julio Santos', icon: 'user' },
      {
        name: 'phone',
        label: 'Phone number',
        type: 'tel',
        placeholder: '000 000 000',
        icon: 'phone',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'you@example.com',
        icon: 'mail',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'At least 8 characters',
        icon: 'lock',
      },
    ],
    checkboxLabel: (
      <span>
        I agree to the <a href="#terms">Terms</a> &amp; <a href="#privacy">Privacy</a>
      </span>
    ),
    footer: (
      <>
        Already have an account? <a href="#signin">Sign in</a>
      </>
    ),
  },
};

export const MinimalNoSocial: Story = {
  args: { socialProviders: [], checkboxLabel: undefined },
};
