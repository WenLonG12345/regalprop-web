import { getTranslations } from "next-intl/server";
import ContactFormClient from "@/components/contact/ContactFormClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { Container } from "@mantine/core";

interface Props {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("meta");
	return {
		title: t("contactTitle"),
		description: t("contactDescription"),
	};
}

export default async function ContactPage({ params }: Props) {
	const { locale } = await params;
	const tNav = await getTranslations("nav");

	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: tNav("contact"), path: `/${locale}/contact` },
	]);

	return (
		<Container size="xl" p="md">
			<JsonLd data={breadcrumb} />
			<ContactFormClient locale={locale} />
		</Container>
	);
}
