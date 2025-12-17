import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n";

export default async function SiteLayout({  children, params  }: any) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header locale={locale} dict={dict} />
      <main className="flex-1 container-main">{children}</main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
