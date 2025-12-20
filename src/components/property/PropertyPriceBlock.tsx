"use client";

import { formatPriceLine } from "@/lib/currency";
import { usePreferenceStore } from "@/lib/store/usePreferenceStore";

export default function PropertyPriceBlock({ priceMyr }: any) {
	const currency = usePreferenceStore((state) => state.currency);
	const line = formatPriceLine(priceMyr, currency);

	return <div className="text-sm font-semibold text-primary">{line}</div>;
}
