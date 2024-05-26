export default function transformDate(date: string | undefined) {
  if (!date) {
    return '';
  }
  const dateHour = new Date(date);

  const day = dateHour.getDate().toString().padStart(2, '0');
  const month = (dateHour.getMonth() + 1).toString().padStart(2, '0');
  const year = dateHour.getFullYear();
  const hours = dateHour.getHours().toString().padStart(2, '0');
  const minutes = dateHour.getMinutes().toString().padStart(2, '0');
  const seconds = dateHour.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} - ${formattedTime}`;
}