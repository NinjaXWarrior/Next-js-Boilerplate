import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe(Input, () => {
  it('associates the label with the input', () => {
    render(<Input id="email" label="Email" />);

    expect(screen.getByLabelText('Email')).toBeTruthy();
  });

  it('calls onChange with the typed value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<Input label="Email" onChange={onChange} />);
    await user.type(screen.getByLabelText('Email'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('shows the error message and destructive styling', () => {
    render(<Input error="Required" label="Email" />);

    expect(screen.getByText('Required')).toBeTruthy();
    expect(screen.getByLabelText('Email').className).toContain('border-destructive-500');
  });

  it('applies the boxed field style by default', () => {
    render(<Input label="Email" />);

    expect(screen.getByLabelText('Email').className).toContain('shadow-xs');
  });

  it('applies the lined field style', () => {
    render(<Input fieldStyle="lined" label="Email" />);

    expect(screen.getByLabelText('Email').className).toContain('border-b');
  });

  it('blocks typing when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<Input disabled label="Email" onChange={onChange} />);
    await user.type(screen.getByLabelText('Email'), 'a');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('passes the input type through', () => {
    render(<Input label="Password" type="password" />);

    expect(screen.getByLabelText('Password').getAttribute('type')).toBe('password');
  });

  it('applies the outlined field style', () => {
    render(<Input fieldStyle="outlined" label="Email" />);

    expect(screen.getByLabelText('Email').className).toContain('bg-transparent');
  });
});
