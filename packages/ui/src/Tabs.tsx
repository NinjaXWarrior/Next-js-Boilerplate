'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from './utils/cn';

export const Tabs = TabsPrimitive.Root;

export const TabsList = (props: { children: React.ReactNode; className?: string }) => (
  <TabsPrimitive.List
    className={cn('inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1', props.className)}
  >
    {props.children}
  </TabsPrimitive.List>
);

export const TabsTrigger = (props: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => (
  <TabsPrimitive.Trigger
    className={cn(
      'rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm',
      props.className,
    )}
    value={props.value}
  >
    {props.children}
  </TabsPrimitive.Trigger>
);

export const TabsContent = (props: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => (
  <TabsPrimitive.Content className={cn('mt-3', props.className)} value={props.value}>
    {props.children}
  </TabsPrimitive.Content>
);
