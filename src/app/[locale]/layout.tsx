import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { CurrencyProvider } from "@/components/common/CurrencyContext";
import { UnitMeasurementProvider } from "@/components/common/UnitMeasurementContext";
import JsonLd from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { buildSiteSchemas } from "@/lib/seo";

import "../globals.css";
import "@mantine/core/styles.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
	title: "RegalProp | KLCC High Value Properties",
	description:
		"KLCC / TRX / Pavilion high value properties for sale and rent. Star Residences KLCC specialist.",
};

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleRootLayout({ children, params }: Props) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const messages = await getMessages();

	// Enable static rendering
	setRequestLocale(locale);

	const siteSchemas = buildSiteSchemas();

	return (
		<html lang={locale}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<JsonLd data={siteSchemas} />

				<MantineProvider>
					<CurrencyProvider>
						<UnitMeasurementProvider>
							<NextIntlClientProvider messages={messages}>
								<Header />
								{children}
								<Footer />
							</NextIntlClientProvider>
						</UnitMeasurementProvider>
					</CurrencyProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
