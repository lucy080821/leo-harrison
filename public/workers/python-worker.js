/* Worker chạy Python bằng Pyodide (WebAssembly). Mỗi lần chạy dùng một namespace mới. */
importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.js");

let pyPromise = null;

function status(text) {
  postMessage({ type: "status", text });
}

function getPy() {
  if (!pyPromise) {
    pyPromise = (async () => {
      status("loading-python");
      const py = await loadPyodide();
      await py.runPythonAsync(
        [
          "import os, warnings",
          "os.environ['MPLBACKEND'] = 'AGG'",
          "warnings.filterwarnings('ignore', message='.*non-interactive.*')",
        ].join("\n"),
      );
      return py;
    })();
  }
  return pyPromise;
}

function cleanError(e) {
  const msg = String((e && e.message) || e);
  const i = msg.indexOf('File "<exec>"');
  if (i >= 0) {
    // bỏ các khung nội bộ của Pyodide, giữ phần liên quan đến code của người học
    return "Traceback (most recent call last):\n  " + msg.slice(i);
  }
  return msg;
}

const IMAGES = [
  "import sys, io, base64",
  "_imgs = []",
  "if 'matplotlib.pyplot' in sys.modules:",
  "    import matplotlib.pyplot as _plt",
  "    for _n in _plt.get_fignums():",
  "        _b = io.BytesIO()",
  "        _plt.figure(_n).savefig(_b, format='png', dpi=110, bbox_inches='tight')",
  "        _imgs.append('data:image/png;base64,' + base64.b64encode(_b.getvalue()).decode())",
  "    _plt.close('all')",
  "_imgs",
].join("\n");

async function execute(py, code, data) {
  const lines = [];
  const outText = [];
  py.setStdout({ batched: (s) => { lines.push({ kind: "out", text: s }); outText.push(s); } });
  py.setStderr({ batched: (s) => lines.push({ kind: "err", text: s }) });

  for (const name of Object.keys(data || {})) py.FS.writeFile(name, data[name]);

  const ns = py.globals.get("dict")();
  ns.set("__name__", "__main__");
  let error;
  try {
    try {
      status("loading-packages");
      await py.loadPackagesFromImports(code, { messageCallback: () => {}, errorCallback: () => {} });
    } catch (e) {
      /* gói không tồn tại: để Python báo ImportError */
    }
    status("running");
    await py.runPythonAsync(code, { globals: ns });
  } catch (e) {
    error = cleanError(e);
  }
  return { ns, lines, outText, error };
}

onmessage = async (event) => {
  const { id, type, code, tests, data } = event.data;
  try {
    const py = await getPy();
    const t0 = performance.now();
    const r = await execute(py, code, data);
    let results;
    if (type === "check") {
      results = [];
      r.ns.set("_out", r.outText.join("\n"));
      for (const t of tests) {
        if (r.error) { results.push(false); continue; }
        try {
          results.push(Boolean(py.runPython(t, { globals: r.ns })));
        } catch (e) {
          results.push(false);
        }
      }
    }
    // Chụp biểu đồ matplotlib SAU khi đã chấm bài (để test còn xem được figure/axes).
    let images = [];
    try {
      const proxy = await py.runPythonAsync(IMAGES, { globals: py.toPy({}) });
      images = proxy.toJs();
      proxy.destroy && proxy.destroy();
    } catch (e) {
      /* không có matplotlib */
    }
    r.ns.destroy();
    postMessage({
      id, type: "done", lines: r.lines, images, error: r.error,
      results, ms: Math.round(performance.now() - t0),
    });
  } catch (e) {
    postMessage({ id, type: "done", lines: [], images: [], error: String((e && e.message) || e), ms: 0 });
  }
};
