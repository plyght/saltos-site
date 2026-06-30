"use client";

import { useCallback, useEffect, useState } from "react";
import {
  parsePatchFiles,
  registerCustomTheme,
  type FileDiffMetadata,
} from "@pierre/diffs";
import { FileDiff } from "@pierre/diffs/react";
import { WIKI_DIFF_THEMES } from "@/lib/diff-themes";

// register the wiki-palette Shiki themes once, before any diff renders.
// guarded to the browser so it runs ahead of component effects on hydration.
if (typeof window !== "undefined") {
  for (const t of WIKI_DIFF_THEMES) {
    registerCustomTheme(t.name, async () => t);
  }
}

const OWNER = "plyght";
const REPO = "saltos-site";
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const REPO_URL = `https://github.com/${OWNER}/${REPO}`;

type Commit = {
  sha: string;
  message: string;
  author: string;
  date: string;
};

type GhFile = {
  filename: string;
  status: string;
  patch?: string;
};

// reuse the handbook's light/dark choice for the diff theme
function useThemeType(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const read = () =>
      setTheme(
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light",
      );
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);
  return theme;
}

// rebuild a unified patch string from the GitHub API's per-file hunks
function buildPatch(files: GhFile[]): string {
  let patch = "";
  for (const f of files) {
    if (f.patch == null) continue; // binary or oversized — skipped by the API
    const a = f.status === "added" ? "/dev/null" : `a/${f.filename}`;
    const b = f.status === "removed" ? "/dev/null" : `b/${f.filename}`;
    patch += `diff --git a/${f.filename} b/${f.filename}\n`;
    patch += `--- ${a}\n+++ ${b}\n`;
    patch += f.patch.endsWith("\n") ? f.patch : `${f.patch}\n`;
  }
  return patch;
}

function shortSha(sha: string) {
  return sha.slice(0, 7);
}

export function History() {
  const themeType = useThemeType();
  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [diffs, setDiffs] = useState<Record<string, FileDiffMetadata[]>>({});
  const [loadingSha, setLoadingSha] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/commits?per_page=30`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then((data: unknown[]) => {
        if (cancelled) return;
        setCommits(
          data.map((c) => {
            const commit = c as {
              sha: string;
              commit: {
                message: string;
                author: { name: string; date: string };
              };
            };
            return {
              sha: commit.sha,
              message: commit.commit.message.split("\n")[0],
              author: commit.commit.author.name,
              date: commit.commit.author.date,
            };
          }),
        );
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback(
    async (sha: string) => {
      if (open === sha) {
        setOpen(null);
        return;
      }
      setOpen(sha);
      if (diffs[sha] != null) return;
      setLoadingSha(sha);
      try {
        const r = await fetch(`${API}/commits/${sha}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        const detail = (await r.json()) as { files?: GhFile[] };
        const patch = buildPatch(detail.files ?? []);
        const parsed = patch ? parsePatchFiles(patch, sha) : [];
        const files = parsed.flatMap((p) => p.files);
        setDiffs((d) => ({ ...d, [sha]: files }));
      } catch (e) {
        setDiffs((d) => ({ ...d, [sha]: [] }));
        setError((e as Error).message);
      } finally {
        setLoadingSha(null);
      }
    },
    [open, diffs],
  );

  if (error && commits == null) {
    return (
      <p className="history-note">
        Could not load history from{" "}
        <a href={REPO_URL} target="_blank" rel="noreferrer" className="ext">
          {OWNER}/{REPO}
        </a>
        : {error}. The GitHub API may be rate-limited; try again shortly.
      </p>
    );
  }

  if (commits == null) {
    return <p className="history-note">Loading revision history…</p>;
  }

  if (commits.length === 0) {
    return <p className="history-note">No revisions recorded yet.</p>;
  }

  return (
    <ol className="history">
      {commits.map((c) => {
        const isOpen = open === c.sha;
        const files = diffs[c.sha];
        return (
          <li key={c.sha} className="history-item">
            <button
              type="button"
              className="history-row"
              aria-expanded={isOpen}
              onClick={() => toggle(c.sha)}
            >
              <span className="history-caret" aria-hidden="true">
                {isOpen ? "▾" : "▸"}
              </span>
              <span className="history-msg">{c.message}</span>
              <code className="history-sha">{shortSha(c.sha)}</code>
              <span className="history-meta">
                {c.author} ·{" "}
                {new Date(c.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </button>

            {isOpen && (
              <div className="history-diff">
                {loadingSha === c.sha && (
                  <p className="history-note">Loading diff…</p>
                )}
                {files != null &&
                  files.length === 0 &&
                  loadingSha !== c.sha && (
                    <p className="history-note">
                      No textual changes to show.{" "}
                      <a
                        href={`${REPO_URL}/commit/${c.sha}`}
                        target="_blank"
                        rel="noreferrer"
                        className="ext"
                      >
                        View on GitHub
                      </a>
                    </p>
                  )}
                {files?.map((fileDiff, i) => (
                  <FileDiff
                    key={`${c.sha}:${i}`}
                    fileDiff={fileDiff}
                    options={{
                      theme: { dark: "wiki-dark", light: "wiki-light" },
                      themeType,
                      diffStyle: "unified",
                      diffIndicators: "classic",
                    }}
                  />
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
