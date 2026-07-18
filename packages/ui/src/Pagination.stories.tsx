import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Base/Pagination',
  component: Pagination,
  args: {
    page: 2,
    pageCount: 5,
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};

export const FirstPage: Story = {
  args: { page: 1 },
};

export const LastPage: Story = {
  args: { page: 5 },
};
