import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from './utils/cn';

const badgeVariants = cva('inline-flex items-center font-medium', {
  variants: {
    variant: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      destructive: '',
    },
    badgeStyle: {
      filled: 'text-white',
      accent: '',
      outlined: 'border bg-transparent',
    },
    size: {
      sm: 'px-2 py-0.5 text-label-sm',
      md: 'px-2.5 py-1 text-label-sm',
      lg: 'px-3 py-1 text-label-md',
    },
    shape: {
      pill: 'rounded-full',
      rounded: 'rounded-md',
    },
  },
  compoundVariants: [
    // Primary uses 600 for text because the file's Primary/700 duplicates 500.
    { variant: 'primary', badgeStyle: 'filled', class: 'bg-primary-500' },
    { variant: 'primary', badgeStyle: 'accent', class: 'bg-primary-50 text-primary-600' },
    { variant: 'primary', badgeStyle: 'outlined', class: 'border-primary-300 text-primary-600' },
    { variant: 'neutral', badgeStyle: 'filled', class: 'bg-neutral-500' },
    { variant: 'neutral', badgeStyle: 'accent', class: 'bg-neutral-100 text-neutral-700' },
    { variant: 'neutral', badgeStyle: 'outlined', class: 'border-neutral-300 text-neutral-700' },
    { variant: 'success', badgeStyle: 'filled', class: 'bg-success-500' },
    { variant: 'success', badgeStyle: 'accent', class: 'bg-success-100 text-success-700' },
    { variant: 'success', badgeStyle: 'outlined', class: 'border-success-300 text-success-700' },
    { variant: 'warning', badgeStyle: 'filled', class: 'bg-warning-500' },
    { variant: 'warning', badgeStyle: 'accent', class: 'bg-warning-100 text-warning-700' },
    { variant: 'warning', badgeStyle: 'outlined', class: 'border-warning-300 text-warning-700' },
    { variant: 'destructive', badgeStyle: 'filled', class: 'bg-destructive-500' },
    {
      variant: 'destructive',
      badgeStyle: 'accent',
      class: 'bg-destructive-100 text-destructive-700',
    },
    {
      variant: 'destructive',
      badgeStyle: 'outlined',
      class: 'border-destructive-300 text-destructive-700',
    },
  ],
  defaultVariants: {
    variant: 'neutral',
    badgeStyle: 'accent',
    size: 'md',
    shape: 'pill',
  },
});

export const Badge = (props: {
  badgeStyle?: VariantProps<typeof badgeVariants>['badgeStyle'];
  children: React.ReactNode;
  className?: string;
  shape?: VariantProps<typeof badgeVariants>['shape'];
  size?: VariantProps<typeof badgeVariants>['size'];
  variant?: VariantProps<typeof badgeVariants>['variant'];
}) => (
  <span
    className={cn(
      badgeVariants({
        badgeStyle: props.badgeStyle,
        shape: props.shape,
        size: props.size,
        variant: props.variant,
      }),
      props.className,
    )}
  >
    {props.children}
  </span>
);
