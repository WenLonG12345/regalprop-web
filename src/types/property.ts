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

export interface Project {
  id: string;
  title: string;
  region: string;
  district: string;
  image: string;

  // Status Tags
  statusTags: {
    label: string;
    color: string;
    variant: "filled" | "light" | "outline";
  }[];

  // Dates
  estimatedMaterialDate: string;
  firstSalesDate: string;

  // Price
  priceLabel: string;
  priceValue: string;
  priceSuffix?: string;
  discountPrice?: string;

  // Detail Page Specifics
  phase: string;
  unitCount: number;
  managementCompany: string;
  vendor: string;
  schoolNet: string;
  blocks: string;
  hotline: string[];
}