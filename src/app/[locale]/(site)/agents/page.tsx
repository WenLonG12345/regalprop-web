import { getTranslations } from "next-intl/server";
import { agents } from "@/lib/data";
import AgentCard from "@/components/agent/AgentCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("meta");
  return {
    title: t("agentsTitle"),
    description: t("agentsDescription"),
  };
}

export default async function AgentsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("agents");
  const tNav = await getTranslations("nav");

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: tNav("agents"), path: `/${locale}/agents` },
  ]);

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumb} />
      <section>
        <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
        <p className="text-slate-600">{t("subtitle")}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {agents.map((agent) => (
          <AgentCard key={agent.slug} agent={agent} locale={locale} />
        ))}
      </section>
    </div>
  );
}
