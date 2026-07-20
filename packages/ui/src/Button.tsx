import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from './utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium outline-none transition focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Figma's Pressed state maps to 800 because the file's Primary/700 duplicates 500.
        filled:
          'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-100 active:bg-primary-800',
        accent:
          'bg-primary-50 text-primary-600 hover:bg-primary-100 focus-visible:ring-primary-100 active:bg-primary-200',
        outlined:
          'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus-visible:ring-neutral-100 active:bg-neutral-100',
        grayscale:
          'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible:ring-neutral-100 active:bg-neutral-300',
      },
      size: {
        xs: 'h-6 gap-1 px-2 text-label-sm',
        sm: 'h-8 gap-1.5 px-3 text-label-sm',
        md: 'h-10 gap-2 px-4 text-label-md',
        lg: 'h-12 gap-2 px-5 text-label-md',
        xl: 'h-14 gap-2 px-6 text-label-lg',
        xxl: 'h-16 gap-2.5 px-7 text-label-lg',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
    },
  },
);

export const Button = (props: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: VariantProps<typeof buttonVariants>['size'];
  type?: 'button' | 'reset' | 'submit';
  variant?: VariantProps<typeof buttonVariants>['variant'];
}) => (
  <button
    className={cn(buttonVariants({ size: props.size, variant: props.variant }), props.className)}
    disabled={props.disabled}
    onClick={props.onClick}
    type={props.type ?? 'button'}
  >
    {props.children}
  </button>
);
