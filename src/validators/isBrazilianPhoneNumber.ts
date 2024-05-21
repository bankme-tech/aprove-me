const BRAZILIAN_PHONE_NUMBER_REGEX = /^\+55 \(\d{2}\) \d \d{4}-\d{4}$/;

export function isBrazilianPhoneNumber(value: string): boolean {
  return BRAZILIAN_PHONE_NUMBER_REGEX.test(value);
}
