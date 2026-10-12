import type { ReactNode } from "react";

/** A slim phone frame (9:19.5) that holds a screenshot or video. Purely presentational. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[9/19.5] w-full max-w-[280px] rounded-[40px] bg-[#05070a] p-[9px] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/10 ${className}`}>
      <div className="relative h-full overflow-hidden rounded-[32px] bg-surface-2">
        <div aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-[18px] w-20 -translate-x-1/2 rounded-full bg-[#05070a]" />
        {children}
      </div>
    </div>
  );
}

/** Shimmer-free skeleton of a store homepage, shown until the real screenshot is uploaded. */
export function StoreSkeleton({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="flex h-full flex-col gap-3 px-4 pb-4 pt-10">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-fg/10" />
        <div className="size-4 rounded bg-fg/10" />
      </div>
      <div className="grid h-36 place-items-center rounded-2xl bg-fg/[0.06]">
        <span className="font-display text-xl font-semibold tracking-[-0.03em] text-fg-3">{label}</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2.5">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="aspect-[4/5] rounded-xl bg-fg/[0.06]" />
            <div className="h-2 w-3/4 rounded bg-fg/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
