import { Container } from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import AgentBadges from "@/components/agent/AgentBadges";
import PropertyCard from "@/components/property/PropertyCard";
import JsonLd from "@/components/seo/JsonLd";
import {
	properties as allProperties,
	getAgentBySlug,
	getProjectBySlug,
} from "@/lib/data";
import { buildBreadcrumbSchema, buildProjectDetailSchema } from "@/lib/seo";

interface Props {
	params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props) {
	const { locale, slug } = await params;
	const t = await getTranslations("meta");
	const project = getProjectBySlug(slug);

	if (!project) {
		return {
			title: t("projectsTitle"),
			description: t("projectsDescription"),
		};
	}

	return {
		title: `${t("projectsTitle")}`,
		description: t("projectsDescription"),
	};
}

export default async function ProjectDetailsPage({ params }: Props) {
	const { locale, slug } = await params;
	const t = await getTranslations("projects");
	const tTypes = await getTranslations("projects.types");
	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	const backLabel =
		locale === "zh-cn"
			? "返回新项目列表"
			: locale === "zh-hk"
				? "返回新項目列表"
				: locale === "ms"
					? "Kembali ke senarai projek"
					: "Back to projects";

	const inChargeLabel = t("inCharge");
	const teamLabel = t("team");
	const relatedUnitsLabel = t("relatedUnits");

	const statusLabel = t("statusLabel");
	const phaseLabel = t("phaseLabel");
	const completionLabel = t("completionLabel");

	const getTypeLabel = (category: string) => {
		try {
			return tTypes(category as any);
		} catch {
			return category;
		}
	};

	const inCharge = getAgentBySlug(project.personInChargeSlug);
	const members = (project.memberSlugs || [])
		.map((slug) => getAgentBySlug(slug))
		.filter(Boolean);

	const projectProperties = allProperties.filter((p) =>
		(project.propertySlugs || []).includes(p.slug),
	);

	const listPath = `/${locale}/projects`;
	const detailPath = `${listPath}/${project.slug}`;
	const breadcrumb = buildBreadcrumbSchema([
		{ name: "Home", path: `/${locale}` },
		{ name: t("projects"), path: listPath },
		{ name: t("projectsTitle"), path: detailPath },
	]);
	const detailSchema = buildProjectDetailSchema(project, listPath);

	return (
		<Container size="xl" p="md">
			<JsonLd data={[breadcrumb, detailSchema]} />

			<Link
				href={listPath}
				className="text-xs text-slate-500 hover:text-primary"
			>
				← {backLabel}
			</Link>

			<section className="bg-white rounded-xl shadow-sm p-6 space-y-4 text-sm">
				<div className="text-xs text-primary font-semibold">Label</div>
				<h1 className="text-xl font-semibold text-slate-900">name</h1>
				<div className="text-xs text-slate-500">location</div>
				<p className="text-slate-700 leading-relaxed">summary</p>

				<div className="grid md:grid-cols-3 gap-3 text-xs text-slate-700 pt-2">
					<div>
						<div className="font-semibold">{statusLabel}</div>
						<div>{project.launchStatus}</div>
					</div>
					<div>
						<div className="font-semibold">{phaseLabel}</div>
						<div>{project.phase}</div>
					</div>
					<div>
						<div className="font-semibold">{completionLabel}</div>
						<div>{project.expectedCompletion}</div>
					</div>
				</div>
			</section>

			<section className="grid md:grid-cols-3 gap-6 text-sm">
				<div className="md:col-span-2 space-y-4">
					{projectProperties.length > 0 && (
						<div className="space-y-3">
							<h2 className="font-semibold text-slate-900">
								{relatedUnitsLabel}
							</h2>
							<div className="grid gap-4 md:grid-cols-2">
								{projectProperties.map((p) => (
									<PropertyCard key={p.slug} property={p} locale={locale} />
								))}
							</div>
						</div>
					)}
				</div>

				<aside className="space-y-4">
					{inCharge && (
						<div className="bg-white rounded-xl shadow-sm p-5 text-xs text-slate-700 space-y-3">
							<p className="font-semibold">{inChargeLabel}</p>
							<AgentBadges agents={[inCharge]} locale={locale} highlightFirst />
						</div>
					)}

					{members.length > 0 && (
						<div className="bg-white rounded-xl shadow-sm p-5 text-xs text-slate-700 space-y-3">
							<p className="font-semibold">{teamLabel}</p>
							<AgentBadges agents={members} locale={locale} />
						</div>
					)}
				</aside>
			</section>
		</Container>
	);
}
