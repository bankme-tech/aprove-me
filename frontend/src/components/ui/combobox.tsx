"use client"
 
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import * as React from "react"
 
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
import { cn } from "@/lib/utils"
import { CommandList } from "cmdk"
 

type AssignorType = {
  id: string;
  name: string;
  }

type ComboboxProps = {
  value: string
  setValue: (value: string) => void
  assignors: AssignorType[];
}
 
export function Combobox({value, setValue, assignors}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const formattedAssignors = assignors
  .map(assignor => ({value: assignor.id, label: assignor.name}))
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[17.5rem] justify-between"
        >
          {value
            ? formattedAssignors.find((assignor) => assignor.value === value)?.label
            : "Select assignor..."}
          <CaretSortIcon className="ml-2 h-4 w-6 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search assignor..." className="h-9" />
          <CommandEmpty>No assignor found.</CommandEmpty>
          <CommandGroup>
            <CommandList>

            {formattedAssignors.map((assignor) => (
              <CommandItem
              key={assignor.value}
              value={assignor.value}
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
              >
                {assignor.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === assignor.value ? "opacity-100" : "opacity-0"
                  )}
                  />
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}