import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Base/DropdownMenu',
  component: DropdownMenu,
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Delete account</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
