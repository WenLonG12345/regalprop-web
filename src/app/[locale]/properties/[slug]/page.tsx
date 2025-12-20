import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import AgentBadges from "@/components/agent/AgentBadges";
import PropertyPriceBlock from "@/components/property/PropertyPriceBlock";
import JsonLd from "@/components/seo/JsonLd";
import { agents as allAgents, getPropertyBySlug } from "@/lib/data";
import { buildBreadcrumbSchema, buildPropertyDetailSchema } from "@/lib/seo";
import { usePreferenceStore } from "@/lib/store/usePreferenceStore";

interface Props {
	params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props) {
	const { locale, slug } = await params;
	const t = await getTranslations("meta");
	const property = getPropertyBySlug(slug);

	if (!property) {
		return {
			title: t("propertiesTitle"),
			description: t("propertiesDescription"),
		};
	}

	return {
		title: `${t("propertiesTitle")}`,
		description: t("propertiesDescription"),
	};
}

export default async function PropertyDetailsPage({ params }: Props) {
	const { locale, slug } = await params;
	const tNav = await getTranslations("nav");
	const property = getPropertyBySlug(slug);

	const { currency, formatArea } = usePreferenceStore();

	if (!property) {
		notFound();
	}

	const title = "title";
	const location = "location";
	const description = "description";

	const backLabel =
		locale === "zh-cn"
			? "返回房源列表"
			: locale === "zh-hk"
				? "返回房源列表"
				: locale === "ms"
					? "Kembali ke senarai hartanah"
					: "Back to listings";

	const detailsLabel =
		locale === "zh-cn"
			? "基本资料"
			: locale === "zh-hk"
				? "基本資料"
				: locale === "ms"
					? "Maklumat asas"
					: "Basic details";

	const contactLabel =
		locale === "zh-cn"
			? "想了解更多或预约看房，请直接 WhatsApp 我们的团队。"
			: locale === "zh-hk"
				? "想了解更多或預約睇樓，請直接 WhatsApp 我們的團隊。"
				: locale === "ms"
					? "Untuk maklumat lanjut atau atur viewing, sila WhatsApp pasukan kami."
					: "For more details or to arrange a viewing, WhatsApp our team.";

	const agentsForProperty = (property.agentSlugs || [])
		.map((slug) => allAgents.find((a) => a.slug === slug))
		.filter(Boolean);

	const listPath = `/${locale}/properties`;
	const detailPath = `${listPath}/${property.slug}`;
	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: tNav("properties"), path: listPath },
		{ name: title, path: detailPath },
	]);
	const detailSchema = buildPropertyDetailSchema(property, listPath);

	return (
		<div className="space-y-6">
			<JsonLd data={[breadcrumb, detailSchema]} />

			<Link
				href={listPath}
				className="text-xs text-slate-500 hover:text-primary"
			>
				← {backLabel}
			</Link>

			<section className="grid md:grid-cols-3 gap-6">
				<div className="md:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
					<div className="h-64 bg-slate-200 flex items-center justify-center text-xs text-slate-500">
						{property.projectName} · {title}
					</div>
					<div className="p-6 space-y-3 text-sm">
						<h1 className="text-xl font-semibold text-slate-900">{title}</h1>
						<div className="text-xs text-slate-500">{location}</div>
						<p className="text-slate-700 leading-relaxed">{description}</p>
					</div>
				</div>

				<aside className="space-y-4">
					<div className="bg-white rounded-xl shadow-sm p-5 text-sm">
						<h2 className="font-semibold mb-2">Price</h2>
						<PropertyPriceBlock priceMyr={property.priceMyr} />
					</div>

					<div className="bg-white rounded-xl shadow-sm p-5 text-sm">
						<h2 className="font-semibold mb-2">{detailsLabel}</h2>
						<ul className="space-y-1 text-xs text-slate-700">
							<li>
								{property.bedrooms}{" "}
								{locale === "ms"
									? "bilik tidur"
									: locale === "zh-hk"
										? "房"
										: locale === "zh-cn"
											? "房"
											: "bedrooms"}{" "}
								· {property.bathrooms}{" "}
								{locale === "ms"
									? "bilik air"
									: locale === "zh-hk"
										? "卫"
										: locale === "zh-cn"
											? "卫"
											: "bathrooms"}
							</li>
							<li>
								{property.builtUp && (
									<span>{formatArea(property.builtUp)}</span>
								)}
							</li>
							{property.tenure && <li>Tenure: {property.tenure}</li>}
							{property.furnishing && (
								<li>Furnishing: {property.furnishing}</li>
							)}
							{property.facing && <li>Facing: {property.facing}</li>}
						</ul>
					</div>

					{agentsForProperty.length > 0 && (
						<div className="bg-white rounded-xl shadow-sm p-5 text-xs text-slate-700 space-y-3">
							<p className="font-semibold">
								{locale.startsWith("zh")
									? "專屬顧問"
									: locale === "ms"
										? "Ejen in-charge"
										: "Dedicated agent"}
							</p>
							<AgentBadges
								agents={agentsForProperty}
								locale={locale}
								highlightFirst
							/>
						</div>
					)}

					<div className="bg-white rounded-xl shadow-sm p-5 text-xs text-slate-700">
						<p className="mb-3">{contactLabel}</p>
						<a
							href="https://wa.me/60123456789"
							target="_blank"
							className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-50"
							rel="noopener"
						>
							WhatsApp
						</a>
					</div>
				</aside>
			</section>
		</div>
	);
}
