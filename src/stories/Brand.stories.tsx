import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { color, font, fontSize, radius, space } from '../tokens/tokens';
import logoVertical from '../assets/brand/bayad/logo-vertical.png';
import logoHorizontal from '../assets/brand/bayad/logo-horizontal.png';

/**
 * Brand & Logo — ported from MaV-Ver2 components/brand.html.
 * The client's marks and the rules around them. Two lockups — stacked and
 * horizontal — supplied as transparent PNGs, trimmed to their bounding box so
 * clear space is applied here rather than baked into the file.
 *
 * Real artwork, but still not the full brand pack: the identity was created
 * by Design For Tomorrow (the "Power On" symbol references Meralco, the
 * parent company). These are rasters — mono/single-colour treatments cannot
 * be produced from them. Clear space and minimum sizes are DERIVED from the
 * artwork, not quoted from Bayad's rules; replace with the official figures
 * once the guidelines arrive.
 */
const meta = {
  title: 'Brand/Logo',
} satisfies Meta;

export default meta;
type Story = StoryObj;

const plate: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: 190,
  height: 130,
  borderRadius: radius.lg,
  border: `1px solid ${color.borderSubtle}`,
  background: color.bgDefault,
};

function Spec({ children, caption }: { children: ReactNode; caption: ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: space[8], justifyItems: 'center' }}>
      {children}
      <div
        style={{
          fontFamily: font.body,
          fontSize: fontSize.xs,
          color: color.textDescription,
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        {caption}
      </div>
    </div>
  );
}

/** Stacked for square and centred placements; horizontal for headers. Both
 * carry their own colour, so they do not invert — on dark and on imagery the
 * artwork stays as-is. */
export const Lockups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[24] }}>
      <Spec
        caption={
          <>
            <b>Stacked</b>
            <br />
            square and centred placements
          </>
        }
      >
        <div style={plate}>
          <img src={logoVertical} alt="Bayad stacked lockup" style={{ height: 84 }} />
        </div>
      </Spec>
      <Spec
        caption={
          <>
            <b>Horizontal</b>
            <br />
            headers, wide placements
          </>
        }
      >
        <div style={plate}>
          <img src={logoHorizontal} alt="Bayad horizontal lockup" style={{ width: 150 }} />
        </div>
      </Spec>
      <Spec
        caption={
          <>
            <b>On dark</b>
            <br />
            artwork is unchanged — the wordmark blue holds
          </>
        }
      >
        <div style={{ ...plate, background: '#171717', borderColor: '#171717' }}>
          <img src={logoHorizontal} alt="Bayad horizontal lockup on dark" style={{ width: 150 }} />
        </div>
      </Spec>
      <Spec
        caption={
          <>
            <b>On brand tint</b>
            <br />
            safe — the tint is pale enough
          </>
        }
      >
        <div style={{ ...plate, background: color.bgTertiary }}>
          <img
            src={logoHorizontal}
            alt="Bayad horizontal lockup on brand tint"
            style={{ width: 150 }}
          />
        </div>
      </Spec>
    </div>
  ),
};

/** Clear space is ¼ of the mark's height on every side, so the rule scales
 * with the logo. The floor is where the break in the "Power On" ring stops
 * reading — below ~24px the gap closes and the mark turns into a solid blob. */
export const ClearSpaceAndMinimumSize: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[40], alignItems: 'center' }}>
      <Spec
        caption={
          <>
            <b>Clear space</b>
            <br />¼ of the mark&rsquo;s height, all sides
          </>
        }
      >
        <div
          style={{
            padding: 24,
            border: `1px dashed ${color.borderDisabled}`,
            borderRadius: radius.md,
          }}
        >
          <img src={logoVertical} alt="Bayad clear space" style={{ height: 96 }} />
        </div>
      </Spec>
      <div style={{ display: 'flex', gap: space[24], alignItems: 'flex-end' }}>
        {[
          [64, 'app icon', false],
          [40, 'compact', false],
          [24, 'floor', false],
          [16, 'too small — the ring break closes', true],
        ].map(([h, label, bad]) => (
          <Spec
            key={String(h)}
            caption={
              <span style={bad ? { color: color.danger } : undefined}>
                <b>{h as number}px</b>
                <br />
                {label}
              </span>
            }
          >
            <img src={logoVertical} alt="" style={{ height: h as number }} />
          </Spec>
        ))}
      </div>
    </div>
  ),
};

/** Because the artwork carries its own colour, the failure mode is contrast
 * with whatever sits behind it. Never on a busy ground (give it a plain
 * panel), never stretched, never on brand orange — the mark disappears into
 * its own colour. */
export const Placement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[24] }}>
      <Spec caption={<b>On light — the default</b>}>
        <div style={plate}>
          <img src={logoHorizontal} alt="" style={{ width: 140 }} />
        </div>
      </Spec>
      <Spec caption={<b>On dark — both colours separate</b>}>
        <div style={{ ...plate, background: '#171717', borderColor: '#171717' }}>
          <img src={logoHorizontal} alt="" style={{ width: 140 }} />
        </div>
      </Spec>
      <Spec
        caption={<span style={{ color: color.danger }}>✕ Never stretch — lock the aspect</span>}
      >
        <div style={plate}>
          <img
            src={logoHorizontal}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'fill' }}
          />
        </div>
      </Spec>
      <Spec
        caption={
          <span style={{ color: color.danger }}>
            ✕ Never on brand orange — the mark disappears into its own colour
          </span>
        }
      >
        <div style={{ ...plate, background: '#e8622a', borderColor: '#e8622a' }}>
          <img src={logoHorizontal} alt="" style={{ width: 140 }} />
        </div>
      </Spec>
    </div>
  ),
};
