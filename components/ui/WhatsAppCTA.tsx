"use client";

import type { ComponentProps } from "react";
import { trackLead } from "@/lib/analytics";
import { buildWhatsAppLink, whatsAppMessage, type WhatsAppMessageKey } from "@/lib/whatsapp";

type Props = Omit<ComponentProps<"a">, "href"> & {
  /** Where on the site this CTA is, sent with the Lead event (e.g. "hero", "pricing"). */
  source: string;
  /** A message key from content/site.ts → whatsappMessages… */
  message?: WhatsAppMessageKey;
  /** …or a ready-made message. */
  text?: string;
  /** Values for {placeholders} in the message. */
  vars?: Record<string, string>;
};

/** Every "Book a free call" / "Get a free preview" / "Talk to us" button: opens WhatsApp, fires a Lead event. */
export function WhatsAppCTA({ source, message = "default", text, vars, onClick, ...props }: Props) {
  const href = buildWhatsAppLink(text ?? whatsAppMessage(message, vars));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(e) => {
        trackLead(source);
        onClick?.(e);
      }}
    />
  );
}
