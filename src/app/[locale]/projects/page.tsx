'use client';

import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Title,
  Paper,
  Box,
} from "@mantine/core";
import { LuFilter, LuLayoutGrid, LuMap } from "react-icons/lu";
import Link from "next/link";
import { NEW_PROJECT_LIST } from "@/data/properties";
import { Project } from "@/types/property";

export default function NewProjectListing() {
  return (
    <Container size="xl" py="md">
      {/* Header / Filter Bar */}
      <Group justify="space-between" mb="lg">
        <Group gap="xs">
          <Button
            variant="default"
            size="sm"
            rightSection={<LuFilter size={16} />}
          >
            District | MTR
          </Button>
          <Button
            variant="default"
            size="sm"
            rightSection={<LuFilter size={16} />}
          >
            Price
          </Button>
          <Button
            variant="default"
            size="sm"
            rightSection={<LuFilter size={16} />}
          >
            Developers
          </Button>
        </Group>
        <Group>
          <Text c="red" fw={700}>
            482 New Projects
          </Text>
          <LuLayoutGrid size={20} color="gray" />
          <LuMap size={20} color="red" />
        </Group>
      </Group>

      {/* MOBILE VIEW (List Style) */}
      <Stack gap="md" hiddenFrom="sm">
        {NEW_PROJECT_LIST.map((item) => (
          <MobileListItem key={item.id} data={item} />
        ))}
      </Stack>

      {/* DESKTOP VIEW (Card Grid Style) */}
      <Grid gutter="md" visibleFrom="sm">
        {NEW_PROJECT_LIST.map((item) => (
          <Grid.Col key={item.id} span={{ sm: 6, md: 4, lg: 3 }}>
            <DesktopCardItem data={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

// --- Sub-components ---

function MobileListItem({ data }: { data: Project }) {
  return (
    <Paper
      withBorder
      p="sm"
      radius="md"
      component={Link}
      href={`/projects/${data.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Group align="flex-start" wrap="nowrap">
        <Image
          src={data.image}
          w={120}
          h={90}
          radius="sm"
          fit="cover"
          alt={data.title}
        />

        <Stack gap={4} style={{ flex: 1 }}>
          <Text fw={700} size="sm" lineClamp={1}>
            {data.title}
          </Text>
          <Text size="xs" c="dimmed">
            {data.district}
          </Text>

          <Text size="xs" c="dimmed" mt={4}>
            Est. Material Date: {data.estimatedMaterialDate}
          </Text>
          <Text size="xs" c="dimmed">
            First Sales: {data.firstSalesDate}
          </Text>

          <Group gap={4} mt={4}>
            {data.statusTags.map((tag) => (
              <Badge
                key={tag.label}
                color={tag.color}
                variant={tag.variant}
                size="xs"
                radius="sm"
              >
                {tag.label}
              </Badge>
            ))}
          </Group>

          <Group justify="flex-end" mt={4}>
            <Text fw={700} c="red" size="lg">
              ${data.priceValue}
              <span style={{ fontSize: "12px" }}>{data.priceSuffix}</span>
            </Text>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
}

function DesktopCardItem({ data }: { data: Project }) {
  return (
    <Card
      withBorder
      padding="md"
      radius="md"
      component={Link}
      href={`/projects/${data.id}`}
      style={{ transition: "transform 0.2s", height: "100%" }}
    >
      <Card.Section>
        <Image src={data.image} height={160} mah={160} alt={data.title} />
      </Card.Section>

      <Stack mt="md" gap="xs" style={{ flex: 1 }}>
        <Title order={4} size="h5" lineClamp={1}>
          {data.title}
        </Title>
        <Text size="xs" c="dimmed" tt="uppercase">
          {data.district}
        </Text>

        <Box style={{ minHeight: 40 }}>
          <Group gap={5}>
            {data.statusTags.map((tag) => (
              <Badge
                key={tag.label}
                color={tag.color}
                variant={tag.variant}
                size="sm"
                radius="sm"
              >
                {tag.label}
              </Badge>
            ))}
          </Group>
        </Box>

        <Stack gap={2} mt="xs">
          <Text size="xs" c="dimmed">
            Est. Material Date: {data.estimatedMaterialDate}
          </Text>
          <Text size="xs" c="dimmed">
            First Sales: {data.firstSalesDate}
          </Text>
        </Stack>

        <Group justify="flex-end" mt="auto" pt="md">
          <Text fw={700} c="red" size="xl">
            ${data.priceValue}
            <span style={{ fontSize: "14px" }}>{data.priceSuffix}</span>
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
