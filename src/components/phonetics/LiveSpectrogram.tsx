"use client";

import { useEffect, useRef, useState } from "react";

const FMAX = 5000;
const CW = 720, CH = 260, PH = 70;

/** FFT cơ số 2 tại chỗ. */
function fft(re: Float32Array, im: Float32Array) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = i + k + len / 2;
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        const ncr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = ncr;
      }
    }
  }
}

/** Ước lượng F0 bằng tự tương quan; trả về 0 nếu không rõ cao độ. */
function pitchOf(buf: Float32Array, sr: number) {
  const n = buf.length;
  let rms = 0;
  for (let i = 0; i < n; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / n);
  if (rms < 0.01) return 0;
  const minLag = Math.floor(sr / 400), maxLag = Math.min(Math.floor(sr / 70), n - 1);
  let best = 0, bestLag = 0, r0 = 0;
  for (let i = 0; i < n; i++) r0 += buf[i] * buf[i];
  for (let lag = minLag; lag <= maxLag; lag++) {
    let s = 0;
    for (let i = 0; i < n - lag; i++) s += buf[i] * buf[i + lag];
    if (s > best) { best = s; bestLag = lag; }
  }
  return best / r0 > 0.45 && bestLag ? sr / bestLag : 0;
}

type Mode = "wide" | "narrow";

/** Phổ đồ và đường F0 ngay trong trình duyệt: từ micro (trực tiếp) hoặc từ file âm thanh. */
export function LiveSpectrogram() {
  const spec = useRef<HTMLCanvasElement>(null);
  const pit = useRef<HTMLCanvasElement>(null);
  const live = useRef<{ ctx: AudioContext; stream: MediaStream; raf: number } | null>(null);
  const [mode, setMode] = useState<Mode>("wide");
  const modeRef = useRef<Mode>("wide");
  const [running, setRunning] = useState(false);
  const [f0, setF0] = useState(0);
  const [msg, setMsg] = useState("");
  const [fileInfo, setFileInfo] = useState<{ dur: number; play: () => void } | null>(null);

  useEffect(() => { modeRef.current = mode; }, [mode]);

  function clear() {
    for (const [c, h] of [[spec.current, CH], [pit.current, PH]] as const) {
      const g = c?.getContext("2d");
      if (g && c) { g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, h); }
    }
  }
  useEffect(() => { clear(); }, []);

  function stop() {
    const l = live.current;
    if (!l) return;
    cancelAnimationFrame(l.raf);
    l.stream.getTracks().forEach((t) => t.stop());
    void l.ctx.close();
    live.current = null;
    setRunning(false);
  }
  useEffect(() => () => stop(), []);

  async function startMic() {
    setMsg("");
    setFileInfo(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.smoothingTimeConstant = 0;
      src.connect(an);
      clear();
      const sc = spec.current!.getContext("2d")!, pc = pit.current!.getContext("2d")!;
      const tbuf = new Float32Array(2048);
      let frame = 0, peak = -30;
      const loop = () => {
        const wide = modeRef.current === "wide";
        an.fftSize = wide ? 256 : 1024;
        const bins = an.frequencyBinCount;
        const data = new Float32Array(bins);
        an.getFloatFrequencyData(data);
        const maxBin = Math.min(bins - 1, Math.floor((FMAX / (ctx.sampleRate / 2)) * bins));
        let m = -Infinity;
        for (let i = 0; i <= maxBin; i++) if (data[i] > m) m = data[i];
        peak = Math.max(m, peak - 0.3);
        sc.drawImage(spec.current!, -2, 0);
        pc.drawImage(pit.current!, -2, 0);
        sc.fillStyle = "#fff"; sc.fillRect(CW - 2, 0, 2, CH);
        pc.fillStyle = "#fff"; pc.fillRect(CW - 2, 0, 2, PH);
        for (let y = 0; y < CH; y++) {
          const bin = Math.floor(((CH - 1 - y) / CH) * maxBin);
          const v = Math.max(0, Math.min(1, (data[bin] - (peak - 55)) / 55));
          const g = Math.round(255 * (1 - v));
          sc.fillStyle = `rgb(${g},${g},${g})`;
          sc.fillRect(CW - 2, y, 2, 1);
        }
        if (frame++ % 2 === 0) {
          an.fftSize = 2048;
          an.getFloatTimeDomainData(tbuf);
          const p = pitchOf(tbuf, ctx.sampleRate);
          setF0(Math.round(p));
          if (p) { pc.fillStyle = "#0b6fd6"; pc.fillRect(CW - 3, PH - ((p - 60) / 340) * PH, 4, 4); }
        }
        live.current!.raf = requestAnimationFrame(loop);
      };
      live.current = { ctx, stream, raf: requestAnimationFrame(loop) };
      setRunning(true);
    } catch {
      setMsg("Không mở được micro (cần cấp quyền, hoặc dùng nút mở file bên cạnh). / Microphone unavailable: allow access or use a file.");
    }
  }

  async function openFile(file: File) {
    stop();
    setMsg("");
    try {
      const ctx = new AudioContext();
      const buf = await ctx.decodeAudioData(await file.arrayBuffer());
      const x = buf.getChannelData(0), sr = buf.sampleRate;
      const win = Math.round((mode === "wide" ? 0.005 : 0.03) * sr);
      const N = 2048;
      const hop = Math.max(1, Math.floor(x.length / CW));
      const sc = spec.current!.getContext("2d")!, pc = pit.current!.getContext("2d")!;
      clear();
      const img = sc.createImageData(CW, CH);
      const re = new Float32Array(N), im = new Float32Array(N);
      const cols: Float32Array[] = [];
      let peak = -Infinity;
      for (let c = 0; c < CW; c++) {
        const centre = c * hop + Math.floor(hop / 2);
        re.fill(0); im.fill(0);
        for (let i = 0; i < win; i++) {
          const idx = centre - Math.floor(win / 2) + i;
          const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (win - 1));
          const s = idx >= 0 && idx < x.length ? x[idx] : 0;
          const pre = idx > 0 && idx < x.length ? s - 0.97 * x[idx - 1] : s;
          re[i] = pre * w;
        }
        fft(re, im);
        const maxBin = Math.floor((FMAX / (sr / 2)) * (N / 2));
        const col = new Float32Array(CH);
        for (let y = 0; y < CH; y++) {
          const bin = Math.floor(((CH - 1 - y) / CH) * maxBin);
          const db = 10 * Math.log10(re[bin] ** 2 + im[bin] ** 2 + 1e-12);
          col[y] = db; if (db > peak) peak = db;
        }
        cols.push(col);
      }
      for (let c = 0; c < CW; c++) for (let y = 0; y < CH; y++) {
        const v = Math.max(0, Math.min(1, (cols[c][y] - (peak - 60)) / 60));
        const g = Math.round(255 * (1 - v)), o = (y * CW + c) * 4;
        img.data[o] = img.data[o + 1] = img.data[o + 2] = g; img.data[o + 3] = 255;
      }
      sc.putImageData(img, 0, 0);
      const pw = Math.round(0.04 * sr);
      pc.fillStyle = "#0b6fd6";
      for (let c = 0; c < CW; c += 2) {
        const centre = c * hop;
        if (centre + pw > x.length) break;
        const p = pitchOf(x.subarray(centre, centre + pw), sr);
        if (p) pc.fillRect(c, PH - ((p - 60) / 340) * PH, 3, 3);
      }
      setFileInfo({
        dur: buf.duration,
        play: () => { const s = ctx.createBufferSource(); s.buffer = buf; s.connect(ctx.destination); s.start(); },
      });
    } catch {
      setMsg("Không đọc được file âm thanh này. / Could not read this audio file.");
    }
  }

  return (
    <div className="my-6 rounded-lg border border-line bg-surface p-4" role="group" aria-label="Spectrogram">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button type="button" onClick={running ? stop : () => void startMic()} className="btn-primary">
          {running ? "■ Stop" : "● Microphone"}
        </button>
        <label className="cursor-pointer rounded-lg border border-line px-3 py-2 font-semibold hover:border-brand">
          Audio file
          <input type="file" accept="audio/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) void openFile(f); }} />
        </label>
        {fileInfo && (
          <button type="button" onClick={fileInfo.play} className="rounded-lg border border-line px-3 py-2 font-semibold hover:border-brand">
            ▶ {fileInfo.dur.toFixed(1)} s
          </button>
        )}
        <fieldset className="flex items-center gap-3">
          <legend className="sr-only">Window</legend>
          <label className="flex items-center gap-1"><input type="radio" name="win" checked={mode === "wide"} onChange={() => setMode("wide")} /> wideband (5 ms)</label>
          <label className="flex items-center gap-1"><input type="radio" name="win" checked={mode === "narrow"} onChange={() => setMode("narrow")} /> narrowband (30 ms)</label>
        </fieldset>
        <span className="text-muted">F0: <b className="text-fg">{f0 ? `${f0} Hz` : "—"}</b></span>
      </div>
      <p className="mt-2 text-xs text-muted">0 – 5000 Hz · dark = more energy. Audio stays in your browser; nothing is uploaded.</p>
      <canvas ref={spec} width={CW} height={CH} className="mt-3 w-full rounded border border-line bg-white" aria-label="Spectrogram" />
      <canvas ref={pit} width={CW} height={PH} className="mt-1 w-full rounded border border-line bg-white" aria-label="Pitch track" />
      {msg && <p className="mt-2 text-sm text-bad" role="status">{msg}</p>}
    </div>
  );
}
