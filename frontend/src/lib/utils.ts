export function convertToCurrency(amount: number) {
  const intl = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' })

  return intl.format(amount)
}
