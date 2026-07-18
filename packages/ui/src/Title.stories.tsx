import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Title } from './Title';

const meta: Meta<typeof Title> = {
  title: 'Base/Title',
  component: Title,
  args: {
    title: 'Team members',
    subtitle: 'Manage who has access to this workspace.',
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: <Button size="sm">Invite</Button>,
  },
};
