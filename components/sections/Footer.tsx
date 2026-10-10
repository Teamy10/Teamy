import { Mail } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FestiveDivider } from "@/components/festive/Motifs";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppLink } from "@/components/ui/TrackedLink";
import { siteConfig } from "@/site.config";

const link = "inline-flex min-h-12 items-center gap-2 text-on-night-soft transition-colors hover:text-on-night";

export function Footer() {
  const { contact, tagline, brand } = siteConfig;
  return (
    <footer className="on-night grain relative bg-night pb-[calc(96px+env(safe-area-inset-bottom))] pt-16 text-on-night md:pb-12">
      <FestiveDivider />
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Logo tone="light" className="h-8 w-auto" />
            <p className="mt-4 font-display text-xl font-semibold tracking-tight">{tagline}</p>
            <p className="mt-1 text-on-night-soft">Online stores for D2C brands. Made in India.</p>
          </div>

          <nav aria-label="Contact" className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-on-night-soft">Talk to us</p>
            <ul className="mt-2">
              <li>
                <WhatsAppLink section="footer" className={link}>
                  <WhatsAppIcon className="size-4 text-accent" /> WhatsApp {contact.whatsappDisplay}
                </WhatsAppLink>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={link}>
                  <Mail className="size-4 text-accent" aria-hidden="true" /> {contact.email}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal" className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-on-night-soft">Legal</p>
            <ul className="mt-2">
              <li>
                <Link href="/privacy" className={link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={link}>
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-line-night pt-6 text-sm text-on-night-soft">
          © {new Date().getFullYear()} {brand} · teamy.in
        </p>
      </div>
    </footer>
  );
}
