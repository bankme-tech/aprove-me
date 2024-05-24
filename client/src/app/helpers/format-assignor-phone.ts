export const formatPhoneNumber = (phone: string): string => {
  phone = phone?.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (!phone || phone.length < 10 || phone.length > 11)
    return 'Número inválido';

  if (phone.length === 10) {
    // Formato para números fixos: (XX) XXXX-XXXX
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (phone.length === 11) {
    // Formato para números celulares: (XX) XXXXX-XXXX
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return phone; // Retorna o número sem formatação se não corresponder aos padrões
};
