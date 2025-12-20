import { getTranslations } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface Props {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function SiteLayout({ children, params }: Props) {
	const { locale } = await params;
	const tNav = await getTranslations("nav");
	const tFooter = await getTranslations("footer");

	const dict = {
		nav: {
			home: tNav("home"),
			properties: tNav("properties"),
			projects: tNav("projects"),
			agents: tNav("agents"),
			about: tNav("about"),
			contact: tNav("contact"),
			news: tNav("news"),
			events: tNav("events"),
			mm2h: tNav("mm2h"),
			education: tNav("education"),
			faq: tNav("faq"),
			onlineListing: tNav("onlineListing"),
			recruitmentAgent: tNav("recruitmentAgent"),
			loginRegister: tNav("loginRegister"),
			savedProperties: tNav("savedProperties"),
			transactedProperties: tNav("transactedProperties"),
		},
		footer: {
			tagline: tFooter("tagline"),
		},
	};

	return (
		<div className="min-h-screen flex flex-col bg-slate-50">
			<Header />
			<main className="flex-1 container-main">{children}</main>
			<Footer />
		</div>
	);
}
