'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from './utils/cn';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = (props: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => (
  <AccordionPrimitive.Item
    className={cn('border-b border-slate-200', props.className)}
    value={props.value}
  >
    {props.children}
  </AccordionPrimitive.Item>
);

export const AccordionTrigger = (props: { children: React.ReactNode; className?: string }) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        'group flex flex-1 items-center justify-between py-4 text-left text-sm font-medium text-slate-950 transition hover:underline',
        props.className,
      )}
    >
      {props.children}
      <ChevronDownIcon className="size-4 shrink-0 text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = (props: { children: React.ReactNode; className?: string }) => (
  <AccordionPrimitive.Content className="overflow-hidden text-sm text-slate-700">
    <div className={cn('pb-4', props.className)}>{props.children}</div>
  </AccordionPrimitive.Content>
);
