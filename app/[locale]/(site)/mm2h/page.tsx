import { getDictionary } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.mm2hTitle,
    description: dict.meta.mm2hDescription
  };
}


export default async function Page({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const t = dict.mm2h;

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: t.title, path: `/${locale}/mm2h` }
  ]);

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumb} />

      <section className="bg-white rounded-xl shadow-sm p-6 space-y-4 text-sm">
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-slate-700">{t.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <h2 className="font-semibold text-base">{t.sections.overviewTitle}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.overviewBody}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold text-base">{t.sections.consultTitle}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.consultBody}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
