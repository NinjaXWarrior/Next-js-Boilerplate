import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Rating } from './Rating';

describe(Rating, () => {
  it('exposes the read-only value as an image label', () => {
    render(<Rating value={3} />);

    expect(screen.getByRole('img', { name: '3 out of 5' })).toBeTruthy();
  });

  it('renders one button per star when interactive', () => {
    render(<Rating onChange={() => {}} value={3} />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onChange with the clicked star value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: number) => void>();

    render(<Rating onChange={onChange} value={2} />);
    await user.click(screen.getByRole('button', { name: 'Rate 5 out of 5' }));

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('rounds the value to the nearest half star', () => {
    render(<Rating value={3.3} />);

    expect(screen.getByRole('img', { name: '3.5 out of 5' })).toBeTruthy();
  });

  it('applies the neutral color', () => {
    const { container } = render(<Rating color="neutral" value={1} />);

    expect(container.querySelector('.fill-neutral-600')).toBeTruthy();
  });

  it('respects a custom maximum', () => {
    render(<Rating max={10} value={7} />);

    expect(screen.getByRole('img', { name: '7 out of 10' })).toBeTruthy();
  });
});
