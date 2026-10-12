import { Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Logo } from "@/components/brand/Logo";
import { FestiveDivider } from "@/components/festive/Motifs";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { servicePages } from "@/content/pages";
import { isFilled, siteConfig } from "@/content/site";
import { formatINR } from "@/lib/format";

const link = "underline-anim inline-flex min-h-11 items-center gap-2 text-fg-2 transition-colors hover:text-fg";

const socialIcons: Record<keyof typeof siteConfig.socials, [string, ComponentType<SVGProps<SVGSVGElement>>]> = {
  instagram: ["Instagram", InstagramIcon],
  youtube: ["YouTube", YouTubeIcon],
  linkedin: ["LinkedIn", LinkedInIcon],
  facebook: ["Facebook", FacebookIcon],
};

const company = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Our work" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/shopify-alternative-india", label: "Shopify alternative" },
  { href: "/ecommerce-website-developer-delhi", label: "Website developer in Delhi" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund & Cancellation Policy" },
];

/** Address line shared by the footer, contact section and local page (NAP stays identical everywhere). */
export function addressLine() {
  const a = siteConfig.contact.address;
  // "New Delhi, Delhi" reads twice: skip the region when the city already names it.
  const region = a.locality.includes(a.region) ? null : a.region;
  return [isFilled(a.street) ? a.street : null, a.locality, region, a.countryName].filter(Boolean).join(", ");
}

export function Footer() {
  const { contact, brand, socials } = siteConfig;
  const shownSocials = (Object.keys(socials) as (keyof typeof socials)[]).filter((k) => isFilled(socials[k]));
  return (
    <footer className="cv-auto relative border-t border-line pb-28 pt-20 md:pb-12">
      <FestiveDivider />
      <div className="container-page">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" prefetch={false} aria-label="Teamy home" className="inline-flex min-h-12 items-center">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-fg-2">
              Custom-coded websites for India&apos;s D2C brands. {siteConfig.facts.projects}+ projects in {siteConfig.facts.years}+ years, from {formatINR(siteConfig.plan.price)}.
            </p>
            {shownSocials.length > 0 && (
              <ul className="mt-6 flex gap-2" aria-label="Teamy on social media">
                {shownSocials.map((k) => {
                  const [label, Icon] = socialIcons[k];
                  return (
                    <li key={k}>
                      <a
                        href={socials[k]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Teamy on ${label}`}
                        className="grid size-12 place-items-center rounded-full text-fg-2 ring-1 ring-inset ring-line-strong transition-colors hover:text-fg"
                      >
                        <Icon className="size-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="label-mono text-fg-3">Services</h2>
            <ul className="mt-3">
              {servicePages.map((p) => (
                <li key={p.slug}>
                  <Link href={p.path} className={link}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="label-mono text-fg-3">Company</h2>
            <ul className="mt-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={l.href.startsWith("/#") ? false : undefined} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <WhatsAppCTA source="footer_contact" className={link}>
                  Contact
                </WhatsAppCTA>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label-mono text-fg-3">Contact</h2>
            <address className="mt-3 not-italic">
              <ul>
                <li>
                  <WhatsAppCTA source="footer" className={link}>
                    <WhatsAppIcon className="size-4 shrink-0 text-accent" /> {contact.whatsappDisplay}
                  </WhatsAppCTA>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className={link}>
                    <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" /> {contact.email}
                  </a>
                </li>
                <li className="flex min-h-11 items-start gap-2 py-2.5 text-fg-2">
                  <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" /> {addressLine()}
                </li>
                <li className="flex min-h-11 items-start gap-2 py-2.5 text-fg-2">
                  <Clock className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" /> {contact.hours}
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="label-mono text-fg-3">
            © {new Date().getFullYear()} {brand}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`${link} text-[15px]`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="label-mono text-fg-3">Made in Delhi, India</p>
        </div>
      </div>
    </footer>
  );
}
