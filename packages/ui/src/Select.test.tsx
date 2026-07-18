import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

const renderSelect = () =>
  render(
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>,
  );

describe(SelectTrigger, () => {
  it('renders the placeholder before a value is chosen', () => {
    renderSelect();

    expect(screen.getByText('Pick a fruit')).toBeTruthy();
  });

  it('opens the listbox from the trigger', async () => {
    const user = userEvent.setup();

    renderSelect();
    await user.click(screen.getByRole('combobox'));

    expect(screen.getByRole('listbox')).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeTruthy();
  });

  it('shows the chosen option in the trigger', async () => {
    const user = userEvent.setup();

    renderSelect();
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));

    expect(screen.getByRole('combobox').textContent).toContain('Banana');
  });

  it('closes the listbox on Escape', async () => {
    const user = userEvent.setup();

    renderSelect();
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
