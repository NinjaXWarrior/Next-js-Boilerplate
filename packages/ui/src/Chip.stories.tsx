import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Base/Chip',
  component: Chip,
  args: {
    children: 'Filter',
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {(['primary', 'neutral', 'success', 'warning', 'destructive'] as const).map((color) => (
          <Chip chipStyle="filled" color={color} key={color}>
            {color}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2">
        {(['primary', 'neutral', 'success', 'warning', 'destructive'] as const).map((color) => (
          <Chip color={color} key={color} selected>
            {color}
          </Chip>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const Removable: Story = {
  args: { onRemove: fn() },
};

export const Disabled: Story = {
  args: { disabled: true },
};
