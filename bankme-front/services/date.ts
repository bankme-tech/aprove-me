export function convertToISO8601(dateString: string) {
  const [year, month, day] = dateString.split('-');
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return date.toISOString();
}