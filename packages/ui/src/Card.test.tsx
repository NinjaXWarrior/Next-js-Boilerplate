import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe(Card, () => {
  it('renders its children', () => {
    render(<Card>Content</Card>);

    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders the title as a heading when provided', () => {
    render(<Card title="Overview">Content</Card>);

    expect(screen.getByRole('heading', { name: 'Overview' })).toBeTruthy();
  });

  it('omits the heading when no title is provided', () => {
    render(<Card>Content</Card>);

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
