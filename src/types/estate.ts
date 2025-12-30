export interface Estate {
  id: string;
  name: string;
  address: string;
  district: string;
  developer: string;

  // Stats for Listing Card
  blockCount: number;
  unitCount: number;
  pricePerSqFt: number; // Saleable area
  moMTrend: number; // Month-over-Month change percentage
  transactionCount: number; // Monthly transactions

  // Listing Counts & Ranges
  forSaleCount: number;
  forRentCount: number;
  salePriceRange: [number, number]; // [Min, Max] in Millions
  rentPriceRange: [number, number]; // [Min, Max] in HKD
  rentPerSqFt: number;

  // Detail Page Specifics
  occupationDate: string; // YYYY-MM
  phaseCount: number;
  schoolNet: {
    primary: string;
    secondary: string;
  };
  facilities: string[];
  walkingDistanceMTR: string;

  images: string[];
}
