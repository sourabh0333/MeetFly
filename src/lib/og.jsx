import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The social preview image (1200 × 630) every page shares: what LinkedIn, X, WhatsApp or Slack
// show for a link. Same look as the site: off-white page, soft violet and lime glows, the MeetFly
// icon and name, the page's pill, a big two-line headline (the second line violet with a lime
// highlighter, like the page heroes) and a footer line. Fonts: Outfit (OFL), in src/assets/fonts,
// because the image renderer needs .ttf files.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// `small`: a long single headline (a guide's title) in smaller type, with no first line.
export async function ogImage({ tag, top, mark, small = false }) {
  // Literal paths, so the build only traces these three files (a dynamic path traces the project).
  const [medium, bold, icon] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Outfit-Medium.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Outfit-Bold.ttf")),
    readFile(join(process.cwd(), "public/brand/icon.svg")),
  ]);
  const iconSrc = `data:image/svg+xml;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#fbfbf8",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(143,116,255,0.28), transparent 42%), radial-gradient(circle at 92% 88%, rgba(212,255,58,0.42), transparent 40%)",
          fontFamily: "Outfit",
          color: "#0b0a14",
        }}
      >
        {/* Brand and the page's pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={iconSrc} width={64} height={64} alt="" />
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>MeetFly</span>
          </div>
          <span
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#ffffff",
              border: "2px solid #e6e4ef",
              color: "#5b2eff",
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        </div>

        {/* The headline */}
        <div style={{ display: "flex", flexDirection: "column", fontWeight: 700, fontSize: small ? 62 : 84, lineHeight: small ? 1.1 : 1.02, letterSpacing: small ? -2 : -3, ...(small ? { maxWidth: 1000 } : {}) }}>
          {top && <span>{top}</span>}
          <span style={{ display: "flex" }}>
            <span
              style={{
                color: small ? "#0b0a14" : "#5b2eff",
                padding: small ? 0 : "0 8px",
                // The highlighter only reads well on one short line; long titles go without it.
                ...(small ? {} : { backgroundImage: "linear-gradient(transparent 62%, #d4ff3a 62%)" }),
              }}
            >
              {mark}
            </span>
          </span>
        </div>

        {/* Footer line */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 500, color: "#5d5b6b" }}>
          <span>AI copilot for every call</span>
          <span style={{ color: "#5b2eff" }}>·</span>
          <span>Mac and Windows</span>
          <span style={{ color: "#5b2eff" }}>·</span>
          <span>7 days free</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Outfit", data: medium, style: "normal", weight: 500 },
        { name: "Outfit", data: bold, style: "normal", weight: 700 },
      ],
    },
  );
}
