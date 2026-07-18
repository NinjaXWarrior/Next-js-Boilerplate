import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe(ProgressBar, () => {
  it('exposes the value through progressbar semantics', () => {
    render(<ProgressBar value={60} />);

    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('60');
  });

  it('clamps the value between 0 and 100', () => {
    render(<ProgressBar value={140} />);

    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
  });

  it('applies the variant and size classes', () => {
    render(<ProgressBar size="lg" value={60} variant="success" />);

    const bar = screen.getByRole('progressbar');

    expect(bar.className).toContain('h-3');
    expect(bar.firstElementChild?.className).toContain('bg-success-500');
  });

  it('clamps negative values to zero', () => {
    render(<ProgressBar value={-10} />);

    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0');
  });
});
