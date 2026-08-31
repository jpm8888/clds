import type { Meta, StoryObj } from '@storybook/react-vite';
import { color } from '../tokens/tokens';

const meta = {
  title: 'Tokens/Colors',
  parameters: {
    docs: {
      description: {
        component:
          'Semantic color tokens — the only colors app code should use. Toggle the theme toolbar to see the dark values.',
      },
    },
  },
} satisfies Meta;

export default meta;

const groups: Record<string, Array<[string, string]>> = {};
for (const [name, value] of Object.entries(color)) {
  const group = /^(bg|text|icon|border|divider)/.exec(name)?.[1] ?? 'brand & status';
  (groups[group] ??= []).push([name, value]);
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 10px',
        borderRadius: 8,
        border: '1px solid var(--mav-border-subtle)',
        background: 'var(--mav-surface)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          background: value,
          border: '1px solid var(--mav-border-subtle)',
          flexShrink: 0,
        }}
      />
      <div style={{ fontFamily: 'var(--mav-font-mono)', fontSize: 12, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, color: 'var(--mav-text-default)' }}>{name}</div>
        <div style={{ color: 'var(--mav-text-description)' }}>{value}</div>
      </div>
    </div>
  );
}

export const AllColors: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, fontFamily: 'var(--mav-font-body)' }}>
      {Object.entries(groups).map(([group, entries]) => (
        <section key={group}>
          <h3
            style={{
              margin: '0 0 10px',
              fontSize: 13,
              textTransform: 'capitalize',
              color: 'var(--mav-text-description)',
              letterSpacing: '0.04em',
            }}
          >
            {group}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 10,
            }}
          >
            {entries.map(([name, value]) => (
              <Swatch key={name} name={name} value={value} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
