import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

describe(Slider, () => {
  it('renders a labeled range input', () => {
    render(<Slider label="Volume" />);

    expect(screen.getByRole('slider', { name: 'Volume' })).toBeTruthy();
  });

  it('calls onChange with the numeric value', () => {
    const onChange = vi.fn<(value: number) => void>();

    render(<Slider label="Volume" onChange={onChange} value={10} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '40' } });

    expect(onChange).toHaveBeenCalledWith(40);
  });

  it('respects min and max bounds', () => {
    render(<Slider label="Volume" max={80} min={20} />);

    const slider = screen.getByRole('slider');

    expect(slider.getAttribute('min')).toBe('20');
    expect(slider.getAttribute('max')).toBe('80');
  });

  it('starts from defaultValue when uncontrolled', () => {
    render(<Slider defaultValue={40} label="Volume" />);

    expect(screen.getByRole('slider')).toHaveProperty('value', '40');
  });

  it('is disabled when requested', () => {
    render(<Slider disabled label="Volume" />);

    expect(screen.getByRole('slider')).toHaveProperty('disabled', true);
  });
});
