import type { ComponentProps } from "react";

type Variant = "primary" | "ghost-night" | "secondary" | "dark";

const base =
  "group/btn btn-sheen inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-base font-semibold " +
  "transition-[translate,scale,box-shadow,background-color,color] duration-200 ease-brand select-none " +
  "active:scale-[0.97] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Navy on lime: 13.9:1. Lime glow grows on hover.
  primary:
    "bg-accent text-accent-ink shadow-[0_10px_30px_-10px_rgb(var(--accent-rgb)/0.65)] hover:bg-accent-hover hover:shadow-[0_14px_40px_-8px_rgb(var(--accent-rgb)/0.8)]",
  // Outline button for dark bands.
  "ghost-night": "text-on-night ring-1 ring-inset ring-line-night hover:bg-night-2 hover:ring-on-night-soft/50",
  secondary: "bg-surface text-ink ring-1 ring-inset ring-line shadow-soft hover:shadow-lift",
  dark: "bg-ink text-on-night shadow-soft hover:shadow-lift",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}
