export interface Property {
  id: string | number;
  title: string; // e.g., "High Park · Phase 2 High Park II · Tower 6"
  location: string; // e.g., "Hung Shui Kiu North"
  image: string;
  status: string; // Real statuses seen

  // Real Estate specific fields
  rooms?: string; // e.g., "1 Room" or "3 Rooms (1 Suite)"
  saleableArea: string; // e.g., "348ft²"
  saleableAreaRate: string; // e.g., "@$10,632 /ft²"
  grossFloorArea?: string; // e.g., "518ft²"
  grossFloorAreaRate?: string;

  price: string; // e.g., "3.7" (Stored as string to match "3.7M" UI)
  materialDate?: string;
  firstSales?: string;
  tags?: string[]; // e.g., ["Exclusive", "Key", "Rush to sell"]
}
