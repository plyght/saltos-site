import { DOCS, getDoc } from "@/lib/docs";
import { FAINT, INK, OG_SIZE, RULE_SOFT, Wordmark, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const title = doc?.title ?? "Documentation";
  return ogImage(
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <Wordmark size={40} />
        <span
          style={{
            fontFamily: "CommitMono",
            fontSize: 18,
            color: FAINT,
          }}
        >
          handbook
        </span>
      </div>
      <div
        style={{
          marginTop: 18,
          paddingTop: 22,
          borderTop: `1px solid ${RULE_SOFT}`,
          display: "flex",
          fontFamily: "Libertinus",
          fontSize: title.length > 14 ? 64 : 84,
          lineHeight: 1.1,
          color: INK,
        }}
      >
        {title}
      </div>
    </div>,
    `docs/${doc?.file ?? ""}`,
  );
}
