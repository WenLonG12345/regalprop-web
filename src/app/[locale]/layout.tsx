import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { modals } from "@/components/modal";
import JsonLd from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { buildSiteSchemas } from "@/lib/seo";
import { theme } from "@/lib/theme";

import "../globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });
	return {
		title: t("homeTitle"),
		description: t("homeDescription"),
		openGraph: {
			title: t("homeTitle"),
			description: t("homeDescription"),
			type: "website",
		},
	};
}

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
							<div className="bg-[#f2f3f7]">{children}</div>
							<Footer />
						</ModalsProvider>
					</MantineProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
