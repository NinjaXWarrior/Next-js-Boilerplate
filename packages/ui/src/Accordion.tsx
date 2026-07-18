'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from './utils/cn';

const itemVariants = cva('', {
  variants: {
    accordionStyle: {
      outlined: 'border-b border-neutral-200',
      filled: 'mb-2 rounded-lg bg-neutral-50 px-4 last:mb-0',
      rounded: 'mb-3 rounded-xl border border-neutral-200 px-4 last:mb-0',
    },
  },
  defaultVariants: {
    accordionStyle: 'outlined',
  },
});

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = (props: {
  accordionStyle?: VariantProps<typeof itemVariants>['accordionStyle'];
  children: React.ReactNode;
  className?: string;
  value: string;
}) => (
  <AccordionPrimitive.Item
    className={cn(itemVariants({ accordionStyle: props.accordionStyle }), props.className)}
    value={props.value}
  >
    {props.children}
  </AccordionPrimitive.Item>
);

export const AccordionTrigger = (props: { children: React.ReactNode; className?: string }) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        'group flex flex-1 items-center justify-between py-4 text-left text-label-md font-medium text-neutral-900 transition hover:underline',
        props.className,
      )}
    >
      {props.children}
      <ChevronDownIcon className="size-4 shrink-0 text-neutral-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = (props: { children: React.ReactNode; className?: string }) => (
  <AccordionPrimitive.Content className="overflow-hidden text-sm text-neutral-700">
    <div className={cn('pb-4', props.className)}>{props.children}</div>
  </AccordionPrimitive.Content>
);
