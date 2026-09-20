import { OG_SIZE, RULE_SOFT, SOFT, Wordmark, ogImage } from "@/lib/og";

export const alt = "saltOS — an independent Linux distribution";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Wordmark size={132} />
      <div
        style={{
          marginTop: 22,
          paddingTop: 22,
          borderTop: `1px solid ${RULE_SOFT}`,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Libertinus",
          fontSize: 32,
          lineHeight: 1.3,
          color: SOFT,
        }}
      >
        <span>the independent handbook</span>
      </div>
    </div>,
    "An independent Linux distribution · strata · rollback",
  );
}
