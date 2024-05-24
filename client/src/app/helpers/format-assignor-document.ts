export const formatAssignorDocument = (document: string, hideSome: boolean = false): string => {
  let formattedValue = document;

  if(
    !document ||
    document?.length > 14 ||
     document?.length < 11) return 'Documento inválido';

  if (document.length === 11) {
    // Formatar CPF
    formattedValue = document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    if (hideSome) {
      formattedValue = 'XXX.' + formattedValue.substring(4, 7) + '.XXX-' + formattedValue.substring(12, 14);
    }
  } else if (document.length === 14) {
    // Formatar CNPJ
    formattedValue = document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    if (hideSome) {
      formattedValue = 'XX.' + formattedValue.substring(3, 6) + '.XXX/' + formattedValue.substring(10, 14) + '-XX';
    }
  }

  return formattedValue;
};
