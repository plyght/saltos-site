import type { Metadata } from "next";
import { WikiPanel } from "@/components/wiki-panel";
import { Tabs } from "@/components/tabs";
import { History } from "@/components/history";

const REPO = "https://github.com/plyght/saltos";
const SITE_REPO = "https://github.com/plyght/saltos-site";

export const metadata: Metadata = {
  title: "saltOS: Revision history · the saltOS handbook",
};

export default function HistoryPage() {
  return (
    <div id="top" className="wiki">
      <WikiPanel />
      <main className="mw-body" role="main">
        <Tabs active="article" view="history" />

        <h1 id="firstHeading">Revision history of &ldquo;saltOS&rdquo;</h1>
        <p className="tagline">
          Changes to this handbook, drawn from the{" "}
          <a href={SITE_REPO} target="_blank" rel="noreferrer" className="ext">
            saltos-site
          </a>{" "}
          repository
        </p>

        <div className="mw-body-content">
          <p className="hatnote">
            Each entry is a commit to the site. Expand one to read its diff,
            rendered with Pierre&rsquo;s{" "}
            <a
              href="https://www.npmjs.com/package/@pierre/diffs"
              target="_blank"
              rel="noreferrer"
              className="ext"
            >
              diffs
            </a>{" "}
            library.
          </p>

          <History />
        </div>
      </main>

      <footer className="site-foot">
        <p>
          This page documents <b>saltOS</b>, an independent Linux distribution.
          Text is maintained in the project handbook and licensed under MIT.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          saltOS 0.1.0 · ©&nbsp;2026 the saltOS project ·{" "}
          <a href={REPO} target="_blank" rel="noreferrer" className="ext">
            Source
          </a>
        </p>
      </footer>
    </div>
  );
}
