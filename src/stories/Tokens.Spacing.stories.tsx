import type { Meta, StoryObj } from '@storybook/react-vite';
import { radius, shadow, space } from '../tokens/tokens';

const meta = {
  title: 'Tokens/Spacing & Shape',
  parameters: {
    docs: {
      description: {
        component:
          'The single spacing scale (px-named), radii and shadows. The source system’s three spacing namings all fold into --mav-space-N.',
      },
    },
  },
} satisfies Meta;

export default meta;

export const Spacing: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 6, fontFamily: 'var(--mav-font-mono)', fontSize: 12 }}>
      {Object.entries(space).map(([k, value]) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 90, color: 'var(--mav-text-description)' }}>space[{k}]</span>
          <div
            style={{
              width: value,
              height: 16,
              background: 'var(--mav-main-primary)',
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Radii: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        fontFamily: 'var(--mav-font-mono)',
        fontSize: 11,
      }}
    >
      {(Object.keys(radius) as Array<keyof typeof radius>).map((k) => (
        <div key={k} style={{ textAlign: 'center', color: 'var(--mav-text-description)' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: radius[k],
              background: 'var(--mav-bg-tertiary)',
              border: '2px solid var(--mav-main-primary)',
              marginBottom: 6,
            }}
          />
          {k}
        </div>
      ))}
    </div>
  ),
};

export const Shadows: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        fontFamily: 'var(--mav-font-mono)',
        fontSize: 11,
        padding: 12,
      }}
    >
      {(Object.keys(shadow) as Array<keyof typeof shadow>).map((k) => (
        <div key={k} style={{ textAlign: 'center', color: 'var(--mav-text-description)' }}>
          <div
            style={{
              width: 110,
              height: 72,
              borderRadius: 12,
              background: 'var(--mav-surface)',
              boxShadow: shadow[k],
              marginBottom: 8,
            }}
          />
          {k}
        </div>
      ))}
    </div>
  ),
};
