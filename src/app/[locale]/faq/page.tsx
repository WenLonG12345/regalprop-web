import { getTranslations } from "next-intl/server";
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
		title: t("faqTitle"),
		description: t("faqDescription"),
	};
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("faq");

	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: t("title"), path: `/${locale}/faq` },
	]);

	return (
		<Container size="xl" p="md">
			<JsonLd data={breadcrumb} />

			<section className="bg-white rounded-xl shadow-sm p-6 space-y-3 text-sm">
				<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
				<p className="text-slate-700">{t("subtitle")}</p>
				<p className="text-xs text-slate-500">{t("itemsIntro")}</p>
			</section>
		</Container>
	);
}
