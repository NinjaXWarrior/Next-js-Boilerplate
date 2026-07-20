import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Boxed: Story = {};

export const Outlined: Story = {
  args: { fieldStyle: 'outlined' },
};

export const Lined: Story = {
  args: { fieldStyle: 'lined' },
};

export const WithError: Story = {
  args: { error: 'Enter a valid email address' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
