"use client";

import { useEffect, useState } from "react";

export function Controls() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setTheme((root.getAttribute("data-theme") as "dark" | "light") ?? "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("salt-theme", next);
    } catch {}
  }

  const next = theme === "dark" ? "Light" : "Dark";

  return (
    <ul>
      <li>
        <a
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          {mounted ? `${next} mode` : "Dark mode"}
        </a>
      </li>
    </ul>
  );
}
