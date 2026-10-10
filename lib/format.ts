const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const plain = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹1,00,000 style. */
export function formatINR(value: number): string {
  return inr.format(Math.round(value));
}

/** 1,00,000 style without the symbol. */
export function formatIndian(value: number): string {
  return plain.format(Math.round(value));
}

/** "₹2.4 lakh", "₹1.2 crore", or ₹45,000 below a lakh. */
export function formatLakh(value: number): string {
  const v = Math.round(value);
  const abs = Math.abs(v);
  const trim = (n: number) => (Math.round(n * 10) / 10).toString().replace(/\.0$/, "");
  if (abs >= 1_00_00_000) return `₹${trim(v / 1_00_00_000)} crore`;
  if (abs >= 1_00_000) return `₹${trim(v / 1_00_000)} lakh`;
  return formatINR(v);
}
