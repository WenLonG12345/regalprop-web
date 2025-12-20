import { createTheme } from "@mantine/core";

export const theme = createTheme({
	colors: {
		// A scale for #b9986a (Gold)
		gold: [
			"#f7f4ef",
			"#e9e2d5",
			"#d9ccb8",
			"#c9b699",
			"#baa37d",
			"#b9986a", // Primary shade
			"#a8895d",
			"#8f734d",
			"#755f40",
			"#5c4a32",
		],
		// A scale for #1e3a63 (Blue)
		brandBlue: [
			"#edf2f7",
			"#d3deeb",
			"#a7bdd7",
			"#799cc3",
			"#5380b2",
			"#3a69a1",
			"#1e3a63", // Primary shade
			"#182e4f",
			"#12233c",
			"#0b1626",
		],
	},

	// Set one as the default primary color if desired
	primaryColor: "gold",
	primaryShade: 6,
});
