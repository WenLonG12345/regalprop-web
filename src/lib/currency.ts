export const SUPPORTED_CURRENCIES = ["MYR", "USD", "SGD", "CNY"] as const;
export type Currency = typeof SUPPORTED_CURRENCIES[number];
export const DEFAULT_CURRENCY: Currency = "MYR";

const RATES: Record<Currency, number> = {
  MYR: 1,
  USD: 0.24,
  SGD: 0.31,
  CNY: 1.72
};

function formatAmount(value: number, currency: Currency): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency
  }).format(value);
}

export function formatPrice(priceMyr: number, currency: Currency = DEFAULT_CURRENCY): string {
  const rate = RATES[currency] ?? 1;
  const amount = priceMyr * rate;
  return formatAmount(amount, currency);
}

export function formatPriceLine(priceMyr: number, currency: Currency = DEFAULT_CURRENCY): string {
  const myr = priceMyr;
  const usd = priceMyr * RATES.USD;
  const sgd = priceMyr * RATES.SGD;
  const cny = priceMyr * RATES.CNY;

  /*if (currency === "MYR") {
    return `${formatAmount(myr, "MYR")} (≈ ${formatAmount(
      usd,
      "USD"
    )} · ${formatAmount(sgd, "SGD")})`;
  }*/

  if (currency === "MYR") {
    return `${formatAmount(myr, "MYR")}`;
  }

  if (currency === "USD") {
    return `${formatAmount(usd, "USD")} (≈ ${formatAmount(myr, "MYR")})`;
  }

  if (currency === "SGD") {
    return `${formatAmount(sgd, "SGD")} (≈ ${formatAmount(myr, "MYR")})`;
  }

  if (currency === "CNY") {
    return `${formatAmount(cny, "CNY")} (≈ ${formatAmount(myr, "MYR")})`;
  }

  return formatAmount(myr, "MYR");
}
