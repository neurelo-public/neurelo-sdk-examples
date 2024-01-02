'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';

type ComponentProps = TooltipPrimitive.TooltipProps & {
  content: React.ReactNode | string;
  asChild?: boolean;
  showArrow?: boolean;
};

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  asChild = true,
  showArrow = false,
  delayDuration = 0,
  ...props
}: ComponentProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}>
        <TooltipPrimitive.Trigger asChild={asChild}>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="bottom"
          align="center"
          className="bg-zinc-700 text-white text-sm px-2 py-1 rounded-md z-30"
          {...props}>
          {content}
          {showArrow ? (
            <TooltipPrimitive.Arrow
              width={11}
              height={5}
              className="fill-zinc-700"
            />
          ) : null}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
