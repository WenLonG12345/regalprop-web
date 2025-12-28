"use client";

import {
  Container,
  Grid,
  Avatar,
  Text,
  Stack,
  Group,
  Rating,
  Badge,
  Button,
  ActionIcon,
  Box,
  Tabs,
  Breadcrumbs,
  Anchor,
  SimpleGrid,
} from "@mantine/core";
import {
  FaPhone,
  FaWhatsapp,
  FaWeixin,
  FaHeart,
  FaShareNodes,
  FaBookmark,
  FaLocationDot,
  FaLanguage,
} from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { useTranslations } from "next-intl";
import { AGENT_LISTING } from "@/data/agent";
import { useParams } from "next/navigation";

export function AgentDetailPage() {
  const t = useTranslations();

  const { id } = useParams();

  const agent = AGENT_LISTING?.find((a) => a.id === id) ?? null;

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Find Agent", href: "/agents" },
    { title: agent.name, href: "#" },
  ].map((item) => (
    <Anchor href={item.href} key={item.title} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  return (
    <Box bg="gray.0" pb={80}>
      {/* Top Breadcrumbs and Actions */}
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
          <Group gap="xs" visibleFrom="sm">
            <ActionIcon variant="transparent" c="dark">
              <FaHeart size={20} />
            </ActionIcon>
            <ActionIcon variant="transparent" c="dark">
              <FaShareNodes size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>

      {/* Hero Section */}
      <Box
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <Container size="lg" py={40}>
          <Grid gutter={40} align="center">
            {/* Agent Avatar */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Stack align="center" className="relative">
                <Avatar
                  src={agent.image}
                  size={180}
                  radius={100}
                  className="border-4 border-white shadow-md"
                />
                <Badge
                  color="red"
                  variant="filled"
                  className="absolute bottom-0 right-5"
                  size="lg"
                >
                  New
                </Badge>
              </Stack>
            </Grid.Col>

            {/* Middle Section: Identity & Metadata */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xs">
                <Group align="center" wrap="nowrap">
                  <div className="text-2xl md:text-3xl font-bold">
                    {agent.name}
                  </div>
                  <Rating value={5} readOnly color="yellow" size="sm" />
                </Group>

                <Text fw={500} c="dimmed">
                  {agent.id}
                </Text>

                <Stack gap={8} mt="xs">
                  <Group gap="xs" c="dimmed">
                    <MdAccessTimeFilled size={18} />
                    {/* <Text size="sm">{agent.seniority} Years seniority</Text> */}
                  </Group>

                  <Group gap="xs" c="blue.7">
                    <FaLocationDot size={16} />
                    <Anchor href="#" size="sm" fw={500}>
                      {agent.branch}
                    </Anchor>
                  </Group>

                  <Group gap="xs" c="dimmed">
                    <FaLanguage size={18} />
                    {/* <Text size="sm">{agent.languages.join(" · ")}</Text> */}
                  </Group>
                </Stack>

                {/* Mobile Statistics View */}
                {/* <SimpleGrid
                  cols={3}
                  mt="xl"
                  hiddenFrom="md"
                  className="bg-white p-4 rounded-md shadow-sm border text-center"
                >
                  <StatItem label="Buy" value={agent.stats.buy} />
                  <StatItem label="Rent" value={agent.stats.rent} />
                  <StatItem label="Followers" value={agent.stats.followers} />
                </SimpleGrid> */}
              </Stack>
            </Grid.Col>

            {/* Right Section: Desktop Stats & Contact */}
            <Grid.Col span={{ base: 12, md: 3 }} visibleFrom="md">
              <Stack align="flex-end">
                <Group gap="sm">
                  <Button
                    variant="default"
                    leftSection={<FaBookmark size={14} />}
                    radius="xl"
                  >
                    Bookmark
                  </Button>
                  <Button
                    variant="default"
                    leftSection={<FaShareNodes size={14} />}
                    radius="xl"
                  >
                    Share
                  </Button>
                </Group>

                {/* <Group gap={40} mt="xl" className="text-right">
                  <StatItem label="Buy" value={agent.stats.buy} />
                  <StatItem label="Rent" value={agent.stats.rent} />
                  <StatItem label="Followers" value={agent.stats.followers} />
                </Group> */}

                <Group mt="xl" wrap="nowrap">
                  <Button
                    color="green"
                    leftSection={<FaWhatsapp size={18} />}
                    radius="sm"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    color="blue"
                    radius="sm"
                    leftSection={<FaPhone size={18} />}
                  >
                    Hotline
                  </Button>
                  <Button
                    variant="outline"
                    color="green"
                    radius="sm"
                    leftSection={<FaWeixin size={20} />}
                  >
                    WeChat
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Tabs with Horizontal Scroll Support */}
      <Container size="lg" mt="xl">
        <Tabs defaultValue="personal" color="red">
          <Tabs.List className="!flex-nowrap overflow-x-auto no-scrollbar border-b-0">
            <Tabs.Tab value="personal" className="!whitespace-nowrap">
              Personal Info
            </Tabs.Tab>
            <Tabs.Tab value="new" className="!whitespace-nowrap">
              New Property
            </Tabs.Tab>
            <Tabs.Tab value="buy" className="!whitespace-nowrap">
              Buy
            </Tabs.Tab>
            <Tabs.Tab value="rent" className="!whitespace-nowrap">
              Rent
            </Tabs.Tab>
            <Tabs.Tab value="testimonial" className="!whitespace-nowrap">
              Testimonial (7)
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="personal" pt="xl">
            <div>Personal</div>
          </Tabs.Panel>
        </Tabs>
      </Container>

      {/* Sticky Mobile Footer Actions */}
      <Box
        hiddenFrom="md"
        className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
      >
        <Group grow gap="xs">
          <Button
            color="green"
            leftSection={<FaWhatsapp size={20} />}
            size="md"
          >
            WhatsApp
          </Button>
          <Button
            variant="light"
            color="blue"
            size="md"
            className="max-w-[60px]"
          >
            <FaPhone size={20} />
          </Button>
          <Button
            variant="light"
            color="green"
            size="md"
            className="max-w-[60px]"
          >
            <FaWeixin size={24} />
          </Button>
        </Group>
      </Box>
    </Box>
  );
}

function StatItem({ label, value }: { label: string; value: number | string }) {
  return (
    <Stack gap={0} align="center">
      <Text className="text-[24px] md:text-[28px] font-bold leading-tight">
        {value}
      </Text>
      <Text size="xs" c="dimmed" fw={500} tt="uppercase" lts={1}>
        {label}
      </Text>
    </Stack>
  );
}

export default AgentDetailPage;
