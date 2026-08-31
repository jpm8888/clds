import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconNames } from '../icons';

const meta = {
  title: 'Tokens/Icons',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'The typed icon registry — `name` is a string-literal union, so typos are compile errors. Icons inherit currentColor.',
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

export const Gallery: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: 8,
        fontFamily: 'var(--mav-font-mono)',
        fontSize: 10,
        color: 'var(--mav-text-default)',
      }}
    >
      {iconNames.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: '14px 6px',
            border: '1px solid var(--mav-border-subtle)',
            borderRadius: 8,
            background: 'var(--mav-surface)',
          }}
        >
          <Icon name={name} size={24} />
          <span style={{ color: 'var(--mav-text-description)' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
