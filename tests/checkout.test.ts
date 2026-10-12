import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "../content/site";
import { checkoutTotal, normalisePhone, validateCheckout } from "../lib/checkout";
import { checkoutLinked, isValidPaymentSignature, paymentsMode } from "../lib/razorpay";

const good = { name: "Asha Verma", brand: "Kesar Threads", email: "Asha@Example.com ", phone: "98765 43210", agree: true };

describe("checkout form", () => {
  it("accepts good details and normalises them", () => {
    const r = validateCheckout(good);
    expect(r).toEqual({ ok: true, details: { name: "Asha Verma", brand: "Kesar Threads", email: "asha@example.com", phone: "+919876543210" } });
  });
  it("names every bad field", () => {
    const r = validateCheckout({ name: "A", brand: "", email: "nope", phone: "123", agree: false });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(["agree", "brand", "email", "name", "phone"]);
  });
  it("needs the terms ticked: a truthy string is not enough", () => {
    expect(validateCheckout({ ...good, agree: "true" }).ok).toBe(false);
  });
  it("reads Indian mobiles in every common form, and other countries with +", () => {
    expect(normalisePhone("9876543210")).toBe("+919876543210");
    expect(normalisePhone("+91 98765-43210")).toBe("+919876543210");
    expect(normalisePhone("098765 43210")).toBe("+919876543210");
    expect(normalisePhone("+44 20 7946 0958")).toBe("+442079460958");
    expect(normalisePhone("12345")).toBeNull();
    expect(normalisePhone("5876543210")).toBeNull();
  });
});

describe("checkout total", () => {
  it("is the starter price, with no GST by default", () => {
    expect(checkoutTotal()).toEqual({ amount: siteConfig.plan.price, gst: 0, total: siteConfig.plan.price });
  });
  it("adds GST in whole rupees when set", () => {
    expect(checkoutTotal({ amount: 8999, gstPercent: 18 })).toEqual({ amount: 8999, gst: 1620, total: 10619 });
  });
});

describe("Razorpay", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("checks Checkout's signature: HMAC-SHA256 of order|payment", () => {
    const sig = "6c343620f1910da483982cf25b9dc33d709afdd25930f08964ef60b65aefa831";
    expect(isValidPaymentSignature("order_123", "pay_456", sig, "test_secret")).toBe(true);
    expect(isValidPaymentSignature("order_999", "pay_456", sig, "test_secret")).toBe(false);
    expect(isValidPaymentSignature("order_123", "pay_456", sig, "other_secret")).toBe(false);
    expect(isValidPaymentSignature("order_123", "pay_456", "short", "test_secret")).toBe(false);
    expect(isValidPaymentSignature("order_123", "pay_456", sig, "")).toBe(false);
  });

  it("is off without both keys, and reads test or live from the key id", () => {
    vi.stubEnv("RAZORPAY_KEY_ID", "");
    vi.stubEnv("RAZORPAY_KEY_SECRET", "");
    expect(paymentsMode()).toBe("off");
    vi.stubEnv("RAZORPAY_KEY_ID", "rzp_test_abc");
    expect(paymentsMode()).toBe("off");
    vi.stubEnv("RAZORPAY_KEY_SECRET", "s3cret");
    expect(paymentsMode()).toBe("test");
    vi.stubEnv("RAZORPAY_KEY_ID", "rzp_live_abc");
    expect(paymentsMode()).toBe("live");
    vi.stubEnv("RAZORPAY_KEY_ID", "not_a_key");
    expect(paymentsMode()).toBe("off");
  });

  it("never links real visitors to a test checkout", () => {
    vi.stubEnv("RAZORPAY_KEY_SECRET", "s3cret");
    vi.stubEnv("RAZORPAY_KEY_ID", "rzp_test_abc");
    vi.stubEnv("VERCEL_ENV", "production");
    expect(checkoutLinked()).toBe(false);
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(checkoutLinked()).toBe(true);
    vi.stubEnv("RAZORPAY_KEY_ID", "rzp_live_abc");
    vi.stubEnv("VERCEL_ENV", "production");
    expect(checkoutLinked()).toBe(true);
  });
});
