import { Crystal, FAINT, OG_SIZE, Wordmark, ogImage } from "@/lib/og";

export const alt = "saltOS — an independent Linux distribution";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    <>
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontFamily: "Libertinus",
          fontSize: 30,
          color: FAINT,
        }}
      >
        <Crystal px={40} />
        the independent handbook
      </div>
      <div
        style={{ position: "absolute", top: 350, left: 72, display: "flex" }}
      >
        <Wordmark size={340} />
      </div>
    </>,
  );
}
