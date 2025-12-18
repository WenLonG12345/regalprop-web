import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";

export interface ButtonProps extends MantineButtonProps {}

export const Button = MantineButton;
export { Button as default };
