"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
type Skin = "vector" | "monobook" | "timeless";

const SKINS: { key: Skin; label: string }[] = [
  { key: "vector", label: "Vector 2010" },
  { key: "monobook", label: "MonoBook" },
  { key: "timeless", label: "Timeless" },
];

export function Controls() {
  const [theme, setTheme] = useState<Theme>("light");
  const [skin, setSkin] = useState<Skin>("vector");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setTheme((root.getAttribute("data-theme") as Theme) ?? "light");
    setSkin((root.getAttribute("data-skin") as Skin) ?? "vector");
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("salt-theme", next);
    } catch {}
  }

  function pickSkin(next: Skin) {
    setSkin(next);
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
