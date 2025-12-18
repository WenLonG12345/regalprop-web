export default function AgentCard({ agent }) {
	return (
		<article className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-start gap-2 text-sm">
			<div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 mb-1">
				{agent.name
					.split(" ")
					.map((x) => x[0])
					.join("")}
			</div>
			<div className="font-semibold text-slate-900">{agent.name}</div>
			<div className="text-xs text-slate-500 mb-1">{agent.title}</div>
			<a
				href={`https://wa.me/${agent.whatsapp}`}
				target="_blank"
				className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500 text-emerald-600 text-xs font-semibold hover:bg-emerald-50"
			>
				WhatsApp
			</a>
		</article>
	);
}
