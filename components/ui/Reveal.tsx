import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "header";
};

/**
 * Fade + 16px rise, once, at ~20% visibility. Pure CSS + one shared observer
 * (RevealObserver), so it costs no animation library in the initial bundle.
 */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: Props) {
  return (
    <Tag className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
