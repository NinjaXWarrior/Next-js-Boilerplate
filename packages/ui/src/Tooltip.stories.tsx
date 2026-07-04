import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Base/Tooltip',
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
          Hover me
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
