import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe(Badge, () => {
  it('renders its children', () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText('New')).toBeTruthy();
  });

  it('applies the neutral accent pill styling by default', () => {
    render(<Badge>New</Badge>);

    const badge = screen.getByText('New');

    expect(badge.className).toContain('bg-neutral-100');
    expect(badge.className).toContain('rounded-full');
  });

  it('applies the variant and style combination classes', () => {
    render(
      <Badge badgeStyle="filled" variant="destructive">
        New
      </Badge>,
    );

    const badge = screen.getByText('New');

    expect(badge.className).toContain('bg-destructive-500');
    expect(badge.className).toContain('text-white');
  });

  it('applies the size and shape classes', () => {
    render(
      <Badge shape="rounded" size="lg">
        New
      </Badge>,
    );

    const badge = screen.getByText('New');

    expect(badge.className).toContain('text-label-md');
    expect(badge.className).toContain('rounded-md');
  });

  it('applies the outlined style with the variant border', () => {
    render(
      <Badge badgeStyle="outlined" variant="primary">
        New
      </Badge>,
    );

    const badge = screen.getByText('New');

    expect(badge.className).toContain('border-primary-300');
    expect(badge.className).toContain('bg-transparent');
  });
});
