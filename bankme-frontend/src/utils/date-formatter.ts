export function formatDate(value: string) {
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat();
  return formatter.format(date);
}

export function convertIsoToYyyyMmDd(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
