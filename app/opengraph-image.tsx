import { OG_SIZE, SOFT, Wordmark, ogImage } from "@/lib/og";

export const alt = "saltOS — an independent Linux distribution";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Wordmark size={140} />
      <div
        style={{
          marginTop: 28,
          display: "flex",
          fontFamily: "Libertinus",
          fontSize: 30,
          whiteSpace: "nowrap",
          color: SOFT,
        }}
      >
        the independent handbook
      </div>
    </div>,
  );
}
