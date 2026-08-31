import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';

const meta = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  args: { size: 'md' },
  parameters: {
    docs: {
      description: {
        component:
          'Segmented control of equal sibling actions. Compose with <ButtonGroupItem>; ' +
          'items support icons, icon-only and a leading checkbox visual.',
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem>Day</ButtonGroupItem>
      <ButtonGroupItem>Week</ButtonGroupItem>
      <ButtonGroupItem>Month</ButtonGroupItem>
      <ButtonGroupItem>Year</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem leadingIcon="download">Export</ButtonGroupItem>
      <ButtonGroupItem leadingIcon="share">Share</ButtonGroupItem>
      <ButtonGroupItem leadingIcon="trash" disabled>
        Delete
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem iconOnly leadingIcon="chevron-left" aria-label="Previous" />
      <ButtonGroupItem iconOnly leadingIcon="chevron-right" aria-label="Next" />
    </ButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <ButtonGroup key={s} size={s}>
          <ButtonGroupItem>One</ButtonGroupItem>
          <ButtonGroupItem>Two</ButtonGroupItem>
          <ButtonGroupItem>Three</ButtonGroupItem>
        </ButtonGroup>
      ))}
    </div>
  ),
};
