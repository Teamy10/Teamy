import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DOT, LOGO_VIEWBOX, WORD_PATH } from "@/components/brand/logoPaths";
import { siteConfig } from "@/site.config";

export const alt = `${siteConfig.brand}: online stores for D2C brands`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
          justifyContent: "center",
          padding: "0 96px",
          background: "#0E1726",
          backgroundImage: "radial-gradient(circle at 88% 12%, rgba(200,242,90,0.22), transparent 45%)",
          color: "#FFFFFF",
          fontFamily: "Bricolage",
        }}
      >
        <svg width={vw * 0.7} height={vh * 0.7} viewBox={LOGO_VIEWBOX}>
          <path fill="#FFFFFF" d={WORD_PATH} />
          <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill="#C8F25A" />
        </svg>
        <div style={{ marginTop: 56, fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, display: "flex", flexWrap: "wrap" }}>
          <span>Stores that&nbsp;</span>
          <span style={{ color: "#C8F25A" }}>sell</span>
          <span>&nbsp;while you sleep.</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#A8B3C7" }}>
          {`${siteConfig.tagline} Designed, built and run for you · teamy.in`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: regular, weight: 400, style: "normal" },
        { name: "Bricolage", data: black, weight: 800, style: "normal" },
      ],
    },
  );
}
