import { cn } from './utils/cn';

/* ponytail: native checkbox + accent-color; swap to a custom control if the design
   needs the rounded/circle shapes or indeterminate visuals. */
export const Checkbox = (props: {
  checked?: boolean;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  label: string;
  onChange?: (checked: boolean) => void;
}) => (
  <label
    className={cn(
      'flex items-center gap-2 text-label-md text-neutral-700',
      props.disabled && 'cursor-not-allowed opacity-50',
      props.className,
    )}
    htmlFor={props.id}
  >
    <input
      checked={props.checked}
      className="size-4 accent-primary-500"
      defaultChecked={props.defaultChecked}
      disabled={props.disabled}
      id={props.id}
      onChange={(event) => props.onChange?.(event.target.checked)}
      type="checkbox"
    />
    {props.label}
  </label>
);
