"use client";

import {
	ActionIcon,
	Anchor,
	AppShell,
	Box,
	Burger,
	Button,
	Container,
	Drawer,
	Flex,
	Group,
	Stack,
	Text,
	UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaWeixin } from "react-icons/fa";
import {
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaThreads,
	FaTiktok,
	FaYoutube,
} from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { SiXiaohongshu } from "react-icons/si";
import { useCurrency } from "@/components/common/CurrencyContext";
import { useUnitMeasurement } from "@/components/common/UnitMeasurementContext";
import PreferenceModal from "@/components/popup/Preference";
import { Link } from "@/i18n/navigation";

const languages = [
	{ code: "en", label: "English", label_shortform: "EN" },
	{ code: "ms", label: "Bahasa Melayu", label_shortform: "BM" },
	{ code: "zh-cn", label: "简体", label_shortform: "简" },
	{ code: "zh-hk", label: "繁中", label_shortform: "繁" },
];

const currencyOptions = [
	{ code: "MYR", label: "RM" },
	{ code: "USD", label: "USD $" },
	{ code: "SGD", label: "SGD $" },
	{ code: "CNY", label: "CNY ¥" },
];

const measurementUnitOptions = [
	{ code: "ft2", label: "Square foot | ft²", label_shortform: "ft²" },
	{ code: "m2", label: "Square meter | m²", label_shortform: "m²" },
];

// const NAV_MENU_ITEMS = [
//   { label: "主頁", icon: "🏠" },
//   { label: "買盤", icon: "🏘️" },
//   { label: "租盤", icon: "🔑" },
//   { label: "屋苑", icon: "🏢" },
//   { label: "一手新盤", icon: "✨" },
//   { label: "地區搜樓", icon: "📍" },
//   { label: "搵代理人", icon: "👤" },
//   { label: "更多", icon: "⋯" },
// ];

export const SOCIAL_MEDIA_ICONS = [
	{
		name: "Facebook",
		Icon: FaFacebook,
		bgColor: "#1877F2",
		iconColor: "#FFFFFF",
	},
	{
		name: "YouTube",
		Icon: FaYoutube,
		bgColor: "#FF0000",
		iconColor: "#FFFFFF",
	},
	{
		name: "Instagram",
		Icon: FaInstagram,
		bgColor:
			"radial-gradient(circle at 30% 30%, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
		iconColor: "#FFFFFF",
	},
	{
		name: "Threads",
		Icon: FaThreads,
		bgColor: "#000000",
		iconColor: "#FFFFFF",
	},
	{
		name: "Xiaohongshu",
		Icon: SiXiaohongshu,
		bgColor: "#FE2C55",
		iconColor: "#FFFFFF",
	},
	{
		name: "WeChat",
		Icon: FaWeixin,
		bgColor: "#07C160",
		iconColor: "#FFFFFF",
	},
	{
		name: "TikTok",
		Icon: FaTiktok,
		bgColor: "#000000",
		iconColor: "#FFFFFF",
	},
	{
		name: "LinkedIn",
		Icon: FaLinkedin,
		bgColor: "#0A66C2",
		iconColor: "#FFFFFF",
	},
];

export default function Header() {
	const router = useRouter();
	const locale = useLocale();
	const pathname = usePathname() || "/";
	const { currency, setCurrency } = useCurrency();
	const { unit } = useUnitMeasurement();
	const [isScrolled, setIsScrolled] = useState(false);
	const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

	const t = useTranslations();

	const NAV_MENU_ITEMS = [
		{ href: "/", label: t("nav.home") },
		{ href: "/properties", label: t("nav.properties") },
		{ href: "/projects", label: t("nav.projects") },
		{ href: "/agents", label: t("nav.agents") },
		{ href: "/about", label: t("nav.about") },
		{ href: "/contact", label: t("nav.contact") },
		{ href: "/news", label: t("nav.news") },
		{ href: "/events", label: t("nav.events") },
		{ href: "/mm2h", label: t("nav.mm2h") },
		{ href: "/education", label: t("nav.education") },
		{ href: "/faq", label: t("nav.faq") },
		{ href: "/online-listing", label: t("nav.onlineListing") },
		{
			href: "/recruitment-agent",
			label: t("nav.recruitmentAgent"),
		},
		// {
		//   href: "/login-register",
		//   label: t("nav.loginRegister"),
		// },
		// {
		//   href: "/saved-properties",
		//   label: t("nav.savedProperties"),
		// },
		// {
		//   href: "/transacted-properties",
		//   label: t("nav.transactedProperties"),
		// },
	];

	useEffect(() => {
		const handleScroll = () => {
			if (typeof window === "undefined") return;
			setIsScrolled(window.scrollY > 50);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handlePreferenceSave = (values: {
		language: string;
		currency: string;
		unit: string;
	}) => {
		setIsPreferenceModalOpen(false);

		if (values.currency && values.currency !== currency) {
			setCurrency(values.currency);
		}

		if (values.language && values.language !== locale) {
			const segments = pathname.split("/").filter(Boolean);
			const rest = segments.slice(1).join("/") || "";
			router.push(`/${values.language}/${rest}`);
		}
	};

	return (
		<>
			<Box
				component="header"
				style={{
					position: "sticky",
					top: 0,
					zIndex: 100,
					background: isScrolled ? "rgba(255, 255, 255, 0.95)" : "white",
					backdropFilter: isScrolled ? "blur(8px)" : "none",
					borderTop: isScrolled ? "1px solid #e0e0e0" : "5px solid #b9986a",
					boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
					transition: "all 300ms ease",
				}}
			>
				<Container size="xl" px="md">
					<Flex
						justify="space-between"
						align="center"
						py={isScrolled ? "xs" : "sm"}
					>
						<Group gap="md">
							{/* Hamburger - Only visible when scrolled */}
							{isScrolled && (
								<ActionIcon
									onClick={openDrawer}
									variant="subtle"
									color="gray"
									size="lg"
									aria-label="Menu"
								>
									<MdMenu size={20} />
								</ActionIcon>
							)}

							{/* Logo */}
							<Anchor
								component={Link}
								href={"/"}
								style={{ textDecoration: "none" }}
							>
								<Group gap="sm">
									<Box
										style={{
											width: 40,
											height: 40,
											background: "#1e3a63",
											borderRadius: 4,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "white",
											fontWeight: 700,
											fontSize: 18,
										}}
									>
										R
									</Box>
									<Box visibleFrom="sm">
										<Text size="xl" fw={700} c="#b9986a" lh={1.2}>
											Regal Properties
										</Text>
										<Text size="xs" fw={500} c="#b9986a" lh={1}>
											Regal Properties
										</Text>
									</Box>
								</Group>
							</Anchor>
						</Group>

						<Stack align="flex-end">
							<Group gap="sm">
								{SOCIAL_MEDIA_ICONS.map(
									({ name, Icon, bgColor, iconColor }) => (
										<div
											key={name}
											title={name}
											className="flex h-6 w-6 items-center justify-center rounded-full"
											style={{ background: bgColor }}
										>
											<Icon size={14} color={iconColor} />
										</div>
									),
								)}
							</Group>
							<Group gap="md">
								<button
									type="button"
									className="hover:bg-primary/70 bg-[#f0f4f5] px-3 py-0.5 rounded text-gray-600 text-xs"
								>
									Login / Register
								</button>
								<UnstyledButton
									onClick={() => setIsPreferenceModalOpen(true)}
									style={{ fontSize: "14px", color: "#495057" }}
								>
									{
										languages.find((lang) => lang.code === locale)
											?.label_shortform
									}{" "}
									|{" "}
									{currencyOptions.find((opt) => opt.code === currency)?.label}{" "}
									|{" "}
									{
										measurementUnitOptions.find((opt) => opt.code === unit)
											?.label_shortform
									}
								</UnstyledButton>
							</Group>
						</Stack>

						{/* Right: Mobile menu button */}
						<ActionIcon
							onClick={openDrawer}
							variant="subtle"
							color="gray"
							size="lg"
							hiddenFrom="lg"
							aria-label="Menu"
						>
							<MdMenu size={20} />
						</ActionIcon>
					</Flex>
				</Container>
				<div className="bg-[#333333]">
					<Container size="xl" px="md">
						<Group gap="lg" py="sm">
							{NAV_MENU_ITEMS.map((item, idx) => (
								<Anchor
									key={item.label}
									component={Link}
									href={item.href}
									size="sm"
									style={{ textDecoration: "none" }}
									c="white"
								>
									{item.label}
								</Anchor>
							))}
						</Group>
					</Container>
				</div>
			</Box>

			{/* Mobile Drawer */}
			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="sm"
				padding="md"
				title={
					<Group gap="sm">
						<Box
							style={{
								width: 36,
								height: 36,
								background: "#e30613",
								borderRadius: 4,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontWeight: 700,
							}}
						>
							中
						</Box>
						<Text fw={700} size="lg">
							中原地產
						</Text>
					</Group>
				}
			>
				<Stack gap="xs">
					{NAV_MENU_ITEMS.map((item) => (
						<Anchor
							key={item.label}
							component={Link}
							href={item.href}
							onClick={closeDrawer}
							p="sm"
							style={{
								textDecoration: "none",
								borderBottom: "1px solid #f1f1f1",
								display: "block",
							}}
						>
							{item.label}
						</Anchor>
					))}

					<Box mt="xl" p="md" bg="gray.0" style={{ borderRadius: 8 }}>
						<Text fw={600} size="sm" mb="md">
							快速連結
						</Text>
						<Stack gap="sm">
							{["中原幣", "分行網絡", "按揭計算機", "市場資訊"].map((link) => (
								<Anchor key={link} href="#" size="sm" c="gray.7">
									{link}
								</Anchor>
							))}
						</Stack>
					</Box>
				</Stack>
			</Drawer>

			{/* Preference Modal */}
			<PreferenceModal
				isOpen={isPreferenceModalOpen}
				onClose={() => setIsPreferenceModalOpen(false)}
				onSave={handlePreferenceSave}
				languages={languages}
				currencyOptions={currencyOptions}
				measurementUnitOptions={measurementUnitOptions}
				selectedLang={locale}
			/>
		</>
	);
}
