'use client';

import { useState } from 'react';
import { cn } from './utils/cn';

export const Switch = (props: {
  checked?: boolean;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}) => {
  const [internal, setInternal] = useState(props.defaultChecked ?? false);
  const checked = props.checked ?? internal;

  return (
    <button
      aria-checked={checked}
      aria-label={props.label}
      className={cn(
        'inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary-500' : 'bg-neutral-200',
        props.className,
      )}
      disabled={props.disabled}
      onClick={() => {
        setInternal(!checked);
        props.onChange?.(!checked);
      }}
      role="switch"
      type="button"
    >
      <span
        className={cn(
          'size-4 rounded-full bg-white shadow-xs transition-transform',
          checked && 'translate-x-4',
        )}
      />
    </button>
  );
};
