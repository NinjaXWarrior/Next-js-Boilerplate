import { cn } from './utils/cn';

/* ponytail: native range input; swap to a Radix Slider if the design needs custom track/thumb chrome. */
export const Slider = (props: {
  className?: string;
  defaultValue?: number;
  disabled?: boolean;
  label?: string;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  step?: number;
  value?: number;
}) => (
  <input
    aria-label={props.label ?? 'Slider'}
    className={cn(
      'w-full cursor-pointer accent-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
      props.className,
    )}
    defaultValue={props.defaultValue}
    disabled={props.disabled}
    max={props.max ?? 100}
    min={props.min ?? 0}
    onChange={(event) => props.onChange?.(Number(event.target.value))}
    step={props.step}
    type="range"
    value={props.value}
  />
);
