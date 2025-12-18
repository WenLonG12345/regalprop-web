"use client";

import type { SelectProps as MantineSelectProps } from "@mantine/core";
import { Select as MantineSelect } from "@mantine/core";
import type { ReactNode } from "react";

export interface SelectProps extends MantineSelectProps {}

export const Select = MantineSelect;
export { Select as default };

// For compatibility with shadcn structure
export const SelectGroup = ({ children }: { children: ReactNode }) => children;
export const SelectValue = ({ children }: { children: ReactNode }) => children;
export const SelectTrigger = ({ children }: { children: ReactNode }) =>
	children;
export const SelectContent = ({ children }: { children: ReactNode }) =>
	children;
export const SelectLabel = ({ children }: { children: ReactNode }) => children;
export const SelectItem = ({ children }: { children: ReactNode }) => children;
export const SelectSeparator = () => null;
export const SelectScrollUpButton = () => null;
export const SelectScrollDownButton = () => null;
