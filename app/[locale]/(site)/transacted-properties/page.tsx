import { getDictionary } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.transactedTitle,
    description: dict.meta.transactedDescription
  };
}


export default async function Page({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const t = dict.transacted;

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: t.title, path: `/${locale}/transacted-properties` }
  ]);

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumb} />

      <section className="bg-white rounded-xl shadow-sm p-6 space-y-3 text-sm">
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-slate-700">{t.subtitle}</p>
        <p className="text-xs text-slate-500">
          {t.disclaimer}
        </p>
      </section>
    </div>
  );
}
