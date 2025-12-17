import { getDictionary } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription
  };
}

export default async function AboutPage({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: dict.nav.about, path: `/${locale}/about` }
  ]);

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumb} />
      <section className="bg-white rounded-xl shadow-sm p-6 text-sm space-y-4">
        <h1 className="text-2xl font-bold mb-2">{dict.about.title}</h1>
        <p className="text-slate-700">{dict.about.p1}</p>
        <p className="text-slate-700">{dict.about.p2}</p>
        <div className="grid md:grid-cols-3 gap-4 pt-2">
          {dict.about.highlights.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 text-xs text-slate-700 bg-slate-50"
            >
              <div className="font-semibold mb-1">{item.title}</div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
