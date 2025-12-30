import { notFound } from "next/navigation";

export default function CatchAllPage() {
	notFound(); // This triggers the local not-found.tsx and sends 404 status code
}
