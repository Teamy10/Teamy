"use client";

import { siteConfig } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * The last resort, when the root layout itself fails. It replaces the whole document, so the site's
 * styles and fonts aren't loaded: plain inline styles in the site's colours.
 */
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const button = { minHeight: 48, padding: "0 24px", borderRadius: 999, font: "600 16px system-ui, sans-serif", cursor: "pointer" };
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#0a0b0f", color: "#f3f5f8", font: "18px/1.5 system-ui, sans-serif" }}>
        <title>Something went wrong | Teamy</title>
        <main style={{ maxWidth: 560 }}>
          <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.15 }}>Something went wrong.</h1>
          <p style={{ color: "#a7aebb" }}>Try again, or message us on WhatsApp and we&apos;ll help right away.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 32 }}>
            <button type="button" onClick={() => retry()} style={{ ...button, border: 0, background: "#c8f25a", color: "#0a0b0f" }}>
              Try again
            </button>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...button, display: "inline-flex", alignItems: "center", border: "1px solid #3a4150", color: "#f3f5f8", textDecoration: "none" }}
            >
              WhatsApp {siteConfig.contact.whatsappDisplay}
            </a>
          </div>
          {error.digest && <p style={{ marginTop: 48, color: "#7f8796", fontSize: 14 }}>Error reference: {error.digest}</p>}
        </main>
      </body>
    </html>
  );
}
