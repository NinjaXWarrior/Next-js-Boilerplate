import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Base/Rating',
  component: Rating,
  args: {
    value: 3,
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {};

export const Full: Story = {
  args: { value: 5 },
};

export const Interactive: Story = {
  args: { onChange: fn() },
};
