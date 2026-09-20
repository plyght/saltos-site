import type { TocEntry } from "@/lib/docs";

type Section = TocEntry & { subs: TocEntry[] };

function group(toc: TocEntry[]): Section[] {
  const out: Section[] = [];
  for (const t of toc) {
    if (t.depth === 2) out.push({ ...t, subs: [] });
    else if (out.length) out[out.length - 1].subs.push(t);
  }
  return out;
}

export function DocToc({ toc }: { toc: TocEntry[] }) {
  const sections = group(toc);
  if (sections.length < 2) return null;
  const numbered = sections.every((s) => /^\d+[a-z]?[.)]\s/.test(s.text));
  return (
    <nav className="toc" aria-label="Contents">
      <div className="toc-title">Contents</div>
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>
              {!numbered && <span className="tocnumber">{i + 1}</span>}
              {s.text}
            </a>
            {s.subs.length > 0 && (
              <ol>
                {s.subs.map((t, k) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>
                      {!numbered && (
                        <span className="tocnumber">
                          {i + 1}.{k + 1}
                        </span>
                      )}
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
