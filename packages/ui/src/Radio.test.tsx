import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from './Radio';

describe(Radio, () => {
  it('renders a labeled radio', () => {
    render(<Radio label="Monthly" name="billing" value="monthly" />);

    expect(screen.getByRole('radio', { name: 'Monthly' })).toBeTruthy();
  });

  it('calls onChange with its value when selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(
      <form>
        <Radio label="Monthly" name="billing" onChange={onChange} value="monthly" />
        <Radio label="Yearly" name="billing" onChange={onChange} value="yearly" />
      </form>,
    );
    await user.click(screen.getByRole('radio', { name: 'Yearly' }));

    expect(onChange).toHaveBeenCalledWith('yearly');
  });

  it('allows only one selection per group', async () => {
    const user = userEvent.setup();

    render(
      <form>
        <Radio defaultChecked label="Monthly" name="billing" value="monthly" />
        <Radio label="Yearly" name="billing" value="yearly" />
      </form>,
    );
    await user.click(screen.getByRole('radio', { name: 'Yearly' }));

    expect(screen.getByRole('radio', { name: 'Monthly' })).toHaveProperty('checked', false);
    expect(screen.getByRole('radio', { name: 'Yearly' })).toHaveProperty('checked', true);
  });
});
