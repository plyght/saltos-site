import type { ReactNode } from "react";
import { Tabs } from "./tabs";

const REPO = "https://github.com/plyght/saltos";
const DOCS = `${REPO}/blob/main/docs`;

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="ext" target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Edit({ section }: { section: string }) {
  return (
    <span className="mw-editsection">
      [
      <a
        href={`${REPO}/edit/main/docs/${section}.md`}
        target="_blank"
        rel="noreferrer"
      >
        edit
      </a>
      ]
    </span>
  );
}

function C({ children }: { children: ReactNode }) {
  return <code className="code">{children}</code>;
}

const INFOBOX: { th: string; td: ReactNode }[] = [
  { th: "Developer", td: "The saltOS project" },
  { th: "Written in", td: "Rust, shell, recipes" },
  { th: "OS family", td: "Linux (Unix-like)" },
  { th: "Working state", td: "Experimental" },
  { th: "Source model", td: "Open source" },
  { th: "Initial release", td: "12 June 2026" },
  {
    th: "Latest release",
    td: (
      <>
        0.1.0
        <br />
        <span style={{ color: "var(--text-soft)" }}>12 June 2026</span>
      </>
    ),
  },
  { th: "Package manager", td: <C>salt</C> },
  { th: "Platforms", td: "x86_64, aarch64" },
  { th: "Kernel type", td: "Monolithic (Linux)" },
  { th: "Userland", td: "Native base + foreign strata" },
  { th: "Default UI", td: "LXQt / Wayland (planned)" },
  { th: "License", td: "MIT" },
];

export function Article() {
  return (
    <main className="mw-body" role="main">
      <Tabs active="article" />

      <h1 id="firstHeading">saltOS</h1>
      <p className="tagline">
        From the saltOS handbook, the independent Linux distribution
      </p>

      <div className="mw-body-content">
        <p className="hatnote">
          This article is about the operating system. For the mineral, see{" "}
          <Ext href="https://en.wikipedia.org/wiki/Halite">Halite</Ext>. For the
          configuration tool, see{" "}
          <Ext href="https://en.wikipedia.org/wiki/Salt_(software)">
            Salt (software)
          </Ext>
          .
        </p>

        {/* infobox */}
        <table className="infobox">
          <tbody>
            <tr>
              <td className="infobox-title" colSpan={2}>
                saltOS
              </td>
            </tr>
            <tr>
              <td className="infobox-figure" colSpan={2}>
                <Crystal />
                <div className="infobox-caption">
                  Borrowed strata settle over a signed native base; the boundary
                  is the brackish line.
                </div>
              </td>
            </tr>
            <tr>
              <td className="infobox-header" colSpan={2}>
                General
              </td>
            </tr>
            {INFOBOX.map((r) => (
              <tr key={r.th}>
                <th scope="row">{r.th}</th>
                <td>{r.td}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Website</th>
              <td>
                <Ext href={REPO}>github.com/plyght/saltos</Ext>
              </td>
            </tr>
          </tbody>
        </table>

        {/* lead */}
        <p>
          <b>saltOS</b> is an independent{" "}
          <Ext href="https://en.wikipedia.org/wiki/Linux_distribution">
            Linux distribution
          </Ext>{" "}
          with its own boot, base system, init, package manager and rollback
          model. Its name follows the estuary metaphor: where fresh water meets
          the sea you get brackish water, and where a curated native base meets
          the wider Linux world you get saltOS. It is <b>not a fork</b> of an
          existing distribution&mdash;its foundation is built from recipes.
          <sup className="reference">[1]</sup>
        </p>
        <p>
          saltOS runs software from any major distribution through managed,
          rollbackable environments called <b>strata</b>. Components stay
          interchangeable and every change to the system is a <i>transaction</i>
          , so a machine never silts up into an untraceable pile of state.
          <sup className="reference">[2]</sup>
        </p>

        {/* TOC */}
        <div className="toc" role="navigation" aria-label="Contents">
          <div className="toc-title">Contents</div>
          <ol>
            <li>
              <a href="#Overview">
                <span className="tocnumber">1</span>Overview
              </a>
            </li>
            <li>
              <a href="#Strata">
                <span className="tocnumber">2</span>Strata
              </a>
            </li>
            <li>
              <a href="#Rollback">
                <span className="tocnumber">3</span>Rollback
              </a>
            </li>
            <li>
              <a href="#Package_manager">
                <span className="tocnumber">4</span>Package manager
              </a>
            </li>
            <li>
              <a href="#Comparison">
                <span className="tocnumber">5</span>Comparison with related
                systems
              </a>
            </li>
            <li>
              <a href="#Release_history">
                <span className="tocnumber">6</span>Release history
              </a>
            </li>
            <li>
              <a href="#References">
                <span className="tocnumber">7</span>References
              </a>
            </li>
          </ol>
        </div>

        {/* Overview */}
        <h2 id="Overview" className="h2-row">
          <span>Overview</span>
          <Edit section="architecture" />
        </h2>
        <p>
          saltOS builds its boot path, init, C library and package manager from
          source, so the foundation is genuinely independent rather than a
          reskin of another distribution. The root filesystem uses{" "}
          <Ext href="https://en.wikipedia.org/wiki/Btrfs">Btrfs</Ext>, and the
          system keeps a traditional filesystem layout that reads like any
          Linux, with no separate configuration language required to operate the
          machine.
        </p>
        <p>
          A declarative <C>system.toml</C> and a fully pinned{" "}
          <C>system.lock.toml</C> describe a machine completely: native packages
          by source, foreign packages by content hash. The pair reproduces an
          identical system on another host.
        </p>

        {/* Strata */}
        <h2 id="Strata" className="h2-row">
          <span>Strata</span>
          <Edit section="strata" />
        </h2>
        <p>
          A <b>stratum</b> is a managed root of another distribution,
          bootstrapped and snapshotted by saltOS. Arch, Debian, Void, Fedora,
          openSUSE and Alpine are supported. Foreign software is never silently
          merged into the host&rsquo;s <C>PATH</C>; it is run deliberately, for
          example <C>salt run arch firefox</C>, or selected commands are exposed
          with <C>salt expose</C>. Each stratum is snapshotted and rolled back
          on its own.<sup className="reference">[2]</sup>
        </p>

        {/* Rollback */}
        <h2 id="Rollback" className="h2-row">
          <span>Rollback</span>
          <Edit section="rollback" />
        </h2>
        <p>
          Every update snapshots the Btrfs root before touching it. A failed
          transaction rolls back automatically, and <C>salt rollback</C>{" "}
          restores the last known-good deployment. User data under <C>/home</C>{" "}
          is never touched by a rollback. Operations run in the foreground with
          no background daemon, verify{" "}
          <Ext href="https://en.wikipedia.org/wiki/EdDSA">ed25519</Ext>{" "}
          signatures before trusting metadata, and pin every source by hash.
          <sup className="reference">[3]</sup>
        </p>

        {/* Package manager */}
        <h2 id="Package_manager" className="h2-row">
          <span>Package manager</span>
          <Edit section="package-manager" />
        </h2>
        <p>
          The package manager is a single foreground tool, <C>salt</C>. Common
          operations:
        </p>
        <table className="wikitable">
          <tbody>
            <tr>
              <th>Command</th>
              <th>Effect</th>
            </tr>
            {[
              [
                "salt update",
                "Snapshot the root, apply the transaction, auto-rollback on failure",
              ],
              ["salt rollback", "Restore the last known-good deployment"],
              [
                "salt strata add arch",
                "Bootstrap an Arch root as a managed, snapshotted stratum",
              ],
              [
                "salt run arch firefox",
                "Run foreign software from a stratum without merging it in",
              ],
              ["salt expose rg", "Expose a chosen command on the host PATH"],
              [
                "salt build ./recipe",
                "Build, sign and publish a native package from a recipe",
              ],
            ].map(([cmd, desc]) => (
              <tr key={cmd}>
                <td>
                  <C>{cmd}</C>
                </td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Comparison */}
        <h2 id="Comparison" className="h2-row">
          <span>Comparison with related systems</span>
          <Edit section="architecture" />
        </h2>
        <table className="wikitable">
          <tbody>
            <tr>
              <th>System</th>
              <th>Borrows across distros</th>
              <th>Own base</th>
              <th>System rollback</th>
              <th>Config language</th>
            </tr>
            <tr>
              <td>
                <b>saltOS</b>
              </td>
              <td>Yes (strata)</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>
                <Ext href="https://en.wikipedia.org/wiki/Bedrock_Linux">
                  Bedrock
                </Ext>
              </td>
              <td>Yes</td>
              <td>No (sits on a host)</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr>
              <td>
                <Ext href="https://en.wikipedia.org/wiki/NixOS">NixOS</Ext>
              </td>
              <td>Partial</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>Yes (Nix)</td>
            </tr>
          </tbody>
        </table>
        <p>
          Like Bedrock, saltOS lets a user borrow packages across distributions;
          unlike Bedrock, it owns its own boot, init and base. Like NixOS, it
          offers whole-system rollback; unlike NixOS, it keeps a traditional
          layout and asks no separate language to describe the machine.
        </p>

        {/* Release history */}
        <h2 id="Release_history" className="h2-row">
          <span>Release history</span>
          <Edit section="changelog" />
        </h2>
        <table className="wikitable">
          <tbody>
            <tr>
              <th>Version</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
            <tr>
              <td>
                <b>0.1.0</b>
              </td>
              <td>2026-06-12</td>
              <td>
                First experimental milestone: self-hosted from-source ISO for
                x86_64 and aarch64; transactional host updates with automatic
                rollback; native package flow; first strata (Arch, Debian,
                Void).
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--text-soft)" }}>0.2.0</td>
              <td style={{ color: "var(--text-soft)" }}>planned</td>
              <td style={{ color: "var(--text-soft)" }}>
                First public signed release with documented formats; installable
                daily-driver desktop (LXQt, Wayland); per-stratum desktop
                integration.
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: "12.5px", color: "var(--text-soft)" }}>
          saltOS is under active construction and is not yet a daily-driver
          operating system.
        </p>

        {/* References */}
        <h2 id="References">References</h2>
        <ol className="references">
          <li id="ref-1">
            ^{" "}
            <Ext href={`${DOCS}/architecture.md`}>
              &ldquo;Architecture&rdquo;
            </Ext>
            . saltOS documentation.
          </li>
          <li id="ref-2">
            ^ <Ext href={`${DOCS}/strata.md`}>&ldquo;Strata&rdquo;</Ext>. saltOS
            documentation.
          </li>
          <li id="ref-3">
            ^{" "}
            <Ext href={`${DOCS}/rollback.md`}>&ldquo;Rollback model&rdquo;</Ext>
            . saltOS documentation.
          </li>
        </ol>
      </div>
    </main>
  );
}

function Crystal() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <rect width="64" height="64" fill="var(--content-bg)" />
      <g
        stroke="var(--text-soft)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M32 8 L54 20 L54 44 L32 56 L10 44 L10 20 Z" />
        <path d="M32 8 L32 32 M32 32 L54 20 M32 32 L10 20" />
        <path d="M32 32 L32 56" opacity="0.45" />
        <path d="M10 20 L32 32 L54 20" opacity="0.45" />
      </g>
    </svg>
  );
}
