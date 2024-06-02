import * as RdxDropDownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from '../../../app/utils';


interface DropDownProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

function DropDownMenuRoot({ children }: DropDownProps) {
  return (
    <RdxDropDownMenu.Root>
      {children}
    </RdxDropDownMenu.Root>
  )
}

function DropDownMenuTrigger({ children }: DropDownProps) {
  return (
    <RdxDropDownMenu.Trigger className="outline-none" asChild>
      {children}
    </RdxDropDownMenu.Trigger>
  )
}

function DropDownMenuContent({ children, className }: DropDownProps) {
  return (
    <RdxDropDownMenu.Portal>
      <RdxDropDownMenu.Content
        className={cn(
          "z-[99] rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className
        )}
      >
        {children}
      </RdxDropDownMenu.Content>
    </RdxDropDownMenu.Portal>
  )
}

function DropDownMenuItem({ children, className, onSelect }: DropDownProps) {
  return (
    <RdxDropDownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-[40px] outline-none flex items-center py-2 px-4 text-sm text-gray-800 data-[highlighted]:bg-gray-100 rounded-2xl transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </RdxDropDownMenu.Item>
  )
}

export const DropDownMenu = {
  Root: DropDownMenuRoot,
  Trigger: DropDownMenuTrigger,
  Content: DropDownMenuContent,
  Item: DropDownMenuItem
}
