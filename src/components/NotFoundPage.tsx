"use client";

import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function NotFoundPage() {
	const t = useTranslations("notFound");
	const router = useRouter();

	return (
		<Container className="py-20 lg:py-40">
			<Stack align="center" gap="xl">
				{/* Large stylized 404 background text */}
				<div className="relative text-center">
					<Text
						className="text-[120px] md:text-[200px] font-black opacity-10 select-none leading-none"
						c="dimmed"
					>
						404
					</Text>
					<Title className="">{t("title")}</Title>
				</div>

				<Text c="dimmed" size="lg" ta="center" maw={500}>
					{t("description")}
				</Text>

				<Group justify="center">
					<Button variant="outline" size="md" onClick={() => router.back()}>
						{t("goBack")}
					</Button>
					<Button size="md" color="red" onClick={() => router.push("/")}>
						{t("goHome")}
					</Button>
				</Group>
			</Stack>
		</Container>
	);
}
