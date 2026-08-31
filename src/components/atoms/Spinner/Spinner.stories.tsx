import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  args: { size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'CSS-only comet loading ring in the brand color (flips to lime in dark). ' +
          'Override --mav-loader-spin locally to tint (e.g. white inside a filled button).',
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
      <Spinner {...args} size="lg" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="xs" />
    </div>
  ),
};

export const LoadingCard: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        border: '1px solid var(--mav-border-subtle)',
        borderRadius: 16,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <Spinner size="lg" />
      <span style={{ fontSize: 14, color: 'var(--mav-text-description)' }}>
        Fetching your balance…
      </span>
    </div>
  ),
};
