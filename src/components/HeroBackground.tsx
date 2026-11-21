"use client";

import { useEffect, useRef } from "react";

/** [vĩ độ, kinh độ] của các thành phố làm nút mạng. */
const CITIES: [number, number][] = [
  [21.03, 105.85], // Hà Nội
  [10.78, 106.7], // TP.HCM
  [1.35, 103.82], // Singapore
  [35.68, 139.69], // Tokyo
  [-33.87, 151.21], // Sydney
  [51.51, -0.13], // London
  [48.86, 2.35], // Paris
  [40.71, -74.0], // New York
  [37.77, -122.42], // San Francisco
  [-23.55, -46.63], // São Paulo
  [25.2, 55.27], // Dubai
];
const LINKS: [number, number][] = [
  [0, 3], [1, 2], [2, 4], [0, 5], [5, 7], [7, 8], [8, 3], [6, 10], [10, 1], [7, 9], [5, 6], [2, 10],
];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(v, 16);
  return Number.isNaN(n) ? [53, 224, 208] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toVec(lat: number, lon: number): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

function slerp(a: number[], b: number[], s: number): [number, number, number] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-4) return [a[0], a[1], a[2]];
  const k1 = Math.sin((1 - s) * om) / Math.sin(om);
  const k2 = Math.sin(s * om) / Math.sin(om);
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

/** Nền phần đầu trang: một quả cầu mạng lưới xoay chậm, rất nhẹ, gợi ý về kết nối quốc tế. */
export function HeroBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots: [number, number, number][] = [];
    const N = 820;
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      dots.push([Math.cos(ga * i) * r, y, Math.sin(ga * i) * r]);
    }
    const cityVecs = CITIES.map(([la, lo]) => toVec(la, lo));

    let dpr = 1;
    let size = 0;
    let rgb: [number, number, number] = [53, 224, 208];
    let rgb2: [number, number, number] = [74, 163, 255];
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      rgb = hexToRgb(cs.getPropertyValue("--brand") || "#0b6fd6");
      rgb2 = hexToRgb(cs.getPropertyValue("--brand-2") || "#0aa5b8");
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = wrap.clientWidth;
      canvas.width = canvas.height = Math.round(size * dpr);
    };
    const col = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const TILT = 0.42;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    function project(v: number[], rot: number, R: number, cx: number) {
      const c = Math.cos(rot);
      const s = Math.sin(rot);
      const x1 = v[0] * c + v[2] * s;
      const z1 = -v[0] * s + v[2] * c;
      const y2 = v[1] * cosT - z1 * sinT;
      const z2 = v[1] * sinT + z1 * cosT;
      return { x: cx + x1 * R, y: cx - y2 * R, z: z2 };
    }

    function draw(t: number) {
      const W = canvas!.width;
      const R = W * 0.4;
      const cx = W / 2;
      const rot = t * 0.00011;
      ctx!.clearRect(0, 0, W, W);

      // viền cầu
      ctx!.strokeStyle = col(rgb, 0.22);
      ctx!.lineWidth = dpr;
      ctx!.beginPath();
      ctx!.arc(cx, cx, R, 0, Math.PI * 2);
      ctx!.stroke();

      // chấm trên mặt cầu
      for (const d of dots) {
        const p = project(d, rot, R, cx);
        const front = p.z > 0;
        ctx!.fillStyle = col(rgb, front ? 0.18 + 0.4 * p.z : 0.05);
        const r = (front ? 1.6 : 0.9) * dpr;
        ctx!.fillRect(p.x - r / 2, p.y - r / 2, r, r);
      }

      // các tuyến kết nối
      LINKS.forEach(([a, b], li) => {
        const va = cityVecs[a];
        const vb = cityVecs[b];
        ctx!.lineWidth = 1.1 * dpr;
        let prev: { x: number; y: number; z: number } | null = null;
        const steps = 28;
        for (let k = 0; k <= steps; k++) {
          const s = k / steps;
          const v = slerp(va, vb, s);
          const lift = 1 + 0.2 * Math.sin(Math.PI * s);
          const p = project([v[0] * lift, v[1] * lift, v[2] * lift], rot, R, cx);
          if (prev && p.z > -0.05 && prev.z > -0.05) {
            ctx!.strokeStyle = col(rgb2, 0.3);
            ctx!.beginPath();
            ctx!.moveTo(prev.x, prev.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
          prev = p;
        }
        // gói dữ liệu chạy dọc tuyến
        const s = ((t * 0.00018 + li * 0.173) % 1 + 1) % 1;
        const v = slerp(va, vb, s);
        const lift = 1 + 0.2 * Math.sin(Math.PI * s);
        const p = project([v[0] * lift, v[1] * lift, v[2] * lift], rot, R, cx);
        if (p.z > 0) {
          ctx!.fillStyle = col(rgb, 0.95);
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 2.2 * dpr, 0, Math.PI * 2);
          ctx!.fill();
        }
      });

      // thành phố
      cityVecs.forEach((v, i) => {
        const p = project(v, rot, R, cx);
        if (p.z <= 0) return;
        const pulse = (Math.sin(t * 0.003 + i) + 1) / 2;
        ctx!.fillStyle = col(rgb, 1);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.8 * dpr, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.strokeStyle = col(rgb, 0.5 * (1 - pulse));
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, (4 + pulse * 9) * dpr, 0, Math.PI * 2);
        ctx!.stroke();
      });
    }

    readColors();
    resize();
    let raf = 0;
    let visible = true;
    const loop = (t: number) => {
      if (visible && !document.hidden) draw(t);
      raf = requestAnimationFrame(loop);
    };
    if (reduced) draw(30000);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(30000);
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrap);
    const mo = new MutationObserver(() => {
      readColors();
      if (reduced) draw(30000);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden">
      <div ref={wrapRef} className="absolute -right-[22%] top-[8rem] aspect-square w-[46rem] max-w-[140vw] opacity-30 sm:-right-[10%] sm:top-[2rem] sm:opacity-60 lg:right-[-6%]">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}
