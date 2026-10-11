/** Contact-form validation helpers. */


/** Accepts "98765 43210", "+91 98765-43210", "098765..." and returns 10 digits, or null. */
export function normaliseIndianMobile(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

/** "@my.brand" or an instagram.com URL → "my.brand", or null if it can't be a handle. */
export function normaliseInstagram(input: string): string | null {
  const s = input
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/.*$/, "");
  return /^[A-Za-z0-9._]{1,30}$/.test(s) ? s : null;
}
