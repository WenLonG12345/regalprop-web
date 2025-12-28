"use client";

import {
	ActionIcon,
	Badge,
	Box,
	Card,
	Container,
	Grid,
	Group,
	Image,
	ScrollArea,
	Stack,
	Text,
} from "@mantine/core";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface Property {
	id: string;
	location: string;
	name: string;
	details: string;
	salableArea: number;
	grossArea: number;
	price: number;
	image: string;
	badge?: string;
}

const categories = [
	"Foreigners Favourite",
	"Pet Friendly",
	"High Rental Return Estate",
	"Starter",
	"Better Off Buying",
	"Luxury",
	"100m to MRT",
	"Exclusive",
	"Director's Choice",
	"Markdown",
	"Special Unit",
	"Up to 70% Mortgage",
	"90% Mortgage",
];

const mockProperties: Property[] = [
	{
		id: "1",
		location: "Mid-Levels West",
		name: "The Belcher's",
		details: "High Floor · FLAT D · 3...",
		salableArea: 1111,
		grossArea: 1409,
		price: 30,
		image: "https://placehold.co/500x350/f5f5f5/999999?text=Property+Image",
		badge: "AI Deco & Tour",
	},
	{
		id: "2",
		location: "Tsim Sha Tsui",
		name: "The Masterpiece",
		details: "Mid Floor · Tower 1 · 2B2B",
		salableArea: 892,
		grossArea: 1123,
		price: 25.8,
		image: "https://placehold.co/500x350/e8f4f8/4a90a4?text=Property+Image",
		badge: "Virtual Tour",
	},
	{
		id: "3",
		location: "Central",
		name: "The Harbourside",
		details: "High Floor · Tower A · 3B2B",
		salableArea: 1250,
		grossArea: 1580,
		price: 45.5,
		image: "https://placehold.co/500x350/fff3e0/ff9800?text=Property+Image",
	},
	{
		id: "4",
		location: "Kowloon Station",
		name: "Sorrento",
		details: "Tower 5 · Floor 28 · 2B2B",
		salableArea: 756,
		grossArea: 945,
		price: 18.9,
		image: "https://placehold.co/500x350/f3e5f5/8e24aa?text=Property+Image",
		badge: "New Listing",
	},
	{
		id: "5",
		location: "Causeway Bay",
		name: "Grand Panorama",
		details: "Tower 2 · Mid Floor · 3B3B",
		salableArea: 1420,
		grossArea: 1789,
		price: 52.3,
		image: "https://placehold.co/500x350/e8f5e9/66bb6a?text=Property+Image",
	},
	{
		id: "6",
		location: "Quarry Bay",
		name: "Taikoo Shing",
		details: "Block 12 · Low Floor · 2B1B",
		salableArea: 645,
		grossArea: 812,
		price: 12.8,
		image: "https://placehold.co/500x350/fce4ec/ec407a?text=Property+Image",
		badge: "Hot Deal",
	},
	{
		id: "7",
		location: "Admiralty",
		name: "The Sail at Victoria",
		details: "Tower 6 · High Floor · 4B3B",
		salableArea: 1876,
		grossArea: 2345,
		price: 68.9,
		image: "https://placehold.co/500x350/e0f2f1/00897b?text=Property+Image",
	},
	{
		id: "8",
		location: "Hung Hom",
		name: "Harbour Place",
		details: "Tower C · Mid Floor · 2B2B",
		salableArea: 823,
		grossArea: 1034,
		price: 16.5,
		image: "https://placehold.co/500x350/fff9c4/fbc02d?text=Property+Image",
	},
	{
		id: "9",
		location: "West Kowloon",
		name: "The Arch",
		details: "Sky Tower · Floor 45 · 3B2B",
		salableArea: 1098,
		grossArea: 1387,
		price: 35.2,
		image: "https://placehold.co/500x350/e1f5fe/0288d1?text=Property+Image",
		badge: "Premium View",
	},
];

export default function HotPickSection() {
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);
	const [favorites, setFavorites] = useState<Set<string>>(new Set());

	const toggleFavorite = (id: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			if (newFavorites.has(id)) {
				newFavorites.delete(id);
			} else {
				newFavorites.add(id);
			}
			return newFavorites;
		});
	};

	return (
		<Box py={{ base: "xl", md: "3rem" }}>
			<Container size="xl">
				<Text size="36px" fw={700} mb="xl" ta="center">
					Hot Picks
				</Text>

				{/* Mobile: Horizontal Scrollable Chips */}
				<ScrollArea
					hiddenFrom="md"
					mb="xl"
					styles={{
						scrollbar: {
							display: "none",
						},
					}}
				>
					<Group gap="xs" wrap="nowrap" pb="xs">
						{categories.map((category) => (
							<div
								key={category}
								onClick={() => setSelectedCategory(category)}
								className="bg-gray-200 rounded-full px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap hover:bg-gray-300"
							>
								{category}
							</div>
						))}
					</Group>
				</ScrollArea>

				<Grid gutter="xl">
					{/* Desktop: Sticky Sidebar */}
					<Grid.Col span={{ base: 12, md: 3 }} visibleFrom="md">
						<Box
							style={{
								position: "sticky",
								top: 100,
							}}
						>
							<Stack gap="xs">
								{categories.map((category) => (
									<Box
										key={category}
										onClick={() => setSelectedCategory(category)}
										px="md"
										py="sm"
										style={{
											cursor: "pointer",
											backgroundColor:
												selectedCategory === category
													? "#f8f9fa"
													: "transparent",
											borderLeft:
												selectedCategory === category
													? "3px solid #b9986a"
													: "3px solid transparent",
											transition: "all 0.2s",
											fontWeight: selectedCategory === category ? 600 : 400,
											fontSize: "14px",
										}}
										onMouseEnter={(e) => {
											if (selectedCategory !== category) {
												e.currentTarget.style.backgroundColor = "#f8f9fa";
											}
										}}
										onMouseLeave={(e) => {
											if (selectedCategory !== category) {
												e.currentTarget.style.backgroundColor = "transparent";
											}
										}}
									>
										{category}
									</Box>
								))}
							</Stack>
						</Box>
					</Grid.Col>

					{/* Property Cards Grid - Desktop */}
					<Grid.Col span={{ base: 12, md: 9 }} visibleFrom="md">
						<Grid gutter="md">
							{mockProperties.map((property) => (
								<Grid.Col key={property.id} span={4}>
									<Card
										shadow="none"
										padding="0"
										radius="md"
										withBorder
										style={{
											cursor: "pointer",
											transition: "all 0.3s",
											height: "100%",
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.boxShadow =
												"0 4px 20px rgba(0,0,0,0.15)";
											e.currentTarget.style.transform = "translateY(-4px)";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.boxShadow = "none";
											e.currentTarget.style.transform = "translateY(0)";
										}}
									>
										<Card.Section pos="relative">
											<Image
												src={property.image}
												height={200}
												alt={property.name}
												fit="cover"
											/>
											{property.badge && (
												<Badge
													pos="absolute"
													bottom={10}
													right={10}
													color="orange"
													size="md"
													style={{
														backgroundColor: "rgba(255, 255, 255, 0.95)",
														color: "#b8860b",
														fontWeight: 600,
														whiteSpace: "nowrap",
													}}
												>
													{property.badge}
												</Badge>
											)}
											<ActionIcon
												variant="filled"
												color={favorites.has(property.id) ? "red" : "gray"}
												size="lg"
												radius="xl"
												pos="absolute"
												top={10}
												right={10}
												onClick={(e) => {
													e.stopPropagation();
													toggleFavorite(property.id);
												}}
												style={{
													backgroundColor: favorites.has(property.id)
														? "#ff4444"
														: "rgba(255, 255, 255, 0.9)",
													transition: "all 0.2s",
												}}
											>
												{favorites.has(property.id) ? (
													<FaHeart size={18} color="white" />
												) : (
													<FaRegHeart size={18} color="#666" />
												)}
											</ActionIcon>
										</Card.Section>

										<Stack gap="xs" p="md">
											<Text size="xs" c="dimmed">
												{property.location}
											</Text>
											<Text size="lg" fw={700} lineClamp={1}>
												{property.name}
											</Text>
											<Text size="sm" c="dimmed" lineClamp={1}>
												{property.details}
											</Text>
											<Group gap="xs" mt="xs">
												<Text size="xs" c="dimmed">
													S.A. {property.salableArea.toLocaleString()}ft²·
												</Text>
												<Text size="xs" c="dimmed">
													GFA {property.grossArea.toLocaleString()}ft²
												</Text>
											</Group>
											<Text size="xl" fw={700} c="red" mt="sm">
												${property.price}M
											</Text>
										</Stack>
									</Card>
								</Grid.Col>
							))}
						</Grid>
					</Grid.Col>

					{/* Property Cards Horizontal Scroll - Mobile */}
					<Grid.Col span={12} hiddenFrom="md">
						<ScrollArea
							styles={{
								scrollbar: { display: "none" },
							}}
						>
							<Group gap="md" wrap="nowrap" pb="xs">
								{mockProperties.map((property) => (
									<Card
										key={property.id}
										shadow="none"
										padding="0"
										radius="md"
										withBorder
										className="cursor-pointer min-w-60"
									>
										<Card.Section pos="relative">
											<Image
												src={property.image}
												height={180}
												alt={property.name}
												fit="cover"
											/>
											{property.badge && (
												<Badge
													pos="absolute"
													bottom={10}
													right={10}
													color="orange"
													size="md"
													style={{
														backgroundColor: "rgba(255, 255, 255, 0.95)",
														color: "#b8860b",
														fontWeight: 600,
														whiteSpace: "nowrap",
													}}
												>
													{property.badge}
												</Badge>
											)}
											<ActionIcon
												variant="filled"
												color={favorites.has(property.id) ? "red" : "gray"}
												size="md"
												radius="xl"
												pos="absolute"
												top={8}
												right={8}
												onClick={(e) => {
													e.stopPropagation();
													toggleFavorite(property.id);
												}}
												style={{
													backgroundColor: favorites.has(property.id)
														? "#ff4444"
														: "rgba(255, 255, 255, 0.9)",
												}}
											>
												{favorites.has(property.id) ? (
													<FaHeart size={14} color="white" />
												) : (
													<FaRegHeart size={14} color="#666" />
												)}
											</ActionIcon>
										</Card.Section>

										<Stack gap="xs" p="sm">
											<Text size="xs" c="dimmed">
												{property.location}
											</Text>
											<Text size="md" fw={700} lineClamp={1}>
												{property.name}
											</Text>
											<Text size="xs" c="dimmed" lineClamp={1}>
												{property.details}
											</Text>
											<Group gap="xs" mt="xs">
												<Text size="xs" c="dimmed">
													S.A. {property.salableArea.toLocaleString()}ft²·
												</Text>
												<Text size="xs" c="dimmed">
													GFA {property.grossArea.toLocaleString()}ft²
												</Text>
											</Group>
											<Text size="lg" fw={700} c="red" mt="xs">
												${property.price}M
											</Text>
										</Stack>
									</Card>
								))}
							</Group>
						</ScrollArea>
					</Grid.Col>
				</Grid>
			</Container>
		</Box>
	);
}
