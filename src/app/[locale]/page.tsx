import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });
	return {
		title: t("homeTitle"),
		description: t("homeDescription"),
	};
}

export default async function HomePage({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations("home");

	return (
		<div className="space-y-6">
			<section className="bg-white rounded-xl shadow-sm p-6">
				<h1 className="text-2xl font-bold mb-2">{t("heroTitle")}</h1>
				<p className="text-slate-600 mb-4">{t("heroSubtitle")}</p>
				<div className="flex flex-wrap gap-3">
					<Link
						href={`/${locale}/properties`}
						className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
					>
						{t("viewListings")}
					</Link>
					<Link
						href={`/${locale}/agents`}
						className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-sm hover:border-primary hover:text-primary"
					>
						{t("meetTeam")}
					</Link>
				</div>
			</section>
		</div>
	);
}
