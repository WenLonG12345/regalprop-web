import type { BadgeProps as MantineBadgeProps } from "@mantine/core";
import { Badge as MantineBadge } from "@mantine/core";

export interface BadgeProps extends MantineBadgeProps {}

export const Badge = MantineBadge;
export { Badge as default };
