import { DOCS, getDoc } from "@/lib/docs";
import { Crystal, FAINT, INK, OG_SIZE, Wordmark, ogImage } from "@/lib/og";

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
  const fontSize = Math.min(136, Math.floor(1900 / title.length));
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
        }}
      >
        <Crystal px={40} />
        <Wordmark size={40} />
        <span
          style={{
            fontFamily: "Libertinus",
            fontSize: 30,
            color: FAINT,
            marginLeft: 6,
          }}
        >
          handbook
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 558 - Math.round(fontSize * 1.05),
          left: 80,
          width: 1040,
          whiteSpace: "nowrap",
          overflow: "hidden",
          display: "flex",
          fontFamily: "Libertinus",
          fontSize,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: INK,
        }}
      >
        {title}
      </div>
    </>,
  );
}
