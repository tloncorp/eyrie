import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { EyreState, useEyreState } from "../state/eyre";
import { Eyrie } from './Eyrie';

function disableDefault<T extends Event>(e: T): void {
  e.preventDefault();
}

const selMenu = (s: EyreState) => ({ open: s.open, toggle: s.toggle });
export function EyrieMenu() {
  const { open, toggle } = useEyreState(selMenu);

  return (
    <Popover.Root open={open} onOpenChange={toggle}>
      <Popover.Trigger asChild>
        <button className="button bg-rose-400 text-rose-100 font-semibold">
          eyrie
        </button>
      </Popover.Trigger>
      <Popover.Content
        onPointerDownOutside={disableDefault} 
        onInteractOutside={disableDefault} 
        onFocusOutside={disableDefault} 
        sideOffset={12} 
        className="h-[600px] w-[420px] mr-4 overflow-y-auto"
      >
        <Eyrie />
      </Popover.Content>
    </Popover.Root>
  );
}