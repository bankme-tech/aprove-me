export const isEmptyOrNull = (field: any): boolean => {
  return field == null || field == undefined || field == '';
}

export const isValidDate = (dateString: string): boolean=>  {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date.toISOString() === dateString;
}
