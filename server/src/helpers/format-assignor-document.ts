export const formatAssignorDocument = (document: string): string => {
  if (document.length === 11) {
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formato CPF
  } else if (document.length === 14) {
    return document.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    ); // Formato CNPJ
  }
  return document;
};
