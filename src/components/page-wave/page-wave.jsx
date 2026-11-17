"use client";

import { useEffect, useRef } from "react";
import styles from "./page-wave.module.css";

// A sound wave that snakes down the whole page behind the content. It comes out from behind the
// hero demo (as if it were the call's audio) and winds from side to side to the foot of the page.
// It's a few violet and lime strands that wave gently around one smooth path, and it draws itself
// as you scroll, with a small glowing head. One fixed, screen-sized canvas draws only the part of
// the path that's on screen. With reduced motion it's drawn whole and still.
const STRANDS = [
  { amp: 1, f: 1, speed: 0.9, phase: 0, width: 2.2, color: "91, 46, 255", alpha: 0.6 },
  { amp: 0.8, f: 1.35, speed: 1.2, phase: 1.3, width: 1.6, color: "142, 200, 0", alpha: 0.75 },
  { amp: 0.6, f: 1.9, speed: 0.7, phase: 2.4, width: 1.1, color: "91, 46, 255", alpha: 0.32 },
  { amp: 0.42, f: 0.8, speed: 1.5, phase: 3.9, width: 1, color: "11, 10, 20", alpha: 0.16 },
  { amp: 0.3, f: 2.4, speed: 1, phase: 5.1, width: 1, color: "142, 200, 0", alpha: 0.4 },
];
const STEP = 5; // spacing of the sampled path, in pixels
const WAVELENGTH = 420; // of the strands' waving, in pixels along the path

const smooth = (x) => {
  const v = Math.min(1, Math.max(0, x));
  return v * v * (3 - 2 * v);
};

// The path: from the start point, smooth S-curves left and right down to the end of the page.
function buildPath(width, start, end, segment) {
  const edge = width < 700 ? 0.1 : 0.12;
  const n = Math.max(1, Math.round((end - start) / segment));
  const dy = (end - start) / n;
  const pts = [[width * 0.5, start]];
  for (let i = 1; i <= n; i++) pts.push([width * (i % 2 ? 1 - edge : edge), start + dy * i]);

  // Sample each curve finely, then resample evenly by length.
  const raw = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const c = (y1 - y0) * 0.55;
    for (let k = i ? 1 : 0; k <= 200; k++) {
      const t = k / 200;
      const u = 1 - t;
      const x = u * u * u * x0 + 3 * u * u * t * x0 + 3 * u * t * t * x1 + t * t * t * x1;
      const y = u * u * u * y0 + 3 * u * u * t * (y0 + c) + 3 * u * t * t * (y1 - c) + t * t * t * y1;
      raw.push([x, y]);
    }
  }
  const xs = [raw[0][0]];
  const ys = [raw[0][1]];
  let since = 0; // distance walked since the last kept point
  for (let i = 1; i < raw.length; i++) {
    const [ax, ay] = raw[i - 1];
    const [bx, by] = raw[i];
    const len = Math.hypot(bx - ax, by - ay);
    let pos = 0;
    while (len - pos >= STEP - since) {
      pos += STEP - since;
      since = 0;
      xs.push(ax + ((bx - ax) * pos) / len);
      ys.push(ay + ((by - ay) * pos) / len);
    }
    since += len - pos;
  }
  // Unit normals, for waving the strands sideways to the path.
  const nx = new Float32Array(xs.length);
  const ny = new Float32Array(xs.length);
  for (let i = 0; i < xs.length; i++) {
    const a = Math.max(0, i - 1);
    const b = Math.min(xs.length - 1, i + 1);
    const tx = xs[b] - xs[a];
    const ty = ys[b] - ys[a];
    const l = Math.hypot(tx, ty) || 1;
    nx[i] = -ty / l;
    ny[i] = tx / l;
  }
  return { xs: Float32Array.from(xs), ys: Float32Array.from(ys), nx, ny, count: xs.length };
}

// First sample at or below a page y (the path only goes down).
function indexAtY(path, y) {
  let lo = 0;
  let hi = path.count - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (path.ys[mid] < y) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// `lift`: how far above the anchor's bottom edge the wave starts (the homepage tucks it behind the
// demo; a page whose anchor ends in text can pass a negative lift to start below it).
export function PageWave({ from = "demo", lift = 140 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let path = null;
    let frame = 0;
    let t = 0;
    let last = 0;
    let shownHead = 0;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const anchor = document.getElementById(from);
      const start = anchor ? anchor.getBoundingClientRect().bottom + window.scrollY - lift : h * 0.6;
      const end = document.documentElement.scrollHeight - 40;
      path = end - start > 200 ? buildPath(w, start, end, Math.min(900, Math.max(520, h * 0.85))) : null;
      if (reduce) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!path) return;
      const top = window.scrollY;
      const narrow = w < 700;
      const base = narrow ? 20 : 34; // how far the strands spread from the path
      // The line has drawn itself down to three quarters of the screen, and to its very end once
      // you reach the bottom of the page (all of it at once with reduced motion).
      const maxTop = document.documentElement.scrollHeight - h;
      const nearEnd = smooth((top - (maxTop - h * 0.6)) / (h * 0.6));
      const target = reduce ? path.count - 1 : Math.min(path.count - 1, indexAtY(path, top + h * (0.78 + 0.3 * nearEnd)));
      shownHead += (target - shownHead) * (reduce ? 1 : 0.12);
      const head = Math.round(shownHead);
      if (head < 2) return;
      const i0 = Math.max(0, indexAtY(path, top - 80) - 2);
      const i1 = Math.min(head, indexAtY(path, top + h + 80) + 2);
      if (i1 <= i0) return;
      const headLen = head * STEP;

      STRANDS.forEach((s, k) => {
        ctx.beginPath();
        for (let i = i0; i <= i1; i++) {
          const len = i * STEP;
          // Strands start together behind the demo and meet again at the head.
          const env = smooth(len / 420) * smooth((headLen - len) / 340);
          const u = len / WAVELENGTH;
          const wave = Math.sin(u * s.f * Math.PI * 2 + t * s.speed + s.phase) * 0.62 + Math.sin(u * s.f * 3.1 * Math.PI * 2 - t * s.speed * 1.3 + s.phase) * 0.38;
          const off = base * s.amp * env * wave;
          const x = path.xs[i] + path.nx[i] * off;
          const y = path.ys[i] + path.ny[i] * off - top;
          if (i === i0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        if (k === 0) {
          ctx.strokeStyle = "rgba(212, 255, 58, 0.12)";
          ctx.lineWidth = narrow ? 26 : 44;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
        ctx.strokeStyle = `rgba(${s.color}, ${s.alpha})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      });

      // The glowing head, while the line is still drawing.
      if (!reduce && head < path.count - 1 && head <= i1) {
        const x = path.xs[head];
        const y = path.ys[head] - top;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 18);
        g.addColorStop(0, "rgba(212, 255, 58, 0.9)");
        g.addColorStop(0.35, "rgba(212, 255, 58, 0.35)");
        g.addColorStop(1, "rgba(212, 255, 58, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#5b2eff";
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      t += dt;
      draw();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || frame || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onScroll = () => reduce && draw();

    // Re-plan the path whenever the page's size changes (fonts, images, new sections).
    const ro = new ResizeObserver(layout);
    ro.observe(document.body);
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    layout();
    if (reduce) draw();
    else start();

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [from, lift]);

  return <canvas ref={ref} className={styles.wave} aria-hidden="true" />;
}
