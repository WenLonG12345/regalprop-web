"use client";

import { AspectRatio, Container, Image } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import AgentCard from "@/components/agent/AgentCard";
import JsonLd from "@/components/seo/JsonLd";
import { agents } from "@/lib/data";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { AGENT_LISTING } from "@/data/agent";
import { AgentCard } from "@/components/agent/AgentCard";
import { useRouter } from "@/i18n/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

// export async function generateMetadata({ params }: Props) {
// 	const { locale } = await params;
// 	const t = await getTranslations("meta");
// 	return {
// 		title: t("agentsTitle"),
// 		description: t("agentsDescription"),
// 	};
// }

export default function AgentsPage({ params }: Props) {
  const t = useTranslations();

  const router = useRouter();

  return (
    <Container size="xl" p="md">
      <section>
        <h1 className="text-2xl font-bold mb-2">{t("agents.title")}</h1>
        <p className="text-slate-600">{t("agents.subtitle")}</p>
      </section>

      <section className="flex flex-5 flex-col md:flex-row gap-5 mt-3">
        <div className="flex flex-4 flex-col gap-2">
          {AGENT_LISTING?.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onCardClick={() => {
                router.push(`/agents/${agent.id}`);
              }}
            />
          ))}
        </div>

        <div className="flex-1 flex-col gap-2">
          <AspectRatio ratio={16 / 9} className="mb-3">
            <iframe
              src="https://www.youtube.com/embed/aO_VAYOXfZc?autoplay=1&mute=1&si=5WZ13AosQxTKYFTf"
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </AspectRatio>

          <Image
            src="/hero_banner_square.png"
            alt="Regal Properties Banner"
            className="rounded-lg"
            width={300}
            height={300}
          />
        </div>
      </section>
    </Container>
  );
}
