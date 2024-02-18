import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

interface SelectorAssignorProps {
  onChange: (...events: any[]) => void;
  value: string;
}

export const SelectorAssignor = ({
  onChange,
  value,
}: SelectorAssignorProps) => {
  const { data } = useQuery({
    queryFn: Api.fetchAssignors,
    queryKey: ['fetch-assignors'],
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um cedente" />
        </SelectTrigger>
        <SelectContent>
          {data &&
            data.map(({ id, name }) => (
              <SelectItem value={id} key={id}>
                {name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};
