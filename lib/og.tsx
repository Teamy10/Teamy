import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DOT, LOGO_VIEWBOX, WORD_PATH } from "@/components/brand/logoPaths";

/** The Bricolage OG fonts have no ₹ glyph, so the rupee sign is drawn instead. */
function Rupee() {
  return (
    <svg width="16" height="24" viewBox="0 0 14 21" style={{ marginRight: 3 }}>
      <path d="M2 2h10M2 6.5h10M4 2c7 0 7 9.5-1 9.5L11 19" fill="none" stroke="#A7AEBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200×630 share card: near-black, lime signal, wordmark, page title and a mono kicker. */
export async function renderOg({ title, kicker, footer = "450+ projects · 4.9/5 client rating · teamy.in" }: { title: string; kicker: string; footer?: string }) {
  const dir = join(process.cwd(), "assets/fonts");
  const [regular, black] = await Promise.all([
    readFile(join(dir, "bricolage-grotesque-latin-400-normal.woff")),
    readFile(join(dir, "bricolage-grotesque-latin-800-normal.woff")),
  ]);
  const [, , vw, vh] = LOGO_VIEWBOX.split(" ").map(Number);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#0A0B0F",
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(200,242,90,0.16), transparent 45%)",
          color: "#F3F5F8",
          fontFamily: "Bricolage",
        }}
      >
        <svg width={vw * 0.55} height={vh * 0.55} viewBox={LOGO_VIEWBOX}>
          <path fill="#F3F5F8" d={WORD_PATH} />
          <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill="#C8F25A" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#C8F25A" }}>{kicker}</div>
          <div style={{ marginTop: 20, fontSize: title.length > 48 ? 64 : 76, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.04 }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: "#A7AEBB" }}>
          {footer.split("₹").map((part, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <Rupee />}
              {part}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: regular, weight: 400, style: "normal" },
        { name: "Bricolage", data: black, weight: 800, style: "normal" },
      ],
    },
  );
}
