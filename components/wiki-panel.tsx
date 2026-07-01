import { Search } from "lucide-react";
import { Controls } from "./controls";
import { NAV_DOCS } from "@/lib/docs";

const REPO = "https://github.com/plyght/saltos";

type Link = { label: string; href: string; ext?: boolean };
type Portlet = { title: string; links: Link[] };

const NAV: Portlet[] = [
  {
    title: "Navigation",
    links: [
      { label: "Main page", href: "/" },
      { label: "Overview", href: "/#Overview" },
      { label: "Strata", href: "/#Strata" },
      { label: "Rollback", href: "/#Rollback" },
      { label: "Comparison", href: "/#Comparison" },
      { label: "Release history", href: "/#Release_history" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "All pages", href: "/docs" },
      ...NAV_DOCS.map((d) => ({ label: d.title, href: `/docs/${d.slug}` })),
    ],
  },
  {
    title: "Get saltOS",
    links: [
      { label: "Download", href: `${REPO}/releases`, ext: true },
      { label: "Source repository", href: REPO, ext: true },
      { label: "Issue tracker", href: `${REPO}/issues`, ext: true },
    ],
  },
];

export function WikiPanel() {
  return (
    <nav className="mw-panel" aria-label="Site">
      <a href="#top" className="logo" aria-label="saltOS, main page">
        <SaltCrystal />
        <span className="logo-word">saltOS</span>
        <span className="logo-tag">the independent handbook</span>
      </a>

      <form
        className="wiki-search"
        role="search"
        action={`${REPO}/search`}
        method="get"
      >
        <input
          type="search"
          name="q"
          placeholder="Search saltOS"
          aria-label="Search saltOS"
        />
        <button type="submit" aria-label="Search">
          <Search size={14} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </form>

      {NAV.map((p) => (
        <div key={p.title} className="portlet">
          <h3>{p.title}</h3>
          <ul>
            {p.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={l.ext ? "ext" : undefined}
                  {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="portlet">
        <h3>Appearance</h3>
        <Controls />
      </div>
    </nav>
  );
}

function SaltCrystal() {
  return (
    <svg
      className="logo-mark"
      viewBox="0 0 342 320"
      fontFamily="'SFMono-Regular','Menlo',ui-monospace,monospace"
      fontSize="12px"
      fill="currentColor"
      aria-hidden="true"
    >
      <text x="16" y="25.6" xmlSpace="preserve">                 ::</text>
      <text x="16" y="37.6" xmlSpace="preserve">            :::::::::::</text>
      <text x="16" y="49.6" xmlSpace="preserve">        ::::::::::::::::::-</text>
      <text x="16" y="61.6" xmlSpace="preserve">       ::::::::::--:---:---::::</text>
      <text x="16" y="73.6" xmlSpace="preserve">       :::::::::-----=-=-----::::::</text>
      <text x="16" y="85.6" xmlSpace="preserve">      ::::::::::::--==-=-==-------:::::</text>
      <text x="16" y="97.6" xmlSpace="preserve">     :::::::::::::::::-=======------::::::</text>
      <text x="16" y="109.6" xmlSpace="preserve">     :::::::-:::::::::::::::::::::::::::::</text>
      <text x="16" y="121.6" xmlSpace="preserve">    :::-::-----==---:::::::::----:--::::::</text>
      <text x="16" y="133.6" xmlSpace="preserve">    :::::--========-::-------:----=----:::</text>
      <text x="16" y="145.6" xmlSpace="preserve">   ::::---=========----=---==-------=--::::</text>
      <text x="16" y="157.6" xmlSpace="preserve">  ::::---:====+=+==-----=-=========-----:::</text>
      <text x="16" y="169.6" xmlSpace="preserve">  :::----:-====+==--==================---::</text>
      <text x="16" y="181.6" xmlSpace="preserve"> :::-----:-==++++=--=-================---::</text>
      <text x="16" y="193.6" xmlSpace="preserve">-:::---:-::-=+=+==---===============--=-::</text>
      <text x="16" y="205.6" xmlSpace="preserve"> :::::::::::::-==----================--::</text>
      <text x="16" y="217.6" xmlSpace="preserve">   ::::::::::::-::-================--:::</text>
      <text x="16" y="229.6" xmlSpace="preserve">    -::::::-:-----:::-============---::</text>
      <text x="16" y="241.6" xmlSpace="preserve">      ::::------::::-:::-=======----::-</text>
      <text x="16" y="253.6" xmlSpace="preserve">       ::-------:::-:::::::-====---::</text>
      <text x="16" y="265.6" xmlSpace="preserve">         :::---::-::::-:--:::::--:::-</text>
      <text x="16" y="277.6" xmlSpace="preserve">          ::::-:::::--::--::::::::::</text>
      <text x="16" y="289.6" xmlSpace="preserve">            -::::::::::::-:-</text>
      <text x="16" y="301.6" xmlSpace="preserve">             ::::::-</text>
    </svg>
  );
}
