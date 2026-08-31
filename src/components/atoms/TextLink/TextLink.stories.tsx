import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextLink } from './TextLink';

const meta = {
  title: 'Atoms/TextLink',
  component: TextLink,
  args: { children: 'See all transactions', href: '#', variant: 'primary' },
  parameters: {
    docs: {
      description: {
        component:
          'Inline text link — never underlined. Renders an <a>; for pure actions ' +
          'without navigation use <Button variant="clear"> instead.',
      },
    },
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithTrailingIcon: Story = {
  args: { trailingIcon: 'chevron-right', children: 'See all' },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <TextLink {...args} variant="primary">
        Primary
      </TextLink>
      <TextLink {...args} variant="secondary">
        Secondary
      </TextLink>
      <TextLink {...args} variant="tertiary">
        Tertiary
      </TextLink>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <TextLink {...args}>Default</TextLink>
      <TextLink {...args} className="is-focus">
        Focus
      </TextLink>
      <TextLink {...args} disabled>
        Disabled
      </TextLink>
    </div>
  ),
};
