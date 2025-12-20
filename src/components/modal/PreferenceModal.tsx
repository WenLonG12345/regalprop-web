"use client";

import { Box, Button, Group, Radio, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { usePathname, useRouter } from "next/navigation";
import {
	type LanguageLocale,
	languages,
	type MeasurementUnit,
	measurementUnitOptions,
} from "@/lib/constant";
import { type Currency, currencyOptions } from "@/lib/currency";
import { usePreferenceStore } from "@/lib/store/usePreferenceStore";

export default function PreferenceModal() {
	const router = useRouter();
	const pathname = usePathname();
	const { locale, setLocale, currency, setCurrency, unit, setUnit } =
		usePreferenceStore();

	const handleSave = () => {
		// Update locale and navigate to new locale path
		const currentLocale = pathname.split("/")[1];
		if (currentLocale !== locale) {
			const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
			router.push(newPath);
		}
		modals.closeAll();
	};

	return (
		<Stack gap="lg">
			<Box>
				<Text size="sm" fw={700} c="gray.7" mb="xs">
					Language
				</Text>
				<Radio.Group
					value={locale}
					onChange={(val) => setLocale(val as LanguageLocale)}
				>
					<Stack gap="xs">
						{languages.map((lng) => (
							<Radio key={lng.code} value={lng.code} label={lng.label} />
						))}
					</Stack>
				</Radio.Group>
			</Box>

			{/* Currency */}
			<Box>
				<Text size="sm" fw={700} c="gray.7" mb="xs">
					Currency*
				</Text>
				<Radio.Group
					value={currency}
					onChange={(val) => setCurrency(val as Currency)}
				>
					<Group gap="md">
						{currencyOptions.map((cur) => (
							<Radio key={cur.code} value={cur.code} label={cur.label} />
						))}
					</Group>
				</Radio.Group>
			</Box>

			{/* Units */}
			<Box>
				<Text size="sm" fw={700} c="gray.7" mb="xs">
					Units#
				</Text>
				<Radio.Group
					value={unit}
					onChange={(val) => setUnit(val as MeasurementUnit)}
				>
					<Stack gap="xs">
						{measurementUnitOptions.map((measureUnit) => (
							<Radio
								key={measureUnit.code}
								value={measureUnit.code}
								label={measureUnit.label}
							/>
						))}
					</Stack>
				</Radio.Group>
			</Box>

			{/* Save Button */}
			<Group justify="flex-end" mt="md">
				<Button variant="default" onClick={() => modals.closeAll()}>
					Cancel
				</Button>
				<Button onClick={handleSave}>Save</Button>
			</Group>
		</Stack>
	);
}
