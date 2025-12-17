const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.regalprop.com.my";

export function getSiteUrl(path = "") {
  if (!path) return SITE_URL;
  return SITE_URL.replace(/\/$/, "") + path;
}

export function buildSiteSchemas() {
  const org = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "RegalProp",
    url: getSiteUrl(),
    areaServed: "Kuala Lumpur",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuala Lumpur",
      addressCountry: "MY"
    }
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RegalProp",
    url: getSiteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: getSiteUrl("/en/properties?q={search_term_string}"),
      "query-input": "required name=search_term_string"
    }
  };

  return [org, webSite];
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path)
    }))
  };
}

export function buildPropertyListSchema(properties, localePath) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: getSiteUrl(localePath),
    itemListElement: properties.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getSiteUrl(`${localePath}/${p.slug}`),
      name: p.title?.en || p.slug
    }))
  };
}

export function buildPropertyDetailSchema(property, localePath) {
  const typeMap = {
    condo: "Apartment",
    landed: "SingleFamilyResidence",
    commercial: "Store",
    factory: "Warehouse"
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
        unitCode: "SFT"
      },
      numberOfRooms: property.bedrooms,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kuala Lumpur",
        addressCountry: "MY"
      }
    }
  };
}

export function buildProjectListSchema(projects, localePath) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: getSiteUrl(localePath),
    itemListElement: projects.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getSiteUrl(`${localePath}/${p.slug}`),
      name: p.name?.en || p.slug
    }))
  };
}

export function buildProjectDetailSchema(project, localePath) {
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
      addressCountry: "MY"
    }
  };
}
