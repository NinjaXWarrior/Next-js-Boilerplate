import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar, AvatarGroup } from './Avatar';

describe(Avatar, () => {
  it('renders the initials fallback', () => {
    render(<Avatar initials="NL" />);

    expect(screen.getByText('NL')).toBeTruthy();
  });

  it('renders the image when src is provided', () => {
    render(<Avatar alt="Nikhil" src="/avatar.png" />);

    expect(screen.getByRole('img', { name: 'Nikhil' })).toBeTruthy();
  });

  it('applies the size classes', () => {
    render(<Avatar initials="NL" size="xl" />);

    expect(screen.getByText('NL').className).toContain('size-14');
  });

  it('renders a placeholder icon without src or initials', () => {
    const { container } = render(<Avatar />);

    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('shows a status dot', () => {
    const { container } = render(<Avatar initials="NL" status="online" />);

    expect(container.querySelector('.bg-success-500')).toBeTruthy();
  });

  it('applies the shape classes', () => {
    render(<Avatar initials="NL" shape="rounded" />);

    expect(screen.getByText('NL').className).toContain('rounded-lg');
  });
});

describe(AvatarGroup, () => {
  it('renders its avatars and the overflow count', () => {
    render(
      <AvatarGroup moreCount={4}>
        <Avatar initials="AB" />
        <Avatar initials="CD" />
      </AvatarGroup>,
    );

    expect(screen.getByText('AB')).toBeTruthy();
    expect(screen.getByText('+4')).toBeTruthy();
  });

  it('omits the overflow count when zero', () => {
    render(
      <AvatarGroup moreCount={0}>
        <Avatar initials="AB" />
      </AvatarGroup>,
    );

    expect(screen.queryByText('+0')).toBeNull();
  });
});
