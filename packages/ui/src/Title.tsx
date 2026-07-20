import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from './utils/cn';

const containerVariants = cva('flex gap-4', {
  variants: {
    align: {
      leading: 'flex-wrap items-start justify-between',
      middle: 'flex-col items-center text-center',
    },
  },
  defaultVariants: {
    align: 'leading',
  },
});

const headingVariants = cva('font-semibold text-neutral-900', {
  variants: {
    size: {
      sm: 'text-h5',
      md: 'text-h4',
      lg: 'text-h3',
      xl: 'text-h2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Title = (props: {
  actions?: React.ReactNode;
  align?: VariantProps<typeof containerVariants>['align'];
  className?: string;
  size?: VariantProps<typeof headingVariants>['size'];
  subtitle?: string;
  title: string;
}) => (
  <div className={cn(containerVariants({ align: props.align }), props.className)}>
    <div className={cn('flex flex-col gap-1', props.align === 'middle' && 'items-center')}>
      <h2 className={headingVariants({ size: props.size })}>{props.title}</h2>
      {props.subtitle && <p className="text-sm text-neutral-600">{props.subtitle}</p>}
    </div>
    {props.actions && <div className="flex items-center gap-2">{props.actions}</div>}
  </div>
);
