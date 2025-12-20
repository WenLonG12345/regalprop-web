import AgentCard from "@/components/agent/AgentCard";
import JsonLd from "@/components/seo/JsonLd";
import { agents } from "@/lib/data";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { Container } from "@mantine/core";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations();

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/` },
    { name: t("agents.title"), path: `/agents` },
  ]);

  return (
    <Container size="xl" p="md">
      <JsonLd data={breadcrumb} />
      <section>
        <h1 className="text-2xl font-bold mb-2">{t("agents.title")}</h1>
        <p className="text-slate-600">{t("agents.subtitle")}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {agents?.map((agent) => (
          <AgentCard key={agent.slug} agent={agent} locale={locale} />
        ))}
      </section>
    </Container>
  );
}
