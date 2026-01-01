"use client";

import { AGENT_LISTING } from "@/data/agent";
import { ESTATE_LISTING } from "@/data/properties";
import { Link, useRouter } from "@/i18n/navigation";
import {
  Container,
  Card,
  Image,
  Text,
  Group,
  Badge,
  Stack,
  Grid,
  Divider,
  Button,
  SimpleGrid,
  Title,
  AspectRatio,
  ActionIcon,
} from "@mantine/core";
import { FaChevronRight } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

export default function EstateListingPage() {
  const router = useRouter();

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Estate Search</Title>
        <Text c="dimmed">{ESTATE_LISTING.length} Estate(s) found</Text>
      </Group>

      <section className="flex flex-5 flex-col md:flex-row gap-5">
        <div className="flex flex-4 flex-col gap-2">
          {ESTATE_LISTING.map((estate) => (
            <Card
              key={estate.id}
              padding="sm"
              radius="md"
              withBorder
              component={Link}
              href={`/estates/${estate.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow 0.2s",
              }}
            >
              <Grid align="center" gutter="lg">
                {/* Left: Thumbnail */}
                <Grid.Col span={{ base: 12, sm: 4, md: 3 }}>
                  <Image
                    src={estate.images[0]}
                    height={140}
                    mah={140}
                    radius="sm"
                    alt={estate.name}
                    fallbackSrc="https://placehold.co/400x300?text=No+Image"
                  />
                </Grid.Col>

                {/* Middle: Info & Stats */}
                <Grid.Col span={{ base: 12, sm: 8, md: 6 }}>
                  <Stack gap="xs">
                    <Group justify="space-between" align="flex-start">
                      <Title order={3} size="h4">
                        {estate.name}
                      </Title>
                    </Group>

                    <Group gap={5} c="dimmed">
                      <LuMapPin size={16} />
                      <Text size="sm">{estate.address}</Text>
                    </Group>

                    {/* Stats Grid - mimics the horizontal layout in screenshot */}
                    <SimpleGrid
                      cols={{ base: 3, md: 5 }}
                      spacing="xs"
                      mt="xs"
                      verticalSpacing={0}
                    >
                      <StatItem
                        label="No. of Block(s)"
                        value={estate.blockCount}
                      />
                      <StatItem label="No. of Units" value={estate.unitCount} />
                      <StatItem
                        label="Unit Rate (S.A.)"
                        value={`$${estate.pricePerSqFt.toLocaleString()}/ft²`}
                        highlight
                      />
                      <StatItem
                        label="MoM"
                        value={`${
                          estate.moMTrend > 0 ? "+" : ""
                        }${estate.moMTrend.toFixed(2)}%`}
                        color={estate.moMTrend >= 0 ? "green" : "red"}
                      />
                      <StatItem
                        label="Trans. Record"
                        value={estate.transactionCount}
                      />
                    </SimpleGrid>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 8, md: 3 }}>
                  <div className="flex flex-row gap-3">
                    <Stack gap={0} p="xs" align="center">
                      <Text size="xs" c="white" fw={500} bg="red" p={3}>
                        For Sale
                      </Text>
                      <Text fw={700} size="lg">
                        {estate.forSaleCount}
                      </Text>
                    </Stack>

                    <Stack gap={0} p="xs" align="center">
                      <Text size="xs" c="white" fw={500} bg="orange" p={3}>
                        For Rent
                      </Text>
                      <Text fw={700} c="" size="lg">
                        {estate.forRentCount}
                      </Text>
                    </Stack>
                  </div>
                </Grid.Col>
              </Grid>
            </Card>
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

// Helper for the grid items
function StatItem({
  label,
  value,
  highlight,
  color,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  color?: string;
}) {
  return (
    <Stack gap={0}>
      <Text size="10px" c="dimmed" style={{ whiteSpace: "nowrap" }}>
        {label}
      </Text>
      <Text fw={highlight ? 700 : 500} size="sm" c={color || "dark"}>
        {value}
      </Text>
    </Stack>
  );
}
