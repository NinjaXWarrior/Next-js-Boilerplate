import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InlineAlert } from './InlineAlert';

describe(InlineAlert, () => {
  it('renders an alert with title and message', () => {
    render(<InlineAlert title="Heads up">Check your input</InlineAlert>);

    const alert = screen.getByRole('alert');

    expect(alert.textContent).toContain('Heads up');
    expect(alert.textContent).toContain('Check your input');
  });

  it('applies the variant classes', () => {
    render(<InlineAlert variant="destructive">Something failed</InlineAlert>);

    expect(screen.getByRole('alert').className).toContain('bg-destructive-50');
  });

  it('defaults to the neutral accent style', () => {
    render(<InlineAlert>Just so you know</InlineAlert>);

    expect(screen.getByRole('alert').className).toContain('bg-white');
  });

  it('applies the filled style', () => {
    render(
      <InlineAlert alertStyle="filled" variant="primary">
        Just so you know
      </InlineAlert>,
    );

    const alert = screen.getByRole('alert');

    expect(alert.className).toContain('bg-primary-500');
    expect(alert.className).toContain('text-white');
  });

  it('applies the outlined style', () => {
    render(
      <InlineAlert alertStyle="outlined" variant="success">
        Saved
      </InlineAlert>,
    );

    expect(screen.getByRole('alert').className).toContain('border-success-300');
  });
});
