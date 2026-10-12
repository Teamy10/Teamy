import { LandingTemplate } from "@/components/pages/LandingTemplate";
import { pageBySlug } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

const page = pageBySlug("shopify-alternative-india")!;

export const metadata = pageMetadata(page);

export default function ShopifyAlternativeIndiaPage() {
  return <LandingTemplate page={page} />;
}
