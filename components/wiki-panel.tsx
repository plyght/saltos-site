import { Controls } from "./controls";

const REPO = "https://github.com/plyght/saltos";
const DOCS = `${REPO}/blob/main/docs`;

type Link = { label: string; href: string; ext?: boolean };
type Portlet = { title: string; links: Link[] };

const NAV: Portlet[] = [
  {
    title: "Navigation",
    links: [
      { label: "Main page", href: "#top" },
      { label: "Overview", href: "#Overview" },
      { label: "Strata", href: "#Strata" },
      { label: "Rollback", href: "#Rollback" },
      { label: "Comparison", href: "#Comparison" },
      { label: "Release history", href: "#Release_history" },
    ],
  },
  {
    title: "Get saltOS",
    links: [
      { label: "Download", href: `${REPO}/releases`, ext: true },
      { label: "Installation", href: `${DOCS}/installation.md`, ext: true },
      { label: "Reproducibility", href: `${DOCS}/reproducibility.md`, ext: true },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Source repository", href: REPO, ext: true },
      { label: "Issue tracker", href: `${REPO}/issues`, ext: true },
      { label: "Contributing", href: `${DOCS}/contributing.md`, ext: true },
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
          ⌕
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
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="31" fill="var(--box-bg)" stroke="var(--border)" />
      {/* isometric halite cube */}
      <g
        stroke="var(--text-soft)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M32 14 L48 23 L48 41 L32 50 L16 41 L16 23 Z" />
        <path d="M32 14 L32 32 M32 32 L48 23 M32 32 L16 23" />
        <path d="M32 32 L32 50" opacity="0.5" />
        <path d="M16 23 L32 32 L48 23" opacity="0.5" />
      </g>
    </svg>
  );
}
