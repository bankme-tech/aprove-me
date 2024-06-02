export function formatDate(date: string | Date) {
  let dateObj: Date;

  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  return Intl.DateTimeFormat('pt-br').format(dateObj);
}
