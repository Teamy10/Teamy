/**
 * Runs `cb` once the page has loaded and the browser is idle (or after `timeout` ms at most).
 * Used to keep decorative effects and the motion library off the critical path.
 * Returns a cancel function.
 */
export function afterIdle(cb: () => void, timeout = 2500): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = () => !cancelled && cb();
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(run, { timeout });
    else timer = setTimeout(run, 1200); // Safari
  };
  const onLoad = () => schedule();
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", onLoad, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", onLoad);
    if (idleId !== undefined && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
    if (timer) clearTimeout(timer);
  };
}
