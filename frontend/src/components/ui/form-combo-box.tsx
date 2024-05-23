"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ControllerRenderProps } from "react-hook-form"
import { FormControl } from "./form"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"

interface FormComboBoxProps {
    field: ControllerRenderProps<any, any>
    items: Array<{value: string, label: string}>
    onSelect: (...props: any) => void
}

export function FormComboBox({ field, items, onSelect }: FormComboBoxProps) {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <FormControl>
            <Button
                variant="outline"
                role="combobox"
                className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                )}
            >
                {field.value
                ? items.find(
                    (item) => item.value === field.value
                    )?.label
                : "Selecione um item"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput
                    placeholder="Pesquisar..."
                    className="h-9"
                />
                <CommandList >
                    <CommandEmpty>Nenhum dado encontrado.</CommandEmpty>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => onSelect(item.value)}
                            >
                                {item.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        item.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}
