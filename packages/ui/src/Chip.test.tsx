import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Chip } from './Chip';

describe(Chip, () => {
  it('renders as a toggle button', () => {
    render(<Chip selected>Filter</Chip>);

    expect(screen.getByRole('button', { name: 'Filter' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn<() => void>();

    render(<Chip onClick={onClick}>Filter</Chip>);
    await user.click(screen.getByRole('button', { name: 'Filter' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies the selected styling', () => {
    render(<Chip selected>Filter</Chip>);

    expect(screen.getByRole('button').className).toContain('border-primary-500');
  });

  it('calls onRemove from the remove button', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn<() => void>();

    render(<Chip onRemove={onRemove}>Filter</Chip>);
    await user.click(screen.getByRole('button', { name: 'Remove' }));

    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('applies the color and style combination classes', () => {
    render(
      <Chip chipStyle="filled" color="success">
        Filter
      </Chip>,
    );

    const chip = screen.getByRole('button');

    expect(chip.className).toContain('bg-success-500');
    expect(chip.className).toContain('text-white');
  });

  it('applies the size classes', () => {
    render(<Chip size="lg">Filter</Chip>);

    expect(screen.getByRole('button').className).toContain('px-4');
  });

  it('ignores clicks when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn<() => void>();

    render(
      <Chip disabled onClick={onClick}>
        Filter
      </Chip>,
    );
    await user.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
