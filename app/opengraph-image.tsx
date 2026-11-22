import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Rylan Hayes — Neon Porch Lights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0e0f",
          color: "#f4ecdd",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(900px 520px at 78% 12%, rgba(217,169,108,0.30), rgba(11,14,15,0) 62%), radial-gradient(700px 500px at 8% 100%, rgba(138,74,48,0.32), rgba(11,14,15,0) 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 8,
            display: "flex",
            background: "#d9a96c",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#d9a96c",
            }}
          >
            Nashville, Tennessee
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            RYLAN HAYES
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", fontSize: 34, color: "#d9a96c", letterSpacing: 2 }}>
              NEW ALBUM
            </div>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 600, letterSpacing: -1 }}>
              Neon Porch Lights
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "rgba(244,236,221,0.68)" }}>
              Out now everywhere — {site.url.replace(/^https?:\/\//, "")}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 132,
              height: 132,
              borderRadius: 999,
              border: "3px solid rgba(217,169,108,0.7)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 46,
                height: 46,
                background: "#d9a96c",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
