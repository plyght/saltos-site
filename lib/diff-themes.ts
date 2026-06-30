// Shiki/VS Code themes whose backgrounds, text and syntax colours are drawn
// from the saltOS handbook palette, so Pierre diffs read as part of the wiki.

type TokenColor = {
  scope: string | string[];
  settings: { foreground?: string; fontStyle?: string };
};

export type WikiDiffTheme = {
  name: string;
  type: "light" | "dark";
  colors: Record<string, string>;
  tokenColors: TokenColor[];
};

const wikiLight: WikiDiffTheme = {
  name: "wiki-light",
  type: "light",
  colors: {
    "editor.background": "#ffffff", // --content-bg
    "editor.foreground": "#202122", // --text
    "editorLineNumber.foreground": "#72777d", // --text-faint
    "editorLineNumber.activeForeground": "#54595d", // --text-soft
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#72777d", fontStyle: "italic" },
    },
    {
      scope: ["string", "constant.other.symbol"],
      settings: { foreground: "#0a7d4d" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant"],
      settings: { foreground: "#b5500f" },
    },
    {
      scope: ["keyword", "storage", "storage.type", "storage.modifier"],
      settings: { foreground: "#a3306f" },
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "#5a3bb0" },
    },
    {
      scope: ["entity.name.type", "support.type", "entity.name.class"],
      settings: { foreground: "#005cc5" },
    },
    {
      scope: ["variable", "variable.parameter", "meta.definition.variable"],
      settings: { foreground: "#202122" },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#54595d" },
    },
    {
      scope: ["entity.name.tag"],
      settings: { foreground: "#1a7f37" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#b5500f" },
    },
  ],
};

const wikiDark: WikiDiffTheme = {
  name: "wiki-dark",
  type: "dark",
  colors: {
    "editor.background": "#1b1f23", // --content-bg dark
    "editor.foreground": "#eaecf0", // --text dark
    "editorLineNumber.foreground": "#72777d",
    "editorLineNumber.activeForeground": "#a2a9b1",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#8d99a6", fontStyle: "italic" },
    },
    {
      scope: ["string", "constant.other.symbol"],
      settings: { foreground: "#7fd1a0" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant"],
      settings: { foreground: "#e0a36a" },
    },
    {
      scope: ["keyword", "storage", "storage.type", "storage.modifier"],
      settings: { foreground: "#e493c2" },
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "#c0a3f0" },
    },
    {
      scope: ["entity.name.type", "support.type", "entity.name.class"],
      settings: { foreground: "#7fb0e8" },
    },
    {
      scope: ["variable", "variable.parameter", "meta.definition.variable"],
      settings: { foreground: "#eaecf0" },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#a2a9b1" },
    },
    {
      scope: ["entity.name.tag"],
      settings: { foreground: "#7fd1a0" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#e0a36a" },
    },
  ],
};

export const WIKI_DIFF_THEMES: WikiDiffTheme[] = [wikiLight, wikiDark];
