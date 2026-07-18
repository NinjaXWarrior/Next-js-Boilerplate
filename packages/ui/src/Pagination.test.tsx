import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe(Pagination, () => {
  it('marks the active page with aria-current', () => {
    render(<Pagination page={2} pageCount={5} />);

    expect(screen.getByRole('button', { name: '2' }).getAttribute('aria-current')).toBe('page');
  });

  it('calls onPageChange with the clicked page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn<(page: number) => void>();

    render(<Pagination onPageChange={onPageChange} page={2} pageCount={5} />);
    await user.click(screen.getByRole('button', { name: '4' }));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('navigates with the previous and next buttons', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn<(page: number) => void>();

    render(<Pagination onPageChange={onPageChange} page={2} pageCount={5} />);
    await user.click(screen.getByRole('button', { name: 'Previous page' }));
    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });

  it('disables previous on the first page and next on the last', () => {
    render(<Pagination page={1} pageCount={1} />);

    expect(screen.getByRole('button', { name: 'Previous page' })).toHaveProperty('disabled', true);
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveProperty('disabled', true);
  });

  it('windows long page lists with ellipses', () => {
    render(<Pagination page={6} pageCount={20} />);

    expect(screen.getByRole('button', { name: '1' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '6' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '20' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: '3' })).toBeNull();
    expect(screen.getAllByText('…')).toHaveLength(2);
  });

  it('shows every page when the count is small', () => {
    render(<Pagination page={1} pageCount={7} />);

    expect(screen.queryByText('…')).toBeNull();
    expect(screen.getByRole('button', { name: '7' })).toBeTruthy();
  });

  it('applies the pagination style to page buttons', () => {
    render(<Pagination page={1} pageCount={3} paginationStyle="outline" />);

    expect(screen.getByRole('button', { name: '1' }).className).toContain(
      'aria-[current=page]:border',
    );
  });
});
