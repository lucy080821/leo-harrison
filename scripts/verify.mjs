// Kiểm tra tự động nội dung: đáp án phải đạt mọi check, đề khởi đầu phải chưa đạt hết.
// Chạy: node scripts_verify.mjs   (cần: npx playwright đã cài sẵn, dev server không cần)
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const { chromium } = require("playwright");

const shim = fs.readFileSync("src/lib/nodeShim.ts", "utf8");
const src = fs.readFileSync("src/lib/sandbox.ts", "utf8").replace('import { NODE_SHIM } from "@/lib/nodeShim";', "");
const js = ts.transpileModule(shim + "\n" + src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const m = { exports: {} };
new Function("module", "exports", js)(m, m.exports);
const { buildSrcDoc } = m.exports;

const only = process.argv[2];
const PY = process.env.PYTHON_VERIFY || "python3";
const root = "content";
const browser = await chromium.launch();
let bad = 0, total = 0;

async function run(files, tests, runtime) {
  const page = await browser.newPage();
  await page.setContent("<html><body></body></html>");
  const doc = buildSrcDoc(files, runtime);
  await page.evaluate(
    ({ doc }) =>
      new Promise((res) => {
        const f = document.createElement("iframe");
        f.sandbox = "allow-scripts allow-forms";
        f.srcdoc = doc;
        f.id = "f";
        f.onload = () => setTimeout(res, 800);
        document.body.appendChild(f);
      }),
    { doc },
  );
  const results = await page.evaluate(
    (tests) =>
      new Promise((res) => {
        window.addEventListener("message", (e) => {
          if (e.data && e.data.type === "checked") res(e.data.results);
        });
        document.getElementById("f").contentWindow.postMessage({ lexi: true, type: "check", tests }, "*");
        setTimeout(() => res(null), 45000);
      }),
    tests,
  );
  await page.close();
  return results;
}

let sqlJs = null;
async function getSqlJs() {
  if (!sqlJs) {
    const initSqlJs = require("sql.js");
    sqlJs = await initSqlJs();
  }
  return sqlJs;
}

function readData(meta) {
  const data = {};
  for (const n of meta.data || []) data[n] = fs.readFileSync(path.join(root, "_data", "files", n), "utf8");
  const dataset = meta.dataset ? fs.readFileSync(path.join(root, "_data", "sql", meta.dataset + ".sql"), "utf8") : "";
  return { data, dataset };
}

function runPython(files, tests, data) {
  const r = spawnSync(PY, ["scripts/verify_python.py"], {
    input: JSON.stringify({ code: files.map((f) => f.code).join("\n"), tests, data }),
    encoding: "utf8",
    timeout: 120000,
  });
  try {
    return JSON.parse(r.stdout);
  } catch {
    return { error: (r.stderr || "no output").slice(-400), results: tests.map(() => false) };
  }
}

async function runSql(files, tests, dataset) {
  const SQL = await getSqlJs();
  const db = new SQL.Database();
  let tables = [];
  let error;
  try {
    if (dataset) db.exec(dataset);
    tables = db.exec(files.map((f) => f.code).join("\n")).map((r) => ({ columns: r.columns, rows: r.values }));
  } catch (e) {
    error = String(e.message || e);
  }
  const last = tables[tables.length - 1] || { columns: [], rows: [] };
  const q = (sql) => { const r = db.exec(sql); return r.length ? r[r.length - 1].values : []; };
  const results = tests.map((t) => {
    if (error) return false;
    try { return Boolean(new Function("columns", "rows", "tables", "q", "return (" + t + ")")(last.columns, last.rows, tables, q)); }
    catch { return false; }
  });
  db.close();
  return { error, results };
}

for (const course of fs.readdirSync(root)) {
  if (only && course !== only) continue;
  if (course.startsWith("_")) continue;
  for (const slug of fs.readdirSync(path.join(root, course)).sort()) {
    const dir = path.join(root, course, slug);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, "lesson.json"), "utf8"));
    const engine = meta.engine || "web";
    const { data, dataset } = readData(meta);
    for (const lang of ["vi", "en"]) {
      if (!fs.existsSync(path.join(dir, `${lang}.md`))) { console.log(`MISSING ${dir}/${lang}.md`); bad++; }
    }
    // Bài dạng bài viết (khoá ngữ âm): kiểm tra cấu trúc câu hỏi trắc nghiệm / gõ đáp án.
    for (const q of meta.quiz || []) {
      total++;
      const label = `${course}/${slug}/${q.id}`;
      const okText = (v) => v && v.vi && v.en;
      let ok = okText(q.q) && okText(q.explain);
      if (q.type === "choice") ok = ok && Array.isArray(q.options) && q.options.length >= 2 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length && q.options.every((o) => o.vi && o.en);
      else if (q.type === "text") ok = ok && Array.isArray(q.answers) && q.answers.length > 0;
      else ok = false;
      if (!ok) { console.log(`QUIZ INVALID    ${label}`); bad++; }
    }
    for (const ex of meta.exercises || []) {
      total++;
      const tests = ex.checks.map((c) => c.test);
      const label = `${course}/${slug}/${ex.id}`;
      let sol, st, solErr;
      if (engine === "python") {
        const a = runPython(ex.solution, tests, data); sol = a.results; solErr = a.error;
        st = runPython(ex.starter, tests, data).results;
      } else if (engine === "sql") {
        const a = await runSql(ex.solution, tests, dataset); sol = a.results; solErr = a.error;
        st = (await runSql(ex.starter, tests, dataset)).results;
      } else {
        sol = await run(ex.solution, tests, meta.runtime);
        st = await run(ex.starter, tests, meta.runtime);
      }
      if (!sol || !sol.every(Boolean)) { console.log(`SOLUTION FAILS  ${label}`, JSON.stringify(sol), solErr ? "\n  " + String(solErr).split("\n").slice(-3).join(" | ") : ""); bad++; }
      if (st && st.length && st.every(Boolean)) { console.log(`STARTER ALREADY PASSES  ${label}`); bad++; }
    }
  }
}
await browser.close();
console.log(`checked ${total} exercises, problems: ${bad}`);
process.exit(bad ? 1 : 0);
