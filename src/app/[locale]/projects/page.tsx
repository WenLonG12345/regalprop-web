import { Container } from "@mantine/core";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { projects } from "@/lib/data";
import { buildBreadcrumbSchema, buildProjectListSchema } from "@/lib/seo";

interface Props {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata() {
	const t = await getTranslations("meta");
	return {
		title: t("projectsTitle"),
		description: t("projectsDescription"),
	};
}

export default async function ProjectsPage({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("projects");
	const tNav = await getTranslations("nav");
	const tTypes = await getTranslations("projects.types");

	const listPath = `/${locale}/projects`;
	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: tNav("projects"), path: listPath },
	]);
	const listSchema = buildProjectListSchema(projects, listPath);

	const getTypeLabel = (category: string) => {
		try {
			return tTypes(category as any);
		} catch {
			return category;
		}
	};

	const viewDetailsText =
		locale === "zh-cn"
			? "查看项目详情 →"
			: locale === "zh-hk"
				? "查看項目詳情 →"
				: locale === "ms"
					? "Lihat butiran projek →"
					: "View project details →";

	return (
		<Container size="xl" p="md">
			<JsonLd data={[breadcrumb, listSchema]} />

			<section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
					<p className="text-slate-600">{t("subtitle")}</p>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				{projects.map((p) => {
					return (
						<article
							key={p.slug}
							className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 text-sm"
						>
							<div className="text-xs text-primary font-semibold">
								{getTypeLabel(p.category)}
							</div>
							<h2 className="font-semibold text-slate-900">name</h2>
							<div className="text-xs text-slate-500">Location</div>
							<p className="text-xs text-slate-600 line-clamp-3">summary</p>
							<div className="mt-2">
								<Link
									href={`/${locale}/projects/${p.slug}`}
									className="text-xs text-primary font-semibold hover:underline"
								>
									{viewDetailsText}
								</Link>
							</div>
						</article>
					);
				})}
			</section>
		</Container>
	);
}
