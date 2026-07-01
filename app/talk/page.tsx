import type { Metadata } from "next";
import { WikiPanel } from "@/components/wiki-panel";
import { Tabs } from "@/components/tabs";
import { Giscus } from "@/components/giscus";

const REPO = "https://github.com/plyght/saltos";

export const metadata: Metadata = {
  title: "Talk:saltOS · the saltOS handbook",
};

export default function Talk() {
  return (
    <div id="top" className="wiki">
      <WikiPanel />
      <main className="mw-body" role="main">
        <Tabs active="talk" />

        <h1 id="firstHeading">Talk:saltOS</h1>
        <p className="tagline">
          Discussion for the saltOS handbook, threaded through GitHub
          Discussions
        </p>

        <div className="mw-body-content">
          <p className="hatnote">
            This is the talk page for discussing improvements to the{" "}
            <a href="/">saltOS</a>&nbsp;article. Sign in with GitHub to leave a
            comment; threads are stored in the project&rsquo;s{" "}
            <a
              href={`${REPO}/discussions`}
              target="_blank"
              rel="noreferrer"
              className="ext"
            >
              Discussions
            </a>
            .
          </p>

          <Giscus />
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
