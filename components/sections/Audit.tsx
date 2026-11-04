"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { FestiveDivider } from "@/components/festive/Motifs";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { track, trackLead } from "@/lib/analytics";
import { auditRequestMessage, buildWhatsAppLink, openWhatsApp } from "@/lib/whatsapp";

const NO_STORE = "No store yet";

type Values = { url: string; name: string; number: string; platform: string; orders: string; company: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  // A brand with no store yet has no link to send.
  if (!v.url.trim() && v.platform !== NO_STORE) e.url = "Your store's link, like yourbrand.com.";
  if (!v.name.trim()) e.name = "What should we call you?";
  if (v.number.replace(/\D/g, "").length < 10) e.number = "Your WhatsApp number, with 10 digits or more.";
  return e;
}

// The contact form's select look: a chevron, and muted text until something is chosen.
const selectClass = (empty: boolean) =>
  `${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23a7aebb'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_16px_center] bg-no-repeat pr-12 [&_option]:bg-surface [&_option]:text-fg ${empty ? "text-fg-3" : ""}`;

/**
 * The free store audit: the visitor's store link and details go to Teamy on WhatsApp, written out
 * by the same prefill flow as the contact form. Nothing is stored here.
 */
export function Audit() {
  const { title, body, platforms, orders } = siteConfig.audit;
  const [values, setValues] = useState<Values>({ url: "", name: "", number: "", platform: "", orders: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opening">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // If the visitor comes back to this tab (desktop) or the page (phone), let them send again.
  useEffect(() => {
    if (status !== "opening") return;
    const t = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (k === "platform" && errors.url) setErrors((er) => ({ ...er, url: undefined }));
  };

  // Synchronous on purpose: opening a new tab must happen inside the submit, or popup blockers step in.
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
      auditRequestMessage({
        url: values.url.trim(),
        name: values.name.trim(),
        number: values.number.trim(),
        platform: values.platform,
        orders: values.orders,
      }),
    );
    track("form_submitted", { form: "audit" });
    trackLead("audit_form");
    openWhatsApp(url);
  };

  const describedBy = (k: keyof Values) => (errors[k] ? `audit-${k}-error` : undefined);
  const input = (k: "url" | "name" | "number") => ({
    id: `audit-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": describedBy(k),
    className: inputClass,
  });

  return (
    <section id="audit" aria-labelledby="audit-title" className="section-pad cv-auto relative">
      <FestiveDivider />
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="audit-title" title={title} emphasis="of your store." sub={body} />
        </div>

        <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative space-y-6 rounded-[28px] p-6 sm:p-10">
            <Field id="audit-url" label="Store URL" error={errors.url}>
              <input {...input("url")} type="text" inputMode="url" autoComplete="url" placeholder="yourbrand.com" />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="audit-name" label="Your name" error={errors.name}>
                <input {...input("name")} autoComplete="name" />
              </Field>
              <Field id="audit-number" label="WhatsApp number" error={errors.number}>
                <input {...input("number")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" />
              </Field>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="audit-platform" label="Platform">
                <select id="audit-platform" name="platform" value={values.platform} onChange={set("platform")} className={selectClass(!values.platform)}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="audit-orders" label="Orders per month">
                <select id="audit-orders" name="orders" value={values.orders} onChange={set("orders")} className={selectClass(!values.orders)}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {orders.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Honeypot: hidden from people, tempting to bots. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="audit-company">Company</label>
              <input id="audit-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
            </div>

            <Button type="submit" size="lg" disabled={status === "opening"} className="w-full">
              <WhatsAppIcon className="size-5" />
              {status === "opening" ? "Opening WhatsApp…" : "Send me my free audit"}
            </Button>
            <p className="text-center text-sm text-fg-3" aria-live="polite">
              {status === "opening"
                ? "Your message is ready in WhatsApp. Just press send."
                : "This opens WhatsApp with your details filled in. Nothing is sent until you press send."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
