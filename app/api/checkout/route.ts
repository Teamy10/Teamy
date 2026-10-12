import { siteConfig } from "@/content/site";
import { checkoutTotal, validateCheckout } from "@/lib/checkout";
import { createOrder, paymentsMode, publicKeyId } from "@/lib/razorpay";

/**
 * POST /api/checkout: checks the customer's details and creates a Razorpay order for the starter
 * store. The amount always comes from content/site.ts, never from the browser.
 */
export async function POST(request: Request) {
  if (paymentsMode() === "off") return Response.json({ error: "Online payment isn't set up yet." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }
  // A hidden field people never see, so never fill in. Bots do.
  if (body.website) return Response.json({ error: "Something went wrong. Please try again." }, { status: 400 });

  const checked = validateCheckout(body);
  if (!checked.ok) return Response.json({ errors: checked.errors }, { status: 422 });
  const { name, brand, email, phone } = checked.details;

  try {
    const order = await createOrder({
      amount: checkoutTotal().total * 100,
      receipt: `teamy-${Date.now().toString(36)}`,
      notes: { plan: siteConfig.plan.name, name, brand, email, phone },
    });
    return Response.json({
      keyId: publicKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      prefill: { name, email, contact: phone },
    });
  } catch (e) {
    console.error("[checkout] couldn't create order", e);
    return Response.json({ error: "We couldn't start the payment. Please try again, or message us on WhatsApp." }, { status: 502 });
  }
}
