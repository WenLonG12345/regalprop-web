import { getLocalizedText } from "@/lib/i18n";

export default function AgentBadges({  agents, locale, highlightFirst  }: any) {
  if (!agents || agents.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {agents.map((agent, index) => {
        const title = getLocalizedText(agent.title, locale);
        const isPrimary = highlightFirst && index === 0;

        return (
          <div
            key={agent.slug}
            className="flex items-center justify-between gap-3 bg-slate-50 rounded-lg px-3 py-2 text-xs"
          >
            <div>
              <div className="font-semibold text-slate-900">
                {agent.name}{" "}
                {isPrimary && (
                  <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-[10px] text-white">
                    PIC
                  </span>
                )}
              </div>
              {title && (
                <div className="text-slate-500 text-[11px]">{title}</div>
              )}
            </div>
            <a
              href={`https://wa.me/${agent.whatsapp}`}
              target="_blank"
              className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-50"
            >
              WhatsApp
            </a>
          </div>
        );
      })}
    </div>
  );
}
