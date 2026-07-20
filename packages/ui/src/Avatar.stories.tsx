import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Base/Avatar',
  component: Avatar,
  args: {
    initials: 'NL',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {};

export const Image: Story = {
  args: { alt: 'Avatar', src: 'https://i.pravatar.cc/80' },
};

export const Placeholder: Story = {
  args: { initials: undefined },
};

export const WithStatus: Story = {
  args: { status: 'online' },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar initials="CI" shape="circle" />
      <Avatar initials="RO" shape="rounded" />
      <Avatar initials="SQ" shape="square" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-2">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
      <Avatar initials="2X" size="xxl" />
      <Avatar initials="3X" size="xxxl" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup moreCount={4}>
      <Avatar initials="AB" />
      <Avatar initials="CD" />
      <Avatar initials="EF" />
    </AvatarGroup>
  ),
};
