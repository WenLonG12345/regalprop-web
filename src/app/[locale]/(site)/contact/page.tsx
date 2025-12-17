import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";
import ContactFormClient from "@/components/contact/ContactFormClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("meta");
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const tNav = await getTranslations("nav");

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: tNav("contact"), path: `/${locale}/contact` },
  ]);

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumb} />
      <ContactFormClient locale={locale} />
    </div>
  );
}
