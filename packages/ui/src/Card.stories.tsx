import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Base/Card',
  component: Card,
  args: {
    title: 'Card title',
    children: 'Card content goes here.',
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithoutTitle: Story = {
  args: { title: undefined },
};
