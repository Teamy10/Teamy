import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "header" | "ul" | "ol" | "p" | "section";
  id?: string;
};

/**
 * Reveal-on-scroll wrapper. Pure CSS driven by one shared observer (RevealObserver): fade-up by
 * default, or masked word reveals for headings inside it (`.reveal-mask`). No JS animation library.
 */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div", id }: Props) {
  return (
    <Tag id={id} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
