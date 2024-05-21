import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InputDateProps {
  date: Date;
  setDate: (date: Date | undefined) => void;
}

export const DateInput = (props: InputDateProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="full"
          variant="outline"
          className={cn(
            "justify-start px-2 text-left font-normal",
            !props.date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.date ? (
            new Date(props.date).toLocaleDateString()
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          initialFocus
          selected={props.date}
          onSelect={props.setDate}
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};
