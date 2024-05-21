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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAssignorStore } from "@/stores/useAssignorStore";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface AssignorComboboxProps {
  value: string;
  setValue: (value: string) => void;
}

export const AssignorCombobox = (props: AssignorComboboxProps) => {
  const [open, setOpen] = useState(false);

  const assignors = useAssignorStore();

  useEffect(() => {
    async function fetchAllAssignors() {
      assignors.getAllAssignors();
    }

    fetchAllAssignors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          size="full"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex justify-between px-2"
        >
          {props.value
            ? assignors.assignors.find(
                (assignor) => assignor.props.name === props.value,
              )?.props.name
            : "Procure por um cedente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Procure por um cedente..." />
          <CommandEmpty>Nenhum cedente encontrado</CommandEmpty>

          <CommandGroup>
            <CommandList className="max-h-56 overflow-y-auto">
              {assignors.assignors.map((assignor) => (
                <CommandItem
                  key={assignor._id}
                  value={assignor._id}
                  onSelect={(currentValue) => {
                    props.setValue(
                      currentValue === props.value ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      props.value === assignor.props.name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {assignor.props.name}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
