import { getTranslations } from "next-intl/server";
import { properties } from "@/lib/data";
import PropertyCard from "@/components/property/PropertyCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildPropertyListSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("meta");
  return {
    title: t("propertiesTitle"),
    description: t("propertiesDescription"),
  };
}

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("properties");
  const tNav = await getTranslations("nav");

  const listPath = `/${locale}/properties`;
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: tNav("properties"), path: listPath },
  ]);
  const listSchema = buildPropertyListSchema(properties, listPath);

  return (
    <div className="space-y-6">
      <JsonLd data={[breadcrumb, listSchema]} />

      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
          <p className="text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="text-xs text-slate-500">{t("disclaimer")}</div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.slug} property={p} locale={locale} />
        ))}
      </section>
    </div>
  );
}
