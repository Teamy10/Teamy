import type { ServiceIcon } from "@/content/site";

/*
 * Small custom icons for the services bento. Each has one moving part (class ia-*), which plays
 * once when the tile is revealed and again on hover / focus (CSS in globals.css). Transform and
 * opacity only. Strokes use currentColor; the accent marks the moving part.
 */

const common = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "icon-anim size-12",
  "aria-hidden": true,
};

function Storefront() {
  return (
    <svg {...common}>
      <path d="M8 18h32l-3-8H11z" />
      <path d="M10 18v20h28V18" />
      <path d="M20 38V28h8v10" />
      <path d="M14 18c0 2.5 2 4 4 4s4-1.5 4-4c0 2.5 2 4 4 4s4-1.5 4-4c0 2.5 2 4 4 4" />
      <path className="ia-pop" d="M36 5l1.2 2.8L40 9l-2.8 1.2L36 13l-1.2-2.8L32 9l2.8-1.2z" fill="var(--accent)" stroke="none" />
    </svg>
  );
}

function Checkout() {
  return (
    <svg {...common}>
      <rect x="6" y="12" width="36" height="24" rx="4" />
      <path d="M6 19h36" />
      <rect x="12" y="26" width="16" height="6" rx="3" />
      <circle className="ia-slide" cx="15" cy="29" r="2.2" fill="var(--accent)" stroke="none" style={{ ["--slide" as string]: "10px" }} />
    </svg>
  );
}

function WhatsApp() {
  return (
    <svg {...common}>
      <path d="M10 34l2-6a14 14 0 1 1 6 6z" />
      <circle className="ia-pop" cx="18" cy="22" r="1.6" fill="var(--accent)" stroke="none" style={{ animationDelay: "0s" }} />
      <circle className="ia-pop" cx="24" cy="22" r="1.6" fill="var(--accent)" stroke="none" style={{ animationDelay: "0.12s" }} />
      <circle className="ia-pop" cx="30" cy="22" r="1.6" fill="var(--accent)" stroke="none" style={{ animationDelay: "0.24s" }} />
    </svg>
  );
}

function Cart() {
  return (
    <svg {...common}>
      <path d="M6 10h5l4 18h20l4-12H14" />
      <circle cx="18" cy="35" r="2" />
      <circle cx="32" cy="35" r="2" />
      <path className="ia-slide" d="M30 8l-5 4 5 4" stroke="var(--accent)" style={{ ["--slide" as string]: "-6px" }} />
    </svg>
  );
}

function Agent() {
  return (
    <svg {...common}>
      <path d="M12 8h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H19l-7 6v-6a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" />
      <path d="M15 17h14" />
      <path d="M15 22h8" />
      <path className="ia-pop" d="M40 29l1.4 3.2 3.2 1.4-3.2 1.4L40 38.2l-1.4-3.2-3.2-1.4 3.2-1.4z" fill="var(--accent)" stroke="none" />
    </svg>
  );
}

function Analytics() {
  return (
    <svg {...common}>
      <path d="M8 40h32" />
      <rect className="ia-rise" x="11" y="26" width="5" height="12" rx="1.5" />
      <rect className="ia-rise" x="21.5" y="18" width="5" height="20" rx="1.5" style={{ animationDelay: "0.1s" }} />
      <rect className="ia-rise" x="32" y="11" width="5" height="27" rx="1.5" fill="var(--accent)" stroke="var(--accent)" style={{ animationDelay: "0.2s" }} />
    </svg>
  );
}

function Drops() {
  return (
    <svg {...common}>
      <g className="ia-ring" style={{ transformOrigin: "24px 9px" }}>
        <path d="M14 32V22a10 10 0 0 1 20 0v10l3 4H11z" />
        <path d="M21 39a3 3 0 0 0 6 0" />
      </g>
      <circle cx="35" cy="12" r="3" fill="var(--accent)" stroke="none" className="ia-pop" />
    </svg>
  );
}

const map: Record<ServiceIcon, () => React.ReactElement> = {
  storefront: Storefront,
  checkout: Checkout,
  whatsapp: WhatsApp,
  cart: Cart,
  agent: Agent,
  analytics: Analytics,
  drops: Drops,
};

export function AnimatedIcon({ name }: { name: ServiceIcon }) {
  const Icon = map[name];
  return <Icon />;
}
