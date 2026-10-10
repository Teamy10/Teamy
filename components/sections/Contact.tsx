"use client";

import { Check, Clock, Mail, PartyPopper } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button, buttonClass } from "@/components/ui/Button";
import { confettiBurst } from "@/components/ui/confetti";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SectionHeading";
import { WhatsAppLink } from "@/components/ui/TrackedLink";
import { track } from "@/lib/analytics";
import { PLAN_CHOICES, normaliseIndianMobile, normaliseInstagram, submitLead, type PlanChoice } from "@/lib/leads";
import { PLAN_EVENT } from "@/lib/planEvent";
import { siteConfig } from "@/site.config";

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

const inputClass =
  "h-14 w-full rounded-2xl bg-bg px-4 text-base ring-1 ring-line outline-none transition-shadow focus:bg-surface focus:ring-2 focus:ring-support aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#C2410C]";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between font-medium">
        {label}
        {hint && <span className="text-sm font-normal text-ink-soft">{hint}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-[#C2410C]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const { contact, responseHours } = siteConfig;
  const [values, setValues] = useState<Values>({ name: "", brand: "", whatsapp: "", instagram: "", company: "" });
  const [plan, setPlan] = useState<PlanChoice | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // A "Choose Launch/Growth" click in Pricing preselects the plan here.
  useEffect(() => {
    const onPlan = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setPlan(id === "growth" ? "Growth" : "Launch");
    };
    window.addEventListener(PLAN_EVENT, onPlan);
    return () => window.removeEventListener(PLAN_EVENT, onPlan);
  }, []);

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const firstBad = (Object.keys(errs) as (keyof Values)[])[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitLead(siteConfig.leadEndpoint, {
        source: "form",
        name: values.name.trim(),
        brand: values.brand.trim(),
        whatsapp: normaliseIndianMobile(values.whatsapp)!,
        instagram: values.instagram.trim() ? normaliseInstagram(values.instagram)! : undefined,
        plan: plan ?? undefined,
        company: values.company,
      });
      track("form_submitted", { plan: plan ?? "none" });
      setStatus("done");
      requestAnimationFrame(() => {
        successRef.current?.focus();
        if (successRef.current) confettiBurst(successRef.current);
      });
    } catch {
      setStatus("error");
    }
  };

  const describedBy = (k: keyof Values) => (errors[k] ? `contact-${k}-error` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-night section-pad relative overflow-hidden bg-night">
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-night-2 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-accent ring-1 ring-line-night">
            <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-accent" />
            Let&apos;s talk
          </p>
          <h2 id="contact-title" className="h2-size font-extrabold text-on-night">
            <span className="sr-only">Let&apos;s build your store.</span>
            <span aria-hidden="true">
              <SplitWords text="Let's build your store." highlight="your store." tone="night" />
            </span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-on-night-soft">
            Tell us about your brand and we&apos;ll come back on WhatsApp with a free preview plan. No pitch decks, no
            pressure.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3">
            <WhatsAppLink section="contact" message="bookCall" brand={values.brand} className={buttonClass("primary", "sheen-idle text-[17px]")}>
              <WhatsAppIcon className="size-5" /> Book a free call on WhatsApp
            </WhatsAppLink>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-12 items-center gap-2 font-semibold text-on-night underline-offset-4 hover:text-accent hover:underline"
            >
              <Mail className="size-5" aria-hidden="true" /> {contact.email}
            </a>
          </div>

          <p className="mt-8 flex items-center gap-2 text-on-night-soft">
            <Clock className="size-5" aria-hidden="true" /> We reply within {responseHours} hours, Monday to Saturday.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          {status === "done" ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="rounded-[28px] bg-surface p-8 text-center text-ink shadow-lift ring-1 ring-line outline-none sm:p-10"
            >
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-ink">
                <PartyPopper className="size-7" aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-3xl font-extrabold tracking-tight">
                Thanks, {values.name.trim().split(" ")[0]}!
              </p>
              <p className="mt-2 text-lg text-ink-soft">
                {values.brand.trim()} is on our list. We&apos;ll WhatsApp you within {responseHours} hours.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="relative space-y-5 rounded-[28px] bg-surface p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-white/10 sm:p-9 [&_:focus-visible]:outline-support"
            >
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
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-ink-soft">+91</span>
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
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-ink-soft">@</span>
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

              <fieldset>
                <legend className="flex w-full items-baseline justify-between font-medium">
                  Which plan are you leaning towards?
                  <span className="text-sm font-normal text-ink-soft">Optional</span>
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PLAN_CHOICES.map((c) => {
                    const on = plan === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setPlan(on ? null : c)}
                        className={`inline-flex min-h-12 items-center gap-1.5 rounded-full px-4 font-medium ring-2 ring-inset transition-[scale,background-color] duration-200 active:scale-[0.97] ${
                          on ? "bg-ink text-on-night ring-ink" : "bg-surface ring-line hover:ring-ink/40"
                        }`}
                      >
                        {on && <Check className="size-4 text-accent" aria-hidden="true" />}
                        {c}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-2xl bg-[#C2410C]/10 p-4 font-medium text-[#C2410C]">
                  Couldn&apos;t send that, sorry. Please WhatsApp us instead, we reply fast.
                </p>
              )}

              <Button type="submit" disabled={status === "sending"} className="w-full text-[17px]">
                {status === "sending" ? "Sending…" : "Get my free preview plan"}
              </Button>
              <p className="text-center text-sm text-ink-soft">No spam. We only message you about your store.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
