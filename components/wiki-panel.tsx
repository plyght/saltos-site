import Link from "next/link";
import { Search } from "lucide-react";
import { Controls } from "./controls";
import { CrystalRows } from "./crystal";
import { MobileShell } from "./mobile-shell";
import { NAV_DOCS } from "@/lib/docs";

const REPO = "https://github.com/plyght/saltos";

type NavLink = { label: string; href: string; ext?: boolean };
type Portlet = { title: string; links: NavLink[] };

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

export function WikiPanel({ current }: { current?: string }) {
  return (
    <MobileShell>
      <nav className="mw-panel" aria-label="Site">
        <Link href="/" className="logo" aria-label="saltOS, main page">
          <SaltCrystal />
          <span className="logo-word">
            salt<span className="logo-os">OS</span>
          </span>
          <span className="logo-tag">the independent handbook</span>
        </Link>

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
                    aria-current={
                      current !== undefined && l.href === current
                        ? "page"
                        : undefined
                    }
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
    </MobileShell>
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
      <CrystalRows />
    </svg>
  );
}
