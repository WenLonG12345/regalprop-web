import "./globals.css";
import { CurrencyProvider } from "@/components/common/CurrencyContext";
import { UnitMeasurementProvider } from "@/components/common/UnitMeasurementContext";
import JsonLd from "@/components/seo/JsonLd";
import { buildSiteSchemas } from "@/lib/seo";

export const metadata = {
  title: "RegalProp | KLCC High Value Properties",
  description:
    "KLCC / TRX / Pavilion high value properties for sale and rent. Star Residences KLCC specialist."
};

export default function RootLayout({  children  }: any) {
  const siteSchemas = buildSiteSchemas();

  return (
    <html lang="en">
      <body>
        <JsonLd data={siteSchemas} />
        
        <CurrencyProvider>
          <UnitMeasurementProvider>
            {children}
          </UnitMeasurementProvider>
        </CurrencyProvider>

      </body>
    </html>
  );
}
