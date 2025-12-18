"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Unit = "ft2" | "m2";

const DEFAULT_UNIT: Unit = "ft2";
const SQFT_TO_SQM = 0.092903;

const UnitMeasurementContext = createContext<any>(null);

export function UnitMeasurementProvider({ children }: any) {
	const [unit, setUnit] = useState<Unit>(DEFAULT_UNIT);

	const value = useMemo(
		() => ({
			unit,
			setUnit,

			// helper: input is *always* square foot from DB
			formatArea: (sizeSqft: number) => {
				if (!sizeSqft || Number.isNaN(sizeSqft)) return "";
				if (unit === "ft2") {
					return `${sizeSqft.toLocaleString()} sq ft`;
				}
				const sqm = sizeSqft * SQFT_TO_SQM;
				return `${sqm.toFixed(1)} m²`;
			},
		}),
		[unit],
	);

	return (
		<UnitMeasurementContext.Provider value={value}>
			{children}
		</UnitMeasurementContext.Provider>
	);
}

export function useUnitMeasurement() {
	const ctx = useContext(UnitMeasurementContext);
	if (!ctx) {
		throw new Error(
			"useUnitMeasurement must be used within a UnitMeasurementProvider",
		);
	}
	return ctx;
}
