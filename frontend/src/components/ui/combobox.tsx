import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn, Path, FieldValues, PathValue } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface ComboboxProps<TFormValues extends FieldValues, TItem> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  description?: string;
  items: TItem[];
  itemToLabel: (item: TItem) => string;
  itemToValue: (item: TItem) => string;
}

export function Combobox<TFormValues extends FieldValues, TItem>({
  form,
  name,
  label,
  description,
  items,
  itemToLabel,
  itemToValue,
}: ComboboxProps<TFormValues, TItem>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-auto justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? itemToLabel(
                        items.find((item) => itemToValue(item) === field.value)!
                      )
                    : `Selecione ${label.toLowerCase()}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder={`Busque por ${label.toLowerCase()}...`}
                />
                <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {items.map((item) => (
                      <CommandItem
                        value={itemToLabel(item)}
                        key={itemToValue(item)}
                        onSelect={() => {
                          form.setValue(
                            name,
                            itemToValue(item) as PathValue<
                              TFormValues,
                              Path<TFormValues>
                            >
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            itemToValue(item) === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {itemToLabel(item)}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
