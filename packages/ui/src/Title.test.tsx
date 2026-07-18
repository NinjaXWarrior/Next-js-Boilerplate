import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Title } from './Title';

describe(Title, () => {
  it('renders the title as a heading', () => {
    render(<Title title="Team members" />);

    expect(screen.getByRole('heading', { name: 'Team members' })).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    render(<Title subtitle="Manage access" title="Team members" />);

    expect(screen.getByText('Manage access')).toBeTruthy();
  });

  it('renders the actions slot', () => {
    render(<Title actions={<button type="button">Invite</button>} title="Team members" />);

    expect(screen.getByRole('button', { name: 'Invite' })).toBeTruthy();
  });

  it('applies the size and alignment classes', () => {
    const { container } = render(<Title align="middle" size="xl" title="Team members" />);

    expect(screen.getByRole('heading').className).toContain('text-h2');
    expect(container.firstElementChild?.className).toContain('items-center');
  });
});
