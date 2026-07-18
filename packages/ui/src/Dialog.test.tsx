import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './Dialog';

const renderDialog = () =>
  render(
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>Are you sure?</DialogDescription>
      </DialogContent>
    </Dialog>,
  );

describe(DialogContent, () => {
  it('opens the dialog from the trigger', async () => {
    const user = userEvent.setup();

    renderDialog();
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });

  it('closes the dialog on Escape', async () => {
    const user = userEvent.setup();

    renderDialog();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes the dialog via the close button', async () => {
    const user = userEvent.setup();

    renderDialog();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('moves focus into the dialog when opened', async () => {
    const user = userEvent.setup();

    renderDialog();
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('dialog').contains(document.activeElement)).toBeTruthy();
  });
});
