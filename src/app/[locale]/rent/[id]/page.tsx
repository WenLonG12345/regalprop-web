"use client";

import { Carousel } from "@mantine/carousel";
import {
	ActionIcon,
	AspectRatio,
	Badge,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Group,
	Image,
	Paper,
	rem,
	SimpleGrid,
	Stack,
	Tabs,
	Text,
	Title,
	UnstyledButton,
} from "@mantine/core";
import { use, useRef, useState } from "react";
import { FaBalanceScale } from "react-icons/fa";
import { LuHeart, LuMapPin, LuPlay, LuShare2 } from "react-icons/lu";
import { RENT_LISTING } from "@/data/properties";

const RentDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = use(params);

	const data = RENT_LISTING.find((property) => property.id === id);

	// Use the gallery if available, otherwise fallback to the main image repeated
	const galleryImages = data.gallery || [data.image, data.image, data.image];
	const [activeSlide, setActiveSlide] = useState(0);
	const carouselRef = useRef<any>(null);

	const handleThumbnailClick = (index: number) => {
		setActiveSlide(index);
		carouselRef.current?.scrollTo(index);
	};

	if (!data) {
		return null;
	}

	return (
		<Box pb={{ base: 80, md: 0 }}>
			<Container size="lg" py="md">
				<Group justify="space-between" align="flex-start" mb="md" wrap="nowrap">
					<Stack gap={4} style={{ flex: 1 }}>
						{data.tags?.includes("Directors' Choice") && (
							<Badge color="pink" variant="light" leftSection="⭐">
								Directors' Choice
							</Badge>
						)}

						<Title order={2} size="h3" style={{ lineHeight: 1.3 }}>
							{data.title}
						</Title>

						<Group gap={4} c="dimmed">
							<LuMapPin size={16} color="orange" />
							<Text size="sm" c="blue">
								{data.location}
							</Text>
						</Group>
					</Stack>

					{/* Icons (Mobile/Desktop logic remains same) */}
					<Group gap="sm" hiddenFrom="md">
						<ActionIcon variant="transparent" c="gray">
							<FaBalanceScale size={22} />
						</ActionIcon>
						<ActionIcon variant="transparent" c="gray">
							<LuHeart size={22} />
						</ActionIcon>
						<ActionIcon variant="transparent" c="gray">
							<LuShare2 size={22} />
						</ActionIcon>
					</Group>

					<Group gap="xs" visibleFrom="md">
						<Button variant="light" color="blue" radius="xl">
							Live Chat
						</Button>
						<Button variant="subtle" color="gray">
							Share
						</Button>
					</Group>
				</Group>

				{/* --- DESKTOP NAVIGATION TABS --- */}
				<Box visibleFrom="md" mb="lg">
					<Tabs defaultValue="photo">
						<Tabs.List>
							<Tabs.Tab value="vr">VR(1)</Tabs.Tab>
							<Tabs.Tab value="photo">Photo({galleryImages.length})</Tabs.Tab>
							<Tabs.Tab value="floorplan">Floor Plan(3)</Tabs.Tab>
							<Tabs.Tab value="street">Street View</Tabs.Tab>
							<Tabs.Tab value="map">Map</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</Box>

				{/* --- GALLERY SECTION --- */}
				<Grid gutter="xl">
					<Grid.Col span={{ base: 12, md: 8 }}>
						<Stack>
							{/* Desktop Carousel */}
							<Box visibleFrom="md">
								<Carousel
									withIndicators={false}
									height="100%"
									style={{ flex: 1 }}
									slideGap="md"
									controlsOffset="xs"
									onSlideChange={setActiveSlide}
									getEmblaApi={(embla) => {
										carouselRef.current = embla;
									}}
								>
									{galleryImages.map((img, i) => (
										<Carousel.Slide key={img}>
											<AspectRatio ratio={16 / 9}>
												<Image
													src={img}
													alt={`${data.title} - image ${i + 1}`}
													radius="sm"
												/>
											</AspectRatio>
										</Carousel.Slide>
									))}
								</Carousel>
							</Box>

							{/* Mobile Static Image with Play Overlay */}
							<Box hiddenFrom="md" pos="relative">
								<AspectRatio ratio={16 / 9}>
									<Image src={galleryImages[0]} alt={data.title} radius="sm" />
								</AspectRatio>
								<Box
									pos="absolute"
									inset={0}
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<LuPlay size={64} color="white" fill="rgba(0,0,0,0.3)" />
								</Box>
							</Box>

							{/* Mobile Navigation Tabs (Pills) */}
							<Box hiddenFrom="md">
								<Tabs defaultValue="vr" variant="pills" color="red" radius="xl">
									<Tabs.List style={{ flexWrap: "nowrap", overflowX: "auto" }}>
										<Tabs.Tab value="vr" style={{ whiteSpace: "nowrap" }}>
											VR
										</Tabs.Tab>
										<Tabs.Tab value="photo">Photo</Tabs.Tab>
										<Tabs.Tab value="floor">Floor Plan</Tabs.Tab>
										<Tabs.Tab value="street">Street</Tabs.Tab>
									</Tabs.List>
								</Tabs>
							</Box>

							{/* Desktop Thumbnails with Selection Logic */}
							<SimpleGrid cols={5} spacing="xs" visibleFrom="md" mt="sm">
								{galleryImages.map((img, i) => (
									<UnstyledButton
										key={img}
										onClick={() => handleThumbnailClick(i)}
									>
										<AspectRatio ratio={4 / 3} style={{ cursor: "pointer" }}>
											<Image
												src={img}
												radius="sm"
												style={{
													border:
														i === activeSlide
															? "2px solid #e03131"
															: "2px solid transparent",
													transition: "border-color 0.2s ease",
													height: "100%", // Ensures image fills the aspect ratio container
													objectFit: "cover",
												}}
											/>
										</AspectRatio>
									</UnstyledButton>
								))}
							</SimpleGrid>
						</Stack>
					</Grid.Col>

					{/* --- INFO COLUMN --- */}
					<Grid.Col span={{ base: 12, md: 4 }}>
						<Stack gap="lg">
							{/* Price Block */}
							<Box>
								<Text size="sm" c="dimmed" mb={4}>
									Prem. paid
								</Text>
								<Group justify="space-between">
									<Group gap="xs">
										<Badge size="lg" radius="sm" color="red" variant="filled">
											Sell
										</Badge>
										<Text fw={700} c="red" style={{ fontSize: rem(26) }}>
											$ {data.price} M
										</Text>
									</Group>

									{data.rentPrice && (
										<Group gap="xs">
											<Badge
												size="lg"
												radius="sm"
												color="orange"
												variant="filled"
											>
												Rent
											</Badge>
											<Text fw={700} c="orange" style={{ fontSize: rem(26) }}>
												$ {data.rentPrice.toLocaleString()}
											</Text>
										</Group>
									)}
								</Group>
							</Box>

							{/* Specs */}
							<Paper withBorder p="md" radius="sm">
								<Group align="flex-start">
									<Badge variant="outline" color="orange" radius="sm">
										S.A.
									</Badge>
									<Stack gap={0}>
										<Text fw={700} size="lg">
											{data.saleableArea}
										</Text>
										<Text size="xs" c="dimmed">
											{data.saleableAreaRate}
										</Text>
									</Stack>
								</Group>
							</Paper>

							<Divider />

							<Grid grow>
								<Grid.Col span={6}>
									<Stack gap={0} align="center">
										<Text size="xs" c="dimmed">
											Room
										</Text>
										<Text fw={600}>{data.rooms || "Open Plan"}</Text>
									</Stack>
								</Grid.Col>
								<Grid.Col span={6}>
									<Stack gap={0} align="center">
										<Text size="xs" c="dimmed">
											Age
										</Text>
										<Text fw={600}>
											{data.age !== undefined ? `${data.age} Year(s)` : "N/A"}
										</Text>
									</Stack>
								</Grid.Col>
							</Grid>

							<Divider />

							{/* Tags Rendering */}
							{data.tags && data.tags.length > 0 && (
								<Group gap="xs">
									<Text size="sm" c="dimmed">
										Features
									</Text>
									{data.tags.map((tag) => (
										<Badge key={tag} variant="light" color="gray" radius="sm">
											{tag}
										</Badge>
									))}
								</Group>
							)}

							<Text size="xs" c="dimmed" mt="xs">
								Ref no.: SOA673 · Update Date:{" "}
								{data.materialDate || "2025-12-30"}
							</Text>
						</Stack>
					</Grid.Col>
				</Grid>
			</Container>
		</Box>
	);
};

export default RentDetailPage;
