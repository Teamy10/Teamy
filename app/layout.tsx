import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { FESTIVALS } from "@/config/festive";
import { InteractionFX } from "@/components/ui/InteractionFX";
import { resolveThemeId, themeBootScript, themeCss } from "@/lib/festive";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { siteConfig } from "@/site.config";
import "./globals.css";

/*
 * Self-hosted, subset variable fonts (Latin + ₹), built from the OFL sources on Google Fonts.
 * Google's own "latin" files lack ₹, so every price would pull an extra 84KB latin-ext file
 * late in the load. Rebuild with scripts/build-fonts.py (see README → Fonts).
 */
const bricolage = localFont({
  src: "./fonts/bricolage.woff2",
  weight: "400 800",
  variable: "--font-bricolage",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});

const title = `${siteConfig.brand} | Online stores for D2C brands that sell and scale`;
const description =
  "Teamy designs, builds and runs fast, high-converting online stores for D2C brands. UPI, cards and COD, WhatsApp order updates, live in days. You own everything.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteConfig.brand,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E1726",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Re-render hourly so the server-picked festive theme follows the calendar (the boot script
// below also corrects it on the visitor's device before first paint).
export const revalidate = 3600;

// `?theme=` previews are compiled in only for `next dev`, never for production builds.
const allowThemePreview = process.env.NODE_ENV !== "production";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-theme={resolveThemeId(new Date())}
      // The boot script may change data-theme before React hydrates.
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable}`}
    >
      <head>
        <style id="theme-tokens" dangerouslySetInnerHTML={{ __html: themeCss(FESTIVALS) }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript(FESTIVALS, allowThemePreview) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <RevealObserver />
        <InteractionFX />
      </body>
    </html>
  );
}
