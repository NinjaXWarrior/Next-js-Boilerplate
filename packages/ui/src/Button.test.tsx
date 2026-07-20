import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe(Button, () => {
  it('renders its children', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
  });

  it('defaults to the button type', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button').getAttribute('type')).toBe('button');
  });

  it('applies the default variant and size classes', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button');

    expect(button.className).toContain('bg-primary-500');
    expect(button.className).toContain('h-10');
  });

  it('applies the requested variant and size classes', () => {
    render(
      <Button size="xxl" variant="outlined">
        Save
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button.className).toContain('border-neutral-300');
    expect(button.className).toContain('h-16');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn<() => void>();

    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('ignores clicks when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn<() => void>();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies every variant class', () => {
    const variants = [
      ['filled', 'bg-primary-500'],
      ['accent', 'bg-primary-50'],
      ['outlined', 'border-neutral-300'],
      ['grayscale', 'bg-neutral-100'],
    ] as const;

    for (const [variant, expected] of variants) {
      const { unmount } = render(<Button variant={variant}>Save</Button>);

      expect(screen.getByRole('button').className).toContain(expected);
      unmount();
    }
  });

  it('respects an explicit submit type', () => {
    render(<Button type="submit">Save</Button>);

    expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
  });
});
