"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { EngineOutput, type EngineState } from "@/components/EngineOutput";
import { getEngine } from "@/lib/engines/client";
import type { EngineInput } from "@/lib/engines/types";
import { buildSrcDoc, type Runtime, type SandboxFile } from "@/lib/sandbox";
import { useProgress } from "@/lib/progress";
import type { Dict, L10n, Locale } from "@/lib/i18n";

type Check = { label: L10n; test: string };
type Exercise = {
  id: string;
  prompt: L10n;
  hint: L10n;
  starter: SandboxFile[];
  solution: SandboxFile[];
  checks: Check[];
};

type Props = {
  lang: Locale;
  t: Dict;
  courseId: string;
  slug: string;
  files: SandboxFile[];
  preview: "web" | "console";
  engine: "web" | "python" | "sql";
  runtime?: Runtime;
  engineData: { data: Record<string, string>; dataset?: string };
  exercises: Exercise[];
  prevHref?: string;
  nextHref?: string;
  children: ReactNode; // phần lý thuyết đã render ở server
};

type LogLine = { level: string; text: string };

const clone = (f: SandboxFile[]) => f.map((x) => ({ ...x }));

export function LessonWorkspace(p: Props) {
  const { lang, t } = p;
  const { isDone, setDone, isExerciseDone, setExerciseDone } = useProgress();

  const [mode, setMode] = useState<string>("play");
  const [filesByMode, setFilesByMode] = useState<Record<string, SandboxFile[]>>({
    play: clone(p.files),
  });
  const firstVisible = (list: SandboxFile[]) => Math.max(0, list.findIndex((f) => !f.hidden));
  const [activeFile, setActiveFile] = useState(() => firstVisible(p.files));
  const [outTab, setOutTab] = useState<"preview" | "console">(p.preview === "console" ? "console" : "preview");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [results, setResults] = useState<Record<string, boolean[]>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [srcDoc, setSrcDoc] = useState(() => buildSrcDoc(p.files, p.runtime));

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pendingCheck = useRef<string | null>(null);
  const loadToken = useRef(0);
  const [checking, setChecking] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const checkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----- Engine Python / SQL (chạy trong Web Worker) -----
  const isEngine = p.engine !== "web";
  const engineName = p.engine === "python" ? "python" : "sql";
  const [es, setEs] = useState<EngineState>({ status: "idle" });
  const [slow, setSlow] = useState(false);
  const runSeq = useRef(0);
  const checkSeq = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const files = useMemo(() => filesByMode[mode] ?? [], [filesByMode, mode]);
  const visible = files.map((f, i) => ({ f, i })).filter(({ f }) => !f.hidden);
  const current = files[activeFile] ?? files[0];
  const exercise = p.exercises.find((e) => e.id === mode);

  // Realtime: gõ đến đâu cập nhật đến đó (debounce nhẹ để không giật).
  useEffect(() => {
    const doc = buildSrcDoc(files, p.runtime);
    const id = setTimeout(() => {
      if (pendingCheck.current) return; // đang chấm bài: giữ nguyên trang để không nạp lại giữa chừng
      setSrcDoc((prev) => {
        if (prev !== doc) setLogs([]);
        return doc;
      });
    }, 300);
    return () => clearTimeout(id);
  }, [files, p.runtime]);

  const engineInput = useCallback(
    (list: SandboxFile[]): EngineInput => ({
      code: list.map((f) => f.code).join("\n"),
      data: p.engineData.data,
      dataset: p.engineData.dataset,
    }),
    [p.engineData],
  );

  const runEngine = useCallback(
    async (list: SandboxFile[]) => {
      const seq = ++runSeq.current;
      const eng = getEngine(engineName);
      eng.setStatusListener((note) => setEs((st) => (seq === runSeq.current ? { ...st, note } : st)));
      setEs((st) => ({ ...st, status: "running", note: "running" }));
      const out = await eng.run(engineInput(list));
      if (seq === runSeq.current) setEs({ status: "done", output: out });
    },
    [engineName, engineInput],
  );

  // Realtime cho Python/SQL: gõ xong khoảng 0,7 giây thì tự chạy lại (mỗi lần chạy dùng môi trường sạch).
  useEffect(() => {
    if (!isEngine) return;
    const id = setTimeout(() => void runEngine(files), 700);
    autoTimer.current = id;
    return () => clearTimeout(id);
  }, [files, isEngine, runEngine]);

  // Nếu chạy quá lâu thì hiện nút Dừng.
  useEffect(() => {
    if (es.status !== "running") return;
    const id = setTimeout(() => setSlow(true), 8000);
    return () => {
      clearTimeout(id);
      setSlow(false);
    };
  }, [es.status]);

  function stopEngine() {
    runSeq.current++;
    getEngine(engineName).stop(t.stopped);
    setEs({
      status: "done",
      output: { lines: [], images: [], tables: [], error: t.stopped, ms: 0 },
    });
  }

  const sendCheck = useCallback(
    (exId: string) => {
      const ex = p.exercises.find((e) => e.id === exId);
      iframeRef.current?.contentWindow?.postMessage(
        { lexi: true, type: "check", tests: ex?.checks.map((c) => c.test) ?? [] },
        "*",
      );
    },
    [p.exercises],
  );

  // Nhận log và kết quả kiểm tra từ iframe.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      const d = e.data as { lexi?: boolean; type?: string; level?: string; text?: string; results?: boolean[] };
      if (!d?.lexi) return;
      if (d.type === "log") {
        setLogs((l) => [...l.slice(-199), { level: d.level ?? "log", text: d.text ?? "" }]);
      } else if (d.type === "checked" && d.results) {
        const exId = pendingCheck.current;
        pendingCheck.current = null;
        if (checkTimer.current) clearTimeout(checkTimer.current);
        setChecking(false);
        setTimedOut(false);
        if (!exId) return;
        setResults((r) => ({ ...r, [exId]: d.results! }));
        if (d.results.length > 0 && d.results.every(Boolean)) {
          setExerciseDone(p.courseId, p.slug, exId);
        }
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [p.courseId, p.slug, setExerciseDone]);

  function setFiles(next: SandboxFile[]) {
    setFilesByMode((m) => ({ ...m, [mode]: next }));
  }

  function edit(code: string) {
    setFiles(files.map((f, i) => (i === activeFile ? { ...f, code } : f)));
  }

  function selectMode(id: string) {
    if (id !== "play" && !filesByMode[id]) {
      const ex = p.exercises.find((e) => e.id === id);
      if (ex) setFilesByMode((m) => ({ ...m, [id]: clone(ex.starter) }));
    }
    setMode(id);
    setActiveFile(firstVisible(id === "play" ? p.files : (p.exercises.find((e) => e.id === id)?.starter ?? p.files)));
  }

  function reset() {
    setFiles(clone(exercise ? exercise.starter : p.files));
    setActiveFile(firstVisible(exercise ? exercise.starter : p.files));
    if (exercise) setResults((r) => ({ ...r, [exercise.id]: [] }));
  }

  async function runCheckEngine() {
    if (!exercise) return;
    // Huỷ lượt tự chạy đang chờ và bỏ qua kết quả tự chạy cũ: lượt chấm bài được ưu tiên.
    if (autoTimer.current) clearTimeout(autoTimer.current);
    runSeq.current++;
    const seq = ++checkSeq.current;
    setEs((st) => ({ ...st, status: "running", note: "running" }));
    const out = await getEngine(engineName).check(
      engineInput(files),
      exercise.checks.map((c) => c.test),
    );
    if (seq !== checkSeq.current) return;
    setEs({ status: "done", output: out });
    const res = out.results ?? exercise.checks.map(() => false);
    setResults((r) => ({ ...r, [exercise.id]: res }));
    if (res.length > 0 && res.every(Boolean)) setExerciseDone(p.courseId, p.slug, exercise.id);
  }

  function runCheck() {
    if (!exercise) return;
    if (isEngine) {
      void runCheckEngine();
      return;
    }
    // Luôn nạp lại trang sạch trước khi chấm để trạng thái cũ (biến đếm, timer...) không làm sai kết quả.
    pendingCheck.current = exercise.id;
    setChecking(true);
    setTimedOut(false);
    setResults((r) => ({ ...r, [exercise.id]: [] }));
    if (checkTimer.current) clearTimeout(checkTimer.current);
    checkTimer.current = setTimeout(() => {
      if (!pendingCheck.current) return;
      pendingCheck.current = null;
      setChecking(false);
      setTimedOut(true);
    }, 40000);
    setLogs([]);
    setSrcDoc(buildSrcDoc(files, p.runtime) + `<!-- run ${Date.now()} -->`);
  }

  const exResults = exercise ? results[exercise.id] : undefined;
  const allPassed = !!exResults && exResults.length > 0 && exResults.every(Boolean);
  const failed = !!exResults && exResults.length > 0 && !allPassed;
  const lessonDone = isDone(p.courseId, p.slug);

  return (
    <div className="mx-auto grid max-w-[1600px] gap-0 lg:h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* ===== Trái: lý thuyết + bài tập ===== */}
      <section className="min-w-0 overflow-y-auto border-line px-5 py-6 lg:border-r" aria-label={t.theory}>
        {p.children}

        {p.exercises.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-3 text-xl font-bold">{t.exercises}</h2>
            <ol className="space-y-4">
              {p.exercises.map((ex, idx) => {
                const active = mode === ex.id;
                const done = isExerciseDone(p.courseId, p.slug, ex.id);
                return (
                  <li
                    key={ex.id}
                    className={`rounded-xl border p-4 ${active ? "border-brand bg-brandsoft" : "border-line bg-surface"}`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${
                          done ? "bg-ok text-white" : "bg-surface2 text-muted"
                        }`}
                      >
                        {done ? "✓" : idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.95rem] leading-relaxed">{ex.prompt[lang]}</p>

                        {!active && (
                          <button
                            type="button"
                            onClick={() => selectMode(ex.id)}
                            className="mt-3 rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
                          >
                            {t.doExercise}
                          </button>
                        )}

                        {active && (
                          <div className="mt-3 space-y-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={runCheck}
                                className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
                              >
                                {t.check}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowHint((h) => ({ ...h, [ex.id]: !h[ex.id] }))}
                                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:bg-surface2"
                              >
                                {t.hint}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFiles(clone(ex.solution));
                                  setActiveFile(firstVisible(ex.solution));
                                }}
                                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:bg-surface2"
                              >
                                {t.solution}
                              </button>
                              <button
                                type="button"
                                onClick={reset}
                                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:bg-surface2"
                              >
                                {t.reset}
                              </button>
                            </div>

                            {showHint[ex.id] && (
                              <p className="rounded-lg bg-surface px-3 py-2 text-sm text-muted">💡 {ex.hint[lang]}</p>
                            )}

                            {active && checking && (
                              <p role="status" className="text-sm font-semibold text-muted">
                                ⏳ {t.checking}
                              </p>
                            )}
                            {active && timedOut && !checking && (
                              <p role="status" className="text-sm font-semibold text-bad">
                                {t.checkTimeout}
                              </p>
                            )}
                            {(allPassed || failed) && (
                              <p
                                role="status"
                                className={`text-sm font-semibold ${allPassed ? "text-ok" : "text-bad"}`}
                              >
                                {allPassed ? t.passed : t.notYet}
                              </p>
                            )}

                            <ul className="space-y-1.5 text-sm">
                              {ex.checks.map((c, i) => {
                                const r = exResults?.[i];
                                return (
                                  <li key={i} className="flex gap-2">
                                    <span
                                      className={`mt-0.5 ${r === true ? "text-ok" : r === false ? "text-bad" : "text-muted"}`}
                                      aria-hidden="true"
                                    >
                                      {r === true ? "✔" : r === false ? "✘" : "○"}
                                    </span>
                                    <span>{c.label[lang]}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => setDone(p.courseId, p.slug, !lessonDone)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              lessonDone ? "bg-ok text-white" : "border border-line bg-surface hover:bg-surface2"
            }`}
          >
            {lessonDone ? `✓ ${t.done}` : t.markDone}
          </button>
          <div className="flex gap-2 text-sm font-semibold">
            {p.prevHref && (
              <Link href={p.prevHref} className="rounded-lg border border-line bg-surface px-3 py-2 hover:bg-surface2">
                ← {t.prev}
              </Link>
            )}
            {p.nextHref && (
              <Link href={p.nextHref} className="rounded-lg bg-brand px-3 py-2 text-white hover:opacity-90">
                {t.next} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ===== Phải: editor + kết quả realtime ===== */}
      <section className="flex min-h-[640px] min-w-0 flex-col lg:min-h-0" aria-label={t.practice}>
        <div className="flex flex-wrap items-center gap-1.5 border-b border-line bg-surface px-3 py-2 text-sm">
          <button
            type="button"
            onClick={() => selectMode("play")}
            className={`rounded-md px-2.5 py-1 font-semibold ${mode === "play" ? "bg-brand text-white" : "text-muted hover:bg-surface2"}`}
          >
            {t.playground}
          </button>
          {p.exercises.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => selectMode(ex.id)}
              className={`rounded-md px-2.5 py-1 font-semibold ${mode === ex.id ? "bg-brand text-white" : "text-muted hover:bg-surface2"}`}
            >
              {t.exercises} {i + 1}
            </button>
          ))}
        </div>

        <div className="flex gap-1 border-b border-line bg-surface2 px-2 pt-1.5 text-sm">
          {visible.map(({ f, i }) => (
            <button
              key={f.name}
              type="button"
              onClick={() => setActiveFile(i)}
              className={`rounded-t-md px-3 py-1.5 font-mono text-xs ${
                i === activeFile ? "bg-surface font-semibold text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="h-[300px] min-h-0 flex-1 overflow-hidden lg:h-auto lg:basis-1/2">
          {current && <CodeEditor key={`${mode}:${current.name}`} value={current.code} lang={current.lang} onChange={edit} />}
        </div>

        {isEngine ? (
          <>
            <div className="flex items-center gap-2 border-y border-line bg-surface px-2 py-1.5 text-sm">
              <button
                type="button"
                onClick={() => void runEngine(files)}
                className="rounded-md bg-brand px-3 py-1 font-semibold text-white hover:opacity-90"
              >
                ▶ {t.run}
              </button>
              {slow && (
                <button
                  type="button"
                  onClick={stopEngine}
                  className="rounded-md border border-bad px-3 py-1 font-semibold text-bad hover:bg-surface2"
                >
                  ■ {t.stop}
                </button>
              )}
              <span className="ml-1 font-semibold text-brand">{t.result}</span>
              <span className="ml-auto hidden self-center pr-1 text-xs text-muted xl:inline">
                {slow ? t.slowHint : t.autoRunNote}
              </span>
            </div>
            <div className="relative h-[260px] min-h-0 flex-1 lg:h-auto lg:basis-1/2">
              <EngineOutput state={es} t={t} engine={p.engine} />
            </div>
          </>
        ) : (
          <>
        <div className="flex gap-1 border-y border-line bg-surface px-2 py-1.5 text-sm">
          {(["preview", "console"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setOutTab(tab)}
              className={`rounded-md px-3 py-1 font-semibold ${outTab === tab ? "bg-brandsoft text-brand" : "text-muted hover:bg-surface2"}`}
            >
              {tab === "preview" ? t.preview : `${t.console}${logs.length ? ` (${logs.length})` : ""}`}
            </button>
          ))}
          <span className="ml-auto hidden self-center pr-1 text-xs text-muted xl:inline">{t.runtimeNote}</span>
        </div>

        <div className="relative h-[260px] min-h-0 flex-1 lg:h-auto lg:basis-1/2">
          <iframe
            ref={iframeRef}
            title={t.preview}
            sandbox="allow-scripts allow-forms"
            srcDoc={srcDoc}
            onLoad={() => {
              // Chờ một chút để các timer/promise ngắn trong code của bạn kịp chạy xong rồi mới chấm.
              // Mỗi lần nạp trang chỉ gửi đúng một lệnh chấm (tránh chấm đôi khi trang nạp lại liên tiếp).
              const token = ++loadToken.current;
              if (pendingCheck.current) {
                setTimeout(() => {
                  if (token === loadToken.current && pendingCheck.current) sendCheck(pendingCheck.current);
                }, 700);
              }
            }}
            className={`h-full w-full bg-white ${outTab === "preview" ? "" : "hidden"}`}
          />
          {outTab === "console" && (
            <div className="h-full overflow-auto bg-surface p-3 font-mono text-xs">
              {logs.length === 0 ? (
                <p className="text-muted">{t.emptyConsole}</p>
              ) : (
                logs.map((l, i) => (
                  <pre
                    key={i}
                    className={`whitespace-pre-wrap border-b border-line/60 py-1 ${
                      l.level === "error" ? "text-bad" : l.level === "warn" ? "text-amber-500" : ""
                    }`}
                  >
                    {l.text}
                  </pre>
                ))
              )}
            </div>
          )}
        </div>
          </>
        )}
      </section>
    </div>
  );
}
