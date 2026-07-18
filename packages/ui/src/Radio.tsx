import { cn } from './utils/cn';

export const Radio = (props: {
  checked?: boolean;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  label: string;
  name: string;
  onChange?: (value: string) => void;
  value: string;
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
      name={props.name}
      onChange={() => props.onChange?.(props.value)}
      type="radio"
      value={props.value}
    />
    {props.label}
  </label>
);
