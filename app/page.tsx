import { WikiPanel } from "@/components/wiki-panel";
import { Article } from "@/components/article";

const REPO = "https://github.com/plyght/saltos";

export default function Home() {
  return (
    <div id="top" className="wiki">
      <WikiPanel />
      <Article />
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
