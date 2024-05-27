"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export interface ComboboxProps {
  pickLabel: string;
  searchLabel: string;
  notFoundLabel: string;
  items: { key: string; label: string; }[];
  onSelect?: (key: string) => void;
  initialKey?: string;
}

export function Combobox(p: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState(p.initialKey ?? "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {key
            ? p.items.find((item) => item.key === key)?.label
            : p.pickLabel}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={p.searchLabel} className="h-9" />
          <CommandEmpty>{p.notFoundLabel}</CommandEmpty>
          <CommandGroup>
            {p.items.map((item) => (
              <CommandItem
                key={item.key}
                value={item.key}
                onSelect={(currentValue) => {
                  setKey(currentValue === key ? "" : currentValue);
                  setOpen(false);
                  if (p.onSelect) p.onSelect(currentValue);
                }}
              >
                {item.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    key === item.key ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
