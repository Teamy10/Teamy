import type { NextConfig } from "next";

/**
 * The canonical host. Vercel's domain settings already 308-redirect teamy.in to www.teamy.in, so the
 * site itself only has to move visitors off the vercel.app URL, and only once
 * PRIMARY_DOMAIN_LIVE=true is set in Vercel (until then the vercel.app URL must stay reachable).
 */
const primaryDomainLive = process.env.PRIMARY_DOMAIN_LIVE === "true";
const primaryHost = "www.teamy.in";

/** Sent with every response. No full CSP: GA4, Meta Pixel and Razorpay Checkout load from many hosts. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No framing by other sites (clickjacking), most importantly of /checkout.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizePackageImports: ["lucide-react"] },
  // Pin the root: a stray package-lock.json in the home folder otherwise makes Next guess wrong (and warn).
  turbopack: { root: __dirname },
  async redirects() {
    // The local page moved with the studio, from Jaipur to Delhi.
    const moved = [{ source: "/ecommerce-website-developer-jaipur", destination: "/ecommerce-website-developer-delhi", permanent: true }];
    if (!primaryDomainLive) return moved;
    return [
      ...moved,
      // The production vercel.app alias → the real domain (permanent).
      { source: "/:path*", has: [{ type: "host", value: "teamy-blush.vercel.app" }], destination: `https://${primaryHost}/:path*`, permanent: true },
    ];
  },
  async headers() {
    const all = [{ source: "/:path*", headers: securityHeaders }];
    if (!primaryDomainLive) return all;
    // Preview deployments (other *.vercel.app hosts) stay usable for review but out of search results.
    return [...all, { source: "/:path*", has: [{ type: "host", value: "(?<sub>.+)\\.vercel\\.app" }], headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;
