"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";
type Skin = "vector" | "monobook" | "timeless";

function subscribeRoot(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-skin"],
  });
  return () => obs.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function readSkin(): Skin {
  const s = document.documentElement.getAttribute("data-skin");
  return s === "monobook" || s === "timeless" ? s : "vector";
}

const SKINS: { key: Skin; label: string }[] = [
  { key: "vector", label: "Vector 2010" },
  { key: "monobook", label: "MonoBook" },
  { key: "timeless", label: "Timeless" },
];

export function Controls() {
  const theme = useSyncExternalStore(subscribeRoot, readTheme, () => null);
  const skin = useSyncExternalStore(subscribeRoot, readSkin, () => null);
  const mounted = theme !== null;

  useEffect(() => {
    if (!mounted) return;
    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue("--page-bg")
      .trim();
    if (!bg) return;
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((m) => {
        m.content = bg;
      });
  }, [mounted, theme, skin]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("salt-theme", next);
    } catch {}
  }

  function pickSkin(next: Skin) {
    document.documentElement.setAttribute("data-skin", next);
    try {
      localStorage.setItem("salt-skin", next);
    } catch {}
  }

  const nextTheme = theme === "dark" ? "Light" : "Dark";

  return (
    <ul className="appearance">
      <li>
        <a
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            toggleTheme();
          }}
        >
          {mounted ? `${nextTheme} mode` : "Dark mode"}
        </a>
      </li>

      <li className="appearance-sub">Skin</li>
      {SKINS.map((s) => {
        const active = mounted && skin === s.key;
        return (
          <li key={s.key}>
            <a
              href="#"
              role="button"
              className={active ? "skin-active" : undefined}
              aria-current={active ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                pickSkin(s.key);
              }}
            >
              <span className="skin-dot" aria-hidden="true">
                {active ? "●" : "○"}
              </span>
              {s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
