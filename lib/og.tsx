import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROWS } from "@/components/crystal";

export const OG_SIZE = { width: 1200, height: 630 };

export const PAPER = "#f8f9fa";
export const SHEET = "#ffffff";
export const INK = "#202122";
export const SOFT = "#54595d";
export const FAINT = "#72777d";
export const RULE = "#a2a9b1";
export const RULE_SOFT = "#c8ccd1";
export const TAB = "#a7d7f9";
export const ACCENT = "#0f7c86";
export const ACCENT_TEXT = "#0a5f67";

const SHADE: Record<string, string> = {
  ":": "#79b9bf",
  "-": "#3b979f",
  "=": ACCENT,
  "+": ACCENT_TEXT,
};

const COLS = Math.max(...ROWS.map((r) => r.length));

function runs(row: string) {
  const out: { ch: string; text: string }[] = [];
  for (const ch of row) {
    const last = out[out.length - 1];
    if (last && last.ch === ch) last.text += ch;
    else out.push({ ch, text: ch });
  }
  return out;
}

export function AsciiCrystal({ fontSize }: { fontSize: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "CommitMono",
        fontSize,
        lineHeight: 1,
        whiteSpace: "pre",
      }}
    >
      {ROWS.map((row, i) => (
        <div key={i} style={{ display: "flex", height: fontSize * 0.95 }}>
          {runs(row).map((r, j) => (
            <span key={j} style={{ color: SHADE[r.ch] ?? "transparent" }}>
              {r.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function CrystalBitmap({ px }: { px: number }) {
  const w = px / Math.max(COLS, ROWS.length * 2);
  const h = w * 2;
  const x0 = (px - COLS * w) / 2;
  const y0 = (px - ROWS.length * h) / 2;
  return (
    <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`}>
      {ROWS.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === " " ? null : (
            <rect
              key={`${x}-${y}`}
              x={x0 + x * w}
              y={y0 + y * h}
              width={w + 0.6}
              height={h + 0.6}
              fill={SHADE[ch]}
            />
          ),
        ),
      )}
    </svg>
  );
}

export function Wordmark({ size }: { size: number }) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Libertinus",
        fontSize: size,
        height: size,
        lineHeight: 1,
        color: INK,
      }}
    >
      salt
      <span style={{ color: ACCENT_TEXT, letterSpacing: "0.02em" }}>OS</span>
    </div>
  );
}

async function fonts() {
  const [serif, mono] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/LibertinusSerif-Semibold.otf")),
    readFile(join(process.cwd(), "app/fonts/CommitMono-400-Regular.otf")),
  ]);
  return [
    { name: "Libertinus", data: serif, weight: 600 as const },
    { name: "CommitMono", data: mono, weight: 400 as const },
  ];
}

export async function ogImage(right: React.ReactNode, footer: string) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        padding: "36px 40px 32px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          background: SHEET,
          border: `1px solid ${TAB}`,
          padding: "48px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: 48,
            borderRight: `1px solid ${RULE_SOFT}`,
          }}
        >
          <AsciiCrystal fontSize={18} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 56,
          }}
        >
          {right}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 14,
          fontFamily: "CommitMono",
          fontSize: 16,
          color: FAINT,
        }}
      >
        <span>{footer}</span>
        <span>saltos.dev</span>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await fonts() },
  );
}
