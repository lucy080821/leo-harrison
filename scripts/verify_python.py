"""Chạy một đoạn Python giống cách worker Pyodide làm, rồi chấm các test (biểu thức Python).
Đọc JSON từ stdin: {code, tests, data}. In JSON: {error, results, out}."""
import contextlib, io, json, os, sys, tempfile, traceback, warnings

os.environ["MPLBACKEND"] = "Agg"
warnings.filterwarnings("ignore")

payload = json.load(sys.stdin)
code, tests, data = payload["code"], payload["tests"], payload.get("data", {})

tmp = tempfile.mkdtemp()
os.chdir(tmp)
for name, content in data.items():
    with open(name, "w", encoding="utf-8") as f:
        f.write(content)

ns = {"__name__": "__main__"}
buf = io.StringIO()
error = None
try:
    with contextlib.redirect_stdout(buf):
        exec(compile(code, "<exec>", "exec"), ns)
except BaseException:
    error = traceback.format_exc()

ns["_out"] = "\n".join(buf.getvalue().splitlines())
results = []
for t in tests:
    if error:
        results.append(False)
        continue
    try:
        results.append(bool(eval(t, ns)))
    except BaseException:
        results.append(False)

print(json.dumps({"error": error, "results": results, "out": ns["_out"]}))
