/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */

import { ActionIcon, Box, Group, Stack } from "@mantine/core";
import { type ReactNode, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ScrollSliderProps<T> {
	data: T[];
	renderCard: (item: T) => ReactNode;
	visibleCount?: number;
}

export function ScrollSlider<T>({
	data,
	renderCard,
	visibleCount = 4,
}: ScrollSliderProps<T>) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const [activePage, setActivePage] = useState(0);

	const totalPages = Math.ceil(data.length / visibleCount);
	const canScrollLeft = activePage > 0;
	const canScrollRight = activePage < totalPages - 1;

	const handleScroll = (direction: "prev" | "next") => {
		if (!viewportRef.current) return;
		const nextPage = direction === "next" ? activePage + 1 : activePage - 1;
		const containerWidth = viewportRef.current.clientWidth;

		viewportRef.current.scrollTo({
			left: nextPage * (containerWidth + 16),
			behavior: "smooth",
		});
		setActivePage(nextPage);
	};

	// Logic for the Moving Thumb:
	// The thumb width is 1 / totalPages of the track.
	// The offset (left position) is activePage * thumbWidth.
	const thumbWidth = (1 / totalPages) * 100;
	const thumbOffset = (activePage / totalPages) * 100;

	return (
		<Stack gap="xl">
			<Box
				ref={viewportRef}
				className="flex overflow-x-auto md:overflow-x-hidden gap-4 no-scrollbar"
			>
				{data.map((item, index) => (
					<Box
						key={index}
						style={{
							flex: `0 0 calc(${100 / visibleCount}% - ${
								(16 * (visibleCount - 1)) / visibleCount
							}px)`,
						}}
						className="min-w-60"
					>
						{renderCard(item)}
					</Box>
				))}
			</Box>

			<Group justify="center" gap="xl" visibleFrom="md">
				<ActionIcon
					variant="outline"
					radius="xl"
					size="lg"
					color="gray"
					disabled={!canScrollLeft}
					onClick={() => handleScroll("prev")}
					style={{ opacity: !canScrollLeft ? 0.3 : 1 }}
				>
					<FaChevronLeft size={14} />
				</ActionIcon>

				{/* Custom Stepped Track */}
				<Box
					w={300}
					h={6}
					style={{
						backgroundColor: "#E9ECEF",
						borderRadius: "100px",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<Box
						style={{
							position: "absolute",
							height: "100%",
							width: `${thumbWidth}%`, // The red segment size
							left: `${thumbOffset}%`, // Moves based on current page
							backgroundColor: "#D9113A",
							borderRadius: "100px",
							transition:
								"left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s ease",
						}}
					/>
				</Box>

				<ActionIcon
					variant="outline"
					radius="xl"
					size="lg"
					color="gray"
					disabled={!canScrollRight}
					onClick={() => handleScroll("next")}
					style={{ opacity: !canScrollRight ? 0.3 : 1 }}
				>
					<FaChevronRight size={14} />
				</ActionIcon>
			</Group>
		</Stack>
	);
}
