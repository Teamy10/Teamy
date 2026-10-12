"use client";

import type { ComponentProps } from "react";
import { trackLead } from "@/lib/analytics";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type Props = Omit<ComponentProps<"a">, "href"> & {
  /** Where on the site this CTA is, sent with the Lead event (e.g. "hero", "pricing"). */
  source: string;
  /** Pre-filled text instead of WHATSAPP_MESSAGE (e.g. with a payment ID). */
  message?: string;
};

/**
 * Every contact button and link ("Book a free call", "Contact", "Let's talk"…): opens a WhatsApp
 * chat with Teamy in a new tab, pre-filled with WHATSAPP_MESSAGE, and fires a Lead event.
 */
export function WhatsAppCTA({ source, message, onClick, children, ...props }: Props) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(e) => {
        trackLead(source);
        onClick?.(e);
      }}
    >
      {children}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
