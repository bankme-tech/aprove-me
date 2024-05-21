const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export function isCPF(value: string): boolean {
  return CPF_REGEX.test(value);
}
