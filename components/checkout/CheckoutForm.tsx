"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { siteConfig } from "@/content/site";
import { trackCheckout } from "@/lib/analytics";
import { validateCheckout, type CheckoutErrors, type CheckoutField } from "@/lib/checkout";
import { formatINR } from "@/lib/format";

type RazorpaySuccess = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
type RazorpayFailure = { error: { description?: string } };
type RazorpayCheckout = { open: () => void; on: (event: "payment.failed", cb: (r: RazorpayFailure) => void) => void };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}

type Values = { name: string; brand: string; email: string; phone: string; agree: boolean; website: string };

const LABELS: Record<"idle" | "starting" | "paying" | "confirming", string> = {
  idle: "",
  starting: "Starting your payment…",
  paying: "Complete the payment in the Razorpay window",
  confirming: "Confirming your payment…",
};

/**
 * The details form, then Razorpay's own payment window (UPI, cards, netbanking). The server makes
 * the order and fixes the amount; card and UPI details go to Razorpay only, never to this site.
 */
export function CheckoutForm({ total }: { total: number }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({ name: "", brand: "", email: "", phone: "", agree: false, website: "" });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [status, setStatus] = useState<keyof typeof LABELS>("idle");
  const [message, setMessage] = useState("");
  const [scriptFailed, setScriptFailed] = useState(false);

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: value }));
    if (k in errors) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const showErrors = (errs: CheckoutErrors) => {
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    const checked = validateCheckout(values);
    if (!checked.ok) return showErrors(checked.errors);
    if (!window.Razorpay) {
      setMessage(scriptFailed ? "The payment window couldn't load. Check your connection and refresh the page." : "The payment window is still loading. Try again in a moment.");
      return;
    }
    setStatus("starting");
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) showErrors(data.errors);
        setMessage(data.error ?? "Please check the highlighted details.");
        setStatus("idle");
        return;
      }
      const checkout = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: siteConfig.brand,
        description: siteConfig.checkout.description,
        image: `${window.location.origin}/icon-512.png`,
        prefill: data.prefill,
        theme: { color: "#c8f25a" },
        modal: { confirm_close: true, ondismiss: () => setStatus("idle") },
        handler: (r: RazorpaySuccess) => {
          setStatus("confirming");
          // Our own order id, not the one Checkout echoes back, as Razorpay advises.
          const q = new URLSearchParams({ order: data.orderId, payment: r.razorpay_payment_id, signature: r.razorpay_signature });
          router.push(`/checkout/success?${q}`);
        },
      });
      checkout.on("payment.failed", (r) => setMessage(`That payment didn't go through: ${r.error.description ?? "please try again"}.`));
      checkout.open();
      setStatus("paying");
      trackCheckout("begin", total);
    } catch {
      setMessage("We couldn't start the payment. Check your connection and try again.");
      setStatus("idle");
    }
  };

  const describedBy = (k: CheckoutField) => (errors[k] ? `checkout-${k}-error` : undefined);
  const field = (k: Exclude<CheckoutField, "agree">) => ({
    id: `checkout-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": describedBy(k),
    className: inputClass,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative space-y-6 rounded-[28px] p-6 sm:p-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onError={() => setScriptFailed(true)} />
      <Field id="checkout-name" label="Your name" error={errors.name}>
        <input {...field("name")} autoComplete="name" />
      </Field>
      <Field id="checkout-brand" label="Brand or business name" error={errors.brand}>
        <input {...field("brand")} autoComplete="organization" />
      </Field>
      <Field id="checkout-email" label="Email" hint="for your receipt" error={errors.email}>
        <input {...field("email")} type="email" inputMode="email" autoComplete="email" />
      </Field>
      <Field id="checkout-phone" label="WhatsApp number" hint="for updates" error={errors.phone}>
        <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
      </Field>
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
            I agree to the{" "}
            <a href="/terms" target="_blank" rel="noopener" className="font-semibold text-fg underline underline-offset-4">
              Terms &amp; Conditions
            </a>{" "}
            and the{" "}
            <a href="/refund-policy" target="_blank" rel="noopener" className="font-semibold text-fg underline underline-offset-4">
              Refund &amp; Cancellation Policy
            </a>
            .
          </span>
        </label>
        {errors.agree && (
          <p id="checkout-agree-error" className="mt-2 text-sm font-medium text-[#ff8f85]">
            {errors.agree}
          </p>
        )}
      </div>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="checkout-website">Website</label>
        <input id="checkout-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>
      <Button type="submit" size="lg" disabled={status !== "idle"} className="w-full">
        <Lock className="size-5" aria-hidden="true" /> {status === "idle" ? `Pay ${formatINR(total)} securely` : LABELS[status]}
      </Button>
      <p className="text-center text-sm text-fg-3" aria-live="polite">
        {message ? <span className="font-medium text-[#ff8f85]">{message}</span> : "UPI, cards and netbanking, processed securely by Razorpay."}
      </p>
    </form>
  );
}
