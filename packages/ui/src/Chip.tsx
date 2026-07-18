import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import { cn } from './utils/cn';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium transition disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      color: {
        primary: '',
        neutral: '',
        success: '',
        warning: '',
        destructive: '',
      },
      chipStyle: {
        filled: 'text-white',
        outline: 'border bg-transparent',
      },
      size: {
        sm: 'px-2.5 py-1 text-label-sm',
        md: 'px-3 py-1.5 text-label-md',
        lg: 'px-4 py-2 text-label-md',
      },
    },
    compoundVariants: [
      {
        color: 'primary',
        chipStyle: 'filled',
        class: 'bg-primary-500 hover:bg-primary-600 data-[selected=true]:bg-primary-800',
      },
      {
        color: 'primary',
        chipStyle: 'outline',
        class:
          'border-neutral-300 text-neutral-700 hover:bg-neutral-50 data-[selected=true]:border-primary-500 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-600',
      },
      {
        color: 'neutral',
        chipStyle: 'filled',
        class: 'bg-neutral-500 hover:bg-neutral-600 data-[selected=true]:bg-neutral-800',
      },
      {
        color: 'neutral',
        chipStyle: 'outline',
        class:
          'border-neutral-300 text-neutral-700 hover:bg-neutral-50 data-[selected=true]:border-neutral-500 data-[selected=true]:bg-neutral-100 data-[selected=true]:text-neutral-900',
      },
      {
        color: 'success',
        chipStyle: 'filled',
        class: 'bg-success-500 hover:bg-success-600 data-[selected=true]:bg-success-800',
      },
      {
        color: 'success',
        chipStyle: 'outline',
        class:
          'border-neutral-300 text-neutral-700 hover:bg-neutral-50 data-[selected=true]:border-success-500 data-[selected=true]:bg-success-50 data-[selected=true]:text-success-700',
      },
      {
        color: 'warning',
        chipStyle: 'filled',
        class: 'bg-warning-500 hover:bg-warning-600 data-[selected=true]:bg-warning-800',
      },
      {
        color: 'warning',
        chipStyle: 'outline',
        class:
          'border-neutral-300 text-neutral-700 hover:bg-neutral-50 data-[selected=true]:border-warning-500 data-[selected=true]:bg-warning-50 data-[selected=true]:text-warning-700',
      },
      {
        color: 'destructive',
        chipStyle: 'filled',
        class:
          'bg-destructive-500 hover:bg-destructive-600 data-[selected=true]:bg-destructive-800',
      },
      {
        color: 'destructive',
        chipStyle: 'outline',
        class:
          'border-neutral-300 text-neutral-700 hover:bg-neutral-50 data-[selected=true]:border-destructive-500 data-[selected=true]:bg-destructive-50 data-[selected=true]:text-destructive-700',
      },
    ],
    defaultVariants: {
      color: 'primary',
      chipStyle: 'outline',
      size: 'md',
    },
  },
);

export const Chip = (props: {
  children: React.ReactNode;
  chipStyle?: VariantProps<typeof chipVariants>['chipStyle'];
  className?: string;
  color?: VariantProps<typeof chipVariants>['color'];
  disabled?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  selected?: boolean;
  size?: VariantProps<typeof chipVariants>['size'];
}) => {
  const classes = cn(
    chipVariants({ chipStyle: props.chipStyle, color: props.color, size: props.size }),
    props.className,
  );

  if (props.onRemove) {
    return (
      <span className={classes} data-selected={props.selected ?? false}>
        {props.children}
        <button
          aria-label="Remove"
          className="rounded-full transition hover:opacity-70"
          onClick={props.onRemove}
          type="button"
        >
          <XIcon className="size-3.5" />
        </button>
      </span>
    );
  }

  return (
    <button
      aria-pressed={props.selected}
      className={classes}
      data-selected={props.selected ?? false}
      disabled={props.disabled}
      onClick={props.onClick}
      type="button"
    >
      {props.children}
    </button>
  );
};
