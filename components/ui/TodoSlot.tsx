import type { ReactNode } from "react";

/** Dashed box marking content the owner still has to add. Only rendered in dev (see lib/assets.ts). */
export function TodoSlot({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-dashed border-line-strong p-6 text-fg-3 ${className}`}>
      <p className="label-mono">Placeholder · dev only</p>
      <div className="mt-2 text-fg-2">{children}</div>
    </div>
  );
}
