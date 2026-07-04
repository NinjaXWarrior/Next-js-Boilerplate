'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from './utils/cn';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = (props: {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={cn(
        'z-50 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow-sm',
        props.className,
      )}
      sideOffset={props.sideOffset ?? 4}
    >
      {props.children}
      <TooltipPrimitive.Arrow className="fill-slate-900" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);
