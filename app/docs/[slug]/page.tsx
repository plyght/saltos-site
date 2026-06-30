import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WikiPanel } from "@/components/wiki-panel";
import { SiteFoot } from "@/components/site-foot";
import { DOCS, getDoc, renderDoc } from "@/lib/docs";

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return {
    title: doc
      ? `${doc.title} · saltOS handbook`
      : "Documentation · saltOS handbook",
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const { html } = await renderDoc(doc);

  return (
    <div id="top" className="wiki">
      <WikiPanel />
      <main className="mw-body" role="main">
        <nav className="doc-crumbs" aria-label="Breadcrumb">
          <Link href="/docs">Documentation</Link>
          <span aria-hidden="true"> › </span>
          <span>{doc.title}</span>
        </nav>

        <h1 id="firstHeading">{doc.title}</h1>
        <p className="tagline">From the saltOS handbook</p>

        <div
          className="mw-body-content doc-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <SiteFoot />
    </div>
  );
}
