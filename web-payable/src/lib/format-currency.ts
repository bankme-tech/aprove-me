export function numberToCurrency(numericString: string): string {
  if (!numericString) return "R$ 0";

  const num = parseFloat(numericString) / 100;
  if (Number.isNaN(num)) return "Invalid number";

  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export function currencyToFloat(currency: string) {
  const EVERYTHING_EXCEPT_DIGIT_AND_COMMA = /[^\d,]/g;
  const cleanString = currency
    .replace(EVERYTHING_EXCEPT_DIGIT_AND_COMMA, '')
    .replace(',', '.');
  return parseFloat(cleanString);
}
