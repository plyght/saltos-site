import type { Metadata } from "next";
import Link from "next/link";
import { WikiPanel } from "@/components/wiki-panel";
import { SiteFoot } from "@/components/site-foot";
import { REPO, searchDocs, searchTerms } from "@/lib/docs";

type Params = { searchParams: Promise<{ q?: string | string[] }> };

function queryOf(q: string | string[] | undefined): string {
  return (Array.isArray(q) ? q[0] : (q ?? "")).trim().slice(0, 200);
}

export async function generateMetadata({
  searchParams,
}: Params): Promise<Metadata> {
  const q = queryOf((await searchParams).q);
  return {
    title: q
      ? `Search results for "${q}" · saltOS handbook`
      : "Search · saltOS handbook",
  };
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const re = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>,
      )}
    </>
  );
}

export default async function SearchPage({ searchParams }: Params) {
  const q = queryOf((await searchParams).q);
  const terms = searchTerms(q);
  const { hits, failed } = q ? await searchDocs(q) : { hits: [], failed: 0 };

  return (
    <div id="top" className="wiki">
      <WikiPanel current="/search" />
      <main className="mw-body" role="main" id="content">
        <h1 id="firstHeading">Search results</h1>
        <p className="tagline">Searching the saltOS handbook</p>

        <div className="mw-body-content">
          <form className="search-form" role="search" action="/search">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search saltOS"
              aria-label="Search saltOS"
              autoFocus={!q}
            />
            <button type="submit">Search</button>
          </form>

          {q && (
            <p className="search-summary">
              {hits.length === 0
                ? "No handbook pages match "
                : `${hits.length} ${hits.length === 1 ? "page matches" : "pages match"} `}
              <b>{q}</b>.
              {failed > 0 &&
                ` ${failed} ${failed === 1 ? "page" : "pages"} could not be fetched from the repository and ${failed === 1 ? "was" : "were"} skipped.`}
            </p>
          )}

          {q && hits.length > 0 && (
            <ul className="search-results">
              {hits.map((h) => (
                <li key={h.doc.slug}>
                  <Link href={`/docs/${h.doc.slug}`} className="search-title">
                    <Highlight text={h.doc.title} terms={terms} />
                  </Link>
                  <p className="search-snippet">
                    <Highlight text={h.snippet} terms={terms} />
                  </p>
                  <p className="search-meta">
                    {h.words.toLocaleString("en")} words ·{" "}
                    <span className="mono">docs/{h.doc.file}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}

          {q && hits.length === 0 && (
            <p className="hatnote">
              Try different keywords, browse the{" "}
              <Link href="/docs">list of all pages</Link>, or search the{" "}
              <a
                href={`${REPO}/search?q=${encodeURIComponent(q)}`}
                target="_blank"
                rel="noreferrer"
                className="ext"
              >
                source repository
              </a>
              .
            </p>
          )}

          {!q && (
            <p className="hatnote">
              Enter a term above to search every page of the handbook, or browse
              the <Link href="/docs">list of all pages</Link>.
            </p>
          )}
        </div>
      </main>
      <SiteFoot />
    </div>
  );
}
