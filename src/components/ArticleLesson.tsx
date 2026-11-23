"use client";

import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { quizText } from "@/content/english";
import type { Locale } from "@/lib/i18n";

type L = { vi: string; en: string };
export type ClientQuizItem =
  | { id: string; type: "choice"; q: L; options: L[]; answer: number; explain: L }
  | { id: string; type: "text"; q: L; answers: string[]; ipa?: boolean; explain: L };

/** Chuẩn hoá câu trả lời IPA: bỏ / / [ ], khoảng trắng; ":" thành "ː"; "g" thành "ɡ"; "ɹ" thành "r". */
function normalize(s: string, ipa: boolean) {
  let v = s.trim().toLowerCase();
  if (ipa) {
    v = v.replace(/[\/\[\]\s.]/g, "").replace(/:/g, "ː").replace(/g/g, "ɡ").replace(/ɹ/g, "r");
  } else {
    v = v.replace(/\s+/g, " ");
  }
  return v;
}

function Question({
  item,
  lang,
  index,
  onCorrect,
  solved,
}: {
  item: ClientQuizItem;
  lang: Locale;
  index: number;
  onCorrect: () => void;
  solved: boolean;
}) {
  const t = quizText[lang];
  const [picked, setPicked] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong" | "shown">(solved ? "right" : "idle");

  function judge(ok: boolean) {
    if (ok) {
      setState("right");
      onCorrect();
    } else {
      setState("wrong");
    }
  }

  const revealed = state === "right" || state === "shown";
  const answerText =
    item.type === "choice" ? item.options[item.answer][lang] : item.answers[0];

  return (
    <li className="rounded-lg border border-line bg-surface p-5">
      <p className="font-semibold">
        <span className="mr-2 text-muted">{index + 1}.</span>
        {item.q[lang]}
      </p>

      {item.type === "choice" ? (
        <div className="mt-3 space-y-2" role="radiogroup" aria-label={item.q[lang]}>
          {item.options.map((o, i) => {
            const chosen = picked === i;
            const isAnswer = i === item.answer;
            let cls = "border-line hover:border-brand";
            if (revealed && isAnswer) cls = "border-ok bg-ok/10";
            else if (state === "wrong" && chosen) cls = "border-bad bg-bad/10";
            else if (chosen) cls = "border-brand bg-brandsoft";
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={chosen}
                disabled={revealed}
                onClick={() => {
                  setPicked(i);
                  judge(i === item.answer);
                }}
                className={`block w-full rounded-md border px-4 py-2.5 text-left transition ${cls}`}
              >
                {o[lang]}
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="mt-3 flex flex-wrap items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const ipa = item.ipa !== false;
            const ok = item.answers.some((a) => normalize(a, ipa) === normalize(text, ipa));
            judge(ok);
          }}
        >
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (state === "wrong") setState("idle");
            }}
            disabled={revealed}
            placeholder={t.typeHere}
            aria-label={item.q[lang]}
            className="min-w-[12rem] flex-1 rounded-md border border-line bg-bg px-3 py-2 outline-none focus:border-brand"
            lang="en"
            autoComplete="off"
            spellCheck={false}
          />
          {!revealed && (
            <button type="submit" className="btn-primary text-sm">
              {t.check}
            </button>
          )}
        </form>
      )}

      <div aria-live="polite" className="mt-3 text-sm">
        {state === "right" && <p className="font-semibold text-ok">{t.correct}</p>}
        {state === "wrong" && (
          <p className="text-bad">
            {t.wrong}{" "}
            <button type="button" className="link-quiet font-semibold text-fg" onClick={() => setState("shown")}>
              {t.showAnswer}
            </button>
          </p>
        )}
        {state === "shown" && (
          <p className="font-semibold">
            {t.answerIs}: <span className="ipa">{answerText}</span>
          </p>
        )}
        {revealed && <p className="mt-1 text-muted">{item.explain[lang]}</p>}
      </div>
    </li>
  );
}

export function ArticleLesson({
  lang,
  courseId,
  slug,
  quiz,
  isPractice,
  backHref,
  crumbs,
  prevHref,
  nextHref,
  moduleTitle,
  title,
  minutes,
  children,
}: {
  lang: Locale;
  courseId: string;
  slug: string;
  quiz: ClientQuizItem[];
  isPractice: boolean;
  backHref: string;
  crumbs?: Crumb[];
  prevHref?: string;
  nextHref?: string;
  moduleTitle: string;
  title: string;
  minutes: number;
  children: React.ReactNode;
}) {
  const t = quizText[lang];
  const { isDone, isExerciseDone, setDone, setExerciseDone } = useProgress();
  const done = isDone(courseId, slug);
  const solvedCount = quiz.filter((q) => isExerciseDone(courseId, slug, q.id)).length;
  const allSolved = quiz.length > 0 && solvedCount === quiz.length;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      {crumbs ? (
        <Breadcrumbs items={crumbs} />
      ) : (
        <Link href={backHref} className="text-sm text-muted hover:text-brand">
          ← {t.backToCourse}
        </Link>
      )}
      <p className="mt-4 text-sm text-muted">
        {moduleTitle} · {minutes} {t.minutes}
        {isPractice ? ` · ${t.practice}` : ""}
      </p>
      <h1 className="h-display mt-1 text-3xl sm:text-4xl">{title}</h1>

      <div className="mt-6">{children}</div>

      {quiz.length > 0 && (
        <section aria-labelledby="quiz-h" className="mt-12">
          <h2 id="quiz-h" className="h-display text-2xl">
            {isPractice ? t.practice : t.quickCheck}
          </h2>
          {isPractice && <p className="mt-2 text-muted">{t.practiceIntro}</p>}
          {quiz.some((q) => q.type === "text" && q.ipa !== false) && <p className="mt-1 text-sm text-muted">{t.hintIpa}</p>}
          <ol className="mt-5 space-y-4">
            {quiz.map((q, i) => (
              <Question
                key={q.id}
                item={q}
                lang={lang}
                index={i}
                solved={isExerciseDone(courseId, slug, q.id)}
                onCorrect={() => setExerciseDone(courseId, slug, q.id)}
              />
            ))}
          </ol>
          {allSolved && <p className="mt-4 font-semibold text-ok">{t.allDone}</p>}
        </section>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setDone(courseId, slug, !done)}
          className={done ? "rounded-lg border border-ok px-4 py-2 font-semibold text-ok" : "btn-primary"}
        >
          {done ? `✓ ${t.done}` : t.markDone}
        </button>
        <div className="flex items-center gap-5 text-sm font-semibold">
          {prevHref && (
            <Link href={prevHref} className="link-quiet">
              ← {t.prev}
            </Link>
          )}
          {nextHref && (
            <Link href={nextHref} className="link-quiet">
              {t.next} →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
