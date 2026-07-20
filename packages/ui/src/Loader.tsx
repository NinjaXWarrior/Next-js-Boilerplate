import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { LoaderCircleIcon } from 'lucide-react';
import { cn } from './utils/cn';

const loaderVariants = cva('animate-spin text-primary-500', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
      xxl: 'size-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Loader = (props: {
  className?: string;
  label?: string;
  size?: VariantProps<typeof loaderVariants>['size'];
}) => (
  <output>
    <LoaderCircleIcon className={cn(loaderVariants({ size: props.size }), props.className)} />
    <span className="sr-only">{props.label ?? 'Loading'}</span>
  </output>
);
