"use client";

import { useCurrency } from "@/components/common/CurrencyContext";
import { formatPriceLine } from "@/lib/currency";

export default function PropertyPriceBlock({  priceMyr  }: any) {
  const { currency } = useCurrency();
  const line = formatPriceLine(priceMyr, currency);

  return <div className="text-sm font-semibold text-primary">{line}</div>;
}
