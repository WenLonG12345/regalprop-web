export interface Property {
	id: string;
	title: string;
	location: string;
	image: string; // Main thumbnail
	gallery?: string[]; // (New) For the photo slider
	status: string;
	rooms?: string; // Made optional as some are "Studio"
	saleableArea: string;
	saleableAreaRate: string;
	price: string; // Sell price in Millions
	rentPrice?: number; // (New) Monthly rent
	tags?: string[];
	materialDate?: string; // For new developments
	age?: number; // (New) Building age
	description?: string; // (New) For SEO descriptions
}
