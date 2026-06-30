import Link from "next/link";

const REPO = "https://github.com/plyght/saltos";

export function Tabs({
  active,
  view = "read",
}: {
  active: "article" | "talk";
  view?: "read" | "history";
}) {
  return (
    <div className="tabs-row">
      <ul className="vector-tabs left">
        <li className={active === "article" ? "selected" : undefined}>
          <Link href="/">Article</Link>
        </li>
        <li className={active === "talk" ? "selected" : undefined}>
          <Link href="/talk">Talk</Link>
        </li>
      </ul>
      <ul className="vector-tabs">
        <li className={view === "read" ? "selected" : undefined}>
          <Link href={active === "talk" ? "/talk" : "/"}>Read</Link>
        </li>
        <li>
          <a href={REPO} target="_blank" rel="noreferrer">
            Edit
          </a>
        </li>
        <li className={view === "history" ? "selected" : undefined}>
          <Link href="/history">View history</Link>
        </li>
      </ul>
    </div>
  );
}
