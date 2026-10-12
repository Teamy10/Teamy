import { LandingTemplate } from "@/components/pages/LandingTemplate";
import { pageBySlug } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

const page = pageBySlug("ecommerce-website-developer-delhi")!;

export const metadata = pageMetadata(page);

export default function EcommerceWebsiteDeveloperDelhiPage() {
  return <LandingTemplate page={page} />;
}
