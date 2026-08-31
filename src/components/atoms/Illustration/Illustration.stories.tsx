import type { Meta, StoryObj } from '@storybook/react-vite';
import { Illustration, illustrationNames } from './Illustration';

const meta = {
  title: 'Atoms/Illustration',
  component: Illustration,
  args: { name: 'il-140', size: 160 },
  parameters: {
    docs: {
      description: {
        component:
          'Isometric fintech illustrations for empty states and onboarding. ' +
          '10 pieces are bundled; pass `src` for others from the MaV source repo.',
      },
    },
  },
} satisfies Meta<typeof Illustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 14,
        width: '100%',
        maxWidth: 720,
      }}
    >
      {illustrationNames.map((n) => (
        <div
          key={n}
          style={{
            border: '1px solid var(--mav-border-subtle)',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Illustration name={n} size={120} />
          <code style={{ fontSize: 11, color: 'var(--mav-text-description)' }}>{n}</code>
        </div>
      ))}
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="ill-card" style={{ width: 320 }}>
      <Illustration name="il-156" size={180} />
      <span className="ill-title">No transactions yet</span>
      <span className="ill-sub">When you send or receive money, it will show up here.</span>
    </div>
  ),
};
