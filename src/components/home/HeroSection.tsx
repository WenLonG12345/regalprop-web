"use client";

import { Carousel } from "@mantine/carousel";
import {
	Box,
	Button,
	Card,
	Grid,
	Group,
	Select,
	Stack,
	Tabs,
	TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Building2, DollarSign, MapPin, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";

const SEARCH_TABS = [
	{ value: "sales", label: "Sales" },
	{ value: "rent", label: "Rent" },
	{ value: "transact", label: "Tranact" },
	{ value: "location", label: "Location" },
	{ value: "new-launch", label: "New Launch" },
	{ value: "agents", label: "Agents" },
];

const CHIPS_ITEM = [
	{ label: "KLCC", value: "klcc" },
	{ label: "TRX", value: "trx" },
	{ label: "Pavilion", value: "pavilion" },
	{ label: "Bukit Bintang", value: "bukit-bintang" },
	{ label: "Mont Kiara", value: "mont-kiara" },
	{ label: "Damansara", value: "damansara" },
];

const HeroSection = () => {
	const isMobile = useMediaQuery("(max-width: 62em)");

	return (
		<div className="flex items-center gap-5 justify-center md:flex-row flex-col-reverse">
			<div className="bg-black/30 rounded-md p-3 md:p-6">
				<Tabs defaultValue="sales">
					<Tabs.List mb="lg">
						{SEARCH_TABS.map((tab) => (
							<Tabs.Tab
								key={tab.value}
								value={tab.value}
								classNames={{
									tabLabel: "text-white",
								}}
								styles={{
									tab: {
										"--tab-hover-color": "transparent",
									},
								}}
							>
								{tab.label}
							</Tabs.Tab>
						))}
					</Tabs.List>

					<div className="flex flex-col gap-2">
						<TextInput
							placeholder="Location, Project or Agents"
							leftSection={<MapPin size={18} />}
							className="w-full md:w-100"
							size={isMobile ? "sm" : "md"}
						/>

						<Button
							size={isMobile ? "sm" : "lg"}
							leftSection={<Search size={18} />}
						>
							Search
						</Button>
					</div>

					<div className="mt-4">
						<div className="text-white">Quick Filter</div>
						{CHIPS_ITEM.map((item) => (
							<Button
								key={item.value}
								radius="xl"
								size="xs"
								className="mr-2 mt-2 text-white border-white/50 hover:bg-white/20 hover:border-white"
							>
								{item.label}
							</Button>
						))}
					</div>
				</Tabs>
			</div>

			<div className="w-full md:w-113">
				<Carousel
					withIndicators
					height={250}
					emblaOptions={{
						dragFree: true,
						align: isMobile ? "center" : "start",
					}}
					slideGap="md"
				>
					<Carousel.Slide>
						<Box className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-700">
							Placeholder 1
						</Box>
					</Carousel.Slide>
					<Carousel.Slide>
						<Box className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-700">
							Placeholder 2
						</Box>
					</Carousel.Slide>
					<Carousel.Slide>
						<Box className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-700">
							Placeholder 3
						</Box>
					</Carousel.Slide>
					<Carousel.Slide>
						<Box className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-700">
							Placeholder 4
						</Box>
					</Carousel.Slide>
					<Carousel.Slide>
						<Box className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-700">
							Placeholder 5
						</Box>
					</Carousel.Slide>
				</Carousel>
			</div>
		</div>
	);
};

export default HeroSection;
