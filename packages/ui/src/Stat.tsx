import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { cn } from './utils/cn';

const valueVariants = cva('font-semibold text-neutral-900', {
  variants: {
    size: {
      sm: 'text-h5',
      md: 'text-h4',
      lg: 'text-h3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Stat = (props: {
  change?: string;
  className?: string;
  label: string;
  size?: VariantProps<typeof valueVariants>['size'];
  trend?: 'down' | 'up';
  value: string;
}) => (
  <div className={cn('flex flex-col gap-1', props.className)}>
    <span className="text-label-md text-neutral-500">{props.label}</span>
    <span className={valueVariants({ size: props.size })}>{props.value}</span>
    {props.change && (
      <span
        className={cn(
          'flex items-center gap-1 text-label-sm font-medium',
          props.trend === 'down' ? 'text-destructive-600' : 'text-success-600',
        )}
      >
        {props.trend === 'down' ? (
          <TrendingDownIcon className="size-3.5" />
        ) : (
          <TrendingUpIcon className="size-3.5" />
        )}
        {props.change}
      </span>
    )}
  </div>
);
