import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "MyTools Formatter";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(120deg, #0f172a 0%, #14532d 45%, #0b3b6f 100%)",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, opacity: 0.88 }}>MyTools Formatter Hub</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 740 }}>
            <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>{name}</div>
            <div style={{ fontSize: 30, opacity: 0.9 }}>Format, Minify, Validate with line-aware errors</div>
          </div>
          <div style={{ fontSize: 24, opacity: 0.85 }}>mytools.local</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
