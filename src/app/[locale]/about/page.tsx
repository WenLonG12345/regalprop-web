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
		title: t("aboutTitle"),
		description: t("aboutDescription"),
	};
}

export default async function AboutPage({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("about");
	const tNav = await getTranslations("nav");

	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: tNav("about"), path: `/${locale}/about` },
	]);

	const highlights = [
		{ title: t("highlights.0.title"), text: t("highlights.0.text") },
		{ title: t("highlights.1.title"), text: t("highlights.1.text") },
		{ title: t("highlights.2.title"), text: t("highlights.2.text") },
	];

	return (
		<Container size="xl" p="md">
			<JsonLd data={breadcrumb} />
			<section className="bg-white rounded-xl shadow-sm p-6 text-sm space-y-4">
				<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
				<p className="text-slate-700">{t("p1")}</p>
				<p className="text-slate-700">{t("p2")}</p>
				<div className="grid md:grid-cols-3 gap-4 pt-2">
					{highlights.map((item) => (
						<div
							key={item.text}
							className="border rounded-xl p-4 text-xs text-slate-700 bg-slate-50"
						>
							<div className="font-semibold mb-1">{item.title}</div>
							<div>{item.text}</div>
						</div>
					))}
				</div>
			</section>
		</Container>
	);
}
