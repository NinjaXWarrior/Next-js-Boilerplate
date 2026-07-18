import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from './utils/cn';

const digitVariants = cva(
  'text-center font-medium text-neutral-900 outline-none transition disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      fieldStyle: {
        boxed: 'rounded-lg border bg-white focus:ring-4',
        lined: 'rounded-none border-b-2 bg-transparent',
        floating: 'rounded-lg border bg-white shadow-md focus:ring-4',
      },
      size: {
        sm: 'size-8 text-label-md',
        md: 'size-10 text-label-lg',
        lg: 'size-12 text-label-lg',
      },
      error: {
        true: 'border-destructive-500 focus:ring-destructive-100',
        false: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100',
      },
    },
    compoundVariants: [{ fieldStyle: 'floating', error: false, class: 'border-transparent' }],
    defaultVariants: {
      fieldStyle: 'boxed',
      size: 'md',
      error: false,
    },
  },
);

export const VerificationInput = (props: {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  fieldStyle?: VariantProps<typeof digitVariants>['fieldStyle'];
  length?: number;
  onChange?: (value: string) => void;
  size?: VariantProps<typeof digitVariants>['size'];
  value?: string;
}) => {
  const length = props.length ?? 6;
  const value = props.value ?? '';

  const handleChange = (index: number, digit: string, input: HTMLInputElement) => {
    const next = (value.padEnd(index, ' ').slice(0, index) + digit + value.slice(index + 1))
      .slice(0, length)
      .trimEnd();
    props.onChange?.(next);
    if (digit && input.nextElementSibling instanceof HTMLInputElement) {
      input.nextElementSibling.focus();
    }
  };

  return (
    <div className={cn('flex gap-2', props.className)}>
      {Array.from({ length }, (_, index) => (
        <input
          aria-label={`Digit ${index + 1}`}
          className={digitVariants({
            error: Boolean(props.error),
            fieldStyle: props.fieldStyle,
            size: props.size,
          })}
          disabled={props.disabled}
          inputMode="numeric"
          key={index}
          maxLength={1}
          onChange={(event) => {
            handleChange(index, event.target.value.replaceAll(/\D/gu, ''), event.currentTarget);
          }}
          onKeyDown={(event) => {
            if (
              event.key === 'Backspace' &&
              !event.currentTarget.value &&
              event.currentTarget.previousElementSibling instanceof HTMLInputElement
            ) {
              event.currentTarget.previousElementSibling.focus();
            }
          }}
          value={value[index]?.trim() ?? ''}
        />
      ))}
    </div>
  );
};
