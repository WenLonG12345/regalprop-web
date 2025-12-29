"use client";

import {
  ActionIcon,
  Anchor,
  AppShell,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Flex,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals, openContextModal } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { Link, usePathname } from "@/i18n/navigation";
import { languages, measurementUnitOptions } from "@/lib/constant";
import { currencyOptions } from "@/lib/currency";
import { usePreferenceStore } from "@/lib/store/usePreferenceStore";
import Logo from "../Logo";
import { SOCIAL_MEDIA_ICONS } from "@/data/socialIcons";
import clsx from "clsx";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { currency, unit, locale } = usePreferenceStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  console.log("@test", pathname);

  const t = useTranslations();

  const selectedLanguages = languages.find(
    (lang) => lang.code === locale
  )?.label;
  const selectedCurrency = currencyOptions.find(
    (opt) => opt.code === currency
  )?.label;
  const selectedMeasurementUnit = measurementUnitOptions.find(
    (opt) => opt.code === unit
  ).code;

  const NAV_MENU_ITEMS = [
    { href: "/", label: t("nav.home") },
    { href: "/buy", label: t("nav.buy") },
    { href: "/rent", label: t("nav.rent") },
    { href: "/transact", label: t("nav.transact") },
    { href: "/estates", label: t("nav.estates") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/agents", label: t("nav.agents") },
    { href: "/news", label: t("nav.news") },

    // { href: "/properties", label: t("nav.properties") },
    // { href: "/projects", label: t("nav.projects") },
    // { href: "/about", label: t("nav.about") },
    // { href: "/contact", label: t("nav.contact") },
    // { href: "/news", label: t("nav.news") },
    // { href: "/events", label: t("nav.events") },
    // { href: "/mm2h", label: t("nav.mm2h") },
    // { href: "/education", label: t("nav.education") },
    // { href: "/faq", label: t("nav.faq") },
    // { href: "/online-listing", label: t("nav.onlineListing") },
    // {
    //   href: "/recruitment-agent",
    //   label: t("nav.recruitmentAgent"),
    // },
    // {
    //   href: "/login-register",
    //   label: t("nav.loginRegister"),
    // },
    // {
    //   href: "/saved-properties",
    //   label: t("nav.savedProperties"),
    // },
    // {
    //   href: "/transacted-properties",
    //   label: t("nav.transactedProperties"),
    // },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const scrollY = window.scrollY;

      // Add hysteresis: different thresholds for scrolling down vs up
      if (scrollY > 200 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY < 150 && isScrolled) {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <>
      <Box
        component="header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: isScrolled ? "rgba(255, 255, 255, 0.50)" : "white",
          backdropFilter: isScrolled ? "blur(8px)" : "none",
          borderTop: isScrolled ? "1px solid #e0e0e0" : "5px solid #b9986a",
          boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          transition: "all 300ms ease",
        }}
      >
        <Container size="xl" px="md">
          <Flex
            justify="space-between"
            align="center"
            py={isScrolled ? "xs" : "sm"}
          >
            <Group gap="md">
              {isScrolled && (
                <ActionIcon
                  onClick={openDrawer}
                  variant="subtle"
                  color="gray"
                  size="lg"
                  aria-label="Menu"
                  visibleFrom="md"
                >
                  <MdMenu size={20} />
                </ActionIcon>
              )}

              <Logo />
            </Group>

            {!isScrolled && (
              <Stack align="flex-end" visibleFrom="lg">
                <Group gap="sm">
                  {SOCIAL_MEDIA_ICONS.map(
                    ({ name, Icon, bgColor, iconColor }) => (
                      <div
                        key={name}
                        title={name}
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ background: bgColor }}
                      >
                        <Icon size={14} color={iconColor} />
                      </div>
                    )
                  )}
                </Group>
                <Group gap="md">
                  <button
                    type="button"
                    className="hover:bg-primary/70 bg-[#f0f4f5] px-3 py-0.5 rounded text-gray-600 text-xs"
                  >
                    Login / Register
                  </button>
                  <UnstyledButton
                    onClick={() => {
                      openContextModal({
                        modal: "preference",
                        title: (
                          <div className="text-2xl font-semibold">
                            Preferences
                          </div>
                        ),
                        centered: true,
                        innerProps: {},
                      });
                    }}
                    style={{ fontSize: "14px", color: "#495057" }}
                  >
                    {selectedLanguages} | {selectedCurrency} |{" "}
                    {selectedMeasurementUnit}
                  </UnstyledButton>
                </Group>
              </Stack>
            )}

            <ActionIcon
              onClick={openDrawer}
              variant="subtle"
              color="gray"
              size="lg"
              hiddenFrom="lg"
              aria-label="Menu"
            >
              <MdMenu size={20} />
            </ActionIcon>
          </Flex>
        </Container>
        {!isScrolled && (
          <Box bg="#333333" visibleFrom="lg">
            <Container size="xl" px="md">
              <div className="flex flex-row gap-2">
                {NAV_MENU_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={clsx(
                        "text-white hover:bg-primary/70 text-sm font-medium p-2",
                        isActive ? " bg-primary/70" : ""
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </Container>
          </Box>
        )}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="sm"
        padding="md"
        title={<Logo />}
      >
        <Stack gap="xs">
          {NAV_MENU_ITEMS.map((item) => (
            <Anchor
              key={item.label}
              component={Link}
              href={item.href}
              onClick={closeDrawer}
              p="sm"
              style={{
                textDecoration: "none",
                borderBottom: "1px solid #f1f1f1",
                display: "block",
              }}
            >
              {item.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
