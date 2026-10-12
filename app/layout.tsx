import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics/Analytics";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { BackToTop } from "@/components/ui/BackToTop";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { FESTIVALS } from "@/config/festive";
import { resolveThemeId, themeBootScript, themeCss } from "@/lib/festive";
import { formatINR } from "@/lib/format";
import { motionCss } from "@/lib/motion";
import { siteConfig } from "@/content/site";
import "./globals.css";

/*
 * Self-hosted, subset variable fonts (Latin + ₹), built from the OFL sources on Google Fonts with
 * scripts/build-fonts.py. next/font generates size-matched fallbacks, so the swap doesn't shift layout.
 */
// Display: Inter Display (Inter at opsz 32), 300–800. Preloaded: it's the hero / LCP font.
const interDisplay = localFont({
  src: "./fonts/inter-display.woff2",
  weight: "300 800",
  variable: "--font-inter-display",
  display: "swap",
});

// Body: Inter. Preloaded.
const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});

// Mono accent for small labels and numbers. Not preloaded (small, mostly below the fold).
const mono = localFont({
  src: "./fonts/mono.woff2",
  weight: "400 500",
  variable: "--font-mono-face",
  display: "swap",
  preload: false,
});

// Home page title (≤ 60 chars) and description (≤ 155 chars). Other pages set their own via lib/metadata.ts.
const title = `${siteConfig.brand} | Custom Websites for India's D2C Brands`;
const description = `Custom-coded websites for D2C brands, including Shark Tank India brands. ${siteConfig.facts.projects}+ projects, rated ${siteConfig.facts.rating}/5. Based in Delhi. Starter stores from ${formatINR(siteConfig.plan.price)}.`;

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
  themeColor: "#0A0B0F",
  colorScheme: "dark",
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
      className={`${interDisplay.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <style id="theme-tokens" dangerouslySetInnerHTML={{ __html: `${themeCss(FESTIVALS)}\n${motionCss()}` }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript(FESTIVALS, allowThemePreview) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        {/* Ambient layers: light pools behind content, film grain and cursor on top. All decorative. */}
        <div aria-hidden="true" className="light-pool light-pool--a" data-pool="a" />
        <div aria-hidden="true" className="light-pool light-pool--b" data-pool="b" />
        <div className="relative z-10">{children}</div>
        <div aria-hidden="true" className="grain-overlay" />
        <div aria-hidden="true" className="cursor-ring" data-cursor-ring />
        <div aria-hidden="true" className="cursor-dot" data-cursor-dot />
        <FloatingWhatsApp />
        <BackToTop />
        <RevealObserver />
        <MotionRuntime />
        <Analytics />
      </body>
    </html>
  );
}
