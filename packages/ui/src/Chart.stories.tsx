import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart, LineChart, PieChart } from './Chart';

const monthly = [
  { month: 'Jan', revenue: 74, expenses: 42 },
  { month: 'Feb', revenue: 58, expenses: 31 },
  { month: 'Mar', revenue: 66, expenses: 48 },
  { month: 'Apr', revenue: 51, expenses: 85 },
  { month: 'May', revenue: 72, expenses: 20 },
  { month: 'Jun', revenue: 87, expenses: 41 },
];

const shares = [
  { name: 'Starter', value: 45 },
  { name: 'Pro', value: 30 },
  { name: 'Team', value: 15 },
  { name: 'Enterprise', value: 10 },
];

const meta: Meta<typeof LineChart> = {
  title: 'Base/Chart',
  component: LineChart,
};

export default meta;

export const Line: StoryObj<typeof LineChart> = {
  render: () => (
    <LineChart data={monthly} label="Monthly revenue" series={['revenue']} xKey="month" />
  ),
};

export const LineMultiSeries: StoryObj<typeof LineChart> = {
  render: () => (
    <LineChart
      curved
      data={monthly}
      label="Revenue vs expenses"
      series={['revenue', 'expenses']}
      xKey="month"
    />
  ),
};

export const Bars: StoryObj<typeof BarChart> = {
  render: () => (
    <BarChart
      data={monthly}
      label="Revenue vs expenses"
      series={['revenue', 'expenses']}
      xKey="month"
    />
  ),
};

export const BarsHorizontal: StoryObj<typeof BarChart> = {
  render: () => (
    <BarChart data={monthly} horizontal label="Monthly revenue" series={['revenue']} xKey="month" />
  ),
};

export const PieSlices: StoryObj<typeof PieChart> = {
  render: () => <PieChart data={shares} label="Plan share" />,
};

export const Donut: StoryObj<typeof PieChart> = {
  render: () => (
    <PieChart
      centerLabel="Customers"
      centerValue="99,999"
      data={shares}
      label="Plan share"
      type="donut"
    />
  ),
};

export const Half: StoryObj<typeof PieChart> = {
  render: () => (
    <PieChart
      centerLabel="Goal"
      centerValue="72%"
      data={shares}
      label="Goal progress"
      type="half"
    />
  ),
};
