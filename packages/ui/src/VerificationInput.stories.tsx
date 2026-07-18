import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerificationInput } from './VerificationInput';

const meta: Meta<typeof VerificationInput> = {
  title: 'Base/VerificationInput',
  component: VerificationInput,
};

export default meta;

type Story = StoryObj<typeof VerificationInput>;

export const Default: Story = {};

export const Filled: Story = {
  args: { value: '123456' },
};

export const Error: Story = {
  args: { error: true, value: '123456' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
