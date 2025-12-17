import { getDictionary } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";
import ContactFormClient from "@/components/contact/ContactFormClient";

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.contactTitle,
    description: dict.meta.contactDescription
  };
}

export default async function ContactPage({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: dict.nav.contact, path: `/${locale}/contact` }
  ]);

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumb} />
      <ContactFormClient locale={locale} dict={dict} />
    </div>
  );
}
