"use client";

import { useProgress } from "@/lib/progress";

export function LessonStatus({ course, lesson, label }: { course: string; lesson: string; label: string }) {
  const { isDone } = useProgress();
  const done = isDone(course, lesson);
  return (
    <span
      title={done ? label : undefined}
      aria-label={done ? label : undefined}
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${
        done ? "border-ok bg-ok text-white" : "border-line text-transparent"
      }`}
    >
      ✓
    </span>
  );
}

export function CourseProgress({
  course,
  lessons,
  label,
}: {
  course: string;
  lessons: string[];
  label: string;
}) {
  const { isDone } = useProgress();
  const n = lessons.filter((l) => isDone(course, l)).length;
  const pct = lessons.length ? Math.round((n / lessons.length) * 100) : 0;
  return (
    <div className="mt-4" aria-label={label}>
      <div className="mb-1 flex justify-between text-sm text-muted">
        <span>{label}</span>
        <span>
          {n}/{lessons.length}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface2">
        <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand2" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
