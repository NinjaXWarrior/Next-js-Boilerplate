import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StickyAlert } from './StickyAlert';

describe(StickyAlert, () => {
  it('renders an alert with its message', () => {
    render(<StickyAlert>New version available</StickyAlert>);

    expect(screen.getByRole('alert').textContent).toContain('New version available');
  });

  it('applies the variant classes', () => {
    render(<StickyAlert variant="warning">Maintenance soon</StickyAlert>);

    expect(screen.getByRole('alert').className).toContain('bg-warning-600');
  });

  it('calls onDismiss from the dismiss button', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn<() => void>();

    render(<StickyAlert onDismiss={onDismiss}>New version available</StickyAlert>);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('omits the dismiss button without onDismiss', () => {
    render(<StickyAlert>New version available</StickyAlert>);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('applies the accent style', () => {
    render(
      <StickyAlert alertStyle="accent" variant="primary">
        New version available
      </StickyAlert>,
    );

    expect(screen.getByRole('alert').className).toContain('bg-primary-50');
  });

  it('centers content with middle alignment', () => {
    render(
      <StickyAlert align="middle" variant="primary">
        New version available
      </StickyAlert>,
    );

    expect(screen.getByRole('alert').className).toContain('justify-center');
  });
});
