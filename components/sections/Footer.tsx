import { Mail } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FestiveDivider } from "@/components/festive/Motifs";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { siteConfig } from "@/content/site";

const link = "underline-anim inline-flex min-h-12 items-center gap-2 text-fg-2 transition-colors hover:text-fg";

export function Footer() {
  const { contact, tagline, brand } = siteConfig;
  return (
    <footer className="relative border-t border-line pb-[calc(96px+env(safe-area-inset-bottom))] pt-20 md:pb-12">
      <FestiveDivider />
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Logo className="h-8 w-auto" />
            <p className="mt-6 max-w-sm font-display text-[28px] font-light leading-tight tracking-[-0.03em]">{tagline}</p>
            <p className="mt-2 text-fg-2">Online stores for D2C brands. Made in India.</p>
          </div>

          <nav aria-label="Contact" className="md:col-span-3">
            <p className="label-mono text-fg-3">Talk to us</p>
            <ul className="mt-3">
              <li>
                <WhatsAppCTA source="footer" message="talk" className={link}>
                  <WhatsAppIcon className="size-4 text-accent" /> {contact.whatsappDisplay}
                </WhatsAppCTA>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={link}>
                  <Mail className="size-4 text-accent" aria-hidden="true" /> {contact.email}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal" className="md:col-span-3">
            <p className="label-mono text-fg-3">Legal</p>
            <ul className="mt-3">
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

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-fg-3">
            © {new Date().getFullYear()} {brand} · teamy.in
          </p>
          <p className="label-mono text-fg-3">Designed, built and run in India</p>
        </div>
      </div>
    </footer>
  );
}
