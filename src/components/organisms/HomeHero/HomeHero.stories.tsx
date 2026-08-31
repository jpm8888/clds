import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeHero, HomeHeroWallet } from './HomeHero';

const meta = {
  title: 'Organisms/HomeHero',
  component: HomeHero,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
          maxWidth: '100%',
          borderRadius: 36,
          overflow: 'hidden',
          border: '1px solid var(--mav-border-subtle)',
          background: 'var(--mav-bg-default)',
          paddingBottom: 22,
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'Saurabh',
    fullName: 'Saurabh Chandolia',
    detail: '+63 •••• 8265',
    avatar: 'SC',
    subline: 'Add your account number once and your bills come to you.',
    ctaLabel: 'Add an account',
    dismissLabel: 'Not now',
    bellDot: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          "The greeting panel and the wallet card that overlaps it. The panel is warm end to end — blue is never mixed into it (orange and blue mixed along a line always cross grey); the decorative object is the brand's own \"Power On\" ring. The greeting follows the device clock; the panel does not re-tint by hour.",
      },
    },
  },
} satisfies Meta<typeof HomeHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Panel + overlapping wallet, as composed at the top of the home screen. */
export const WithWallet: Story = {
  render: (args) => (
    <>
      <HomeHero {...args} greeting="Good evening," />
      <HomeHeroWallet balance="0.00" tag="Basic account" actionLabel="Upgrade" />
    </>
  ),
};

export const PanelOnly: Story = { args: { greeting: 'Good evening,' } };

/** Only the words change with the clock — never the panel colour. */
export const TimeOfDay: Story = {
  render: (args) => (
    <div style={{ display: 'grid' }}>
      <HomeHero {...args} mini greeting="Good morning," />
      <HomeHero {...args} mini greeting="Good afternoon," />
      <HomeHero {...args} mini greeting="Good evening," />
    </div>
  ),
};
