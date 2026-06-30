import { marked } from "marked";

export const REPO = "https://github.com/plyght/saltos";
const RAW = "https://raw.githubusercontent.com/plyght/saltos/main/docs";
const BLOB = `${REPO}/blob/main/docs`;

export type Doc = {
  slug: string;
  title: string;
  file: string;
  // surfaced in the left navigation panel
  nav?: boolean;
};

export const DOCS: Doc[] = [
  {
    slug: "installation",
    title: "Installation",
    file: "installation.md",
    nav: true,
  },
  {
    slug: "architecture",
    title: "Architecture",
    file: "architecture.md",
    nav: true,
  },
  { slug: "strata", title: "Strata", file: "strata.md", nav: true },
  { slug: "rollback", title: "Rollback", file: "rollback.md", nav: true },
  {
    slug: "package-manager",
    title: "Package manager",
    file: "package-manager.md",
    nav: true,
  },
  {
    slug: "reproducibility",
    title: "Reproducibility",
    file: "reproducibility.md",
    nav: true,
  },
  { slug: "native-build", title: "Native build", file: "native-build.md" },
  { slug: "recipes", title: "Recipes", file: "recipes.md" },
  { slug: "repository", title: "Repository", file: "repository.md" },
  { slug: "ota", title: "Updates (OTA)", file: "ota.md" },
  { slug: "trust-model", title: "Trust model", file: "trust-model.md" },
  { slug: "installer", title: "Installer", file: "installer.md" },
  {
    slug: "headless-vm-ssh",
    title: "Headless VM over SSH",
    file: "headless-vm-ssh.md",
  },
  { slug: "raspberry-pi", title: "Raspberry Pi", file: "raspberry-pi.md" },
  { slug: "void-base", title: "Void base", file: "void-base.md" },
  { slug: "conventions", title: "Conventions", file: "CONVENTIONS.md" },
  {
    slug: "contributing",
    title: "Contributing",
    file: "contributing.md",
    nav: true,
  },
];

export const NAV_DOCS = DOCS.filter((d) => d.nav);

const BY_FILE_BASE = new Map(
  DOCS.map((d) => [d.file.replace(/\.md$/i, "").toLowerCase(), d.slug]),
);

export function getDoc(slug: string): Doc | undefined {
  return DOCS.find((d) => d.slug === slug);
}

// turn intra-repo markdown links into in-site routes, and point everything
// else that's relative back at the GitHub repo
function rewriteLinks(html: string): string {
  return html
    .replace(
      /href="(?:\.\/)?([\w.-]+)\.md(#[\w-]+)?"/gi,
      (_m, base: string, hash = "") => {
        const slug = BY_FILE_BASE.get(base.toLowerCase());
        return slug
          ? `href="/docs/${slug}${hash}"`
          : `href="${BLOB}/${base}.md${hash}"`;
      },
    )
    .replace(/src="(?!https?:|\/)([^"]+)"/gi, (_m, path: string) => {
      return `src="${RAW}/${path.replace(/^\.\//, "")}"`;
    });
}

export type RenderedDoc = { html: string; ok: boolean };

export async function renderDoc(doc: Doc): Promise<RenderedDoc> {
  try {
    const res = await fetch(`${RAW}/${doc.file}`, { cache: "force-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    const html = await marked.parse(md, { gfm: true });
    // the page already shows the doc title as the first heading, so drop a
    // leading <h1> from the markdown to avoid two stacked titles
    const deduped = html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
    return { html: rewriteLinks(deduped), ok: true };
  } catch {
    return {
      html: `<p>This page could not be loaded from the repository right now. Read it on <a class="ext" target="_blank" rel="noreferrer" href="${BLOB}/${doc.file}">GitHub</a>.</p>`,
      ok: false,
    };
  }
}
