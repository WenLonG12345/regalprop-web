import type { LocalizedText, Project, Property } from "./data";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://www.regalprop.com.my";

export function getSiteUrl(path: string = ""): string {
	if (!path) return SITE_URL;
	return SITE_URL.replace(/\/$/, "") + path;
}

type SchemaAddress = {
	"@type": "PostalAddress";
	addressLocality: string;
	addressCountry: string;
};

type SchemaSearchAction = {
	"@type": "SearchAction";
	target: string;
	"query-input": string;
};

type SchemaRealEstateAgent = {
	"@context": "https://schema.org";
	"@type": "RealEstateAgent";
	name: string;
	url: string;
	areaServed: string;
	address: SchemaAddress;
};

type SchemaWebSite = {
	"@context": "https://schema.org";
	"@type": "WebSite";
	name: string;
	url: string;
	potentialAction: SchemaSearchAction;
};

export function buildSiteSchemas(): [SchemaRealEstateAgent, SchemaWebSite] {
	const org: SchemaRealEstateAgent = {
		"@context": "https://schema.org",
		"@type": "RealEstateAgent",
		name: "RegalProp",
		url: getSiteUrl(),
		areaServed: "Kuala Lumpur",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Kuala Lumpur",
			addressCountry: "MY",
		},
	};

	const webSite: SchemaWebSite = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "RegalProp",
		url: getSiteUrl(),
		potentialAction: {
			"@type": "SearchAction",
			target: getSiteUrl("/en/properties?q={search_term_string}"),
			"query-input": "required name=search_term_string",
		},
	};

	return [org, webSite];
}

type BreadcrumbItem = {
	name: string;
	path: string;
};

type SchemaBreadcrumbList = {
	"@context": "https://schema.org";
	"@type": "BreadcrumbList";
	itemListElement: Array<{
		"@type": "ListItem";
		position: number;
		name: string;
		item: string;
	}>;
};

export function buildBreadcrumbSchema(
	items: BreadcrumbItem[],
): SchemaBreadcrumbList {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: getSiteUrl(item.path),
		})),
	};
}

type SchemaItemList = {
	"@context": "https://schema.org";
	"@type": "ItemList";
	url: string;
	itemListElement: Array<{
		"@type": "ListItem";
		position: number;
		url: string;
		name: string;
	}>;
};

export function buildPropertyListSchema(
	properties: Property[],
	localePath: string,
): SchemaItemList {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		url: getSiteUrl(localePath),
		itemListElement: properties.map((p, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: getSiteUrl(`${localePath}/${p.slug}`),
			name: p.title?.en || p.slug,
		})),
	};
}

type SchemaResidenceType =
	| "Apartment"
	| "SingleFamilyResidence"
	| "Store"
	| "Warehouse"
	| "Residence";

type SchemaOffer = {
	"@context": "https://schema.org";
	"@type": "Offer";
	url: string;
	price: number;
	priceCurrency: string;
	itemOffered: {
		"@type": SchemaResidenceType;
		name: string | undefined;
		description: string | undefined;
		floorSize: {
			"@type": "QuantitativeValue";
			value: number;
			unitCode: string;
		};
		numberOfRooms: number;
		address: SchemaAddress;
	};
};

export function buildPropertyDetailSchema(
	property: Property,
	localePath: string,
): SchemaOffer {
	const typeMap: Record<string, SchemaResidenceType> = {
		condo: "Apartment",
		landed: "SingleFamilyResidence",
		commercial: "Store",
		factory: "Warehouse",
	};

	const schemaType = typeMap[property.category] || "Residence";

	return {
		"@context": "https://schema.org",
		"@type": "Offer",
		url: getSiteUrl(`${localePath}/${property.slug}`),
		price: property.priceMyr,
		priceCurrency: "MYR",
		itemOffered: {
			"@type": schemaType,
			name: property.title?.en,
			description: property.description?.en,
			floorSize: {
				"@type": "QuantitativeValue",
				value: property.builtUp,
				unitCode: "SFT",
			},
			numberOfRooms: property.bedrooms,
			address: {
				"@type": "PostalAddress",
				addressLocality: "Kuala Lumpur",
				addressCountry: "MY",
			},
		},
	};
}

export function buildProjectListSchema(
	projects: Project[],
	localePath: string,
): SchemaItemList {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		url: getSiteUrl(localePath),
		itemListElement: projects.map((p, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: getSiteUrl(`${localePath}/${p.slug}`),
			name: p.name?.en || p.slug,
		})),
	};
}

type SchemaResidence = {
	"@context": "https://schema.org";
	"@type": "Residence";
	"@id": string;
	name: string | undefined;
	description: string | undefined;
	url: string;
	address: SchemaAddress;
};

export function buildProjectDetailSchema(
	project: Project,
	localePath: string,
): SchemaResidence {
	return {
		"@context": "https://schema.org",
		"@type": "Residence",
		"@id": getSiteUrl(`${localePath}/${project.slug}`),
		name: project.name?.en,
		description: project.summary?.en,
		url: getSiteUrl(`${localePath}/${project.slug}`),
		address: {
			"@type": "PostalAddress",
			addressLocality: "Kuala Lumpur",
			addressCountry: "MY",
		},
	};
}
