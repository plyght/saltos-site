import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WikiPanel } from "@/components/wiki-panel";
import { SiteFoot } from "@/components/site-foot";
import { DocToc } from "@/components/doc-toc";
import { BLOB, DOCS, REPO, getDoc, renderDoc } from "@/lib/docs";

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

  const { html, ok, toc, words } = await renderDoc(doc);
  const sections = toc.filter((t) => t.depth === 2).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return (
    <div id="top" className="wiki">
      <WikiPanel current={`/docs/${doc.slug}`} />
      <main className="mw-body" role="main" id="content">
        <nav className="doc-crumbs" aria-label="Breadcrumb">
          <Link href="/docs">Documentation</Link>
          <span aria-hidden="true"> › </span>
          <span>{doc.title}</span>
        </nav>

        <h1 id="firstHeading">{doc.title}</h1>
        <p className="tagline">From the saltOS handbook</p>

        <div className="mw-body-content">
          {ok && (
            <table className="infobox doc-card">
              <tbody>
                <tr>
                  <td className="infobox-title" colSpan={2}>
                    {doc.title}
                  </td>
                </tr>
                <tr>
                  <td className="infobox-header" colSpan={2}>
                    Handbook page
                  </td>
                </tr>
                <tr>
                  <th scope="row">Source</th>
                  <td>
                    <a
                      href={`${BLOB}/${doc.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ext mono"
                    >
                      docs/{doc.file}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Sections</th>
                  <td>{sections}</td>
                </tr>
                <tr>
                  <th scope="row">Length</th>
                  <td>
                    {words.toLocaleString("en")} words · {minutes} min read
                  </td>
                </tr>
                <tr>
                  <th scope="row">Actions</th>
                  <td>
                    <a
                      href={`${REPO}/edit/main/docs/${doc.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ext"
                    >
                      Edit
                    </a>
                    {" · "}
                    <a
                      href={`${REPO}/commits/main/docs/${doc.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ext"
                    >
                      History
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          <DocToc toc={toc} />

          <div
            className="doc-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
      <SiteFoot />
    </div>
  );
}
