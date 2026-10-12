import { siteConfig } from "@/content/site";

/**
 * The checkout form, checked the same way in the browser (instant feedback) and on the server
 * (the check that counts). No secrets here: this file is shared with the client.
 */
export type CheckoutDetails = { name: string; brand: string; email: string; phone: string };
export type CheckoutField = keyof CheckoutDetails | "agree";
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

/** What checkout charges, in whole rupees: the amount, plus GST when `gstPercent` is set. */
export function checkoutTotal({ amount, gstPercent }: { amount: number; gstPercent: number } = siteConfig.checkout) {
  const total = Math.round((amount * (100 + gstPercent)) / 100);
  return { amount, gst: total - amount, total };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** An Indian mobile (98765 43210, +91 …, 0…) as +91XXXXXXXXXX, or another country's number written with "+". */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`;
  if (/^(?:91|0)[6-9]\d{9}$/.test(digits)) return `+91${digits.slice(-10)}`;
  if (raw.trim().startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  return null;
}

export function validateCheckout(input: Record<string, unknown>): { ok: true; details: CheckoutDetails } | { ok: false; errors: CheckoutErrors } {
  const text = (key: string) => (typeof input[key] === "string" ? (input[key] as string).trim() : "");
  const name = text("name");
  const brand = text("brand");
  const email = text("email").toLowerCase();
  const phone = normalisePhone(text("phone"));
  const errors: CheckoutErrors = {};
  if (name.length < 2 || name.length > 80) errors.name = "Enter your full name.";
  if (brand.length < 1 || brand.length > 80) errors.brand = "Enter your brand or business name.";
  if (!EMAIL.test(email) || email.length > 120) errors.email = "Enter a valid email address.";
  if (!phone) errors.phone = "Enter a valid mobile number, e.g. 98765 43210.";
  if (input.agree !== true) errors.agree = "Please accept the terms and the refund policy.";
  return phone && Object.keys(errors).length === 0 ? { ok: true, details: { name, brand, email, phone } } : { ok: false, errors };
}
