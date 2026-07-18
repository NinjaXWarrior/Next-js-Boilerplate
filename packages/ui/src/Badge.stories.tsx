import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Base/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: { variant: 'neutral' },
};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Success: Story = {
  args: { variant: 'success' },
};

export const Warning: Story = {
  args: { variant: 'warning' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Styles: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge badgeStyle="filled" variant="primary">
        Filled
      </Badge>
      <Badge badgeStyle="accent" variant="primary">
        Accent
      </Badge>
      <Badge badgeStyle="outlined" variant="primary">
        Outlined
      </Badge>
    </div>
  ),
};

export const Rounded: Story = {
  args: { shape: 'rounded' },
};
