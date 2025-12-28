"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatPriceLine } from "@/lib/currency";
import { usePreferenceStore } from "@/lib/store/usePreferenceStore";

export default function PropertyCard({ property, locale }: any) {
	const { currency, formatArea } = usePreferenceStore();

	const t = useTranslations();
	const priceLine = formatPriceLine(property.priceMyr, currency);

	return (
		<article className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
			<Link
				href={`/${locale}/properties/${property.slug}`}
				className="h-36 bg-slate-200 flex items-center justify-center text-xs text-slate-500"
			>
				{property.projectName}
			</Link>
			<div className="p-4 flex-1 flex flex-col gap-2 text-sm">
				<div className="text-xs text-primary font-semibold">
					{property.projectName}
				</div>
				<h2 className="font-semibold text-slate-900 line-clamp-2">
					{t("properties.title")}
				</h2>
				<div className="text-xs text-slate-500">{t("properties.subtitle")}</div>
				<div className="text-xs text-slate-500">
					{property.bedrooms}{" "}
					{locale.startsWith("zh") ? "房" : locale === "ms" ? "bilik" : "bed"} ·{" "}
					{property.bathrooms}{" "}
					{locale.startsWith("zh")
						? "卫"
						: locale === "ms"
							? "bilik air"
							: "bath"}{" "}
					· {property.builtUp && <span>{formatArea(property.builtUp)}</span>}
				</div>
				<div className="mt-1 text-xs font-semibold text-primary">
					{priceLine}
				</div>
				<div className="mt-3 flex items-center justify-between text-xs">
					<span className="text-slate-500">
						{locale === "zh-cn"
							? "想要完整资料与影片，请联系顾问。"
							: locale === "zh-hk"
								? "想要完整資料與影片，請聯絡顧問。"
								: locale === "ms"
									? "Untuk maklumat penuh dan video, hubungi ejen kami."
									: "For full details and video, contact our agent."}
					</span>
					<Link
						href={`/${locale}/properties/${property.slug}`}
						className="text-primary font-semibold hover:underline shrink-0 ml-2"
					>
						{t("properties.viewDetails")} →
					</Link>
				</div>
			</div>
		</article>
	);
}
