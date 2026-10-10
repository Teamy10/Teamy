/** Tiny one-shot confetti burst on a throwaway canvas. No dependencies. */
export function confettiBurst(origin: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = origin.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:60";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const colors = ["#C8F25A", "#0E1726", "#3B5BDB", "#FFFFFF", "#B8E63F"];
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const bits = Array.from({ length: 70 }, () => {
    const a = Math.random() * Math.PI * 2;
    const v = 4 + Math.random() * 7;
    return {
      x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5,
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
      w: 6 + Math.random() * 6, h: 4 + Math.random() * 4,
      c: colors[(Math.random() * colors.length) | 0],
    };
  });

  const start = performance.now();
  const frame = (t: number) => {
    const life = (t - start) / 1600;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalAlpha = Math.max(0, 1 - life * life);
    for (const b of bits) {
      b.vy += 0.25;
      b.vx *= 0.985;
      b.x += b.vx;
      b.y += b.vy;
      b.r += b.vr;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.r);
      ctx.fillStyle = b.c;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      ctx.restore();
    }
    if (life < 1) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
