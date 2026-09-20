import type { Metadata, Viewport } from "next";
import { Agentation } from "agentation";
import "./globals.css";

export const metadata: Metadata = {
  title: "saltOS · an independent Linux distribution",
  description:
    "saltOS is an experimental independent Linux distribution with its own boot, base system, init, package manager and rollback model. Run software from any distribution through managed, rollbackable strata.",
  metadataBase: new URL("https://saltos.dev"),
  openGraph: {
    title: "saltOS · an independent Linux distribution",
    description:
      "Independent Linux that runs software from any distribution and rolls back every change cleanly.",
    type: "website",
    siteName: "saltOS",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101418" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
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
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
