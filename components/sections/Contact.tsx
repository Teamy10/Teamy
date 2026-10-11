"use client";

import { Clock, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { FestiveDivider } from "@/components/festive/Motifs";
import { Button, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MaskWords } from "@/components/ui/MaskWords";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { isFilled, siteConfig } from "@/content/site";
import { track, trackLead } from "@/lib/analytics";
import { normaliseIndianMobile, normaliseInstagram } from "@/lib/leads";
import { buildWhatsAppLink, openWhatsApp, previewRequestMessage } from "@/lib/whatsapp";

type Values = { name: string; brand: string; whatsapp: string; instagram: string; company: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "What should we call you?";
  if (!v.brand.trim()) e.brand = "Add your brand name.";
  if (!normaliseIndianMobile(v.whatsapp)) e.whatsapp = "Enter a 10-digit Indian mobile number.";
  if (v.instagram.trim() && !normaliseInstagram(v.instagram)) e.instagram = "That doesn't look like an Instagram handle.";
  return e;
}

// Error text #ff8f85 is 8:1 on the card surface.
const inputClass =
  "h-14 w-full rounded-xl bg-surface-2 px-4 text-base text-fg ring-1 ring-inset ring-line-strong outline-none transition-shadow placeholder:text-fg-3 focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#ff8f85]";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-[15px] font-medium text-fg">
        {label}
        {hint && <span className="label-mono text-fg-3">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-[#ff8f85]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const { contact, responseHours } = siteConfig;
  const [values, setValues] = useState<Values>({ name: "", brand: "", whatsapp: "", instagram: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opening">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // If the visitor comes back to this tab (desktop) or the page (phone), let them send again.
  useEffect(() => {
    if (status !== "opening") return;
    const t = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  // Synchronous on purpose: opening a new tab must happen inside the click/submit, or popup blockers step in.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (values.company) return; // honeypot: bots fill it, people never see it
    const errs = validate(values);
    setErrors(errs);
    const firstBad = (Object.keys(errs) as (keyof Values)[])[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus("opening");
    const url = buildWhatsAppLink(
      previewRequestMessage({
        name: values.name.trim(),
        brand: values.brand.trim(),
        whatsapp: normaliseIndianMobile(values.whatsapp)!,
        instagram: values.instagram.trim() ? normaliseInstagram(values.instagram)! : undefined,
      }),
    );
    track("form_submitted");
    trackLead("contact_form");
    openWhatsApp(url);
  };

  const describedBy = (k: keyof Values) => (errors[k] ? `contact-${k}-error` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad cv-auto relative">
      <FestiveDivider />
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal className="reveal-mask">
            <h2 id="contact-title" className="display-l">
              <MaskWords text="Let's build your store." emphasis="your store." />
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg text-fg-2">
              Tell us about your brand and we&apos;ll pick it up on WhatsApp with a free preview plan. No pitch decks, no
              pressure.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4">
              <WhatsAppCTA source="contact_call" message="bookCall" className={buttonClass("secondary")}>
                <WhatsAppIcon className="size-5 text-accent" /> Book a free call on WhatsApp
              </WhatsAppCTA>
              <a href={`mailto:${contact.email}`} className={buttonClass("ghost")}>
                <Mail className="size-4" aria-hidden="true" /> {contact.email}
              </a>
            </div>
            <p className="mt-10 flex items-center gap-2 text-fg-2">
              <Clock className="size-4 text-fg-3" aria-hidden="true" /> We reply within {responseHours} hours, Monday to Saturday.
            </p>
            <p className="mt-3 flex items-center gap-2 text-fg-2">
              <MapPin className="size-4 text-fg-3" aria-hidden="true" />
              {isFilled(contact.address.street)
                ? `${contact.address.street}, ${contact.address.locality}, ${contact.address.region}, ${contact.address.countryName}`
                : `${contact.address.locality}, ${contact.address.region}, ${contact.address.countryName}`}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative space-y-6 rounded-[28px] p-6 sm:p-10">
              <Field id="contact-name" label="Your name" error={errors.name}>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={inputClass}
                />
              </Field>
              <Field id="contact-brand" label="Brand name" error={errors.brand}>
                <input
                  id="contact-brand"
                  name="brand"
                  autoComplete="organization"
                  value={values.brand}
                  onChange={set("brand")}
                  aria-invalid={!!errors.brand}
                  aria-describedby={describedBy("brand")}
                  className={inputClass}
                />
              </Field>
              <Field id="contact-whatsapp" label="WhatsApp number" error={errors.whatsapp}>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-mono text-fg-2">+91</span>
                  <input
                    id="contact-whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    value={values.whatsapp}
                    onChange={set("whatsapp")}
                    aria-invalid={!!errors.whatsapp}
                    aria-describedby={describedBy("whatsapp")}
                    className={`${inputClass} pl-14`}
                  />
                </div>
              </Field>
              <Field id="contact-instagram" label="Instagram handle" hint="Optional" error={errors.instagram}>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-fg-2">@</span>
                  <input
                    id="contact-instagram"
                    name="instagram"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={values.instagram}
                    onChange={set("instagram")}
                    aria-invalid={!!errors.instagram}
                    aria-describedby={describedBy("instagram")}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
              </div>


              <Button type="submit" size="lg" disabled={status === "opening"} className="w-full">
                <WhatsAppIcon className="size-5" />
                {status === "opening" ? "Opening WhatsApp…" : "Get my free preview plan"}
              </Button>
              <p className="text-center text-sm text-fg-3" aria-live="polite">
                {status === "opening"
                  ? "Your details are ready in WhatsApp. Just press send."
                  : "This opens WhatsApp with your details filled in. Nothing is sent until you press send."}
              </p>
            </form>
        </Reveal>
      </div>
    </section>
  );
}
