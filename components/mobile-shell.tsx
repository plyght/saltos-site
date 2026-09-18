"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute("data-nav-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.removeAttribute("data-nav-open");
    };
  }, [open]);

  function onPanelClick(e: MouseEvent<HTMLDivElement>) {
    const a = (e.target as Element).closest("a[href]");
    if (a && a.getAttribute("href") !== "#") setOpen(false);
  }

  return (
    <>
      <header className="mw-mobile-bar">
        <button
          type="button"
          className="mw-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mw-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
        <Link href="/" className="mw-mobile-word">
          <span>
            salt<span className="logo-os">OS</span>
          </span>
          <small>handbook</small>
        </Link>
        <a
          href="https://github.com/plyght/saltos"
          className="mw-mobile-repo"
          target="_blank"
          rel="noreferrer"
          aria-label="Source repository on GitHub"
        >
          <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
      </header>
      <div
        className="mw-panel-backdrop"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <div id="mw-panel" className="mw-panel-col" onClick={onPanelClick}>
        {children}
      </div>
    </>
  );
}
