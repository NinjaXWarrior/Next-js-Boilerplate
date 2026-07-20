import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu';

const renderMenu = (onSelect?: () => void) =>
  render(
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );

describe(DropdownMenuContent, () => {
  it('opens the menu from the trigger', async () => {
    const user = userEvent.setup();

    renderMenu();
    await user.click(screen.getByRole('button', { name: 'Actions' }));

    expect(screen.getByRole('menu')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeTruthy();
  });

  it('calls onSelect when an item is chosen', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn<() => void>();

    renderMenu(onSelect);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('marks disabled items as disabled', async () => {
    const user = userEvent.setup();

    renderMenu();
    await user.click(screen.getByRole('button', { name: 'Actions' }));

    expect(screen.getByRole('menuitem', { name: 'Delete' }).getAttribute('aria-disabled')).toBe(
      'true',
    );
  });

  it('closes the menu on Escape', async () => {
    const user = userEvent.setup();

    renderMenu();
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('selects an item with the keyboard', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn<() => void>();

    renderMenu(onSelect);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSelect).toHaveBeenCalledOnce();
  });
});
