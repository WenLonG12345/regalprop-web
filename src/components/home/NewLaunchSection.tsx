"use client";

import {
  Container,
  Tabs,
  Box,
  Text,
  Group,
  ActionIcon,
  Badge,
  Card,
  Image,
  Stack,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useState } from "react";
import "@mantine/carousel/styles.css";

interface NewProperty {
  id: string;
  name: string;
  location: string;
  status: "sales-progress" | "coming-soon" | "pre-sale";
  estimatedMaterialDate: string;
  firstSalesDate: string;
  price: string;
  image: string;
}

const mockProperties: NewProperty[] = [
  {
    id: "1",
    name: "ONE PARK PLACE",
    location: "Cha Kwo Ling, Yau Tong, Lei Yue Mun",
    status: "sales-progress",
    estimatedMaterialDate: "30/06/2027",
    firstSalesDate: "17/11/2025",
    price: "$4.23M up*",
    image: "https://placehold.co/400x300/e8d5c4/8b6f47?text=ONE+PARK+PLACE",
  },
  {
    id: "2",
    name: "DOUBLE COAST III",
    location: "Kai Tak",
    status: "sales-progress",
    estimatedMaterialDate: "--",
    firstSalesDate: "10/12/2025",
    price: "$4.76M up*",
    image: "https://placehold.co/400x300/1a3a52/ffffff?text=DOUBLE+COAST+III",
  },
  {
    id: "3",
    name: "SIERRA SEA (PHASE 2A)",
    location: "Shap Sze Heung",
    status: "coming-soon",
    estimatedMaterialDate: "30/09/2026",
    firstSalesDate: "--",
    price: "",
    image: "https://placehold.co/400x300/f4c2d8/ff6b9d?text=SIERRA+SEA",
  },
  {
    id: "4",
    name: "LE MONT (PHASE 2)",
    location: "Tai Po",
    status: "sales-progress",
    estimatedMaterialDate: "31/07/2026",
    firstSalesDate: "25/03/2025",
    price: "$2.64M up*",
    image: "https://placehold.co/400x300/d4e7d4/5a8f5a?text=LE+MONT",
  },
  {
    id: "5",
    name: "HARBOR VIEW TOWER",
    location: "North Point",
    status: "pre-sale",
    estimatedMaterialDate: "15/05/2026",
    firstSalesDate: "01/08/2025",
    price: "$6.10M up*",
    image: "https://placehold.co/400x300/dae8ff/234f7a?text=HARBOR+VIEW",
  },
  {
    id: "6",
    name: "RIVERGATE RESIDENCES",
    location: "Kowloon City",
    status: "coming-soon",
    estimatedMaterialDate: "20/12/2026",
    firstSalesDate: "--",
    price: "",
    image: "https://placehold.co/400x300/fff0d9/7a5a2b?text=RIVERGATE",
  },
  {
    id: "7",
    name: "THE ORCHARD",
    location: "Sai Kung",
    status: "sales-progress",
    estimatedMaterialDate: "05/11/2025",
    firstSalesDate: "12/02/2025",
    price: "$3.85M up*",
    image: "https://placehold.co/400x300/e6f7e6/2f7a2f?text=THE+ORCHARD",
  },
  {
    id: "8",
    name: "PENINSULA GARDENS",
    location: "Tsim Sha Tsui",
    status: "pre-sale",
    estimatedMaterialDate: "10/04/2027",
    firstSalesDate: "30/09/2025",
    price: "$9.40M up*",
    image: "https://placehold.co/400x300/f0e6ff/5a2b9a?text=PENINSULA+GARDENS",
  },
  {
    id: "9",
    name: "SUNSET BAY",
    location: "Lantau Island",
    status: "coming-soon",
    estimatedMaterialDate: "01/08/2026",
    firstSalesDate: "--",
    price: "",
    image: "https://placehold.co/400x300/ffdede/8a2b2b?text=SUNSET+BAY",
  },
  {
    id: "10",
    name: "CITY CENTRAL",
    location: "Mong Kok",
    status: "sales-progress",
    estimatedMaterialDate: "--",
    firstSalesDate: "18/06/2025",
    price: "$5.20M up*",
    image: "https://placehold.co/400x300/dfe9ff/164e9b?text=CITY+CENTRAL",
  },
  {
    id: "11",
    name: "PEAK HORIZON",
    location: "The Peak",
    status: "pre-sale",
    estimatedMaterialDate: "12/10/2026",
    firstSalesDate: "05/01/2026",
    price: "$28.5M up*",
    image: "https://placehold.co/400x300/e9f0ff/2b4f9a?text=PEAK+HORIZON",
  },
  {
    id: "12",
    name: "GARDEN TERRACE",
    location: "Sha Tin",
    status: "sales-progress",
    estimatedMaterialDate: "22/03/2026",
    firstSalesDate: "09/09/2025",
    price: "$3.10M up*",
    image: "https://placehold.co/400x300/fff3e6/9a5a2b?text=GARDEN+TERRACE",
  },
  {
    id: "13",
    name: "COASTLINE VILLAS",
    location: "Cheung Chau",
    status: "coming-soon",
    estimatedMaterialDate: "14/02/2027",
    firstSalesDate: "--",
    price: "",
    image: "https://placehold.co/400x300/dff7ff/1f6f7a?text=COASTLINE+VILLAS",
  },
  {
    id: "14",
    name: "METRO SQUARE",
    location: "Tsuen Wan",
    status: "sales-progress",
    estimatedMaterialDate: "09/09/2025",
    firstSalesDate: "20/05/2025",
    price: "$2.05M up*",
    image: "https://placehold.co/400x300/e8f7e6/2f8a4f?text=METRO+SQUARE",
  },
  {
    id: "15",
    name: "BAYFRONT PLAZA",
    location: "Kennedy Town",
    status: "pre-sale",
    estimatedMaterialDate: "28/02/2027",
    firstSalesDate: "15/07/2025",
    price: "$7.75M up*",
    image: "https://placehold.co/400x300/f7e6ff/6a3b9a?text=BAYFRONT+PLAZA",
  },
];

const tabs = [
  { value: "hotlist", label: "Hotlist" },
  { value: "hk-island", label: "HK Island & Islands" },
  { value: "kowloon", label: "Kowloon" },
  { value: "new-territories", label: "New Territories" },
  { value: "greater-bay", label: "Greater Bay Area" },
  { value: "overseas", label: "Overseas" },
];

const getStatusBadge = (status: NewProperty["status"]) => {
  switch (status) {
    case "sales-progress":
      return (
        <Badge color="green" size="md" fw={600}>
          Sales in Progress
        </Badge>
      );
    case "coming-soon":
      return (
        <Badge color="violet" size="md" fw={600}>
          Coming Soon
        </Badge>
      );
    case "pre-sale":
      return (
        <Badge color="gray" size="md" fw={600}>
          Pre-sale
        </Badge>
      );
  }
};

export default function NewLaunchSection() {
  const [activeTab, setActiveTab] = useState("hotlist");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <Box py={{ base: "xl", md: "3rem" }}>
      <Container size="xl">
        <Text size="36px" fw={700} mb="xl" ta="center">
          New Property
        </Text>

        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value || "hotlist")}
          mb="xl"
        >
          <Tabs.List
            style={{ borderBottom: "2px solid #e0e0e0", flexWrap: "wrap" }}
          >
            {tabs.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                style={{
                  fontSize: "15px",
                  padding: "12px 20px",
                  color: activeTab === tab.value ? "#000" : "#666",
                  borderBottom:
                    activeTab === tab.value ? "3px solid #000" : "none",
                  fontWeight: activeTab === tab.value ? 600 : 400,
                }}
              >
                {tab.label}
              </Tabs.Tab>
            ))}
            <Tabs.Tab
              value="all"
              ml="auto"
              style={{
                fontSize: "15px",
                padding: "12px 20px",
                color: "#666",
              }}
            >
              All →
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Carousel
          slideSize={{ base: "100%", sm: "50%", md: "33.333%", lg: "25%" }}
          slideGap="md"
          // align="start"
          // loop
          previousControlIcon={
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <FaChevronLeft size={16} color="#333" />
            </Box>
          }
          nextControlIcon={
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <FaChevronRight size={16} color="#333" />
            </Box>
          }
          styles={{
            control: {
              border: "none",
              boxShadow: "none",
              opacity: 1,
            },
          }}
        >
          {mockProperties.map((property) => (
            <Carousel.Slide key={property.id}>
              <Card
                shadow="sm"
                padding="0"
                radius="md"
                withBorder
                style={{ height: "100%", backgroundColor: "white" }}
              >
                <Card.Section pos="relative">
                  <Image
                    src={property.image}
                    height={200}
                    alt={property.name}
                    fit="cover"
                  />
                  <ActionIcon
                    variant="filled"
                    color={favorites.has(property.id) ? "red" : "gray"}
                    size="lg"
                    radius="xl"
                    pos="absolute"
                    top={10}
                    right={10}
                    onClick={() => toggleFavorite(property.id)}
                    style={{
                      backgroundColor: favorites.has(property.id)
                        ? "#ff4444"
                        : "rgba(255, 255, 255, 0.9)",
                      transition: "all 0.2s",
                    }}
                  >
                    {favorites.has(property.id) ? (
                      <FaHeart size={18} color="white" />
                    ) : (
                      <FaRegHeart size={18} color="#666" />
                    )}
                  </ActionIcon>
                </Card.Section>

                <Stack gap="xs" p="md">
                  <Group justify="space-between" align="flex-start">
                    <Text size="lg" fw={600} lineClamp={1}>
                      {property.name}
                    </Text>
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {property.location}
                  </Text>

                  <Group gap="xs" mt="xs">
                    {getStatusBadge(property.status)}
                    {property.status === "pre-sale" && (
                      <Badge color="gray" size="md" fw={600}>
                        Pre-sale
                      </Badge>
                    )}
                  </Group>

                  <Stack gap={4} mt="xs">
                    <Text size="xs" c="dimmed">
                      Estimated Material Date {property.estimatedMaterialDate}
                    </Text>
                    <Text size="xs" c="dimmed">
                      First Sales {property.firstSalesDate}
                    </Text>
                  </Stack>

                  {property.price && (
                    <Text size="xl" fw={700} c="red" mt="sm">
                      {property.price}
                    </Text>
                  )}
                </Stack>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>

        <Text size="xs" c="dimmed" mt="xl" style={{ lineHeight: 1.6 }}>
          *This is the lowest selling price/ the lowest price after discount
          among all price lists issued by the developer for this project (the
          lowest discounted price will be displayed with priority (if any)).The
          supply and sales of the relevant units are subject to the developer's
          announcement.
        </Text>
      </Container>
    </Box>
  );
}
