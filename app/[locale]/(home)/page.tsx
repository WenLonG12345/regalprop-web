import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription
  };
}

export default async function HomePage({  params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">{dict.home.heroTitle}</h1>
        <p className="text-slate-600 mb-4">{dict.home.heroSubtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
          >
            {dict.home.viewListings}
          </Link>
          <Link
            href={`/${locale}/agents`}
            className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-sm hover:border-primary hover:text-primary"
          >
            {dict.home.meetTeam}
          </Link>
        </div>
      </section>
    </div>
  );
}
