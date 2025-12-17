import Link from "next/link";
import { getDictionary, getLocalizedText } from "@/lib/i18n";
import { projects } from "@/lib/data";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildProjectListSchema } from "@/lib/seo";

function getTypeLabel(dict, category) {
  return dict.projects.types[category] || category;
}

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.projectsTitle,
    description: dict.meta.projectsDescription
  };
}

export default async function ProjectsPage({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const listPath = `/${locale}/projects`;
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: dict.nav.projects, path: listPath }
  ]);
  const listSchema = buildProjectListSchema(projects, listPath);

  return (
    <div className="space-y-6">
      <JsonLd data={[breadcrumb, listSchema]} />

      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{dict.projects.title}</h1>
          <p className="text-slate-600">{dict.projects.subtitle}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => {
          const name = getLocalizedText(p.name, locale);
          const summary = getLocalizedText(p.summary, locale);
          return (
            <article
              key={p.slug}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 text-sm"
            >
              <div className="text-xs text-primary font-semibold">
                {getTypeLabel(dict, p.category)}
              </div>
              <h2 className="font-semibold text-slate-900">{name}</h2>
              <div className="text-xs text-slate-500">
                {getLocalizedText(p.location, locale)}
              </div>
              <p className="text-xs text-slate-600 line-clamp-3">{summary}</p>
              <div className="mt-2">
                <Link
                  href={`/${locale}/projects/${p.slug}`}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  {locale === "zh-cn"
                    ? "查看项目详情 →"
                    : locale === "zh-hk"
                    ? "查看項目詳情 →"
                    : locale === "ms"
                    ? "Lihat butiran projek →"
                    : "View project details →"}
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
