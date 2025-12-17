export const SUPPORTED_CURRENCIES = ["MYR", "USD", "SGD"];
export const DEFAULT_CURRENCY = "MYR";

const RATES = {
  MYR: 1,
  USD: 0.24,
  SGD: 0.31,
  CNY: 1.72
};

function formatAmount(value, currency) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency
  }).format(value);
}

export function formatPrice(priceMyr, currency = DEFAULT_CURRENCY) {
  const rate = RATES[currency] ?? 1;
  const amount = priceMyr * rate;
  return formatAmount(amount, currency);
}

export function formatPriceLine(priceMyr, currency = DEFAULT_CURRENCY) {
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
