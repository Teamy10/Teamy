import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold select-none " +
  "transition-[background-color,color,box-shadow,scale] duration-[var(--dur-fast)] ease-quart active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  // Lime fill with the theme's ink colour (AA in every theme). Magnetic hover comes from the runtime.
  primary: "bg-accent text-accent-ink shadow-[0_10px_40px_-12px_rgb(var(--accent-rgb)/0.55)] hover:bg-accent-hover",
  // Outline.
  secondary: "text-fg ring-1 ring-inset ring-line-strong hover:bg-fg/[0.04] hover:ring-fg/30",
  // Text with an animated underline.
  ghost: "underline-anim [--u-rest:0.35] !rounded-none !px-1 text-fg hover:text-fg",
};

export function buttonClass(variant: Variant = "primary", extra = "", size: Size = "md") {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, className, size)} data-magnetic={variant === "primary" ? "" : undefined} {...props} />;
}
