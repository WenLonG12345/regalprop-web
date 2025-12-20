'use client';

import {
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Anchor,
  Divider,
} from "@mantine/core";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Agents", href: "/agents" },
      { label: "Careers", href: "/recruitment-agent" },
      { label: "Contact", href: "/contact" },
    ],
    properties: [
      { label: "Buy Property", href: "/properties" },
      { label: "Rent Property", href: "/properties" },
      { label: "New Projects", href: "/projects" },
      { label: "Transacted Properties", href: "/transacted-properties" },
    ],
    resources: [
      { label: "News & Insights", href: "/news" },
      { label: "Events", href: "/events" },
      { label: "MM2H Program", href: "/mm2h" },
      { label: "Education", href: "/education" },
      { label: "FAQ", href: "/faq" },
    ],
    services: [
      { label: "Online Listing", href: "/online-listing" },
      { label: "Saved Properties", href: "/saved-properties" },
      { label: "Property Valuation", href: "#" },
      { label: "Mortgage Calculator", href: "#" },
    ],
  };

  const socialMedia = [
    { Icon: FaFacebook, href: "#", label: "Facebook" },
    { Icon: FaInstagram, href: "#", label: "Instagram" },
    { Icon: FaYoutube, href: "#", label: "YouTube" },
    { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#23262e",
        color: "#ffffff",
        marginTop: "4rem",
      }}
    >
      <Container size="xl" py={{ base: "xl", md: "3rem" }}>
        {/* Top Section */}
        <Grid gutter={{ base: "xl", md: "xl" }}>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack gap="md">
              <Group gap="sm">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#b9986a",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  R
                </div>
                <div>
                  <Text size="lg" fw={700} c="#b9986a">
                    Regal Properties
                  </Text>
                  <Text size="xs" c="dimmed">
                    Your Trusted Partner
                  </Text>
                </div>
              </Group>
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                Specializing in KLCC, TRX, and Pavilion high-value properties.
                Your trusted real estate partner in Malaysia.
              </Text>
              <Group gap="sm">
                {socialMedia.map(({ Icon, href, label }) => (
                  <Anchor
                    key={label}
                    href={href}
                    target="_blank"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#b9986a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.1)";
                    }}
                  >
                    <Icon size={16} color="#ffffff" />
                  </Anchor>
                ))}
              </Group>
            </Stack>
          </Grid.Col>

          {/* Links Sections */}
          <Grid.Col span={{ base: 6, sm: 6, md: 2.25 }}>
            <Stack gap="md">
              <Text size="sm" fw={600} c="#b9986a" tt="uppercase">
                Company
              </Text>
              <Stack gap="xs">
                {footerLinks.company.map((link) => (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#b9986a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 6, md: 2.25 }}>
            <Stack gap="md">
              <Text size="sm" fw={600} c="#b9986a" tt="uppercase">
                Properties
              </Text>
              <Stack gap="xs">
                {footerLinks.properties.map((link) => (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#b9986a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 6, md: 2.25 }}>
            <Stack gap="md">
              <Text size="sm" fw={600} c="#b9986a" tt="uppercase">
                Resources
              </Text>
              <Stack gap="xs">
                {footerLinks.resources.map((link) => (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#b9986a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 6, md: 2.25 }}>
            <Stack gap="md">
              <Text size="sm" fw={600} c="#b9986a" tt="uppercase">
                Services
              </Text>
              <Stack gap="xs">
                {footerLinks.services.map((link) => (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#b9986a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="rgba(255, 255, 255, 0.1)" />

        {/* Bottom Section */}
        <Group
          justify="space-between"
          align="center"
          style={{ flexWrap: "wrap", gap: "1rem" }}
        >
          <Text size="sm" c="dimmed">
            © {currentYear} Regal Properties. All rights reserved.
          </Text>
          <Group gap="lg" style={{ flexWrap: "wrap" }}>
            <Anchor
              href="/privacy-policy"
              size="sm"
              c="dimmed"
              underline="never"
            >
              Privacy Policy
            </Anchor>
            <Anchor
              href="/terms-of-service"
              size="sm"
              c="dimmed"
              underline="never"
            >
              Terms of Service
            </Anchor>
            <Anchor href="/sitemap" size="sm" c="dimmed" underline="never">
              Sitemap
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
