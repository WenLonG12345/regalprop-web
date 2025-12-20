"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	type Currency,
	DEFAULT_CURRENCY,
	SUPPORTED_CURRENCIES,
} from "@/lib/currency";

type Unit = "ft2" | "m2";
type Locale = "en" | "ms" | "zh-cn" | "zh-hk";

interface PreferenceState {
	// Language
	locale: Locale;
	setLocale: (locale: Locale) => void;

	// Currency
	currency: Currency;
	setCurrency: (currency: Currency) => void;
	supportedCurrencies: readonly Currency[];

	// Unit Measurement
	unit: Unit;
	setUnit: (unit: Unit) => void;
	formatArea: (sizeSqft: number) => string;
}

const DEFAULT_UNIT: Unit = "ft2";
const SQFT_TO_SQM = 0.092903;

export const usePreferenceStore = create<PreferenceState>()(
	persist(
		(set, get) => ({
			// Language state
			locale: "en",
			setLocale: (locale: Locale) => set({ locale }),

			// Currency state
			currency: DEFAULT_CURRENCY,
			setCurrency: (currency: Currency) => set({ currency }),
			supportedCurrencies: SUPPORTED_CURRENCIES,

			// Unit Measurement state
			unit: DEFAULT_UNIT,
			setUnit: (unit: Unit) => set({ unit }),

			// Helper function to format area
			formatArea: (sizeSqft: number) => {
				const { unit } = get();
				if (!sizeSqft || Number.isNaN(sizeSqft)) return "";
				if (unit === "ft2") {
					return `${sizeSqft.toLocaleString()} sq ft`;
				}
				const sqm = sizeSqft * SQFT_TO_SQM;
				return `${sqm.toFixed(1)} m²`;
			},
		}),
		{
			name: "regalprop-preference",
		},
	),
);
