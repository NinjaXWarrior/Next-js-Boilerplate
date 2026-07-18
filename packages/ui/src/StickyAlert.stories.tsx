import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { StickyAlert } from './StickyAlert';

const meta: Meta<typeof StickyAlert> = {
  title: 'Base/StickyAlert',
  component: StickyAlert,
  args: {
    children: 'A new version is available.',
  },
};

export default meta;

type Story = StoryObj<typeof StickyAlert>;

export const Info: Story = {};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Dismissible: Story = {
  args: { onDismiss: fn() },
};
