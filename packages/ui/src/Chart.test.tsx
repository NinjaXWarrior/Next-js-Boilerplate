import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BarChart, LineChart, PieChart } from './Chart';

const data = [
  { month: 'Jan', revenue: 10 },
  { month: 'Feb', revenue: 20 },
];

describe(LineChart, () => {
  it('renders a labeled figure', () => {
    render(<LineChart data={data} label="Revenue" series={['revenue']} xKey="month" />);

    expect(screen.getByRole('figure', { name: 'Revenue' })).toBeTruthy();
  });
});

describe(BarChart, () => {
  it('renders a labeled figure', () => {
    render(<BarChart data={data} label="Revenue" series={['revenue']} xKey="month" />);

    expect(screen.getByRole('figure', { name: 'Revenue' })).toBeTruthy();
  });
});

describe(PieChart, () => {
  it('renders a labeled figure', () => {
    render(<PieChart data={[{ name: 'Starter', value: 45 }]} label="Plan share" type="donut" />);

    expect(screen.getByRole('figure', { name: 'Plan share' })).toBeTruthy();
  });
});
