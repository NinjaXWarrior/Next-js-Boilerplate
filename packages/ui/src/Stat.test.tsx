import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stat } from './Stat';

describe(Stat, () => {
  it('renders the label and value', () => {
    render(<Stat label="Revenue" value="$42k" />);

    expect(screen.getByText('Revenue')).toBeTruthy();
    expect(screen.getByText('$42k')).toBeTruthy();
  });

  it('shows an upward change in success color', () => {
    render(<Stat change="+12%" label="Revenue" trend="up" value="$42k" />);

    expect(screen.getByText('+12%').className).toContain('text-success-600');
  });

  it('shows a downward change in destructive color', () => {
    render(<Stat change="-4%" label="Revenue" trend="down" value="$42k" />);

    expect(screen.getByText('-4%').className).toContain('text-destructive-600');
  });
});
