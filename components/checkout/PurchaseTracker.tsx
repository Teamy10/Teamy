"use client";

import { useEffect } from "react";
import { trackCheckout } from "@/lib/analytics";

/** Sends the purchase event once per payment, even if the success page is reloaded. */
export function PurchaseTracker({ paymentId, value }: { paymentId: string; value: number }) {
  useEffect(() => {
    const key = `teamy-purchase-${paymentId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: track anyway */
    }
    trackCheckout("purchase", value, paymentId);
  }, [paymentId, value]);
  return null;
}
