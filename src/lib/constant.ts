export type LanguageLocale = "en" | "ms" | "zh-cn" | "zh-hk";
export type MeasurementUnit = "ft2" | "m2";

export const languages = [
	{ code: "en" as LanguageLocale, label: "English" },
	{ code: "ms" as LanguageLocale, label: "Bahasa Melayu" },
	{ code: "zh-cn" as LanguageLocale, label: "简体中文" },
	{ code: "zh-hk" as LanguageLocale, label: "繁體中文" },
];

export const measurementUnitOptions = [
	{ code: "ft2" as MeasurementUnit, label: "Square foot | ft²" },
	{ code: "m2" as MeasurementUnit, label: "Square meter | m²" },
];
