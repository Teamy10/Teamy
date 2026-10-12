"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, fieldClass, inputClass } from "@/components/ui/Field";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { isFilled, siteConfig } from "@/content/site";
import { track } from "@/lib/analytics";
import { buildWhatsAppLink, openWhatsApp, reviewMessage } from "@/lib/whatsapp";

type Values = { name: string; role: string; brand: string; review: string; agree: boolean };
type Errors = Partial<Record<keyof Values | "rating", string>>;

const MAX = 500;

function validate(v: Values, rating: number): Errors {
  const e: Errors = {};
  if (!rating) e.rating = "Pick a rating from 1 to 5 stars.";
  if (v.review.trim().length < 20) e.review = "A sentence or two, please.";
  if (!v.name.trim()) e.name = "Your name, as it should appear.";
  if (!v.role.trim()) e.role = "For example Founder, or Head of Marketing.";
  if (!v.brand.trim()) e.brand = "Your brand or business.";
  if (!v.agree) e.agree = "We need your OK to show your review.";
  return e;
}

/**
 * A client writes their own review and sends it to Teamy on WhatsApp, with their consent in the
 * message. Nothing is stored here: Teamy adds it to content/testimonials.ts from the chat.
 */
export function ReviewForm({ brand = "", name = "" }: { brand?: string; name?: string }) {
  const [values, setValues] = useState<Values>({ name, role: "", brand, review: "", agree: false });
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const t = e.target;
    const value = t instanceof HTMLInputElement && t.type === "checkbox" ? t.checked : t.value;
    setValues((v) => ({ ...v, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  // Synchronous on purpose: opening WhatsApp must happen inside the submit, or popup blockers step in.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values, rating);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    track("review_submitted", { rating });
    const v = { rating, name: values.name.trim(), role: values.role.trim(), brand: values.brand.trim(), review: values.review.trim() };
    openWhatsApp(buildWhatsAppLink(reviewMessage(v)));
    setSent(true);
  };

  const describedBy = (k: keyof Errors) => (errors[k] ? `review-${k}-error` : undefined);
  const field = (k: "name" | "role" | "brand") => ({
    id: `review-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    maxLength: 80,
    "aria-invalid": !!errors[k],
    "aria-describedby": describedBy(k),
    className: inputClass,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative space-y-6 rounded-[28px] p-6 sm:p-10">
      <fieldset aria-describedby={describedBy("rating")}>
        <legend className="text-[15px] font-medium text-fg">Your rating</legend>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="grid size-12 cursor-pointer place-items-center rounded-xl has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent"
            >
              <input type="radio" name="rating" value={n} checked={rating === n} onChange={() => { setRating(n); setErrors((er) => ({ ...er, rating: undefined })); }} className="sr-only" />
              <Star className={`size-8 ${n <= rating ? "fill-accent text-accent" : "text-fg-3"}`} aria-hidden="true" />
              <span className="sr-only">
                {n} star{n > 1 ? "s" : ""}
              </span>
            </label>
          ))}
        </div>
        {errors.rating && (
          <p id="review-rating-error" className="mt-2 text-sm font-medium text-[#ff8f85]">
            {errors.rating}
          </p>
        )}
      </fieldset>
      <Field id="review-review" label="Your review" hint={`${values.review.length}/${MAX}`} error={errors.review}>
        <textarea
          id="review-review"
          name="review"
          value={values.review}
          onChange={set("review")}
          maxLength={MAX}
          rows={5}
          placeholder="What was it like working with Teamy? What changed for your brand?"
          aria-invalid={!!errors.review}
          aria-describedby={describedBy("review")}
          className={`${fieldClass} min-h-36 resize-y py-3.5`}
        />
      </Field>
      <Field id="review-name" label="Your name" error={errors.name}>
        <input {...field("name")} autoComplete="name" />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="review-role" label="Your role" error={errors.role}>
          <input {...field("role")} autoComplete="organization-title" placeholder="Founder" />
        </Field>
        <Field id="review-brand" label="Brand" error={errors.brand}>
          <input {...field("brand")} autoComplete="organization" />
        </Field>
      </div>
      <div>
        <label className="flex cursor-pointer gap-3 text-[15px] leading-relaxed text-fg-2">
          <input
            type="checkbox"
            name="agree"
            checked={values.agree}
            onChange={set("agree")}
            aria-invalid={!!errors.agree}
            aria-describedby={describedBy("agree")}
            className="mt-1 size-5 shrink-0 accent-[var(--accent)]"
          />
          <span>
            {siteConfig.brand} can show this review, with my name, role and brand, on its website.
          </span>
        </label>
        {errors.agree && (
          <p id="review-agree-error" className="mt-2 text-sm font-medium text-[#ff8f85]">
            {errors.agree}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full">
        <WhatsAppIcon className="size-5" /> Send my review on WhatsApp
      </Button>
      <div className="text-center text-sm text-fg-3" aria-live="polite">
        {sent ? (
          <p className="text-[15px] text-fg-2">
            <strong className="text-fg">Thank you!</strong> WhatsApp is open with your review: tap send. Want your photo on it? Send
            it in the same chat.
            {isFilled(siteConfig.facts.reviewsUrl) && (
              <>
                {" "}
                <a href={siteConfig.facts.reviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-fg underline underline-offset-4">
                  Post it on Google too <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </>
            )}
          </p>
        ) : (
          <p>It opens WhatsApp with your review written out, ready to send.</p>
        )}
      </div>
    </form>
  );
}
