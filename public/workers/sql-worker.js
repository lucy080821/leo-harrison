/* Worker chạy SQL bằng SQLite (sql.js, WebAssembly). Mỗi lần chạy tạo CSDL mới trong bộ nhớ. */
importScripts("/vendor/sqljs/sql-wasm.js");

let sqlPromise = null;
function getSql() {
  if (!sqlPromise) {
    postMessage({ type: "status", text: "loading-sql" });
    sqlPromise = initSqlJs({ locateFile: (f) => "/vendor/sqljs/" + f });
  }
  return sqlPromise;
}

onmessage = async (event) => {
  const { id, type, code, dataset, tests } = event.data;
  const t0 = performance.now();
  try {
    const SQL = await getSql();
    const db = new SQL.Database();
    let tables = [];
    let error;
    try {
      if (dataset) db.exec(dataset);
      tables = db.exec(code).map((r) => ({ columns: r.columns, rows: r.values }));
    } catch (e) {
      error = String((e && e.message) || e);
    }
    let results;
    if (type === "check") {
      const last = tables[tables.length - 1] || { columns: [], rows: [] };
      const q = (sql) => {
        const r = db.exec(sql);
        return r.length ? r[r.length - 1].values : [];
      };
      results = tests.map((t) => {
        if (error) return false;
        try {
          return Boolean(new Function("columns", "rows", "tables", "q", "return (" + t + ")")(last.columns, last.rows, tables, q));
        } catch (e) {
          return false;
        }
      });
    }
    db.close();
    postMessage({ id, type: "done", lines: [], images: [], tables, error, results, ms: Math.round(performance.now() - t0) });
  } catch (e) {
    postMessage({ id, type: "done", lines: [], images: [], tables: [], error: String((e && e.message) || e), ms: 0 });
  }
};
