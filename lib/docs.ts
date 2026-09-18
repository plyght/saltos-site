import { Marked, type Tokens } from "marked";

export const REPO = "https://github.com/plyght/saltos";
const RAW_ROOT = "https://raw.githubusercontent.com/plyght/saltos/main/";
const RAW = `${RAW_ROOT}docs`;
export const BLOB = `${REPO}/blob/main/docs`;

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
  { slug: "thinkpad", title: "ThinkPad P40 Yoga", file: "thinkpad.md" },
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

const ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i;

function repoPath(href: string): { path: string; hash: string } {
  const url = new URL(href, `${RAW}/`);
  const path = url.pathname.startsWith("/plyght/saltos/main/")
    ? url.pathname.slice("/plyght/saltos/main/".length)
    : url.pathname.replace(/^\/+/, "");
  return { path, hash: url.hash };
}

// turn intra-repo markdown links into in-site routes, and point everything
// else that's relative back at the GitHub repo
function resolveLink(href: string): { href: string; external: boolean } {
  if (ABSOLUTE.test(href)) {
    return { href, external: /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href) };
  }
  const { path, hash } = repoPath(href);
  const m = /^docs\/([\w.-]+)\.md$/i.exec(path);
  const slug = m ? BY_FILE_BASE.get(m[1].toLowerCase()) : undefined;
  if (slug) return { href: `/docs/${slug}${hash}`, external: false };
  return { href: `${REPO}/blob/main/${path}${hash}`, external: true };
}

function resolveImage(src: string): string {
  if (ABSOLUTE.test(src)) return src;
  return `${RAW_ROOT}${repoPath(src).path}`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&(?:amp|lt|gt|quot|#39);/g, (m) => ENTITIES[m])
    .trim();
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

export type TocEntry = { id: string; text: string; depth: number };

function createRenderer(toc: TocEntry[]) {
  const seen = new Map<string, number>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const text = this.parser.parseInline(tokens);
        const base = slugify(text) || "section";
        const n = seen.get(base) ?? 0;
        seen.set(base, n + 1);
        const id = n === 0 ? base : `${base}-${n}`;
        if (depth === 2 || depth === 3) {
          toc.push({ id, text: plainText(text), depth });
        }
        return `<h${depth} id="${escapeAttr(id)}">${text}</h${depth}>\n`;
      },
      code({ text, lang }: Tokens.Code) {
        const language = (lang ?? "").trim().split(/\s+/)[0];
        const cls = language ? ` class="language-${escapeAttr(language)}"` : "";
        const label = language ? ` data-lang="${escapeAttr(language)}"` : "";
        return `<pre${label}><code${cls}>${escapeHtml(text)}\n</code></pre>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        const target = resolveLink(href);
        const attrs = [`href="${escapeAttr(target.href)}"`];
        if (title) attrs.push(`title="${escapeAttr(title)}"`);
        if (target.external) {
          attrs.push(`class="ext"`, `target="_blank"`, `rel="noreferrer"`);
        }
        return `<a ${attrs.join(" ")}>${text}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const attrs = [
          `src="${escapeAttr(resolveImage(href))}"`,
          `alt="${escapeAttr(text)}"`,
        ];
        if (title) attrs.push(`title="${escapeAttr(title)}"`);
        return `<img ${attrs.join(" ")}>`;
      },
    },
  });
  return marked;
}

export type RenderedDoc = {
  html: string;
  ok: boolean;
  toc: TocEntry[];
  words: number;
};

async function fetchDoc(doc: Doc): Promise<string> {
  const res = await fetch(`${RAW}/${doc.file}`, { cache: "force-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

export type SearchHit = {
  doc: Doc;
  score: number;
  snippet: string;
  words: number;
};

export type SearchResult = { hits: SearchHit[]; failed: number };

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}[-*>]\s+/gm, "")
    .replace(/[*_~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchTerms(query: string): string[] {
  return Array.from(
    new Set(
      query
        .toLowerCase()
        .split(/[^\p{L}\p{N}.\-/]+/u)
        .filter((t) => t.length > 1),
    ),
  );
}

function snippetFor(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return text.slice(0, 220).trim();
  const start = Math.max(0, at - 90);
  const end = Math.min(text.length, at + 200);
  const raw = text.slice(start, end);
  const trimmed = start > 0 ? raw.replace(/^\S*\s/, "") : raw;
  return `${start > 0 ? "…" : ""}${trimmed}${end < text.length ? "…" : ""}`;
}

export async function searchDocs(query: string): Promise<SearchResult> {
  const terms = searchTerms(query);
  if (terms.length === 0) return { hits: [], failed: 0 };
  let failed = 0;
  const hits: SearchHit[] = [];
  await Promise.all(
    DOCS.map(async (doc) => {
      let md: string;
      try {
        md = await fetchDoc(doc);
      } catch {
        failed += 1;
        return;
      }
      const text = stripMarkdown(md);
      const body = text.toLowerCase();
      const title = doc.title.toLowerCase();
      const headings = md
        .split("\n")
        .filter((l) => /^\s{0,3}#{1,6}\s/.test(l))
        .join(" ")
        .toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 40;
        if (doc.slug.includes(t)) score += 20;
        if (headings.includes(t)) score += 10;
        let i = body.indexOf(t);
        let n = 0;
        while (i !== -1 && n < 50) {
          n += 1;
          i = body.indexOf(t, i + t.length);
        }
        score += Math.min(n, 50);
      }
      if (score === 0) return;
      hits.push({
        doc,
        score,
        snippet: snippetFor(text, terms),
        words: md.split(/\s+/).filter(Boolean).length,
      });
    }),
  );
  hits.sort(
    (a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title),
  );
  return { hits, failed };
}

export async function renderDoc(doc: Doc): Promise<RenderedDoc> {
  try {
    const md = await fetchDoc(doc);
    const toc: TocEntry[] = [];
    const html = await createRenderer(toc).parse(md);
    // the page already shows the doc title as the first heading, so drop a
    // leading <h1> from the markdown to avoid two stacked titles
    const deduped = html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
    const words = md.split(/\s+/).filter(Boolean).length;
    return { html: deduped, ok: true, toc, words };
  } catch {
    return {
      html: `<p>This page could not be loaded from the repository right now. Read it on <a class="ext" target="_blank" rel="noreferrer" href="${BLOB}/${doc.file}">GitHub</a>.</p>`,
      ok: false,
      toc: [],
      words: 0,
    };
  }
}
