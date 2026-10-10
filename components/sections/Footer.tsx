import { Mail } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppLink } from "@/components/ui/TrackedLink";
import { siteConfig } from "@/site.config";

export function Footer() {
  const { contact, tagline, brand } = siteConfig;
  const social =
    "grid size-12 place-items-center rounded-full bg-night-2 text-on-night ring-1 ring-line-night transition-[translate,color] hover:-translate-y-0.5 hover:text-accent";
  return (
    <footer className="on-night bg-night pb-[calc(96px+env(safe-area-inset-bottom))] pt-14 text-on-night md:pb-14">
      <div className="container-page flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo tone="light" className="h-8 w-auto" />
          <p className="mt-4 font-display text-xl font-bold tracking-tight">{tagline}</p>
          <p className="mt-1 text-on-night-soft">Online stores for D2C brands. Made in India.</p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex gap-3">
            <WhatsAppLink section="footer" aria-label="WhatsApp" className={social}>
              <WhatsAppIcon className="size-5" />
            </WhatsAppLink>
            <a href={`mailto:${contact.email}`} aria-label="Email" className={social}>
              <Mail className="size-5" aria-hidden="true" />
            </a>
          </div>
          <nav aria-label="Legal" className="flex gap-2 text-on-night-soft">
            <Link href="/privacy" className="inline-flex min-h-12 items-center px-1 underline-offset-4 hover:text-on-night hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="inline-flex min-h-12 items-center px-1 underline-offset-4 hover:text-on-night hover:underline">
              Terms
            </Link>
          </nav>
          <p className="text-sm text-on-night-soft">
            © {new Date().getFullYear()} {brand} · teamy.in
          </p>
        </div>
      </div>
    </footer>
  );
}
