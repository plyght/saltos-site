import type { Metadata } from "next";
import Link from "next/link";
import { WikiPanel } from "@/components/wiki-panel";
import { SiteFoot } from "@/components/site-foot";
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
      <main className="mw-body" role="main" id="content">
        <Tabs active="talk" />

        <h1 id="firstHeading">Talk:saltOS</h1>
        <p className="tagline">
          Discussion for the saltOS handbook, threaded through GitHub
          Discussions
        </p>

        <div className="mw-body-content">
          <p className="hatnote">
            This is the talk page for discussing improvements to the{" "}
            <Link href="/">saltOS</Link>&nbsp;article. Sign in with GitHub to
            leave a comment; threads are stored in the project&rsquo;s{" "}
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

      <SiteFoot />
    </div>
  );
}
