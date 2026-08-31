import type { Meta, StoryObj } from '@storybook/react-vite';
import { fontSize, fontWeight } from '../tokens/tokens';

const meta = {
  title: 'Tokens/Typography',
  parameters: {
    docs: {
      description: {
        component:
          'Type scale and weights. The whole system re-fonts by overriding one token: --mav-font-active (default: Plus Jakarta Sans).',
      },
    },
  },
} satisfies Meta;

export default meta;

const sizeSpecs: Array<{ token: keyof typeof fontSize; px: string; use: string }> = [
  { token: 'h1', px: '64', use: 'Hero numerals' },
  { token: 'h2', px: '48', use: 'Screen hero' },
  { token: 'h3', px: '44', use: 'Balance display' },
  { token: 'h4', px: '38', use: 'Large heading' },
  { token: 'h5', px: '32', use: 'Section hero' },
  { token: 'h6', px: '28', use: 'Card heading' },
  { token: 'h7', px: '24', use: 'Screen title' },
  { token: 'xl', px: '20', use: 'Emphasis body' },
  { token: 'lg', px: '18', use: 'Large body' },
  { token: 'md', px: '16', use: 'Body' },
  { token: 'sm', px: '14', use: 'Default UI text' },
  { token: 'xs', px: '12', use: 'Captions, labels' },
  { token: '2xs', px: '10', use: 'Fine print' },
];

export const TypeScale: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 4,
        fontFamily: 'var(--mav-font-body)',
        color: 'var(--mav-text-default)',
      }}
    >
      {sizeSpecs.map(({ token, px, use }) => (
        <div
          key={token}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            padding: '10px 0',
            borderBottom: '1px solid var(--mav-divider-default)',
          }}
        >
          <code
            style={{
              fontFamily: 'var(--mav-font-mono)',
              fontSize: 11,
              color: 'var(--mav-text-description)',
              width: 130,
              flexShrink: 0,
            }}
          >
            fontSize.{token} · {px}px
          </code>
          <span style={{ fontSize: fontSize[token], lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            Pay day {px}
          </span>
          <span style={{ fontSize: 12, color: 'var(--mav-text-description)', marginLeft: 'auto' }}>
            {use}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Weights: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 8,
        fontFamily: 'var(--mav-font-body)',
        color: 'var(--mav-text-default)',
      }}
    >
      {(Object.keys(fontWeight) as Array<keyof typeof fontWeight>).map((w) => (
        <div key={w} style={{ fontSize: 20, fontWeight: fontWeight[w] as never }}>
          {w} — The quick brown fox pays ₱1,234.56
        </div>
      ))}
      <div style={{ fontSize: 20, fontFamily: 'var(--mav-font-mono)' }}>
        mono — 4111 1111 1111 1111
      </div>
    </div>
  ),
};
