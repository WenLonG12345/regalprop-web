import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

interface Props {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("meta");
	return {
		title: t("eventsTitle"),
		description: t("eventsDescription"),
	};
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("events");

	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: t("title"), path: `/${locale}/events` },
	]);

	return (
		<div className="space-y-6">
			<JsonLd data={breadcrumb} />

			<section className="bg-white rounded-xl shadow-sm p-6 text-sm space-y-3">
				<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
				<p className="text-slate-700">{t("subtitle")}</p>
				<p className="text-xs text-slate-500">{t("comingSoon")}</p>
			</section>
		</div>
	);
}
