"use client";

import { AspectRatio, Button, Container, Image } from "@mantine/core";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { FaChevronRight } from "react-icons/fa6";
import { PropertyCard } from "@/components/property/PropertyCard";
import JsonLd from "@/components/seo/JsonLd";
import { AGENT_LISTING } from "@/data/agent";
import { RENT_LISTING } from "@/data/properties";
import { useRouter } from "@/i18n/navigation";
import { properties } from "@/lib/data";
import { buildBreadcrumbSchema, buildPropertyListSchema } from "@/lib/seo";

// export async function generateMetadata({ params }: Props) {
//   const { locale } = await params;
//   const t = await getTranslations("meta");
//   return {
//     title: t("propertiesTitle"),
//     description: t("propertiesDescription"),
//   };
// }

export default function RentPage() {
	const t = useTranslations();

	const router = useRouter();

	return (
		<Container size="xl" p="md">
			<section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
				<div>
					<h1 className="text-2xl font-bold mb-2">{t("rent.title")}</h1>
					<p className="text-slate-600">{t("rent.subtitle")}</p>
				</div>
			</section>

			<section className="flex flex-5 flex-col md:flex-row gap-5">
				<div className="flex flex-4 flex-col gap-2">
					{RENT_LISTING.map((p) => (
						<PropertyCard
							key={p.id}
							property={p}
							onCardClick={(property) => {
								router.push(`/rent/${property.id}`);
							}}
						/>
					))}
				</div>

				<div className="flex-1 flex-col gap-2">
					<AspectRatio ratio={16 / 9} className="mb-3">
						<iframe
							src="https://www.youtube.com/embed/aO_VAYOXfZc?autoplay=1&mute=1&si=5WZ13AosQxTKYFTf"
							title="YouTube video player"
							style={{ border: 0 }}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</AspectRatio>

					<Image
						src="/hero_banner_square.png"
						alt="Regal Properties Banner"
						className="rounded-lg"
						width={300}
						height={300}
					/>

					<div className="mt-3">
						<h3 className="text-2xl font-bold mb-2">Popular Agents</h3>
						<div className="bg-primary w-full h-1" />

						{AGENT_LISTING.map((agent) => (
							<div
								key={agent.id}
								className="mt-2 border-b border-gray-300 pb-2 flex items-center gap-3"
							>
								<Image src={agent.image} w={70} h={80} alt={agent.name} />
								<div className="flex flex-col justify-between w-full">
									<div>
										<div className="text-lg font-semibold">{agent.name}</div>
										<div className="text-gray-500 text-sm">{agent.id}</div>
									</div>

									<Button
										size="compact-xs"
										variant="outline"
										rightSection={<FaChevronRight />}
										className="self-end"
										onClick={() => {
											router.push(`/agents/${agent.id}`);
										}}
									>
										More
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</Container>
	);
}
