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
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import HeroSection from "@/components/home/HeroSection";
import HotPickSection from "@/components/home/HotPickSection";
import NewLaunchSection from "@/components/home/NewLaunchSection";

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
		<div>
			<Box
				style={{
					// background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					background: "#a0a0a0",
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Container size="xl" py="md">
					<HeroSection />
				</Container>
			</Box>

			<Container size="xl" py="md">
				<div className="flex items-center justify-center">
					<Image
						src="/hero_banner.jpg"
						alt="Hero Banner"
						width={1000}
						height={400}
					/>
				</div>
			</Container>

			<Container size="xl" py="md">
				<NewLaunchSection />
			</Container>

			<Container size="xl" py="md">
				<HotPickSection />
			</Container>

			<Container size="xl">
				<div className="flex items-center justify-center">
					<Image
						src="/hero_banner.jpg"
						alt="Hero Banner"
						width={1000}
						height={400}
					/>
				</div>
			</Container>

			{/* Quick Links Section */}
			{/* <Container size="xl" py={60}>
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
			</Container> */}

			{/* Features Section */}
			{/* <Box bg="gray.0" py={60}>
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
			</Box> */}

			{/* CTA Section */}
			{/* <Container size="xl" py={80}>
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
			</Container> */}
		</div>
	);
}
