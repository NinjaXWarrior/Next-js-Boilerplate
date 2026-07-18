import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from './utils/cn';

const trackVariants = cva('w-full overflow-hidden rounded-full bg-neutral-100', {
  variants: {
    size: {
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const fillVariants = cva('h-full rounded-full transition-all', {
  variants: {
    variant: {
      primary: 'bg-primary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      destructive: 'bg-destructive-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const ProgressBar = (props: {
  className?: string;
  size?: VariantProps<typeof trackVariants>['size'];
  value: number;
  variant?: VariantProps<typeof fillVariants>['variant'];
}) => {
  const value = Math.min(100, Math.max(0, props.value));

  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn(trackVariants({ size: props.size }), props.className)}
      role="progressbar"
    >
      <div className={fillVariants({ variant: props.variant })} style={{ width: `${value}%` }} />
    </div>
  );
};
