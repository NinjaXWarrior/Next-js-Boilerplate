import { cn } from './utils/cn';

export const Input = (props: {
  className?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  label?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    {props.label && (
      <label className="text-sm font-medium text-slate-700" htmlFor={props.id}>
        {props.label}
      </label>
    )}
    <input
      aria-label={props.label ?? props.placeholder}
      className={cn(
        'rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50',
        props.error ? 'border-red-500' : 'border-slate-300',
        props.className,
      )}
      disabled={props.disabled}
      id={props.id}
      onChange={(event) => props.onChange?.(event.target.value)}
      placeholder={props.placeholder}
      type={props.type ?? 'text'}
      value={props.value}
    />
    {props.error && <p className="text-sm text-red-600">{props.error}</p>}
  </div>
);
