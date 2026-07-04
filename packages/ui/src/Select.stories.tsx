import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Base/Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="grape" disabled>
          Grape (out of stock)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};
