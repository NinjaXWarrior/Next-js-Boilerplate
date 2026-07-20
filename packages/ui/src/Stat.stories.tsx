import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Base/Stat',
  component: Stat,
  args: {
    label: 'Monthly revenue',
    value: '$42,000',
  },
};

export default meta;

type Story = StoryObj<typeof Stat>;

export const Default: Story = {};

export const TrendingUp: Story = {
  args: { change: '+12% from last month', trend: 'up' },
};

export const TrendingDown: Story = {
  args: { change: '-4% from last month', trend: 'down' },
};
