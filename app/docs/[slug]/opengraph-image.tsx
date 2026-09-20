import { DOCS, getDoc } from "@/lib/docs";
import { FAINT, INK, OG_SIZE, Wordmark, ogImage } from "@/lib/og";

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
  const title = getDoc(slug)?.title ?? "Documentation";
  return ogImage(
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <Wordmark size={44} />
        <span style={{ fontFamily: "CommitMono", fontSize: 20, color: FAINT }}>
          handbook
        </span>
      </div>
      <div
        style={{
          marginTop: 28,
          display: "flex",
          fontFamily: "Libertinus",
          fontSize: title.length > 14 ? 72 : 96,
          lineHeight: 1.1,
          color: INK,
        }}
      >
        {title}
      </div>
    </div>,
  );
}
