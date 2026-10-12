import type { NextConfig } from "next";

/**
 * Only once teamy.in actually points at this Vercel project (set PRIMARY_DOMAIN_LIVE=true in Vercel),
 * send the *.vercel.app hosts to it permanently. Until then the vercel.app URL is the only working
 * site, so it must stay reachable; canonicals already point at teamy.in either way.
 */
const primaryDomainLive = process.env.PRIMARY_DOMAIN_LIVE === "true";
const primaryHost = "teamy.in";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  async redirects() {
    if (!primaryDomainLive) return [];
    return [
      // www → apex, and the production vercel.app alias → teamy.in (301-equivalent permanent redirect).
      { source: "/:path*", has: [{ type: "host", value: `www.${primaryHost}` }], destination: `https://${primaryHost}/:path*`, permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "teamy-blush.vercel.app" }], destination: `https://${primaryHost}/:path*`, permanent: true },
    ];
  },
  async headers() {
    // Preview deployments (other *.vercel.app hosts) stay usable for review but out of search results.
    if (!primaryDomainLive) return [];
    return [{ source: "/:path*", has: [{ type: "host", value: "(?<sub>.+)\\.vercel\\.app" }], headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;
