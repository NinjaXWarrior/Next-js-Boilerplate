import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe(Switch, () => {
  it('renders a switch with an accessible label', () => {
    render(<Switch label="Enable notifications" />);

    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeTruthy();
  });

  it('toggles the checked state on click', async () => {
    const user = userEvent.setup();

    render(<Switch label="Enable notifications" />);
    const toggle = screen.getByRole('switch');

    expect(toggle.getAttribute('aria-checked')).toBe('false');
    await user.click(toggle);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  it('calls onChange with the next state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(checked: boolean) => void>();

    render(<Switch defaultChecked label="Enable notifications" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));

    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('ignores clicks when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(checked: boolean) => void>();

    render(<Switch disabled label="Enable notifications" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('follows the controlled checked prop', async () => {
    const user = userEvent.setup();

    render(<Switch checked label="Enable notifications" />);
    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });
});
