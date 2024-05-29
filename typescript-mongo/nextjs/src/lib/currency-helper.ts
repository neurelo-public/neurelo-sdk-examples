export function stringToNumber(amountString: string): number {
  const amountNumber = Number(amountString);
  if (amountString && !Number.isNaN(amountNumber)) {
    return amountNumber;
  }
  return 0;
}

export function formatCurrencyString(amountString: string) {
  const amount = stringToNumber(amountString);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    unitDisplay: 'narrow',
  }).format(amount);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
