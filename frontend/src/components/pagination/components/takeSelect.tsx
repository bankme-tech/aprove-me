import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TakeSelectProps {
  value: number;
  setValue: (value: number) => void;
}

export const TakeSelect = (props: TakeSelectProps) => {
  return (
    <Select
      value={props.value.toString()}
      onValueChange={(value) => props.setValue(Number(value))}
    >
      <SelectTrigger className="h-10 w-32">
        <SelectValue placeholder={props.value} />
      </SelectTrigger>

      <SelectContent side="top">
        {[5, 10, 25, 50, 100, 1000].map((pageSize) => (
          <SelectItem key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
