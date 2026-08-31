import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarProfile, AvatarStack } from './Avatar';
import amara from '../../../assets/avatars/amara.jpg';
import inara from '../../../assets/avatars/inara.jpg';
import mega from '../../../assets/avatars/mega.jpg';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  args: { size: 'md', shape: 'rounded', color: 'grey' },
  parameters: {
    docs: {
      description: {
        component:
          'User/merchant identity as image or initials. Sizes 3xl 96px → xs 24px; ' +
          'status dot scales with the avatar. AvatarStack overlaps children; ' +
          'AvatarProfile adds a name label below.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = { args: { src: amara, alt: 'Amara' } };

export const Initials: Story = { args: { initials: 'JD', color: 'primary' } };

export const WithStatus: Story = { args: { src: inara, alt: 'Inara', status: true, size: 'lg' } };

export const Squared: Story = { args: { src: mega, alt: 'Mega', shape: 'squared', size: 'lg' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
      {(['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const).map((s) => (
        <Avatar key={s} {...args} size={s} src={amara} alt={s} />
      ))}
    </div>
  ),
};

export const InitialColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Avatar {...args} size="lg" color="grey" initials="GR" />
      <Avatar {...args} size="lg" color="primary" initials="PR" />
      <Avatar {...args} size="lg" color="red" initials="RD" />
    </div>
  ),
};

export const Stack: Story = {
  render: () => (
    <AvatarStack size={40} more="+3">
      <Avatar src={amara} alt="Amara" />
      <Avatar src={inara} alt="Inara" />
      <Avatar src={mega} alt="Mega" />
    </AvatarStack>
  ),
};

export const Profile: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20 }}>
      <AvatarProfile name="Amara">
        <Avatar src={amara} alt="" size="xl" />
      </AvatarProfile>
      <AvatarProfile name="Inara">
        <Avatar src={inara} alt="" size="xl" status />
      </AvatarProfile>
      <AvatarProfile name="New">
        <Avatar initials="+" color="primary" size="xl" />
      </AvatarProfile>
    </div>
  ),
};
