import type { ReactNode } from "react";

// Error text #ff8f85 is 8:1 on the card surface.
export const fieldClass =
  "w-full rounded-xl bg-surface-2 px-4 text-base text-fg ring-1 ring-inset ring-line-strong outline-none transition-shadow placeholder:text-fg-3 focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#ff8f85]";
export const inputClass = `h-14 ${fieldClass}`;

/** A labelled form field with an optional hint and an error line (linked via `${id}-error`). */
export function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-[15px] font-medium text-fg">
        {label}
        {hint && <span className="label-mono text-fg-3">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-[#ff8f85]">
          {error}
        </p>
      )}
    </div>
  );
}
