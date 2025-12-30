export type IAgent = {
	id: string;
	name: string;
	image: string;
	branch: string;
	certification?: string | null;
	rating: number;
	awards: number;
	listings: number;
	isExpert?: boolean;
};
