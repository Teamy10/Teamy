"use client";

import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** An <a> that fires an analytics event on click. */
export function TrackedLink({
  event,
  params,
  onClick,
  ...props
}: ComponentProps<"a"> & { event: AnalyticsEvent; params?: Record<string, string> }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    />
  );
}
