import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VerificationInput } from './VerificationInput';

describe(VerificationInput, () => {
  it('renders one input per digit', () => {
    render(<VerificationInput length={4} />);

    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('calls onChange with the accumulated value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<VerificationInput onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'Digit 1' }), '7');

    expect(onChange).toHaveBeenCalledWith('7');
  });

  it('moves focus to the next digit after typing', async () => {
    const user = userEvent.setup();

    render(<VerificationInput />);
    await user.type(screen.getByRole('textbox', { name: 'Digit 1' }), '7');

    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Digit 2' }));
  });

  it('ignores non-numeric characters', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<VerificationInput onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'Digit 1' }), 'a');

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('shows the provided value across the digits', () => {
    render(<VerificationInput value="123" />);

    expect(screen.getByRole('textbox', { name: 'Digit 3' })).toHaveProperty('value', '3');
  });

  it('moves focus back on backspace in an empty digit', async () => {
    const user = userEvent.setup();

    render(<VerificationInput />);
    await user.type(screen.getByRole('textbox', { name: 'Digit 1' }), '7');
    await user.keyboard('{Backspace}');

    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Digit 1' }));
  });

  it('applies the field style and error classes', () => {
    render(<VerificationInput error fieldStyle="lined" />);

    const digit = screen.getByRole('textbox', { name: 'Digit 1' });

    expect(digit.className).toContain('border-b-2');
    expect(digit.className).toContain('border-destructive-500');
  });

  it('applies the size classes', () => {
    render(<VerificationInput size="lg" />);

    expect(screen.getByRole('textbox', { name: 'Digit 1' }).className).toContain('size-12');
  });
});
