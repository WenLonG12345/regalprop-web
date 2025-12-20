import {
	ColorSchemeScript,
	Container,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { modals } from "@/components/modal";
import JsonLd from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { buildSiteSchemas } from "@/lib/seo";

import "../globals.css";
import "@mantine/core/styles.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { theme } from "@/lib/theme";

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

	setRequestLocale(locale);

	const siteSchemas = buildSiteSchemas();

	return (
		<html lang={locale} {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<JsonLd data={siteSchemas} />

				<NextIntlClientProvider messages={messages}>
					<MantineProvider theme={theme}>
						<ModalsProvider modals={modals}>
							<Header />
							<Container size="xl" p="md">
								{children}
							</Container>
							<Footer />
						</ModalsProvider>
					</MantineProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
