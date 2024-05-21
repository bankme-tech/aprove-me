const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export function isCNPJ(value: string): boolean {
  return CNPJ_REGEX.test(value);
}
