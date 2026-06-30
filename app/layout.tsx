import type { Metadata, Viewport } from "next";
import { Agentation } from "agentation";
import "./globals.css";

export const metadata: Metadata = {
  title: "saltOS · a brackish operating system",
  description:
    "saltOS is an experimental independent Linux distribution with its own boot, base system, init, package manager and rollback model. Run software from any distribution through managed, rollbackable strata.",
  metadataBase: new URL("https://saltos.dev"),
  openGraph: {
    title: "saltOS · a brackish operating system",
    description:
      "Independent Linux that runs software from any distribution, and rolls back every change cleanly.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f3" },
  ],
};

// runs before paint, no theme flash; the handbook defaults to light
const initScript = `
(function () {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem("salt-theme") || "light";
    d.setAttribute("data-theme", t);
    var s = localStorage.getItem("salt-skin") || "vector";
    d.setAttribute("data-skin", s);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
