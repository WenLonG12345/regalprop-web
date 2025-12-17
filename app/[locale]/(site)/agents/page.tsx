import { getDictionary } from "@/lib/i18n";
import { agents } from "@/lib/data";
import AgentCard from "@/components/agent/AgentCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.agentsTitle,
    description: dict.meta.agentsDescription
  };
}

export default async function AgentsPage({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", path: `/${locale}` },
    { name: dict.nav.agents, path: `/${locale}/agents` }
  ]);

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumb} />
      <section>
        <h1 className="text-2xl font-bold mb-2">{dict.agents.title}</h1>
        <p className="text-slate-600">{dict.agents.subtitle}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {agents.map((agent) => (
          <AgentCard key={agent.slug} agent={agent} locale={locale} />
        ))}
      </section>
    </div>
  );
}
