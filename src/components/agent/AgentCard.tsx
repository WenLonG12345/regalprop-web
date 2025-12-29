import {
  Card,
  Avatar,
  Text,
  Group,
  Stack,
  Badge,
  Button,
  ActionIcon,
  Grid,
  Rating,
  Box,
} from "@mantine/core";
import { FaWhatsapp, FaPhone, FaHeart, FaWeixin } from "react-icons/fa6";
import { IoStar } from "react-icons/io5"; 
import { IAgent } from "@/types/agent";

interface AgentCardProps {
  agent: IAgent;
  onCardClick?: () => void;
}

export function AgentCard({ agent, onCardClick }: AgentCardProps) {
  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className="relative shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onCardClick}
    >
      {/* Favorite Icon - Top Right */}
      {/* <ActionIcon
        variant="transparent"
        className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
      >
        <FaHeart size={22} />
      </ActionIcon> */}

      <Grid align="center" gutter="xl">
        {/* Left Section: Photo and Info (Desktop: 8/12 columns) */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Group wrap="nowrap" align="flex-start" gap="lg">
            {/* Profile Picture with "Expert" Badge overlay */}
            <Box className="relative">
              <Avatar
                src={agent.image}
                size={120}
                radius={100}
                className="border-4 border-gray-50 shadow-sm"
              />
              {agent.isExpert && (
                <Badge
                  color="red"
                  variant="filled"
                  className="absolute bottom-0 right-0 px-3 py-3 rounded-full text-[10px] whitespace-nowrap"
                >
                  New
                </Badge>
              )}
            </Box>

            <Stack gap={4}>
              <Text fw={700} size="lg" className="leading-tight">
                {agent.name}
              </Text>
              <Text size="sm" c="dimmed" fw={500}>
                {agent.id}
              </Text>
              <Text size="sm" c="dimmed">
                {agent.branch}
              </Text>

              {agent.certification && (
                <Badge
                  variant="light"
                  color="blue"
                  radius="sm"
                  className="mt-1 h-auto py-1 px-2"
                  size="sm"
                >
                  {agent.certification}
                </Badge>
              )}

              {/* Rating using io5 stars for that specific look */}
              <Rating
                value={agent.rating}
                readOnly
                mt="xs"
                size="sm"
                color="yellow"
              />

              {/* Contact Buttons Group */}
              <Group gap="xs" mt="md">
                <Button
                  leftSection={<FaWhatsapp size={18} />}
                  color="green.1"
                  c="green.9"
                  radius="sm"
                  variant="filled"
                  className="hover:bg-green-200"
                >
                  WhatsApp
                </Button>

                <ActionIcon variant="light" color="blue" size="lg" radius="sm">
                  <FaPhone size={16} />
                </ActionIcon>

                <ActionIcon variant="light" color="green" size="lg" radius="sm">
                  <FaWeixin size={20} />
                </ActionIcon>
              </Group>
            </Stack>
          </Group>
        </Grid.Col>

        {/* Right Section: Performance Metrics (Desktop: 4/12 columns) */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Group justify="flex-end" gap={60} className="md:pr-8">
            <Stack gap={0} align="center">
              <Text size="sm" c="dimmed" fw={500}>
                Awards
              </Text>
              <Text className="text-[32px] font-bold leading-none">
                {agent.awards}
              </Text>
            </Stack>
            <Stack gap={0} align="center">
              <Text size="sm" c="dimmed" fw={500}>
                Listings
              </Text>
              <Text className="text-[32px] font-bold leading-none">
                {agent.listings}
              </Text>
            </Stack>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
