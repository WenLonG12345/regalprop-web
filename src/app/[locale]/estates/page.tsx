'use client';

import { ESTATE_LISTING } from "@/data/properties";
import { Link } from "@/i18n/navigation";
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
} from "@mantine/core";
import { LuMapPin } from "react-icons/lu";

export default function EstateListingPage() {
  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Estate Search</Title>
        <Text c="dimmed">{ESTATE_LISTING.length} Estate(s) found</Text>
      </Group>

      <Stack gap="md">
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
                  <SimpleGrid cols={5} spacing="xs" mt="xs" verticalSpacing={0}>
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

              {/* Right: Action Buttons */}
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Divider
                  orientation="vertical"
                  visibleFrom="md"
                  style={{ position: "absolute", left: 0, height: "80%" }}
                />
                <Stack
                  align="stretch"
                  justify="center"
                  h="100%"
                  gap="sm"
                  pl={{ md: "lg" }}
                >
                  <Group justify="space-between" grow>
                    <Stack
                      gap={0}
                      bg="red.0"
                      p="xs"
                      style={{
                        borderRadius: 8,
                        borderLeft: "4px solid var(--mantine-color-red-6)",
                      }}
                    >
                      <Text size="xs" c="dimmed" fw={500}>
                        For Sale
                      </Text>
                      <Group justify="space-between" align="center">
                        <Text fw={700} c="red" size="lg">
                          {estate.forSaleCount}
                        </Text>
                        <Badge color="red" variant="light" size="sm">
                          Listings
                        </Badge>
                      </Group>
                    </Stack>

                    <Stack
                      gap={0}
                      bg="orange.0"
                      p="xs"
                      style={{
                        borderRadius: 8,
                        borderLeft: "4px solid var(--mantine-color-orange-6)",
                      }}
                    >
                      <Text size="xs" c="dimmed" fw={500}>
                        For Rent
                      </Text>
                      <Group justify="space-between" align="center">
                        <Text fw={700} c="orange" size="lg">
                          {estate.forRentCount}
                        </Text>
                        <Badge color="orange" variant="light" size="sm">
                          Listings
                        </Badge>
                      </Group>
                    </Stack>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>
        ))}
      </Stack>
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
