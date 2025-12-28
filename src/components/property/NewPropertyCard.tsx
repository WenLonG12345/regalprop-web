import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  Box,
  Grid,
  ActionIcon,
} from "@mantine/core";
import { FaHeart } from "react-icons/fa6";
import { Property } from "@/types/property";

export function NewPropertyCard({ property }: { property: Property }) {
  return (
    <Card withBorder radius="md" p={0} className="overflow-hidden">
      <Grid gutter={0} align="stretch">
        {/* Left Side: Image (Span 4 of 12) */}
        <Grid.Col span={3} className="relative">
          <Image
            src={property.image}
            className="h-full object-cover min-h-30"
            alt={property.title}
          />

          {/* Overlaid Badges on Image */}
          <Box className="absolute top-2 left-2 flex flex-col gap-1">
            {property.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="filled"
                color={tag === "Exclusive" ? "red" : "cyan"}
                size="xs"
              >
                {tag}
              </Badge>
            ))}
            <Box className="mt-auto bg-yellow-400 text-black px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
              🎙️ AI Deco & Talk
            </Box>
          </Box>
        </Grid.Col>

        {/* Right Side: Content (Span 8 of 12) */}
        <Grid.Col span={9} p="md" className="relative">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Stack gap={2}>
              <Text fw={700} size="lg" className="line-clamp-1">
                {property.title}
              </Text>
              <Text size="xs" fw={500}>
                {property.rooms}
              </Text>
              <Text size="xs" c="dimmed">
                {property.location}
              </Text>
              <Text size="xs" c="dimmed">
                {property.materialDate ? `${property.materialDate} years` : ""}
              </Text>
            </Stack>

            <ActionIcon variant="transparent" color="gray.4">
              <FaHeart size={18} />
            </ActionIcon>
          </Group>

          <Group gap="xs" mt="sm">
            <Badge variant="light" color="orange" size="xs">
              Rush to sell
            </Badge>
            <Badge variant="light" color="gray" size="xs">
              Directors' Choice
            </Badge>
          </Group>

          {/* Area and Price Footer */}
          <Group justify="space-between" align="flex-end" mt="md">
            <Stack gap={0}>
              <Text size="xs" fw={500} c="dimmed">
                S.A.
              </Text>
              <Group gap={4}>
                <Text fw={700} size="sm">
                  {property.saleableArea}
                </Text>
                <Text size="xs" c="dimmed">
                  {property.saleableAreaRate}
                </Text>
              </Group>
            </Stack>

            <Stack gap={0} align="flex-end">
              <Text size="xs" c="dimmed">
                Sell
              </Text>
              <Text fw={800} size="xl" color="red.7" className="leading-none">
                ${property.price}M
              </Text>
              <Box className="bg-blue-50 px-2 py-1 rounded mt-1">
                <Text size="xs" c="blue.9">
                  Monthly $11,450 • Mortgage Calculation
                </Text>
              </Box>
            </Stack>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
