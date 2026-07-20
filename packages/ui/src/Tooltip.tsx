'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from './utils/cn';

const tooltipVariants = cva('z-50 rounded-md px-2.5 py-1.5 text-label-sm shadow-sm', {
  variants: {
    variant: {
      neutral: 'bg-neutral-900 text-white',
      primary: 'bg-primary-500 text-white',
      white: 'border border-neutral-200 bg-white text-neutral-900 shadow-md',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

const arrowFill = {
  neutral: 'fill-neutral-900',
  primary: 'fill-primary-500',
  white: 'fill-white',
};

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = (props: {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  variant?: VariantProps<typeof tooltipVariants>['variant'];
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={cn(tooltipVariants({ variant: props.variant }), props.className)}
      sideOffset={props.sideOffset ?? 4}
    >
      {props.children}
      <TooltipPrimitive.Arrow className={arrowFill[props.variant ?? 'neutral']} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);
