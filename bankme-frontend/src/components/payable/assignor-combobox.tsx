import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { useGetAllAssignor } from "@/hooks/useGetAllAssignor";
import { cn } from "@/lib/utils";

interface Props {
  fieldValue: string;
  selectValue: (value: string) => void;
}

export default function AssignorCombobox({ fieldValue, selectValue }: Props) {
  const { data: assignors } = useGetAllAssignor();

  const comboBoxValues = assignors?.map((assignor) => ({
    label: assignor.email,
    value: assignor.id,
  }));

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !fieldValue && "text-muted-foreground"
              )}
            >
              {fieldValue
                ? comboBoxValues?.find(
                    (assignor) => assignor.value === fieldValue
                  )?.label
                : "Select an assignor"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search assignor..." />
            <CommandEmpty>No assignor found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {comboBoxValues?.map((assignor) => (
                  <CommandItem
                    value={assignor.label}
                    key={assignor.value}
                    onSelect={() => selectValue(assignor.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        assignor.value === fieldValue
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {assignor.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
