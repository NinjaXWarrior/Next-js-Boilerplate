import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Base/Radio',
  component: Radio,
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio defaultChecked label="Monthly" name="billing" value="monthly" />
      <Radio label="Yearly" name="billing" value="yearly" />
      <Radio disabled label="Lifetime" name="billing" value="lifetime" />
    </div>
  ),
};
