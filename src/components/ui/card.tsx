import type { CardProps as MantineCardProps } from "@mantine/core";
import { Card as MantineCard } from "@mantine/core";
import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends MantineCardProps {}

export const Card = MantineCard;
export const CardSection = MantineCard.Section;

// For compatibility with shadcn structure
export const CardHeader = MantineCard.Section;
export const CardFooter = MantineCard.Section;
export const CardTitle = ({
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) => (
	<h3 {...props}>{children}</h3>
);
export const CardDescription = ({
	children,
	...props
}: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) => (
	<p {...props}>{children}</p>
);
export const CardContent = ({
	children,
	...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => (
	<div {...props}>{children}</div>
);

export { Card as default };
