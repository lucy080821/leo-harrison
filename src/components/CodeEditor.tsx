"use client";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { EditorView } from "@codemirror/view";
import { useIsDark } from "@/lib/theme";

const langExt = {
  html: () => html(),
  css: () => css(),
  javascript: () => javascript(),
  python: () => python(),
  sql: () => sql(),
} as const;

export function CodeEditor({
  value,
  lang,
  onChange,
}: {
  value: string;
  lang: keyof typeof langExt;
  onChange: (v: string) => void;
}) {
  const dark = useIsDark();
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={dark ? "dark" : "light"}
      extensions={[langExt[lang](), EditorView.lineWrapping]}
      onChange={onChange}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true }}
      className="h-full text-[13px] [&_.cm-editor]:h-full [&_.cm-scroller]:font-mono"
    />
  );
}
