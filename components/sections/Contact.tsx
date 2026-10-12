"use client";

import { Clock, MapPin } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { FestiveDivider } from "@/components/festive/Motifs";
import { Button, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MaskWords } from "@/components/ui/MaskWords";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { isFilled, siteConfig } from "@/content/site";
import { track, trackLead } from "@/lib/analytics";
import { buildWhatsAppLink, openWhatsApp, projectRequestMessage } from "@/lib/whatsapp";

const PROJECT_TYPES = ["New online store", "Redesign or move my store", "Brand website", "Something else"];

type Values = { name: string; projectType: string; message: string; company: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "What should we call you?";
  if (!v.projectType) e.projectType = "Pick the closest one.";
  return e;
}

// Error text #ff8f85 is 8:1 on the card surface.
const fieldClass =
  "w-full rounded-xl bg-surface-2 px-4 text-base text-fg ring-1 ring-inset ring-line-strong outline-none transition-shadow placeholder:text-fg-3 focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#ff8f85]";
const inputClass = `h-14 ${fieldClass}`;

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
  const [values, setValues] = useState<Values>({ name: "", projectType: "", message: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opening">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // If the visitor comes back to this tab (desktop) or the page (phone), let them send again.
  useEffect(() => {
    if (status !== "opening") return;
    const t = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus("opening");
    const url = buildWhatsAppLink(
      projectRequestMessage({ name: values.name.trim(), projectType: values.projectType, message: values.message.trim() || undefined }),
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
              Tell us about your project and we&apos;ll pick it up on WhatsApp, usually with a free preview plan. No pitch
              decks, no pressure.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4">
              <WhatsAppCTA source="contact_call" className={buttonClass("secondary")}>
                <WhatsAppIcon className="size-5 text-accent" /> Let&apos;s talk on WhatsApp
              </WhatsAppCTA>
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
              <Field id="contact-projectType" label="Project type" error={errors.projectType}>
                <select
                  id="contact-projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={set("projectType")}
                  aria-invalid={!!errors.projectType}
                  aria-describedby={describedBy("projectType")}
                  className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23a7aebb'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_16px_center] bg-no-repeat pr-12 [&_option]:bg-surface [&_option]:text-fg ${values.projectType ? "" : "text-fg-3"}`}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="contact-message" label="Message" hint="Optional" error={errors.message}>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Your brand, what you sell, and anything we should know."
                  value={values.message}
                  onChange={set("message")}
                  className={`${fieldClass} min-h-32 resize-y py-3.5`}
                />
              </Field>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
              </div>


              <Button type="submit" size="lg" disabled={status === "opening"} className="w-full">
                <WhatsAppIcon className="size-5" />
                {status === "opening" ? "Opening WhatsApp…" : "Send on WhatsApp"}
              </Button>
              <p className="text-center text-sm text-fg-3" aria-live="polite">
                {status === "opening"
                  ? "Your message is ready in WhatsApp. Just press send."
                  : "This opens WhatsApp with your message filled in. Nothing is sent until you press send."}
              </p>
            </form>
        </Reveal>
      </div>
    </section>
  );
}
