"use client";

import type { EngineInput, EngineName, RunOutput, StatusKey } from "./types";

type Pending = {
  resolve: (r: RunOutput & { results?: boolean[] }) => void;
};

const WORKER_URL: Record<EngineName, string> = {
  python: "/workers/python-worker.js",
  sql: "/workers/sql-worker.js",
};

/** Bọc một Web Worker: gửi lệnh, nhận kết quả theo id, có thể dừng (terminate) khi chạy quá lâu. */
export class EngineClient {
  private worker: Worker | null = null;
  private pending = new Map<number, Pending>();
  private seq = 0;
  private onStatus: (s: StatusKey) => void = () => {};

  constructor(private name: EngineName) {}

  setStatusListener(fn: (s: StatusKey) => void) {
    this.onStatus = fn;
  }

  private ensure(): Worker {
    if (this.worker) return this.worker;
    const w = new Worker(WORKER_URL[this.name]);
    w.onmessage = (e: MessageEvent) => {
      const d = e.data as { type: string; id?: number; text?: StatusKey } & Partial<RunOutput> & { results?: boolean[] };
      if (d.type === "status" && d.text) {
        this.onStatus(d.text);
        return;
      }
      if (d.type === "done" && d.id !== undefined) {
        const p = this.pending.get(d.id);
        this.pending.delete(d.id);
        p?.resolve({
          lines: d.lines ?? [],
          images: d.images ?? [],
          tables: d.tables ?? [],
          error: d.error,
          ms: d.ms ?? 0,
          results: d.results,
        });
      }
    };
    w.onerror = (e) => {
      for (const [, p] of this.pending) {
        p.resolve({ lines: [], images: [], tables: [], error: e.message || "Worker error", ms: 0 });
      }
      this.pending.clear();
      this.worker?.terminate();
      this.worker = null;
    };
    this.worker = w;
    return w;
  }

  private send(type: "run" | "check", input: EngineInput, tests: string[]) {
    return new Promise<RunOutput & { results?: boolean[] }>((resolve) => {
      const id = ++this.seq;
      this.pending.set(id, { resolve });
      this.ensure().postMessage({ id, type, tests, ...input });
    });
  }

  run(input: EngineInput) {
    return this.send("run", input, []);
  }

  check(input: EngineInput, tests: string[]) {
    return this.send("check", input, tests);
  }

  /** Dừng worker (ví dụ vòng lặp vô hạn). Mọi lệnh đang chờ nhận kết quả "đã dừng". */
  stop(message: string) {
    this.worker?.terminate();
    this.worker = null;
    for (const [, p] of this.pending) {
      p.resolve({ lines: [], images: [], tables: [], error: message, ms: 0 });
    }
    this.pending.clear();
  }

  /** Khởi động sớm để người học không phải chờ ở lần chạy đầu. */
  warmUp() {
    this.ensure();
  }
}

const engines: Partial<Record<EngineName, EngineClient>> = {};
export function getEngine(name: EngineName) {
  return (engines[name] ??= new EngineClient(name));
}
