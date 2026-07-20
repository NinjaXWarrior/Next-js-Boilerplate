import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import { cn } from './utils/cn';

const stickyAlertVariants = cva(
  'flex w-full items-center gap-3 px-4 py-3 text-label-md font-medium',
  {
    variants: {
      variant: {
        primary: '',
        success: '',
        warning: '',
        destructive: '',
        white: '',
        black: '',
      },
      alertStyle: {
        accent: '',
        filled: 'text-white',
      },
      align: {
        left: 'justify-start',
        middle: 'justify-center',
      },
    },
    compoundVariants: [
      { variant: 'primary', alertStyle: 'accent', class: 'bg-primary-50 text-primary-600' },
      { variant: 'primary', alertStyle: 'filled', class: 'bg-primary-600' },
      { variant: 'success', alertStyle: 'accent', class: 'bg-success-50 text-success-700' },
      { variant: 'success', alertStyle: 'filled', class: 'bg-success-600' },
      { variant: 'warning', alertStyle: 'accent', class: 'bg-warning-50 text-warning-700' },
      { variant: 'warning', alertStyle: 'filled', class: 'bg-warning-600' },
      {
        variant: 'destructive',
        alertStyle: 'accent',
        class: 'bg-destructive-50 text-destructive-600',
      },
      { variant: 'destructive', alertStyle: 'filled', class: 'bg-destructive-500' },
      {
        variant: 'white',
        alertStyle: 'accent',
        class: 'border-b border-neutral-200 bg-white text-neutral-900',
      },
      {
        variant: 'white',
        alertStyle: 'filled',
        class: 'border-b border-neutral-200 bg-white text-neutral-900',
      },
      { variant: 'black', alertStyle: 'accent', class: 'bg-neutral-800 text-white' },
      { variant: 'black', alertStyle: 'filled', class: 'bg-neutral-900' },
    ],
    defaultVariants: {
      variant: 'primary',
      alertStyle: 'filled',
      align: 'left',
    },
  },
);

export const StickyAlert = (props: {
  alertStyle?: VariantProps<typeof stickyAlertVariants>['alertStyle'];
  align?: VariantProps<typeof stickyAlertVariants>['align'];
  children: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
  variant?: VariantProps<typeof stickyAlertVariants>['variant'];
}) => (
  <div
    className={cn(
      stickyAlertVariants({
        alertStyle: props.alertStyle,
        align: props.align,
        variant: props.variant,
      }),
      props.className,
    )}
    role="alert"
  >
    {props.children}
    {props.onDismiss && (
      <button
        aria-label="Dismiss"
        className="ml-auto rounded-md p-1 transition hover:opacity-70"
        onClick={props.onDismiss}
        type="button"
      >
        <XIcon className="size-4" />
      </button>
    )}
  </div>
);
