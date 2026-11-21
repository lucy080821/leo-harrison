// Kiểm tra tự động nội dung: đáp án phải đạt mọi check, đề khởi đầu phải chưa đạt hết.
// Chạy: node scripts_verify.mjs   (cần: npx playwright đã cài sẵn, dev server không cần)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const { chromium } = require("playwright");

const src = fs.readFileSync("src/lib/sandbox.ts", "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: "ES2020" } }).outputText;
const m = { exports: {} };
new Function("module", "exports", js)(m, m.exports);
const { buildSrcDoc } = m.exports;

const only = process.argv[2];
const root = "content";
const browser = await chromium.launch();
let bad = 0, total = 0;

async function run(files, tests) {
  const page = await browser.newPage();
  await page.setContent("<html><body></body></html>");
  const doc = buildSrcDoc(files);
  await page.evaluate(
    ({ doc }) =>
      new Promise((res) => {
        const f = document.createElement("iframe");
        f.sandbox = "allow-scripts";
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
        setTimeout(() => res(null), 3000);
      }),
    tests,
  );
  await page.close();
  return results;
}

for (const course of fs.readdirSync(root)) {
  if (only && course !== only) continue;
  for (const slug of fs.readdirSync(path.join(root, course)).sort()) {
    const dir = path.join(root, course, slug);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, "lesson.json"), "utf8"));
    for (const lang of ["vi", "en"]) {
      if (!fs.existsSync(path.join(dir, `${lang}.md`))) { console.log(`MISSING ${dir}/${lang}.md`); bad++; }
    }
    for (const ex of meta.exercises) {
      total++;
      const tests = ex.checks.map((c) => c.test);
      const sol = await run(ex.solution, tests);
      const st = await run(ex.starter, tests);
      const label = `${course}/${slug}/${ex.id}`;
      if (!sol || !sol.every(Boolean)) { console.log(`SOLUTION FAILS  ${label}`, JSON.stringify(sol)); bad++; }
      if (st && st.length && st.every(Boolean)) { console.log(`STARTER ALREADY PASSES  ${label}`); bad++; }
    }
  }
}
await browser.close();
console.log(`checked ${total} exercises, problems: ${bad}`);
process.exit(bad ? 1 : 0);
