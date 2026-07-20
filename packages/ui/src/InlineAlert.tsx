import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { cn } from './utils/cn';

const inlineAlertVariants = cva('flex gap-3 rounded-lg p-4', {
  variants: {
    variant: {
      default: '',
      primary: '',
      success: '',
      warning: '',
      destructive: '',
    },
    alertStyle: {
      accent: '',
      outlined: 'border bg-white',
      filled: 'text-white',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      alertStyle: 'accent',
      class: 'border border-neutral-200 bg-white text-neutral-700',
    },
    { variant: 'default', alertStyle: 'outlined', class: 'border-neutral-300 text-neutral-700' },
    { variant: 'default', alertStyle: 'filled', class: 'bg-neutral-900' },
    { variant: 'primary', alertStyle: 'accent', class: 'bg-primary-50 text-primary-700' },
    { variant: 'primary', alertStyle: 'outlined', class: 'border-primary-300 text-primary-700' },
    { variant: 'primary', alertStyle: 'filled', class: 'bg-primary-500' },
    { variant: 'success', alertStyle: 'accent', class: 'bg-success-50 text-success-700' },
    { variant: 'success', alertStyle: 'outlined', class: 'border-success-300 text-success-700' },
    { variant: 'success', alertStyle: 'filled', class: 'bg-success-600' },
    { variant: 'warning', alertStyle: 'accent', class: 'bg-warning-50 text-warning-700' },
    { variant: 'warning', alertStyle: 'outlined', class: 'border-warning-300 text-warning-700' },
    { variant: 'warning', alertStyle: 'filled', class: 'bg-warning-600' },
    {
      variant: 'destructive',
      alertStyle: 'accent',
      class: 'bg-destructive-50 text-destructive-700',
    },
    {
      variant: 'destructive',
      alertStyle: 'outlined',
      class: 'border-destructive-300 text-destructive-700',
    },
    { variant: 'destructive', alertStyle: 'filled', class: 'bg-destructive-500' },
  ],
  defaultVariants: {
    variant: 'default',
    alertStyle: 'accent',
  },
});

const icons = {
  default: InfoIcon,
  primary: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  destructive: CircleAlertIcon,
};

export const InlineAlert = (props: {
  alertStyle?: VariantProps<typeof inlineAlertVariants>['alertStyle'];
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: VariantProps<typeof inlineAlertVariants>['variant'];
}) => {
  const Icon = icons[props.variant ?? 'default'];

  return (
    <div
      className={cn(
        inlineAlertVariants({ alertStyle: props.alertStyle, variant: props.variant }),
        props.className,
      )}
      role="alert"
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="flex flex-col gap-1">
        {props.title && <p className="text-label-md font-semibold">{props.title}</p>}
        <div className="text-sm">{props.children}</div>
      </div>
    </div>
  );
};
