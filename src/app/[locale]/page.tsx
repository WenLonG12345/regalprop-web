"use client";

import {
	Anchor,
	Badge,
	Box,
	Button,
	Card,
	Container,
	Grid,
	Group,
	Select,
	Stack,
	Tabs,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import {
	Award,
	Building2,
	DollarSign,
	Home,
	MapPin,
	Search,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {
	params: Promise<{ locale: string }>;
};

// export async function generateMetadata({ params }: Props) {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: "meta" });
//   return {
//     title: t("homeTitle"),
//     description: t("homeDescription"),
//     openGraph: {
//       title: t("homeTitle"),
//       description: t("homeDescription"),
//       type: "website",
//     },
//   };
// }

export default function HomePage() {
	const t = useTranslations();

	const features = [
		{
			icon: Building2,
			title: "Premium Properties",
			description: "KLCC / TRX / Pavilion high-value properties",
		},
		{
			icon: TrendingUp,
			title: "Market Insights",
			description: "Real-time market data and trends",
		},
		{
			icon: Users,
			title: "Expert Agents",
			description: "Specialist team with local knowledge",
		},
		{
			icon: Award,
			title: "Trusted Service",
			description: "End-to-end property solutions",
		},
	];

	const quickLinks = [
		{ label: t("nav.properties"), href: `/properties`, icon: Home },
		{ label: t("nav.projects"), href: `/projects`, icon: Building2 },
		{ label: t("nav.agents"), href: `/agents`, icon: Users },
		{
			label: t("nav.transactedProperties"),
			href: `/transacted-properties`,
			icon: DollarSign,
		},
	];

	return (
		<Box>
			{/* Hero Section with Search */}
			<Box
				style={{
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					minHeight: "500px",
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Container size="xl" py={80}>
					<Stack
						gap="xl"
						align="center"
						style={{ position: "relative", zIndex: 1 }}
					>
						<Badge size="lg" variant="light" color="white" radius="sm">
							KLCC Property Specialist
						</Badge>

						<Title
							order={1}
							size="3rem"
							fw={700}
							ta="center"
							c="white"
							style={{ lineHeight: 1.2, maxWidth: 800 }}
						>
							{t("home.heroTitle")}
						</Title>

						<Text size="xl" c="white" ta="center" maw={700} opacity={0.95}>
							{t("home.heroSubtitle")}
						</Text>

						{/* Property Search Card */}
						<Card
							shadow="xl"
							radius="lg"
							p="xl"
							w="100%"
							maw={900}
							mt="xl"
							style={{ background: "rgba(255, 255, 255, 0.98)" }}
						>
							<Tabs defaultValue="buy" variant="pills">
								<Tabs.List mb="lg" style={{ justifyContent: "center" }}>
									<Tabs.Tab value="buy">Buy</Tabs.Tab>
									<Tabs.Tab value="rent">Rent</Tabs.Tab>
									<Tabs.Tab value="new">New Projects</Tabs.Tab>
									<Tabs.Tab value="transacted">Transacted</Tabs.Tab>
								</Tabs.List>

								<Tabs.Panel value="buy">
									<Stack gap="md">
										<Grid>
											<Grid.Col span={{ base: 12, sm: 6 }}>
												<TextInput
													placeholder="Location, Project or Street"
													size="lg"
													leftSection={<MapPin size={18} />}
												/>
											</Grid.Col>
											<Grid.Col span={{ base: 12, sm: 3 }}>
												<Select
													placeholder="Property Type"
													size="lg"
													data={[
														"All Types",
														"Condominium",
														"Apartment",
														"Penthouse",
														"Townhouse",
													]}
													defaultValue="All Types"
												/>
											</Grid.Col>
											<Grid.Col span={{ base: 12, sm: 3 }}>
												<Select
													placeholder="Price Range"
													size="lg"
													data={[
														"Any Price",
														"< RM 500k",
														"RM 500k - 1M",
														"RM 1M - 2M",
														"> RM 2M",
													]}
													defaultValue="Any Price"
												/>
											</Grid.Col>
										</Grid>
										<Button
											size="lg"
											fullWidth
											leftSection={<Search size={18} />}
											component={Link}
											href={`/properties`}
										>
											Search Properties
										</Button>
									</Stack>
								</Tabs.Panel>

								<Tabs.Panel value="rent">
									<Stack gap="md">
										<Grid>
											<Grid.Col span={{ base: 12, sm: 6 }}>
												<TextInput
													placeholder="Location, Project or Street"
													size="lg"
													leftSection={<MapPin size={18} />}
												/>
											</Grid.Col>
											<Grid.Col span={{ base: 12, sm: 3 }}>
												<Select
													placeholder="Bedrooms"
													size="lg"
													data={["Any", "Studio", "1", "2", "3", "4+"]}
													defaultValue="Any"
												/>
											</Grid.Col>
											<Grid.Col span={{ base: 12, sm: 3 }}>
												<Select
													placeholder="Budget"
													size="lg"
													data={[
														"Any",
														"< RM 2k",
														"RM 2k - 5k",
														"RM 5k - 10k",
														"> RM 10k",
													]}
													defaultValue="Any"
												/>
											</Grid.Col>
										</Grid>
										<Button
											size="lg"
											fullWidth
											leftSection={<Search size={18} />}
											component={Link}
											href={`/properties`}
										>
											Search Rentals
										</Button>
									</Stack>
								</Tabs.Panel>

								<Tabs.Panel value="new">
									<Stack gap="md">
										<TextInput
											placeholder="Search new projects..."
											size="lg"
											leftSection={<Building2 size={18} />}
										/>
										<Button
											size="lg"
											fullWidth
											leftSection={<Search size={18} />}
											component={Link}
											href={`/projects`}
										>
											Browse New Projects
										</Button>
									</Stack>
								</Tabs.Panel>

								<Tabs.Panel value="transacted">
									<Stack gap="md">
										<TextInput
											placeholder="Search transacted properties..."
											size="lg"
											leftSection={<DollarSign size={18} />}
										/>
										<Button
											size="lg"
											fullWidth
											leftSection={<Search size={18} />}
											component={Link}
											href={`/transacted-properties`}
										>
											View Transactions
										</Button>
									</Stack>
								</Tabs.Panel>
							</Tabs>
						</Card>
					</Stack>
				</Container>
			</Box>

			{/* Quick Links Section */}
			<Container size="xl" py={60}>
				<Grid>
					{quickLinks.map((link) => {
						const Icon = link.icon;
						return (
							<Grid.Col key={link.href} span={{ base: 12, xs: 6, sm: 3 }}>
								<Card
									component={Link}
									href={link.href}
									shadow="sm"
									padding="lg"
									radius="md"
									withBorder
									style={{
										transition: "all 0.2s",
										cursor: "pointer",
										textDecoration: "none",
									}}
									styles={{
										root: {
											"&:hover": {
												transform: "translateY(-4px)",
												boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
											},
										},
									}}
								>
									<Stack gap="sm" align="center">
										<Box
											style={{
												width: 60,
												height: 60,
												borderRadius: "50%",
												background:
													"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Icon size={30} color="white" />
										</Box>
										<Text fw={600} size="lg" ta="center">
											{link.label}
										</Text>
									</Stack>
								</Card>
							</Grid.Col>
						);
					})}
				</Grid>
			</Container>

			{/* Features Section */}
			<Box bg="gray.0" py={60}>
				<Container size="xl">
					<Stack gap="xl">
						<Stack gap="sm" align="center">
							<Title order={2} ta="center">
								Why Choose RegalProp
							</Title>
							<Text size="lg" c="dimmed" ta="center" maw={700}>
								Your trusted partner for KLCC high-value properties
							</Text>
						</Stack>

						<Grid>
							{features.map((feature) => {
								const Icon = feature.icon;
								return (
									<Grid.Col
										key={feature.title}
										span={{ base: 12, sm: 6, md: 3 }}
									>
										<Card shadow="sm" padding="xl" radius="md" h="100%">
											<Stack gap="md">
												<Box
													style={{
														width: 50,
														height: 50,
														borderRadius: 8,
														background:
															"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<Icon size={24} color="white" />
												</Box>
												<Title order={4}>{feature.title}</Title>
												<Text size="sm" c="dimmed">
													{feature.description}
												</Text>
											</Stack>
										</Card>
									</Grid.Col>
								);
							})}
						</Grid>
					</Stack>
				</Container>
			</Box>

			{/* CTA Section */}
			<Container size="xl" py={80}>
				<Card
					shadow="xl"
					radius="lg"
					p={60}
					style={{
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					}}
				>
					<Stack gap="xl" align="center">
						<Title order={2} c="white" ta="center">
							Ready to Find Your Dream Property?
						</Title>
						<Text size="lg" c="white" ta="center" maw={600} opacity={0.95}>
							Connect with our specialist team for personalized property
							solutions in the KLCC area
						</Text>
						<Group gap="md">
							<Button
								component={Link}
								href={`/properties`}
								size="lg"
								variant="white"
								color="dark"
							>
								{t("home.viewListings")}
							</Button>
							<Button
								component={Link}
								href={`/contact`}
								size="lg"
								variant="outline"
								c="white"
								style={{ borderColor: "white" }}
							>
								Contact Us
							</Button>
						</Group>
					</Stack>
				</Card>
			</Container>
		</Box>
	);
}
