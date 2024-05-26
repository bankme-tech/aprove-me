export const getTokenAndSetHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { 'Authorization': token } };
};

export const convertDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`
};