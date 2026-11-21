export type SandboxFile = {
  name: string;
  lang: "html" | "css" | "javascript";
  code: string;
  hidden?: boolean;
};

const BLANK = `<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>`;

const BRIDGE = `
(function(){
  var logs = []; window.__logs = logs;
  function send(level, text){ logs.push(text); try { parent.postMessage({lexi:true,type:'log',level:level,text:text},'*'); } catch(e){} }
  function fmt(a){
    try {
      if (typeof a === 'string') return a;
      if (a instanceof Error) return a.name + ': ' + a.message;
      if (typeof a === 'undefined') return 'undefined';
      return JSON.stringify(a, function(k,v){ return typeof v === 'function' ? '[Function]' : v; }, 2);
    } catch(e){ return String(a); }
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
  window.addEventListener('message', function(e){
    var d = e.data;
    if (!d || d.lexi !== true || d.type !== 'check') return;
    var results = d.tests.map(function(t){
      try { return !!(new Function('logs', 'return (' + t + ')'))(logs); } catch(err){ return false; }
    });
    parent.postMessage({lexi:true,type:'checked',results:results},'*');
  });
})();`;

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

/** Ghép các file HTML/CSS/JS thành một tài liệu duy nhất để chạy trong iframe sandbox. */
export function buildSrcDoc(files: SandboxFile[]): string {
  const htmlFile = files.find((f) => f.lang === "html");
  const cssFiles = files.filter((f) => f.lang === "css");
  const jsFiles = files.filter((f) => f.lang === "javascript");

  let html = htmlFile ? htmlFile.code : BLANK;
  html = stripRefs(html, [...cssFiles, ...jsFiles].map((f) => f.name));

  const css = cssFiles.map((f) => f.code).join("\n").replace(/<\/style/gi, "<\\/style");
  const js = jsFiles
    .map((f) => f.code)
    .join("\n;\n")
    .replace(/<\/script/gi, "<\\/script");

  const head = `<script>${BRIDGE}</script>${css ? `<style>${css}</style>` : ""}`;
  const body = js ? `<script>${js}</script>` : "";

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
