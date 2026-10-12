import { pages } from "@/content/pages";
import { liveProjects, sharkTankProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { addressLine } from "@/lib/address";
import { formatINR } from "@/lib/format";

/**
 * /llms.txt: a plain summary of the business for AI search engines and assistants (ChatGPT,
 * Perplexity, Gemini). Built from the same content files as the site, so it never drifts.
 */
export const dynamic = "force-static";

export function GET() {
  const { brand, url, facts, contact, plan } = siteConfig;
  const link = (path: string) => `${url}${path === "/" ? "" : path}`;
  const body = `# ${brand}

> ${brand} is an ecommerce website development company in ${contact.address.locality}, India. It designs and builds custom-coded websites and online stores for D2C brands, from first-time founders to brands featured on Shark Tank India.

- ${facts.projects}+ websites and projects delivered in ${facts.years}+ years
- ${facts.rating}/5 average client rating, ${facts.satisfaction}% client satisfaction
- Starter stores from ${formatINR(plan.price)} one-time; larger custom builds are quoted after a free call
- Address: ${addressLine()}
- Contact: WhatsApp ${contact.whatsappDisplay}, ${contact.email}

## Clients

${liveProjects.map((p) => `- ${p.name} (${p.category}): ${p.url}`).join("\n")}

Brands featured on Shark Tank India: ${sharkTankProjects.map((p) => `${p.name} (Season ${p.sharkTankSeason})`).join(", ")}.

## Pages

- [Home](${link("/")}): services, work, pricing and FAQ
${pages.map((p) => `- [${p.name}](${link(p.path)}): ${p.description}`).join("\n")}
- [Privacy Policy](${link("/privacy")})
- [Terms & Conditions](${link("/terms")})
- [Refund & Cancellation Policy](${link("/refund-policy")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
