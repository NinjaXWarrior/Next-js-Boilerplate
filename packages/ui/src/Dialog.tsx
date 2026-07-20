'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from './utils/cn';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = (props: { children: React.ReactNode; className?: string }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
    <DialogPrimitive.Content
      className={cn(
        'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl',
        props.className,
      )}
    >
      {props.children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-lg p-1 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900">
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export const DialogHeader = (props: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mb-4 flex flex-col gap-1.5', props.className)}>{props.children}</div>
);

export const DialogFooter = (props: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mt-6 flex justify-end gap-2', props.className)}>{props.children}</div>
);

export const DialogTitle = (props: { children: React.ReactNode; className?: string }) => (
  <DialogPrimitive.Title className={cn('text-lg font-semibold text-neutral-900', props.className)}>
    {props.children}
  </DialogPrimitive.Title>
);

export const DialogDescription = (props: { children: React.ReactNode; className?: string }) => (
  <DialogPrimitive.Description className={cn('text-sm text-neutral-600', props.className)}>
    {props.children}
  </DialogPrimitive.Description>
);
