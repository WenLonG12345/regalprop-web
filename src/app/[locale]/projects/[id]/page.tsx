"use client";

import {
  Container,
  Grid,
  Image,
  Text,
  Title,
  Badge,
  Group,
  Stack,
  Button,
  Paper,
  Table,
  Divider,
  Box,
  Breadcrumbs,
  Anchor,
  rem,
  ActionIcon,
} from "@mantine/core";
import {
  LuMapPin,
  LuShare2,
  LuHeart,
  LuPhone,
  LuMessageCircle,
  LuFileText,
} from "react-icons/lu";
import { FaBalanceScale } from "react-icons/fa";
import { NEW_PROJECT_LIST } from "@/data/properties";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NewProjectDetail({ params }: PageProps) {
  const { id } = use(params);

  const data = NEW_PROJECT_LIST.find((p) => p.id === id);
  if (!data) {
    return null;
  }

  return (
    <Box pb={{ base: 80, md: 0 }}>
      <Container size="xl" py="md">
        {/* Breadcrumbs */}
        <Breadcrumbs mb="md" visibleFrom="sm">
          <Anchor href="/projects" size="sm">
            New Project
          </Anchor>
          <Anchor href="#" size="sm">
            {data.region}
          </Anchor>
          <Text size="sm" c="dimmed">
            {data.title}
          </Text>
        </Breadcrumbs>

        {/* --- Header Section (Desktop) --- */}
        <Group
          justify="space-between"
          align="flex-start"
          mb="lg"
          visibleFrom="md"
        >
          <Stack gap={4}>
            <Title order={1}>{data.title}</Title>
            <Group gap="xs">
              {data.statusTags.map((tag) => (
                <Badge key={tag.label} color={tag.color} variant={tag.variant}>
                  {tag.label}
                </Badge>
              ))}
              <Group gap={4} c="dimmed">
                <LuMapPin size={16} />
                <Text size="sm">
                  {data.district} {data.vendor}
                </Text>
              </Group>
            </Group>
          </Stack>
          <Group>
            <Stack align="flex-end" gap={0}>
              <Text size="xs" c="dimmed">
                Lowest Price
              </Text>
              <Text fw={700} c="red" size={rem(28)}>
                ${data.priceValue} {data.priceSuffix}
              </Text>
            </Stack>
            <Button color="red" leftSection={<LuFileText size={18} />}>
              Reg. of intent
            </Button>
          </Group>
        </Group>

        <Grid gutter="xl">
          {/* LEFT: Gallery / Map */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* Mobile Header */}
            <Stack gap="xs" hiddenFrom="md" mb="md">
              <Title order={2} size="h3">
                {data.title}
              </Title>
              <Group gap="xs">
                {data.statusTags.map((tag) => (
                  <Badge
                    key={tag.label}
                    color={tag.color}
                    variant={tag.variant}
                    size="sm"
                  >
                    {tag.label}
                  </Badge>
                ))}
              </Group>
              <Group gap={4} c="dimmed">
                <LuMapPin size={16} />
                <Text size="sm">{data.district}</Text>
              </Group>
            </Stack>

            <Box pos="relative" mb="md">
              <Image
                src={data.image}
                radius="md"
                h={{ base: 250, md: 500 }}
                fit="cover"
                alt="Main View"
              />
              <Box
                pos="absolute"
                bottom={10}
                left="50%"
                style={{ transform: "translateX(-50%)" }}
              >
                <Group gap="xs">
                  <Button radius="xl" size="xs" color="pink">
                    VR
                  </Button>
                  <Button radius="xl" size="xs" variant="default" bg="white">
                    Video
                  </Button>
                  <Button radius="xl" size="xs" variant="default" bg="white">
                    Photo
                  </Button>
                </Group>
              </Box>
            </Box>

            {/* Mobile Price Block */}
            <Paper hiddenFrom="md" withBorder p="md" radius="md" mb="md">
              <Group justify="space-between">
                <Stack gap={0}>
                  <Text size="xs" c="dimmed">
                    Lowest Price
                  </Text>
                  <Text fw={700} c="red" size="xl">
                    ${data.priceValue} {data.priceSuffix}
                  </Text>
                </Stack>
                <Stack gap={0} align="flex-end">
                  <Text size="xs" c="dimmed">
                    Discount Price
                  </Text>
                  <Text fw={700} c="red" size="xl">
                    ${data.discountPrice || data.priceValue} {data.priceSuffix}
                  </Text>
                </Stack>
              </Group>
              <Divider my="sm" />
              <Group grow>
                <Stack gap={0} align="center">
                  <Text size="xs" c="dimmed">
                    First Sales Date
                  </Text>
                  <Text fw={600} size="sm">
                    {data.firstSalesDate}
                  </Text>
                </Stack>
                <Stack gap={0} align="center">
                  <Text size="xs" c="dimmed">
                    Est. Material Date
                  </Text>
                  <Text fw={600} size="sm">
                    {data.estimatedMaterialDate}
                  </Text>
                </Stack>
              </Group>
            </Paper>

            {/* Project Information */}
            <Title order={3} size="h4" mb="md">
              Project Information
            </Title>
            <Paper withBorder radius="md" p="xs" mb="xl">
              <Table striped highlightOnHover verticalSpacing="sm">
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td c="dimmed" w="35%">
                      Phase
                    </Table.Td>
                    <Table.Td>{data.phase}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td c="dimmed">District</Table.Td>
                    <Table.Td>{data.district}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td c="dimmed">No. of Units</Table.Td>
                    <Table.Td>{data.unitCount}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td c="dimmed">Management Co.</Table.Td>
                    <Table.Td>{data.managementCompany}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td c="dimmed">Vendor</Table.Td>
                    <Table.Td>{data.vendor}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td c="dimmed">School Net</Table.Td>
                    <Table.Td>{data.schoolNet}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td c="dimmed">Project Info</Table.Td>
                    <Table.Td>{data.blocks}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Paper>

            {/* Hotline (Desktop) */}
            <Group visibleFrom="md" align="flex-start">
              <Text fw={600}>Hotline</Text>
              <Group gap="xs" style={{ flex: 1, flexWrap: "wrap" }}>
                {data.hotline.map((num) => (
                  <Button
                    key={num}
                    variant="light"
                    color="red"
                    leftSection={<LuPhone size={14} />}
                    size="xs"
                  >
                    {num}
                  </Button>
                ))}
              </Group>
            </Group>
          </Grid.Col>

          {/* RIGHT: Desktop Sidebar Stats */}
          <Grid.Col span={4} visibleFrom="md">
            <Paper withBorder p="lg" radius="md">
              <Group justify="space-between" mb="xs">
                <Text c="dimmed">First Sales Date</Text>
                <Text fw={600}>{data.firstSalesDate}</Text>
              </Group>
              <Divider mb="xs" />
              <Group justify="space-between" mb="xl">
                <Text c="dimmed">Est. Material Date</Text>
                <Text fw={600}>{data.estimatedMaterialDate}</Text>
              </Group>

              <Stack gap="xs" bg="red.0" p="md" style={{ borderRadius: 8 }}>
                <Text size="sm" c="red.8" fw={600}>
                  Discount Price
                </Text>
                <Text size={rem(32)} fw={700} c="red">
                  ${data.priceValue} {data.priceSuffix}
                </Text>
              </Stack>

              <Group mt="lg" justify="space-between">
                <ActionIcon variant="default" size="lg">
                  <FaBalanceScale size={20} />
                </ActionIcon>
                <ActionIcon variant="default" size="lg">
                  <LuShare2 size={20} />
                </ActionIcon>
                <ActionIcon variant="default" size="lg">
                  <LuHeart size={20} />
                </ActionIcon>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      {/* MOBILE: Fixed Bottom Action Bar */}
      <Paper
        hiddenFrom="md"
        withBorder
        pos="fixed"
        bottom={0}
        left={0}
        right={0}
        p="sm"
        style={{ zIndex: 100, backgroundColor: "white" }}
      >
        <Group gap="xs" wrap="nowrap">
          <Stack gap={0} align="center" px="xs" style={{ cursor: "pointer" }}>
            <FaBalanceScale size={20} color="gray" />
            <Text size="10px" c="dimmed">
              Compare
            </Text>
          </Stack>

          <Button
            fullWidth
            variant="light"
            color="blue"
            leftSection={<LuMessageCircle size={18} />}
          >
            Live Chat
          </Button>

          <Button fullWidth color="red" leftSection={<LuFileText size={18} />}>
            Reg. of intent
          </Button>
        </Group>
      </Paper>
    </Box>
  );
}
