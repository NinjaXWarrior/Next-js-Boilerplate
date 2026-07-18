import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressStep } from './ProgressStep';

const steps = ['Account', 'Billing', 'Confirm'];

describe(ProgressStep, () => {
  it('renders every step label', () => {
    render(<ProgressStep current={1} steps={steps} />);

    for (const step of steps) {
      expect(screen.getByText(step)).toBeTruthy();
    }
  });

  it('marks the current step with aria-current', () => {
    render(<ProgressStep current={1} steps={steps} />);

    expect(screen.getByText('Billing').closest('[aria-current="step"]')).toBeTruthy();
  });

  it('shows completed steps with a check instead of a number', () => {
    render(<ProgressStep current={1} steps={steps} />);

    expect(screen.queryByText('1')).toBeNull();
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('renders dot indicators without step numbers', () => {
    render(<ProgressStep current={1} indicator="dot" steps={steps} />);

    expect(screen.queryByText('2')).toBeNull();
    expect(screen.getByText('Billing')).toBeTruthy();
  });

  it('renders vertically', () => {
    const { container } = render(<ProgressStep current={0} direction="vertical" steps={steps} />);

    expect(container.querySelector('ol')?.className).toContain('flex-col');
  });
});
