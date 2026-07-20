import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe(Checkbox, () => {
  it('renders a labeled checkbox', () => {
    render(<Checkbox label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeTruthy();
  });

  it('calls onChange with the checked state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(checked: boolean) => void>();

    render(<Checkbox label="Accept terms" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('ignores clicks when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(checked: boolean) => void>();

    render(<Checkbox disabled label="Accept terms" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('starts checked with defaultChecked', () => {
    render(<Checkbox defaultChecked label="Accept terms" />);

    expect(screen.getByRole('checkbox')).toHaveProperty('checked', true);
  });
});
