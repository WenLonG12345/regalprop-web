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
		title: t("mm2hTitle"),
		description: t("mm2hDescription"),
	};
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("mm2h");

	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: t("title"), path: `/${locale}/mm2h` },
	]);

	return (
		<Container size="xl" p="md">
			<JsonLd data={breadcrumb} />

			<section className="bg-white rounded-xl shadow-sm p-6 space-y-4 text-sm">
				<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
				<p className="text-slate-700">{t("subtitle")}</p>

				<div className="grid md:grid-cols-2 gap-4 pt-2">
					<div className="space-y-2">
						<h2 className="font-semibold text-base">
							{t("sections.overviewTitle")}
						</h2>
						<p className="text-slate-700 leading-relaxed">
							{t("sections.overviewBody")}
						</p>
					</div>
					<div className="space-y-2">
						<h2 className="font-semibold text-base">
							{t("sections.consultTitle")}
						</h2>
						<p className="text-slate-700 leading-relaxed">
							{t("sections.consultBody")}
						</p>
					</div>
				</div>
			</section>
		</Container>
	);
}
