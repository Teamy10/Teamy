/**
 * Tiny analytics shim. GA4 and Meta Pixel load only when NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_META_PIXEL_ID
 * are set (components/analytics/Analytics.tsx); every call below is a safe no-op otherwise.
 */
export type AnalyticsEvent = "hero_cta_click" | "pricing_viewed" | "pricing_cta_click" | "form_submitted";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
  } catch {
    /* never let analytics break the page */
  }
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
}

/**
 * A lead: someone opened WhatsApp to talk to Teamy. Sent as GA4's recommended `generate_lead`
 * event and Meta's standard `Lead` event, with where on the site it happened.
 */
export function trackLead(source: string) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", { method: "whatsapp", lead_source: source });
    window.fbq?.("track", "Lead", { content_name: source });
  } catch {
    /* never let analytics break the page */
  }
  if (process.env.NODE_ENV !== "production") console.debug("[lead]", source);
}
