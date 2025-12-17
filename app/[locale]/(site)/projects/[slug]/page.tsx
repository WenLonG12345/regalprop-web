import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getLocalizedText } from "@/lib/i18n";
import {
  getProjectBySlug,
  properties as allProperties,
  getAgentBySlug
} from "@/lib/data";
import PropertyCard from "@/components/property/PropertyCard";
import AgentBadges from "@/components/agent/AgentBadges";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbSchema,
  buildProjectDetailSchema
} from "@/lib/seo";

function getTypeLabel(dict, category) {
  return dict.projects.types[category] || category;
}

export async function generateMetadata({  params  }: any) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: dict.meta.projectsTitle,
      description: dict.meta.projectsDescription
    };
  }

  const name = getLocalizedText(project.name, locale);

  return {
    title: `${name} | ${dict.meta.projectsTitle}`,
    description:
      getLocalizedText(project.summary, locale) ||
      dict.meta.projectsDescription
  };
}

export default async function ProjectDetailsPage({  params  }: any) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const name = getLocalizedText(project.name, locale);
  const summary =
    getLocalizedText(project.summary, locale) ||
    getLocalizedText(project.summary, "en");

  const backLabel =
    locale === "zh-cn"
      ? "返回新项目列表"
      : locale === "zh-hk"
      ? "返回新項目列表"
      : locale === "ms"
      ? "Kembali ke senarai projek"
      : "Back to projects";

  const inChargeLabel = dict.projects.inCharge;
  const teamLabel = dict.projects.team;
  const relatedUnitsLabel = dict.projects.relatedUnits;

  const statusLabel = dict.projects.statusLabel;
  const phaseLabel = dict.projects.phaseLabel;
  const completionLabel = dict.projects.completionLabel;

  const inCharge = getAgentBySlug(project.personInChargeSlug);
  const members = (project.memberSlugs || [])
    .map((slug) => getAgentBySlug(slug))
    .filter(Boolean);

  const projectProperties = allProperties.filter((p) =>
    (project.propertySlugs || []).includes(p.slug)
  );

  const listPath = `/${locale}/projects`;
  const detailPath = `${listPath}/${project.slug}`;
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: dict.nav.projects, path: listPath },
    { name, path: detailPath }
  ]);
  const detailSchema = buildProjectDetailSchema(project, listPath);

  return (
    <div className="space-y-6">
      <JsonLd data={[breadcrumb, detailSchema]} />

      <Link
        href={listPath}
        className="text-xs text-slate-500 hover:text-primary"
      >
        ← {backLabel}
      </Link>

      <section className="bg-white rounded-xl shadow-sm p-6 space-y-4 text-sm">
        <div className="text-xs text-primary font-semibold">
          {getTypeLabel(dict, project.category)}
        </div>
        <h1 className="text-xl font-semibold text-slate-900">{name}</h1>
        <div className="text-xs text-slate-500">
          {getLocalizedText(project.location, locale)}
        </div>
        <p className="text-slate-700 leading-relaxed">{summary}</p>

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
              <AgentBadges
                agents={[inCharge]}
                locale={locale}
                highlightFirst
              />
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
    </div>
  );
}
