import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingTemplate } from "@/components/pages/LandingTemplate";
import { pageBySlug, servicePages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

// Only the service pages defined in content/pages.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pageBySlug((await params).slug);
  return page ? pageMetadata(page) : {};
}

export default async function ServicePage({ params }: Props) {
  const page = pageBySlug((await params).slug);
  if (!page || page.kind !== "service") notFound();
  return <LandingTemplate page={page} />;
}
