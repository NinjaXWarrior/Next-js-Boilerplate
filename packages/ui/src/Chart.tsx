'use client';

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from './utils/cn';

/* Figma's monochrome chart ramp. The first two slots pass the dataviz palette
   validator on white; the light tints follow the design and rely on the relief
   that is always present here: legend for 2+ series, tooltips, and white gaps
   between pie cells. */
const CHART_COLORS = [
  'var(--primary-500)',
  'var(--primary-200)',
  'var(--primary-400)',
  'var(--primary-100)',
  'var(--primary-600)',
  'var(--primary-300)',
];

const tickStyle = { fill: 'var(--neutral-500)', fontSize: 12 };
const tooltipStyle = {
  border: '1px solid var(--neutral-200)',
  borderRadius: 8,
  fontSize: 12,
};
const legendStyle = { fontSize: 12 };

export const LineChart = (props: {
  className?: string;
  curved?: boolean;
  data: Record<string, number | string>[];
  height?: number;
  label?: string;
  series: string[];
  xKey: string;
}) => (
  <figure aria-label={props.label} className={cn('m-0 w-full', props.className)}>
    <ResponsiveContainer height={props.height ?? 300} width="100%">
      <RechartsLineChart accessibilityLayer data={props.data}>
        <CartesianGrid stroke="var(--neutral-200)" vertical={false} />
        <XAxis axisLine={false} dataKey={props.xKey} tick={tickStyle} tickLine={false} />
        <YAxis axisLine={false} tick={tickStyle} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} />
        {props.series.length > 1 && (
          <Legend iconSize={8} iconType="circle" wrapperStyle={legendStyle} />
        )}
        {props.series.map((key, index) => (
          <Line
            dataKey={key}
            dot={false}
            key={key}
            stroke={CHART_COLORS[index % CHART_COLORS.length]}
            strokeWidth={2}
            type={props.curved ? 'monotone' : 'linear'}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  </figure>
);

export const BarChart = (props: {
  className?: string;
  data: Record<string, number | string>[];
  height?: number;
  horizontal?: boolean;
  label?: string;
  series: string[];
  xKey: string;
}) => (
  <figure aria-label={props.label} className={cn('m-0 w-full', props.className)}>
    <ResponsiveContainer height={props.height ?? 300} width="100%">
      <RechartsBarChart
        accessibilityLayer
        data={props.data}
        layout={props.horizontal ? 'vertical' : 'horizontal'}
      >
        <CartesianGrid
          horizontal={!props.horizontal}
          stroke="var(--neutral-200)"
          vertical={Boolean(props.horizontal)}
        />
        {props.horizontal ? (
          <>
            <XAxis axisLine={false} tick={tickStyle} tickLine={false} type="number" />
            <YAxis
              axisLine={false}
              dataKey={props.xKey}
              tick={tickStyle}
              tickLine={false}
              type="category"
              width={40}
            />
          </>
        ) : (
          <>
            <XAxis axisLine={false} dataKey={props.xKey} tick={tickStyle} tickLine={false} />
            <YAxis axisLine={false} tick={tickStyle} tickLine={false} width={40} />
          </>
        )}
        <Tooltip contentStyle={tooltipStyle} />
        {props.series.length > 1 && (
          <Legend iconSize={8} iconType="circle" wrapperStyle={legendStyle} />
        )}
        {props.series.map((key, index) => (
          <Bar
            dataKey={key}
            fill={CHART_COLORS[index % CHART_COLORS.length]}
            key={key}
            maxBarSize={32}
            radius={props.horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  </figure>
);

export const PieChart = (props: {
  centerLabel?: string;
  centerValue?: string;
  className?: string;
  data: { name: string; value: number }[];
  height?: number;
  label?: string;
  type?: 'donut' | 'half' | 'pie';
}) => {
  const type = props.type ?? 'pie';
  const half = type === 'half';

  return (
    <figure aria-label={props.label} className={cn('m-0 w-full', props.className)}>
      <ResponsiveContainer height={props.height ?? 300} width="100%">
        <RechartsPieChart>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend iconSize={8} iconType="circle" wrapperStyle={legendStyle} />
          <Pie
            cy={half ? '70%' : '50%'}
            data={props.data.map((entry, index) => ({
              ...entry,
              fill: CHART_COLORS[index % CHART_COLORS.length],
            }))}
            dataKey="value"
            endAngle={half ? 0 : undefined}
            innerRadius={type === 'pie' ? 0 : '60%'}
            nameKey="name"
            startAngle={half ? 180 : undefined}
            stroke="white"
            strokeWidth={2}
          >
            {type !== 'pie' && props.centerValue && (
              <Label
                content={(labelProps) => {
                  const { viewBox } = labelProps;
                  if (!viewBox || !('cx' in viewBox) || viewBox.cx === undefined) {
                    return null;
                  }
                  return (
                    <text textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                      {props.centerLabel && (
                        <tspan
                          className="fill-neutral-500 text-label-sm"
                          dy="-0.4em"
                          x={viewBox.cx}
                        >
                          {props.centerLabel}
                        </tspan>
                      )}
                      <tspan
                        className="fill-neutral-900 text-h5 font-semibold"
                        dy="1.2em"
                        x={viewBox.cx}
                      >
                        {props.centerValue}
                      </tspan>
                    </text>
                  );
                }}
              />
            )}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </figure>
  );
};
