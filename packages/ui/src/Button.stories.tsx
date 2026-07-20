import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Base/Button',
  component: Button,
  args: {
    children: 'Button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: { variant: 'filled' },
};

export const Accent: Story = {
  args: { variant: 'accent' },
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};

export const Grayscale: Story = {
  args: { variant: 'grayscale' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-2">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
      <Button size="xxl">XXLarge</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
