"use client";

import type { CheckboxProps as MantineCheckboxProps } from "@mantine/core";
import { Checkbox as MantineCheckbox } from "@mantine/core";

export interface CheckboxProps extends MantineCheckboxProps {}

export const Checkbox = MantineCheckbox;
export { Checkbox as default };
