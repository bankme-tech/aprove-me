interface FormatFiltersDto {
  key: string;
  value: any;
}

export const formatFilter = ({
  key,
  value,
}: FormatFiltersDto) => {
  if (!value) return {};

  return {
    [key]: {
      contains: value,
      mode: 'insensitive',
    },
  };
};


export const buildFindAllFilters = ({ filters }: { filters: any }) => {
  const { id, name, email } = filters;
  
  let condition = { deletedAt: null };

  const idFilter = formatFilter({ key: 'id', value: id });
  const nameFilter = formatFilter({ key: 'name', value: name });
  const emailFilter = formatFilter({ key: 'email', value: email });

  condition = {
    ...condition,
    ...idFilter,
    ...nameFilter,
    ...emailFilter,
  };

  return condition;
};
