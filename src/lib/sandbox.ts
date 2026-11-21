import { NODE_SHIM } from "@/lib/nodeShim";

export type SandboxFile = {
  name: string;
  lang: "html" | "css" | "javascript" | "jsx" | "python" | "sql";
  code: string;
  hidden?: boolean;
};

/** "react": JSX qua Babel + React từ CDN; "rn": như react nhưng có react-native-web; "node": lớp mô phỏng Node */
export type Runtime = "react" | "rn" | "node";

const BLANK = `<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>`;

const BRIDGE = `
(function(){
  var logs = []; window.__logs = logs;
  window.__readyPromise = new Promise(function(r){ window.__resolveReady = r; });
  if (!window.__wait) window.__resolveReady();
  function send(level, text){ logs.push(text); try { parent.postMessage({lexi:true,type:'log',level:level,text:text},'*'); } catch(e){} }
  function fmt(a){
    try {
      var t = typeof a;
      if (t === 'string') return a;
      if (a === null || t === 'number' || t === 'boolean' || t === 'bigint' || t === 'symbol' || t === 'undefined') return String(a);
      if (t === 'function') return '[Function' + (a.name ? ': ' + a.name : '') + ']';
      if (a instanceof Error) return a.name + ': ' + a.message;
      if (a instanceof Map) return 'Map(' + a.size + ') {' + Array.from(a.entries()).map(function(e){ return fmt1(e[0]) + ' => ' + fmt1(e[1]); }).join(', ') + '}';
      if (a instanceof Set) return 'Set(' + a.size + ') {' + Array.from(a.values()).map(fmt1).join(', ') + '}';
      if (typeof Node !== 'undefined' && a instanceof Node) return a.outerHTML || String(a.nodeName);
      var compact = JSON.stringify(a, rep);
      if (compact.length <= 72) return compact;
      return JSON.stringify(a, rep, 2);
    } catch(e){ return String(a); }
  }
  function fmt1(a){ return typeof a === 'string' ? JSON.stringify(a) : fmt(a); }
  function rep(k, v){
    if (typeof v === 'function') return '[Function]';
    if (typeof v === 'undefined') return '[undefined]';
    if (typeof v === 'number' && !isFinite(v)) return String(v);
    if (v instanceof Map) return {Map: Array.from(v.entries())};
    if (v instanceof Set) return {Set: Array.from(v.values())};
    return v;
  }
  ['log','info','warn','error'].forEach(function(m){
    var orig = console[m];
    console[m] = function(){
      send(m, [].map.call(arguments, fmt).join(' '));
      orig.apply(console, arguments);
    };
  });
  window.addEventListener('error', function(e){ send('error', (e.message || 'Error')); });
  window.addEventListener('unhandledrejection', function(e){ send('error', 'Unhandled: ' + fmt(e.reason)); });
  window.addEventListener('message', async function(e){
    var d = e.data;
    if (!d || d.lexi !== true || d.type !== 'check') return;
    // Chờ trang (nhất là React tải từ CDN) dựng xong, tối đa 25 giây.
    await Promise.race([window.__readyPromise, new Promise(function(r){ setTimeout(r, 25000); })]);
    await new Promise(function(r){ setTimeout(r, 60); });
    var results = [];
    for (var i = 0; i < d.tests.length; i++) {
      try { var v = (new Function('logs', 'return (' + d.tests[i] + ')'))(logs); results.push(!!(await v)); }
      catch(err){ results.push(false); }
    }
    parent.postMessage({lexi:true,type:'checked',results:results},'*');
  });
})();`;

const IMPORT_MAP = {
  imports: {
    react: "https://esm.sh/react@18.3.1",
    "react/jsx-runtime": "https://esm.sh/react@18.3.1/jsx-runtime",
    "react-dom": "https://esm.sh/react-dom@18.3.1",
    "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
    "react-dom/server": "https://esm.sh/react-dom@18.3.1/server",
    "react-native": "https://esm.sh/react-native-web@0.19.13?deps=react@18.3.1,react-dom@18.3.1",
  },
};

const BABEL_URL = "https://cdn.jsdelivr.net/npm/@babel/standalone@7.26.2/babel.min.js";

function stripRefs(html: string, names: string[]) {
  let out = html;
  for (const raw of names) {
    const n = raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out
      .replace(new RegExp(`<link[^>]*href=["']\\.?/?${n}["'][^>]*>`, "gi"), "")
      .replace(new RegExp(`<script[^>]*src=["']\\.?/?${n}["'][^>]*>\\s*</script>`, "gi"), "");
  }
  return out;
}

/** Tách `export default` ra để khung chạy tự gắn component vào #root. Trả về [mã đã sửa, tên component | null]. */
function takeDefaultExport(code: string): [string, string | null] {
  let name: string | null = null;
  let out = code.replace(/export\s+default\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/, (m) => {
    name = m.match(/function\s+([A-Za-z_$][\w$]*)/)![1];
    return m.replace(/export\s+default\s+/, "");
  });
  if (!name) {
    out = out.replace(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;?/, (_m, n: string) => {
      name = n;
      return "";
    });
  }
  return [out, name];
}

/** Ghép các file thành một tài liệu duy nhất để chạy trong iframe sandbox. */
export function buildSrcDoc(files: SandboxFile[], runtime?: Runtime): string {
  const htmlFile = files.find((f) => f.lang === "html");
  const cssFiles = files.filter((f) => f.lang === "css");
  const jsFiles = files.filter((f) => f.lang === "javascript");
  const jsxFile = files.find((f) => f.lang === "jsx");
  const isReact = runtime === "react" || runtime === "rn" || !!jsxFile;

  let html = htmlFile ? htmlFile.code : BLANK;
  html = stripRefs(html, [...cssFiles, ...jsFiles, ...(jsxFile ? [jsxFile] : [])].map((f) => f.name));
  if (isReact && !/id=["']root["']/.test(html)) {
    html = /<body[^>]*>/i.test(html)
      ? html.replace(/<body[^>]*>/i, (m) => `${m}<div id="root"></div>`)
      : `${html}<div id="root"></div>`;
  }

  const css = cssFiles.map((f) => f.code).join("\n").replace(/<\/style/gi, "<\\/style");
  const waitFlag = isReact || runtime === "node" ? "<script>window.__wait=true;</script>" : "";
  const nodeShim = runtime === "node" ? `<script>${NODE_SHIM}</script>` : "";
  const head = `${waitFlag}<script>${BRIDGE}</script>${nodeShim}${css ? `<style>${css}</style>` : ""}`;

  let body = "";
  if (isReact) {
    const [src, name] = takeDefaultExport(jsxFile ? jsxFile.code : jsFiles.map((f) => f.code).join("\n"));
    const payload = JSON.stringify({ src, name }).replace(/</g, "\\u003c");
    body = `<script type="importmap">${JSON.stringify(IMPORT_MAP)}</script>
<script src="${BABEL_URL}"></script>
<script>
(async function(){
  var P = ${payload};
  try {
    var out = Babel.transform(P.src, { presets: [["react", { runtime: "automatic" }]], sourceType: "module", filename: "App.jsx" }).code;
    if (P.name) {
      out += "\\nimport { createRoot as __cr } from 'react-dom/client';\\nimport { jsx as __jsx } from 'react/jsx-runtime';\\n__cr(document.getElementById('root')).render(__jsx(" + P.name + ", {}));";
    }
    var url = URL.createObjectURL(new Blob([out], { type: "text/javascript" }));
    await import(url);
  } catch (e) {
    console.error(String(e && e.message || e));
  }
  setTimeout(function(){ window.__resolveReady(); }, 500);
})();
</script>`;
  } else {
    const js = jsFiles
      .map((f) => f.code)
      .join("\n;\n")
      .replace(/<\/script/gi, "<\\/script");
    body = js ? `<script>${js}</script>` : "";
    // Node: cho các Promise/timer của bài chạy xong rồi mới chấm.
    if (runtime === "node") body += "<script>setTimeout(function(){window.__resolveReady();},350);</script>";
  }

  if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head[^>]*>/i, (m) => `${m}${head}`);
  } else if (/<html[^>]*>/i.test(html)) {
    html = html.replace(/<html[^>]*>/i, (m) => `${m}<head>${head}</head>`);
  } else {
    html = `${head}${html}`;
  }

  if (body) {
    html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${body}</body>`) : `${html}${body}`;
  }
  return html;
}
