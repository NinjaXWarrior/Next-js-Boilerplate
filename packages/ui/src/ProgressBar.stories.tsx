import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Base/ProgressBar',
  component: ProgressBar,
  args: {
    value: 60,
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <ProgressBar value={60} variant="primary" />
      <ProgressBar value={100} variant="success" />
      <ProgressBar value={45} variant="warning" />
      <ProgressBar value={20} variant="destructive" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <ProgressBar size="sm" value={60} />
      <ProgressBar size="md" value={60} />
      <ProgressBar size="lg" value={60} />
    </div>
  ),
};
