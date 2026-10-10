"use client";

import type { ComponentProps } from "react";
import { track, trackWhatsApp, type AnalyticsEvent } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";

/** An <a> that fires an analytics event on click. */
export function TrackedLink({
  event,
  params,
  onClick,
  ...props
}: ComponentProps<"a"> & { event: AnalyticsEvent; params?: Record<string, string> }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    />
  );
}

/** Prefilled wa.me link, tracked with the section it lives in. */
export function WhatsAppLink({
  section,
  brand,
  message,
  onClick,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { section: string; brand?: string; message?: "bookCall" }) {
  return (
    <a
      href={whatsappLink(brand, message)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(e) => {
        trackWhatsApp(section);
        onClick?.(e);
      }}
    />
  );
}
