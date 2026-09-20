import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

export const BG = "#101418";
export const INK = "#c8ccd1";
export const FAINT = "#6f7680";
export const ACCENT = "#5cc3cf";

const CRYSTAL: [number, number, number][] = [
  [7, 2, 2],
  [6, 3, 4],
  [5, 4, 6],
  [4, 5, 8],
  [3, 6, 10],
  [3, 7, 10],
  [4, 8, 8],
  [5, 9, 6],
  [6, 10, 4],
  [7, 11, 2],
];
const FACETS: [number, number][] = [
  [6, 6],
  [9, 7],
  [7, 8],
];

export function Crystal({
  px,
  color = ACCENT,
}: {
  px: number;
  color?: string;
}) {
  return (
    <svg width={px} height={px} viewBox="0 0 16 16" shapeRendering="crispEdges">
      {CRYSTAL.map(([x, y, w]) => (
        <rect key={y} x={x} y={y} width={w} height={1} fill={color} />
      ))}
      {FACETS.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={1}
          height={1}
          fill={BG}
          fillOpacity={0.5}
        />
      ))}
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
        lineHeight: 1,
        letterSpacing: "-0.02em",
        color: INK,
      }}
    >
      salt<span style={{ color: ACCENT }}>OS</span>
    </div>
  );
}

async function serif() {
  return readFile(
    join(process.cwd(), "app/fonts/LibertinusSerif-Semibold.otf"),
  );
}

export async function ogImage(content: React.ReactNode) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        overflow: "hidden",
      }}
    >
      {content}
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Libertinus",
          data: await serif(),
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
