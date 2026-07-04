'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from './utils/cn';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = (props: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <SelectPrimitive.Trigger
    className={cn(
      'flex w-full items-center justify-between gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50',
      props.className,
    )}
    id={props.id}
  >
    {props.children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="size-4 shrink-0 text-slate-500" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

export const SelectContent = (props: { children: React.ReactNode; className?: string }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md',
        props.className,
      )}
      position="popper"
    >
      <SelectPrimitive.Viewport className="p-1">{props.children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export const SelectItem = (props: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  value: string;
}) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2 text-sm text-slate-700 outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-slate-100',
      props.className,
    )}
    disabled={props.disabled}
    value={props.value}
  >
    <SelectPrimitive.ItemText>{props.children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center">
      <CheckIcon className="size-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);
