import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loader } from './Loader';

describe(Loader, () => {
  it('renders a status with an accessible label', () => {
    render(<Loader />);

    expect(screen.getByRole('status').textContent).toContain('Loading');
  });

  it('uses the provided label', () => {
    render(<Loader label="Saving" />);

    expect(screen.getByRole('status').textContent).toContain('Saving');
  });

  it('applies the size classes', () => {
    const { container } = render(<Loader size="xl" />);

    expect(container.querySelector('svg')?.getAttribute('class')).toContain('size-8');
  });
});
