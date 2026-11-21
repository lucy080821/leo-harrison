"use client";

import type { RunOutput, StatusKey } from "@/lib/engines/types";
import type { Dict } from "@/lib/i18n";

export type EngineState = {
  status: "idle" | "running" | "done";
  note?: StatusKey;
  output?: RunOutput;
};

function statusText(t: Dict, note?: StatusKey) {
  if (note === "loading-python") return t.loadingPython;
  if (note === "loading-packages") return t.loadingPackages;
  if (note === "loading-sql") return t.loadingSql;
  return t.running;
}

/** Khung hiển thị kết quả cho Python (chữ, hình vẽ) và SQL (bảng). */
export function EngineOutput({ state, t, engine }: { state: EngineState; t: Dict; engine: "python" | "sql" | "web" }) {
  const out = state.output;
  const busy = state.status === "running";

  return (
    <div className="h-full overflow-auto bg-surface p-3 font-mono text-xs">
      {busy && <p className="mb-2 text-brand">⏳ {statusText(t, state.note)}</p>}

      {!out && !busy && <p className="text-muted">{t.noOutput}</p>}

      {out && (
        <div className={busy ? "opacity-50" : ""}>
          {out.lines.length > 0 && (
            <pre className="whitespace-pre-wrap">
              {out.lines.map((l, i) => (
                <span key={i} className={l.kind === "err" ? "text-bad" : ""}>
                  {l.text}
                  {"\n"}
                </span>
              ))}
            </pre>
          )}

          {out.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt={`plot ${i + 1}`} className="my-2 max-w-full rounded border border-line bg-white" />
          ))}

          {out.tables.map((tb, i) => (
            <div key={i} className="mb-3 overflow-x-auto">
              <table className="min-w-full border-collapse text-[12px]">
                <thead>
                  <tr>
                    {tb.columns.map((c, j) => (
                      <th key={j} className="border border-line bg-surface2 px-2 py-1 text-left font-semibold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tb.rows.slice(0, 200).map((r, j) => (
                    <tr key={j}>
                      {r.map((v, k) => (
                        <td key={k} className="border border-line px-2 py-1">
                          {v === null ? <span className="text-muted italic">NULL</span> : String(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-1 text-muted">
                {tb.rows.length} {t.rowsWord}
                {tb.rows.length > 200 ? " (200 đầu / first 200)" : ""}
              </p>
            </div>
          ))}

          {out.error && <pre className="whitespace-pre-wrap text-bad">{out.error}</pre>}

          {!out.error && out.lines.length === 0 && out.images.length === 0 && out.tables.length === 0 && (
            <p className="text-muted">{engine === "sql" ? t.noRows : t.emptyOutput}</p>
          )}
          {state.status === "done" && <p className="mt-2 text-[11px] text-muted">{t.ranIn} {out.ms} ms</p>}
        </div>
      )}
    </div>
  );
}
