import { SelectItem } from '@/components/ui/select';
import { Api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const SelectorAssignor = () => {
  const { data } = useQuery({
    queryFn: Api.fetchAssignors,
    queryKey: ['fetch-assignors'],
  });

  console.log(data);
  return (
    <>
      {data && data.result}
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </>
  );
};
