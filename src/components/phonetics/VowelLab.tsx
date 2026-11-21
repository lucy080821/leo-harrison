"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VOWELS } from "@/components/phonetics/data";
import { useIsDark } from "@/lib/theme";

const F1_MIN = 200, F1_MAX = 900, F2_MIN = 600, F2_MAX = 2500;

/** Đáp ứng biên độ (dB) của một bộ cộng hưởng bậc hai tại tần số f. */
function resDb(f: number, F: number, B: number) {
  const a = 1 - (f / F) ** 2;
  const b = (f * B) / F ** 2;
  return -10 * Math.log10(a * a + b * b);
}

type Audio = { ctx: AudioContext; osc: OscillatorNode; filters: BiquadFilterNode[]; gains: GainNode[]; master: GainNode };

/**
 * Phòng thí nghiệm nguyên âm: kéo điểm trên biểu đồ F1-F2 (hoặc dùng thanh trượt) để nghe và thấy
 * cách nguồn âm (họa âm của F0) được bộ lọc formant "tạo hình" thành nguyên âm.
 */
export function VowelLab() {
  const dark = useIsDark();
  const [f1, setF1] = useState(730);
  const [f2, setF2] = useState(1090);
  const [f0, setF0] = useState(120);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<Audio | null>(null);
  const chart = useRef<SVGSVGElement>(null);
  const F3 = 2500;

  // Điều chỉnh âm thanh theo giá trị hiện tại
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const t = a.ctx.currentTime;
    a.osc.frequency.setTargetAtTime(f0, t, 0.02);
    a.filters[0].frequency.setTargetAtTime(f1, t, 0.03);
    a.filters[1].frequency.setTargetAtTime(f2, t, 0.03);
    a.filters[2].frequency.setTargetAtTime(F3, t, 0.03);
  }, [f1, f2, f0]);

  function start() {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    osc.type = "sawtooth"; // nguồn giàu họa âm, độ dốc gần với nguồn thanh môn
    osc.frequency.value = f0;
    const master = ctx.createGain();
    master.gain.value = 0;
    const filters: BiquadFilterNode[] = [];
    const gains: GainNode[] = [];
    [[f1, 0.55], [f2, 0.5], [F3, 0.3]].forEach(([f, g], i) => {
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = f;
      bp.Q.value = [9, 12, 15][i];
      const gn = ctx.createGain();
      gn.gain.value = g;
      osc.connect(bp);
      bp.connect(gn);
      gn.connect(master);
      filters.push(bp);
      gains.push(gn);
    });
    master.connect(ctx.destination);
    osc.start();
    master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.05);
    audio.current = { ctx, osc, filters, gains, master };
    setPlaying(true);
  }

  function stop() {
    const a = audio.current;
    if (!a) return;
    a.master.gain.setTargetAtTime(0, a.ctx.currentTime, 0.03);
    setTimeout(() => {
      a.osc.stop();
      void a.ctx.close();
    }, 150);
    audio.current = null;
    setPlaying(false);
  }

  useEffect(() => () => stop(), []);

  // Biểu đồ F1-F2 (đảo trục như bảng nguyên âm IPA: trước ở trái, mở ở dưới)
  const W = 330, H = 250, pad = 30, padL = 48;
  const xOf = (v: number) => padL + ((F2_MAX - v) / (F2_MAX - F2_MIN)) * (W - padL - pad);
  const yOf = (v: number) => pad + ((v - F1_MIN) / (F1_MAX - F1_MIN)) * (H - 2 * pad);
  const fromXY = (cx: number, cy: number) => {
    const r = chart.current!.getBoundingClientRect();
    const px = ((cx - r.left) / r.width) * W, py = ((cy - r.top) / r.height) * H;
    const nf2 = F2_MAX - ((px - padL) / (W - padL - pad)) * (F2_MAX - F2_MIN);
    const nf1 = F1_MIN + ((py - pad) / (H - 2 * pad)) * (F1_MAX - F1_MIN);
    setF2(Math.round(Math.min(F2_MAX, Math.max(F2_MIN, nf2))));
    setF1(Math.round(Math.min(F1_MAX, Math.max(F1_MIN, nf1))));
  };
  const nearest = useMemo(() => {
    let best = VOWELS[0], d = Infinity;
    for (const v of VOWELS) {
      const dd = ((v.f1 - f1) / 100) ** 2 + ((v.f2 - f2) / 400) ** 2;
      if (dd < d) { d = dd; best = v; }
    }
    return best;
  }, [f1, f2]);

  // Phổ: họa âm của F0 và đường bao do bộ lọc tạo ra
  const SW = 360, SH = 190, sp = 28, FMAX = 4000;
  const sx = (f: number) => sp + (f / FMAX) * (SW - 2 * sp);
  const sy = (db: number) => SH - sp - ((db + 70) / 80) * (SH - 2 * sp);
  const filterDb = (f: number) => resDb(f, f1, 80) + resDb(f, f2, 100) + resDb(f, F3, 150);
  const fmax = Math.max(...Array.from({ length: 200 }, (_, i) => filterDb(50 + i * 20)));
  const harm: { x: number; y: number }[] = [];
  for (let k = 1; k * f0 < FMAX; k++) {
    const fr = k * f0;
    const level = -12 * Math.log2(k) + (filterDb(fr) - fmax);
    harm.push({ x: sx(fr), y: sy(Math.max(-70, level)) });
  }
  let env = "";
  for (let i = 0; i <= 160; i++) {
    const fr = 50 + (i / 160) * (FMAX - 50);
    env += `${i ? "L" : "M"}${sx(fr)},${sy(Math.max(-70, filterDb(fr) - fmax))} `;
  }

  const col = { ink: dark ? "#e4eefa" : "#0b2540", mute: dark ? "#8aa4bf" : "#5b738c", brand: dark ? "#4aa3ff" : "#0b6fd6", teal: dark ? "#31d0e0" : "#0aa5b8", grid: dark ? "#1d3856" : "#d3e2f2" };

  return (
    <div className="my-6 rounded-lg border border-line bg-surface p-4" role="group" aria-label="Vowel lab">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={playing ? stop : start} className="btn-primary text-sm">
          {playing ? "■ Stop" : "▶ Play"}
        </button>
        <p className="text-sm text-muted">
          F1 <b className="text-fg">{f1}</b> Hz · F2 <b className="text-fg">{f2}</b> Hz · F0 <b className="text-fg">{f0}</b> Hz · ≈ <span className="ipa text-lg text-brand">[{nearest.ipa}]</span> ({nearest.word})
        </p>
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <svg
          ref={chart}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none rounded border border-line bg-bg"
          onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); fromXY(e.clientX, e.clientY); }}
          onPointerMove={(e) => { if (e.buttons) fromXY(e.clientX, e.clientY); }}
          role="img"
          aria-label="F1-F2 vowel chart"
        >
          {[300, 500, 700].map((v) => (<g key={v}><line x1={padL} x2={W - pad} y1={yOf(v)} y2={yOf(v)} stroke={col.grid} /><text x={padL - 5} y={yOf(v) + 3} fontSize="9" fill={col.mute} textAnchor="end">{v}</text></g>))}
          {[2000, 1500, 1000].map((v) => (<g key={v}><line y1={pad} y2={H - pad} x1={xOf(v)} x2={xOf(v)} stroke={col.grid} /><text x={xOf(v)} y={H - 10} fontSize="9" fill={col.mute} textAnchor="middle">{v}</text></g>))}
          <text x={(padL + W - pad) / 2} y={12} fontSize="9" fill={col.mute} textAnchor="middle">F2 (Hz) · front ← → back</text>
          <text x={10} y={H / 2} fontSize="9" fill={col.mute} transform={`rotate(-90 10 ${H / 2})`} textAnchor="middle">F1 (Hz) · close ↑ ↓ open</text>
          {VOWELS.map((v) => (<text key={v.ipa} x={xOf(v.f2)} y={yOf(v.f1) + 5} fontSize="15" textAnchor="middle" fill={col.mute} className="ipa" opacity={0.85}>{v.ipa}</text>))}
          <circle cx={xOf(f2)} cy={yOf(f1)} r="7" fill={col.brand} opacity="0.9" stroke="#fff" strokeWidth="1.5" />
        </svg>

        <svg viewBox={`0 0 ${SW} ${SH}`} className="w-full rounded border border-line bg-bg" role="img" aria-label="Spectrum">
          <line x1={sp} x2={SW - sp} y1={SH - sp} y2={SH - sp} stroke={col.mute} />
          {[0, 1000, 2000, 3000, 4000].map((f) => (<text key={f} x={sx(f)} y={SH - 12} fontSize="9" fill={col.mute} textAnchor="middle">{f}</text>))}
          <text x={SW / 2} y={SH - 1} fontSize="9" fill={col.mute} textAnchor="middle">Hz</text>
          <text x={sp} y={12} fontSize="9" fill={col.mute}>source harmonics + filter envelope</text>
          {harm.map((h, i) => (<line key={i} x1={h.x} x2={h.x} y1={sy(-70)} y2={h.y} stroke={col.brand} strokeWidth="1.6" />))}
          <path d={env} fill="none" stroke={col.teal} strokeWidth="2" />
          {[f1, f2, F3].map((F, i) => (<text key={i} x={sx(F)} y={sy(Math.max(-70, filterDb(F) - fmax)) - 5} fontSize="9" fill={col.ink} textAnchor="middle">F{i + 1}</text>))}
        </svg>
      </div>

      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
        <label className="block">F1 (Hz)<input type="range" min={F1_MIN} max={F1_MAX} value={f1} onChange={(e) => setF1(+e.target.value)} className="w-full" /></label>
        <label className="block">F2 (Hz)<input type="range" min={F2_MIN} max={F2_MAX} value={f2} onChange={(e) => setF2(+e.target.value)} className="w-full" /></label>
        <label className="block">F0 (Hz)<input type="range" min={80} max={300} value={f0} onChange={(e) => setF0(+e.target.value)} className="w-full" /></label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {VOWELS.map((v) => (
          <button key={v.ipa} type="button" onClick={() => { setF1(v.f1); setF2(v.f2); }} className="rounded-md border border-line px-2.5 py-1 text-sm hover:border-brand" title={`${v.word}: F1 ${v.f1}, F2 ${v.f2}`}>
            <span className="ipa">{v.ipa}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
