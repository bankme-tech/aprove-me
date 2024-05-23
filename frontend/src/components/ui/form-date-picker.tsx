"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ControllerRenderProps } from "react-hook-form"
import { FormControl } from "./form"

interface FormDatePickerProps {
    field: ControllerRenderProps<any, any>
}

export function FormDatePicker({ field }: FormDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
            <Button
            variant={"outline"}
            className={cn(
                "justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? formatDate(field.value) : <span>Escolha uma data</span>}
            </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
