import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressStep } from './ProgressStep';

const meta: Meta<typeof ProgressStep> = {
  title: 'Base/ProgressStep',
  component: ProgressStep,
  args: {
    steps: ['Account', 'Billing', 'Confirm'],
    current: 1,
  },
};

export default meta;

type Story = StoryObj<typeof ProgressStep>;

export const Default: Story = {};

export const Complete: Story = {
  args: { current: 3 },
};
