"use client";

import { useEffect, useRef } from "react";

// giscus config for plyght/saltos — values resolved from the GitHub API.
// The giscus GitHub App must be installed on the repo for comments to load:
// https://github.com/apps/giscus
const REPO = "plyght/saltos";
const REPO_ID = "R_kgDOS9qTKA";
const CATEGORY = "General";
const CATEGORY_ID = "DIC_kwDOS9qTKM4DAPRn";
const GISCUS_ORIGIN = "https://giscus.app";

function giscusTheme(): string {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark_dimmed"
    : "light";
}

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const script = document.createElement("script");
    script.src = `${GISCUS_ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";

    const attrs: Record<string, string> = {
      "data-repo": REPO,
      "data-repo-id": REPO_ID,
      "data-category": CATEGORY,
      "data-category-id": CATEGORY_ID,
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": giscusTheme(),
      "data-lang": "en",
      "data-loading": "lazy",
    };
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v);

    el.appendChild(script);
    return () => {
      el.innerHTML = "";
    };
  }, []);

  // keep giscus in sync with the handbook's light/dark toggle
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const frame = document.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame",
      );
      frame?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: giscusTheme() } } },
        GISCUS_ORIGIN,
      );
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  return <div className="giscus" ref={ref} />;
}
