import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function RootNotFound() {
	// If no locale is present, redirect to the default locale's 404 path
	// This ensures the user stays on a page that can return a 404 status
	redirect(`/${routing.defaultLocale}/404`);
}
