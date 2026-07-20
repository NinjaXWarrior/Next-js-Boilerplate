'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { createContext, useContext } from 'react';
import { cn } from './utils/cn';

const listVariants = cva('inline-flex items-center', {
  variants: {
    tabStyle: {
      button: 'gap-1 rounded-lg bg-neutral-100 p-1',
      buttonOutline: 'gap-2',
      dots: 'gap-2',
      divider: 'divide-x divide-neutral-200',
      lineBottom: 'gap-1 border-b border-neutral-200',
      lineTop: 'gap-1 border-t border-neutral-200',
    },
  },
  defaultVariants: {
    tabStyle: 'button',
  },
});

const triggerVariants = cva(
  'font-medium text-neutral-600 outline-none transition data-[state=active]:text-primary-600 data-disabled:pointer-events-none data-disabled:opacity-50',
  {
    variants: {
      tabStyle: {
        button: 'rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs',
        buttonOutline:
          'rounded-lg border border-transparent data-[state=active]:border-primary-500 data-[state=active]:bg-white',
        dots: 'relative after:absolute after:bottom-0 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary-500 after:opacity-0 data-[state=active]:after:opacity-100',
        divider: 'rounded-none',
        lineBottom:
          '-mb-px rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:bg-primary-50',
        lineTop:
          '-mt-px rounded-none border-t-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:bg-primary-50',
      },
      size: {
        sm: 'px-2.5 py-1 text-label-sm',
        md: 'px-3 py-1.5 text-label-md',
        lg: 'px-4 py-2 text-label-md',
      },
    },
    defaultVariants: {
      tabStyle: 'button',
      size: 'md',
    },
  },
);

type TabsStyleProps = {
  size?: VariantProps<typeof triggerVariants>['size'];
  tabStyle?: VariantProps<typeof triggerVariants>['tabStyle'];
};

const TabsStyleContext = createContext<TabsStyleProps>({});

export const Tabs = TabsPrimitive.Root;

export const TabsList = (props: {
  children: React.ReactNode;
  className?: string;
  size?: TabsStyleProps['size'];
  tabStyle?: TabsStyleProps['tabStyle'];
}) => (
  <TabsStyleContext.Provider value={{ size: props.size, tabStyle: props.tabStyle }}>
    <TabsPrimitive.List className={cn(listVariants({ tabStyle: props.tabStyle }), props.className)}>
      {props.children}
    </TabsPrimitive.List>
  </TabsStyleContext.Provider>
);

export const TabsTrigger = (props: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => {
  const style = useContext(TabsStyleContext);

  return (
    <TabsPrimitive.Trigger
      className={cn(
        triggerVariants({ size: style.size, tabStyle: style.tabStyle }),
        props.className,
      )}
      value={props.value}
    >
      {props.children}
    </TabsPrimitive.Trigger>
  );
};

export const TabsContent = (props: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => (
  <TabsPrimitive.Content className={cn('mt-3', props.className)} value={props.value}>
    {props.children}
  </TabsPrimitive.Content>
);
