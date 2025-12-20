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
		title: t("authTitle"),
		description: t("authDescription"),
	};
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("auth");

	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: t("title"), path: `/${locale}/login-register` },
	]);

	return (
		<div className="space-y-6">
			<JsonLd data={breadcrumb} />

			<section className="bg-white rounded-xl shadow-sm p-6 space-y-6 text-sm">
				<div>
					<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
					<p className="text-slate-700">{t("subtitle")}</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<h2 className="font-semibold">{t("loginTitle")}</h2>
						<button className="px-3 py-1.5 rounded-lg border text-xs" type="button">
							{t("loginButton")}
						</button>
					</div>
					<div className="space-y-2">
						<h2 className="font-semibold">{t("registerTitle")}</h2>
						<button className="px-3 py-1.5 rounded-lg border text-xs" type="button">
							{t("registerButton")}
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
