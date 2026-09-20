import { ImageResponse } from "next/og";
import { CrystalBitmap, PAPER } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: PAPER,
      }}
    >
      <CrystalBitmap px={140} />
    </div>,
    size,
  );
}
