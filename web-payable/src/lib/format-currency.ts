export function numberToCurrency(numericString: string | number): string {
  if (!numericString) return "R$ 0";

  const num = typeof numericString === 'string'
    ? parseFloat(numericString)
    : numericString;
  const currencyFloat = num / 100;
  if (Number.isNaN(currencyFloat)) return "Invalid number";

  return currencyFloat.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export function floatToCurrency(currencyFloat: number) {
  return currencyFloat.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export function currencyToNumber(currency: string) {
  const EVERYTHING_EXCEPT_DIGIT_AND_COMMA = /[^\d,]/g;
  const cleanString = currency
    .replace(EVERYTHING_EXCEPT_DIGIT_AND_COMMA, '')
    .replace(',', '.');
  return parseFloat(cleanString);
}
