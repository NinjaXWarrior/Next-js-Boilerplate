import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const renderTooltip = () =>
  render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Info</TooltipTrigger>
        <TooltipContent>More details</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );

describe(TooltipContent, () => {
  it('hides the tooltip initially', () => {
    renderTooltip();

    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows the tooltip when the trigger receives focus', async () => {
    const user = userEvent.setup();

    renderTooltip();
    await user.tab();

    await expect(screen.findByRole('tooltip')).resolves.toBeTruthy();
  });

  it('hides the tooltip on Escape', async () => {
    const user = userEvent.setup();

    renderTooltip();
    await user.tab();
    await screen.findByRole('tooltip');
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('applies the variant styling', async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Info</TooltipTrigger>
          <TooltipContent variant="primary">More details</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.tab();
    await screen.findByRole('tooltip');

    expect(document.querySelector('.bg-primary-500')).toBeTruthy();
  });
});
