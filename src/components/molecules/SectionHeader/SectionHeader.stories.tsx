import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Molecules/SectionHeader',
  component: SectionHeader,
  args: { title: 'Recent transactions', size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'Titled row that opens a content section (Figma 270:8099). Trailing slot is a ' +
          '"See all" link or a round icon button. `spacing` applies the ' +
          '--mav-space-header-* bottom margin presets.',
      },
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSeeAll: Story = { args: { seeAll: true } };

export const WithDescriptionAndIcon: Story = {
  args: {
    size: 'lg',
    title: 'Insights',
    description: 'Curated for you',
    icon: 'arrow-right',
    iconLabel: 'Open insights',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader size="lg" title="Large header" description="Description copy" seeAll />
      <SectionHeader size="md" title="Medium header" description="Description copy" seeAll />
      <SectionHeader size="sm" title="Small header" description="Description copy" seeAll />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader title="Default" seeAll />
      <SectionHeader title="Subtle" appearance="subtle" seeAll />
      <div style={{ background: '#171717', padding: 16, borderRadius: 12 }}>
        <SectionHeader title="Inverted" appearance="inverted" seeAll />
      </div>
      <SectionHeader title="Skeleton" description="Loading" skeleton seeAll />
    </div>
  ),
};
