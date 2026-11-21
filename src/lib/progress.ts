"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "lexi:progress:v1";

type Store = Record<string, Record<string, { done?: boolean; ex?: Record<string, boolean> }>>;

let cache: { raw: string | null; value: Store } = { raw: null, value: {} };
const listeners = new Set<() => void>();

function read(): Store {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (raw !== cache.raw) {
    let value: Store = {};
    try {
      value = raw ? (JSON.parse(raw) as Store) : {};
    } catch {}
    cache = { raw, value };
  }
  return cache.value;
}

function write(next: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

const empty: Store = {};

export function useProgress() {
  const store = useSyncExternalStore(subscribe, read, () => empty);

  const isDone = useCallback(
    (course: string, lesson: string) => !!store[course]?.[lesson]?.done,
    [store],
  );
  const isExerciseDone = useCallback(
    (course: string, lesson: string, ex: string) => !!store[course]?.[lesson]?.ex?.[ex],
    [store],
  );

  const setDone = useCallback((course: string, lesson: string, done: boolean) => {
    const s = structuredClone(read());
    s[course] ??= {};
    s[course][lesson] = { ...s[course][lesson], done };
    write(s);
  }, []);

  const setExerciseDone = useCallback((course: string, lesson: string, ex: string) => {
    const s = structuredClone(read());
    s[course] ??= {};
    const cur = s[course][lesson] ?? {};
    s[course][lesson] = { ...cur, ex: { ...cur.ex, [ex]: true } };
    write(s);
  }, []);

  return { isDone, isExerciseDone, setDone, setExerciseDone };
}
