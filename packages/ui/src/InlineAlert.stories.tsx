import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineAlert } from './InlineAlert';

const meta: Meta<typeof InlineAlert> = {
  title: 'Base/InlineAlert',
  component: InlineAlert,
  args: {
    title: 'Heads up',
    children: 'Something needs your attention.',
  },
};

export default meta;

type Story = StoryObj<typeof InlineAlert>;

export const Default: Story = {};

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
  render: (args) => (
    <div className="flex flex-col gap-3">
      <InlineAlert {...args} alertStyle="accent" variant="primary" />
      <InlineAlert {...args} alertStyle="outlined" variant="primary" />
      <InlineAlert {...args} alertStyle="filled" variant="primary" />
    </div>
  ),
};
