import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from './utils/cn';

const inputVariants = cva(
  'text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      fieldStyle: {
        boxed: 'rounded-lg border bg-white px-3 py-2 shadow-xs focus:ring-4',
        outlined: 'rounded-lg border bg-transparent px-3 py-2 focus:ring-4',
        lined: 'border-b bg-transparent px-0 py-2',
      },
      error: {
        true: 'border-destructive-500 focus:ring-destructive-100',
        false: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100',
      },
    },
    defaultVariants: {
      fieldStyle: 'boxed',
      error: false,
    },
  },
);

export const Input = (props: {
  className?: string;
  disabled?: boolean;
  error?: string;
  fieldStyle?: VariantProps<typeof inputVariants>['fieldStyle'];
  id?: string;
  label?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    {props.label && (
      <label className="text-label-md font-medium text-neutral-700" htmlFor={props.id}>
        {props.label}
      </label>
    )}
    <input
      aria-label={props.label ?? props.placeholder}
      className={cn(
        inputVariants({ error: Boolean(props.error), fieldStyle: props.fieldStyle }),
        props.className,
      )}
      disabled={props.disabled}
      id={props.id}
      onChange={(event) => props.onChange?.(event.target.value)}
      placeholder={props.placeholder}
      type={props.type ?? 'text'}
      value={props.value}
    />
    {props.error && <p className="text-sm text-destructive-600">{props.error}</p>}
  </div>
);
