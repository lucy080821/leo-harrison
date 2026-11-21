export type OutLine = { kind: "out" | "err"; text: string };
export type SqlTable = { columns: string[]; rows: unknown[][] };

export type RunOutput = {
  lines: OutLine[];
  images: string[];
  tables: SqlTable[];
  error?: string;
  ms: number;
};

export type EngineName = "python" | "sql";

export type EngineInput = {
  code: string;
  /** Python: các file dữ liệu (tên → nội dung) ghi vào hệ file ảo trước khi chạy */
  data?: Record<string, string>;
  /** SQL: script khởi tạo CSDL (CREATE TABLE + INSERT) */
  dataset?: string;
};

export type StatusKey = "loading-python" | "loading-packages" | "loading-sql" | "running";
