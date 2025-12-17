import { getDictionary } from "@/lib/i18n";
import { properties } from "@/lib/data";
import PropertyCard from "@/components/property/PropertyCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildPropertyListSchema } from "@/lib/seo";

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.propertiesTitle,
    description: dict.meta.propertiesDescription
  };
}

export default async function PropertiesPage({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const listPath = `/${locale}/properties`;
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: dict.nav.properties, path: listPath }
  ]);
  const listSchema = buildPropertyListSchema(properties, listPath);

  return (
    <div className="space-y-6">
      <JsonLd data={[breadcrumb, listSchema]} />

      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{dict.properties.title}</h1>
          <p className="text-slate-600">{dict.properties.subtitle}</p>
        </div>
        <div className="text-xs text-slate-500">
          {dict.properties.disclaimer}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.slug} property={p} locale={locale} />
        ))}
      </section>
    </div>
  );
}
