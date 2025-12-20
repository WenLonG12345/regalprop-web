import PreferenceModal from "./PreferenceModal";

export const modals = {
	preference: PreferenceModal,
};

declare module "@mantine/modals" {
	export interface MantineModalsOverride {
		modals: typeof modals;
	}
}
