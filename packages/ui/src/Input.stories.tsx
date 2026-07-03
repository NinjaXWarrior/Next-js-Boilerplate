import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Base/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Enter a valid email address' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
