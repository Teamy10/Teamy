import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Razorpay, server side only. The keys come from RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (see
 * README → "Payments"); the secret never reaches the browser. Test keys (rzp_test_…) move no real
 * money, live keys (rzp_live_…) do.
 */

export type PaymentsMode = "live" | "test" | "off";

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  status: "created" | "attempted" | "paid";
  notes?: Record<string, string>;
};

export type RazorpayPayment = {
  id: string;
  order_id: string | null;
  amount: number;
  currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  email?: string;
};

// Overridable only to test against a local mock (see README → "Payments"). Never set it in Vercel.
const API = (process.env.RAZORPAY_API_BASE || "https://api.razorpay.com/v1").replace(/\/$/, "");

function keys() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim() ?? "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() ?? "";
  return keyId && keySecret ? { keyId, keySecret } : null;
}

/** "off" until both keys are set (or when the key id isn't a Razorpay one); else test or live. */
export function paymentsMode(): PaymentsMode {
  const k = keys();
  if (k?.keyId.startsWith("rzp_live_")) return "live";
  if (k?.keyId.startsWith("rzp_test_")) return "test";
  return "off";
}

/**
 * Whether the site links to /checkout: everywhere with live keys, but with test keys only off
 * production (Vercel previews and local builds), so real visitors never meet a test payment.
 */
export function checkoutLinked(): boolean {
  const mode = paymentsMode();
  return mode === "live" || (mode === "test" && process.env.VERCEL_ENV !== "production");
}

/** The key id Checkout needs in the browser. Public by design; the secret stays here. */
export function publicKeyId(): string | null {
  return keys()?.keyId ?? null;
}

async function call<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  const k = keys();
  if (!k) throw new Error("Razorpay keys are not set");
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${Buffer.from(`${k.keyId}:${k.keySecret}`).toString("base64")}`,
      ...(body !== undefined && { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: { description?: string } };
  if (!res.ok) throw new Error(`Razorpay ${method} ${path} → ${res.status}: ${data.error?.description ?? "no details"}`);
  return data as T;
}

/** A Razorpay order for an amount in paise. `notes` show on the order in the Razorpay Dashboard. */
export function createOrder(o: { amount: number; receipt: string; notes: Record<string, string> }) {
  return call<RazorpayOrder>("POST", "/orders", { amount: o.amount, currency: "INR", receipt: o.receipt, notes: o.notes });
}

export const fetchOrder = (id: string) => call<RazorpayOrder>("GET", `/orders/${encodeURIComponent(id)}`);
export const fetchPayment = (id: string) => call<RazorpayPayment>("GET", `/payments/${encodeURIComponent(id)}`);

/** Checkout's success signature: hex HMAC-SHA256 of "order_id|payment_id", keyed with the key secret. */
export function isValidPaymentSignature(orderId: string, paymentId: string, signature: string, secret = keys()?.keySecret ?? ""): boolean {
  if (!secret || !orderId || !paymentId || !signature) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex"));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export type PaymentCheck = { ok: true; payment: RazorpayPayment; order: RazorpayOrder } | { ok: false; reason: "invalid" | "unconfirmed" };

/**
 * The success page's check: the signature must be genuine, and Razorpay itself must report this
 * payment as authorized or captured, for this order and the expected amount (in paise).
 */
export async function confirmPayment(orderId: string, paymentId: string, signature: string, amount: number): Promise<PaymentCheck> {
  if (!isValidPaymentSignature(orderId, paymentId, signature)) return { ok: false, reason: "invalid" };
  try {
    const [payment, order] = await Promise.all([fetchPayment(paymentId), fetchOrder(orderId)]);
    const received = payment.status === "captured" || payment.status === "authorized";
    const matches = payment.order_id === orderId && payment.amount === amount && order.amount === amount;
    return received && matches ? { ok: true, payment, order } : { ok: false, reason: "unconfirmed" };
  } catch (e) {
    console.error("[checkout] couldn't confirm payment", paymentId, e);
    return { ok: false, reason: "unconfirmed" };
  }
}
