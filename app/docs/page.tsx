import type { Metadata } from "next";
import Link from "next/link";
import { WikiPanel } from "@/components/wiki-panel";
import { SiteFoot } from "@/components/site-foot";
import { DOCS } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation · saltOS handbook",
};

export default function DocsIndex() {
  return (
    <div id="top" className="wiki">
      <WikiPanel />
      <main className="mw-body" role="main">
        <h1 id="firstHeading">Documentation</h1>
        <p className="tagline">
          The saltOS handbook, mirrored from the project repository
        </p>

        <div className="mw-body-content">
          <p className="hatnote">
            These pages are rendered from the{" "}
            <a
              href="https://github.com/plyght/saltos/tree/main/docs"
              target="_blank"
              rel="noreferrer"
              className="ext"
            >
              docs
            </a>{" "}
            directory of the saltOS source tree.
          </p>

          <ul className="doc-index">
            {DOCS.map((d) => (
              <li key={d.slug}>
                <Link href={`/docs/${d.slug}`}>{d.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFoot />
    </div>
  );
}
