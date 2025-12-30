"use client";

import { notFound } from "next/navigation";
import {
  Container,
  Grid,
  Text,
  Title,
  Group,
  Stack,
  Button,
  Image,
  Paper,
  Tabs,
  Badge,
  Table,
  Divider,
  Box,
  SimpleGrid,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { LuMapPin, LuBuilding, LuSchool, LuMap } from "react-icons/lu";
import { ESTATE_LISTING } from "@/data/properties";
import { use } from "react";

export default function EstateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const estate = ESTATE_LISTING.find((e) => e.id === id);
  if (!estate) {
    return null;
  }

  // Images for carousel
  const gallery =
    estate.images.length > 1
      ? estate.images
      : [...estate.images, ...estate.images, ...estate.images];

  return (
    <Container size="xl" py="md">
      {/* Breadcrumbs */}
      <Breadcrumbs mb="md" separator=">">
        <Anchor href="/estates" size="sm">
          Estates
        </Anchor>
        <Anchor href={`/estates?district=${estate.district}`} size="sm">
          {estate.district}
        </Anchor>
        <Text size="sm" c="dimmed">
          {estate.name}
        </Text>
      </Breadcrumbs>

      {/* Header */}
      <Stack gap="xs" mb="xl">
        <Title order={1}>{estate.name}</Title>
        <Group gap="xs" c="dimmed">
          <LuMapPin size={18} />
          <Text>{estate.address}</Text>
        </Group>
      </Stack>

      <Grid gutter="xl">
        {/* LEFT COLUMN: Main Content */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          {/* 1. Market Stats Block */}
          <Paper withBorder p="md" radius="md" mb="xl" shadow="sm">
            <Group align="flex-start" justify="space-between" mb="xs">
              <Badge variant="gradient" gradient={{ from: "teal", to: "blue" }}>
                CentaEstimate
              </Badge>
              <Group gap="xs">
                <Button variant="default" size="xs">
                  Find Property
                </Button>
                <Button variant="default" size="xs">
                  Trans. History
                </Button>
              </Group>
            </Group>

            <Grid>
              {/* Sale Stats */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack
                  gap="xs"
                  style={{ borderRight: "1px solid #eee" }}
                  pr="md"
                >
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">
                      Price/ft² (S.A.)
                    </Text>
                    <Text
                      size="xs"
                      c={estate.moMTrend >= 0 ? "green" : "red"}
                      fw={700}
                    >
                      Prev Month {estate.moMTrend > 0 ? "+" : ""}
                      {estate.moMTrend}%
                    </Text>
                  </Group>
                  <Text size="32px" fw={700}>
                    ${estate.pricePerSqFt.toLocaleString()}{" "}
                    <span style={{ fontSize: 14, color: "#868e96" }}>/ft²</span>
                  </Text>

                  <Divider my="xs" label="Market Info" labelPosition="left" />

                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Price Range
                    </Text>
                    <Text fw={600}>
                      ${estate.salePriceRange[0]}M - {estate.salePriceRange[1]}M
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Volume (Month)
                    </Text>
                    <Text fw={600}>{estate.transactionCount}</Text>
                  </Group>

                  <Button color="red" fullWidth mt="md" radius="md">
                    Sell ({estate.forSaleCount} Listings)
                  </Button>
                </Stack>
              </Grid.Col>

              {/* Rent Stats */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap="xs" pl={{ sm: "md" }}>
                  <Text size="xs" c="dimmed">
                    Rent/ft² (S.A.)
                  </Text>
                  <Text size="32px" fw={700}>
                    ${estate.rentPerSqFt}{" "}
                    <span style={{ fontSize: 14, color: "#868e96" }}>/ft²</span>
                  </Text>

                  <Divider my="xs" label="Rental Info" labelPosition="left" />

                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Rent Range
                    </Text>
                    <Text fw={600}>
                      ${estate.rentPriceRange[0].toLocaleString()} -{" "}
                      {estate.rentPriceRange[1].toLocaleString()}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Volume (Month)
                    </Text>
                    <Text fw={600}>
                      {Math.round(estate.transactionCount * 0.6)}
                    </Text>
                  </Group>

                  <Button color="orange" fullWidth mt="md" radius="md">
                    Rent ({estate.forRentCount} Listings)
                  </Button>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>

          {/* 2. Media Carousel */}
          <Box mb="xl">
            <Tabs defaultValue="photo" variant="outline" mb="xs">
              <Tabs.List>
                <Tabs.Tab value="video">Video(2)</Tabs.Tab>
                <Tabs.Tab value="photo">Photo({gallery.length})</Tabs.Tab>
                <Tabs.Tab value="floorplan">Floor Plan(42)</Tabs.Tab>
                <Tabs.Tab value="street">Street View</Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Carousel
              withIndicators
              height={400}
              slideGap="md"
              controlsOffset="xs"
            >
              {gallery.map((img, i) => (
                <Carousel.Slide key={img}>
                  <Image
                    src={img}
                    h="100%"
                    w="100%"
                    fit="cover"
                    radius="sm"
                    alt="Estate Image"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>

            <SimpleGrid cols={5} spacing="xs" mt="sm">
              {gallery.slice(0, 5).map((img, i) => (
                <Image
                  key={img}
                  src={img}
                  radius="xs"
                  height={60}
                  fit="cover"
                  style={{ opacity: 0.7, cursor: "pointer" }}
                />
              ))}
            </SimpleGrid>
          </Box>

          {/* 3. Estate Info Block */}
          <Stack gap="lg">
            <Title order={3} size="h3">
              {estate.name} Estate Info
            </Title>

            <Text size="sm" c="dimmed" lh={1.6}>
              {estate.name} is located in {estate.district} (Address:{" "}
              {estate.address}). The Date of Occupation starts from{" "}
              {estate.occupationDate}. There are a total of {estate.phaseCount}{" "}
              phases, {estate.blockCount} blocks, providing {estate.unitCount}{" "}
              residential units. The saleable area ranges from 362 sq.ft. to
              1,260 sq.ft. It is near to the {estate.district} MTR Station (
              {estate.walkingDistanceMTR} walk).
            </Text>

            <SimpleGrid
              cols={{ base: 2, sm: 4 }}
              spacing="lg"
              py="md"
              style={{
                borderTop: "1px solid #eee",
                borderBottom: "1px solid #eee",
              }}
            >
              <InfoStat
                label="Date of Occupation"
                value={estate.occupationDate}
              />
              <InfoStat label="No. of Phases" value={estate.phaseCount} />
              <InfoStat label="No. of Blocks" value={estate.blockCount} />
              <InfoStat label="No. of Units" value={estate.unitCount} />
            </SimpleGrid>

            <Table horizontalSpacing="md" verticalSpacing="sm">
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td c="dimmed" w={150}>
                    Type
                  </Table.Td>
                  <Table.Td fw={500}>Private Residential</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td c="dimmed">School Net</Table.Td>
                  <Table.Td>
                    <Group gap={8}>
                      <Text
                        size="sm"
                        display="flex"
                        style={{ alignItems: "center", gap: 4 }}
                      >
                        <LuSchool size={14} color="#228be6" />
                        <span style={{ color: "#228be6" }}>
                          Primary: {estate.schoolNet.primary}
                        </span>
                      </Text>
                      <Text size="sm">·</Text>
                      <Text
                        size="sm"
                        display="flex"
                        style={{ alignItems: "center", gap: 4 }}
                      >
                        <LuSchool size={14} color="#228be6" />
                        <span style={{ color: "#228be6" }}>
                          Secondary: {estate.schoolNet.secondary}
                        </span>
                      </Text>
                    </Group>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td c="dimmed">Developer</Table.Td>
                  <Table.Td fw={500}>{estate.developer}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td c="dimmed">Facilities</Table.Td>
                  <Table.Td>
                    <Text size="sm" lh={1.5}>
                      {estate.facilities.join(", ")}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Stack>
        </Grid.Col>

        {/* RIGHT COLUMN: Sidebar */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="md" pos="sticky" top={20}>
            <Title order={4}>Location</Title>
            <Paper
              h={300}
              bg="gray.1"
              radius="md"
              withBorder
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack align="center" gap="xs" c="dimmed">
                <LuMap size={40} />
                <Text>Map Preview</Text>
              </Stack>
            </Paper>

            <Title order={4} mt="md">
              Blocks Info
            </Title>
            <Paper withBorder radius="md">
              <Table striped>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Building</Table.Th>
                    <Table.Th>Year</Table.Th>
                    <Table.Th>Sale | Rent</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {[1, 2, 3, 5, 6].map((block) => (
                    <Table.Tr key={block}>
                      <Table.Td
                        c="blue"
                        style={{
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <LuBuilding size={14} /> Block {block}
                      </Table.Td>
                      <Table.Td>2004</Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          {Math.floor(Math.random() * 10)} |{" "}
                          {Math.floor(Math.random() * 5)}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

function InfoStat({ label, value }: { label: string; value: string | number }) {
  return (
    <Stack gap={2}>
      <Text fw={700} size="lg">
        {value}
      </Text>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
    </Stack>
  );
}
