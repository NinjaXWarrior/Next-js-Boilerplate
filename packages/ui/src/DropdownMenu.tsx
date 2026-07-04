'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from './utils/cn';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = (props: {
  align?: 'center' | 'end' | 'start';
  children: React.ReactNode;
  className?: string;
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      align={props.align ?? 'start'}
      className={cn(
        'z-50 min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-md',
        props.className,
      )}
      sideOffset={4}
    >
      {props.children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem = (props: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
}) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'cursor-pointer rounded-md px-2 py-1.5 text-sm text-slate-700 outline-none transition data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-slate-100',
      props.className,
    )}
    disabled={props.disabled}
    onSelect={props.onSelect}
  >
    {props.children}
  </DropdownMenuPrimitive.Item>
);

export const DropdownMenuLabel = (props: { children: React.ReactNode; className?: string }) => (
  <DropdownMenuPrimitive.Label
    className={cn('px-2 py-1.5 text-xs font-semibold text-slate-500', props.className)}
  >
    {props.children}
  </DropdownMenuPrimitive.Label>
);

export const DropdownMenuSeparator = (props: { className?: string }) => (
  <DropdownMenuPrimitive.Separator className={cn('my-1 h-px bg-slate-200', props.className)} />
);
