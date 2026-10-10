/**
 * Tiny analytics shim. Wire GA4 / Meta Pixel by adding their snippets in app/layout.tsx;
 * every event below is forwarded to whichever of them is present.
 */
export type AnalyticsEvent =
  | "hero_cta_click"
  | "whatsapp_click"
  | "plan_cta_click"
  | "form_submitted"
  | "pricing_viewed";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
  } catch {
    /* never let analytics break the page */
  }
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
}

export const trackWhatsApp = (section: string) => track("whatsapp_click", { section });
