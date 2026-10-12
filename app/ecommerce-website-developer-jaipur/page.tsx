import { LandingTemplate } from "@/components/pages/LandingTemplate";
import { pageBySlug } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

const page = pageBySlug("ecommerce-website-developer-jaipur")!;

export const metadata = pageMetadata(page);

export default function EcommerceWebsiteDeveloperJaipurPage() {
  return <LandingTemplate page={page} />;
}
