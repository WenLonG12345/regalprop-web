import { Anchor, Box, Group, Text } from "@mantine/core";
import { Link } from "@/i18n/navigation";

const Logo = () => {
	return (
		<Anchor component={Link} href={"/"} style={{ textDecoration: "none" }}>
			<Group gap="sm">
				<Box
					style={{
						width: 40,
						height: 40,
						background: "#1e3a63",
						borderRadius: 4,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontWeight: 700,
						fontSize: 18,
					}}
				>
					R
				</Box>
				<Box>
					<Text size="xl" fw={700} c="#b9986a" lh={1.2}>
						Regal Properties
					</Text>
					<Text size="xs" fw={500} c="#b9986a" lh={1}>
						Regal Properties
					</Text>
				</Box>
			</Group>
		</Anchor>
	);
};

export default Logo;
