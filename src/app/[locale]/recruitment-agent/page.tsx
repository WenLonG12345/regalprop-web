import { Container } from "@mantine/core";
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
		title: t("recruitmentTitle"),
		description: t("recruitmentDescription"),
	};
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("recruitment");

	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: t("title"), path: `/${locale}/recruitment-agent` },
	]);

	const joinPoints = [t("joinPoints.0"), t("joinPoints.1"), t("joinPoints.2")];

	return (
		<Container size="xl" p="md">
			<JsonLd data={breadcrumb} />

			<section className="bg-white rounded-xl shadow-sm p-6 text-sm space-y-4">
				<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
				<p className="text-slate-700">{t("subtitle")}</p>
				<div>
					<h2 className="font-semibold mb-2">{t("joinTitle")}</h2>
					<ul className="list-disc list-inside space-y-1 text-slate-700">
						{joinPoints.map((point) => (
							<li key={point}>{point}</li>
						))}
					</ul>
				</div>
				<p className="text-xs text-slate-600">{t("ctaText")}</p>
			</section>
		</Container>
	);
}
