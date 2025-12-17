import HomeHeader from "@/components/layout/HomeHeader";
import HomeFooter from "@/components/layout/HomeFooter";
import { getDictionary } from "@/lib/i18n";

export default async function HomeLayout({  children, params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <HomeHeader locale={locale} dict={dict} />
      <main className="flex-1 container-main">{children}</main>
      <HomeFooter locale={locale} dict={dict} />
    </div>
  );
}
