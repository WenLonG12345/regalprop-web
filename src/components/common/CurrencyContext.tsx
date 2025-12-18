"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_CURRENCY, SUPPORTED_CURRENCIES } from "@/lib/currency";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }: any) {
	const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

	const value = useMemo(
		() => ({
			currency,
			setCurrency,
			supportedCurrencies: SUPPORTED_CURRENCIES,
		}),
		[currency],
	);

	return (
		<CurrencyContext.Provider value={value}>
			{children}
		</CurrencyContext.Provider>
	);
}

export function useCurrency() {
	const ctx = useContext(CurrencyContext);
	if (!ctx) {
		throw new Error("useCurrency must be used within a CurrencyProvider");
	}
	return ctx;
}
