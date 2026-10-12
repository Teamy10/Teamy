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
 * The checkout funnel: GA4's recommended `begin_checkout` / `purchase` events and Meta's standard
 * `InitiateCheckout` / `Purchase`, with the amount in rupees.
 */
export function trackCheckout(step: "begin" | "purchase", value: number, transactionId?: string) {
  if (typeof window === "undefined") return;
  const items = [{ item_id: "starter", item_name: "Starter store", price: value, quantity: 1 }];
  try {
    if (step === "begin") {
      window.gtag?.("event", "begin_checkout", { currency: "INR", value, items });
      window.fbq?.("track", "InitiateCheckout", { currency: "INR", value });
    } else {
      window.gtag?.("event", "purchase", { currency: "INR", value, transaction_id: transactionId, items });
      window.fbq?.("track", "Purchase", { currency: "INR", value });
    }
  } catch {
    /* never let analytics break the page */
  }
  if (process.env.NODE_ENV !== "production") console.debug("[checkout]", step, value, transactionId);
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
