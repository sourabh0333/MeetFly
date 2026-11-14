// The demo's backdrop, drawn for MeetFly: a "soundscape". A soft lavender sky, sound ripples
// spreading out from behind the app, hills shaped like sound waves, and equaliser bars standing
// on the ridges like a skyline, in the brand's violet and lime. Our own SVG artwork. Positions
// come from a seeded random, so server and browser agree. It never re-renders (memo).
import { memo } from "react";
import styles from "./demo-scenery.module.css";

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rand = seeded(11);
const W = 1600;

// A ridge shaped like a sound wave: a few sine waves added together.
const ridgeY = (x, base, waves) => base + waves.reduce((y, [amp, len, phase]) => y + amp * Math.sin((2 * Math.PI * x) / len + phase), 0);
const ridge = (base, waves) => {
  // Drawn a little wider than the picture, so the gentle sway never shows an edge.
  let d = `M-60 ${ridgeY(-60, base, waves).toFixed(1)}`;
  for (let x = -40; x <= W + 60; x += 20) d += ` L${x} ${ridgeY(x, base, waves).toFixed(1)}`;
  return `${d} L${W + 60} 1000 L-60 1000Z`;
};

const far = [[26, 520, 0.4], [12, 230, 1.7]];
const mid = [[30, 640, 2.1], [14, 260, 0.3], [6, 120, 1.1]];
const near = [[22, 760, 4.2], [10, 300, 2.6]];

// Equaliser bars on the middle ridge, on both sides (the app sits in the middle).
const bars = [];
for (const [from, to] of [
  [40, 420],
  [1180, 1570],
]) {
  for (let x = from; x <= to; x += 13) {
    const edge = Math.min(x - from, to - x) / (to - from);
    const h = 18 + Math.min(1, edge * 3) * (40 + rand() * 70);
    bars.push({ x, y: ridgeY(x, 690, mid) + 6, h, delay: (rand() * 1.6).toFixed(2), dur: (1.1 + rand() * 0.9).toFixed(2) });
  }
}

// Little motes of light floating up.
const motes = Array.from({ length: 26 }, () => ({
  x: rand() < 0.5 ? 40 + rand() * 420 : 1160 + rand() * 400,
  y: 300 + rand() * 450,
  r: 1.5 + rand() * 2.5,
  lime: rand() < 0.45,
  delay: (rand() * 8).toFixed(2),
  dur: (7 + rand() * 6).toFixed(2),
}));

function Scenery() {
  return (
    <svg className={styles.scene} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="dsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6ccff" />
          <stop offset="0.38" stopColor="#e6dfff" />
          <stop offset="0.72" stopColor="#f6f3ea" />
        </linearGradient>
        <radialGradient id="dsLime" cx="0.5" cy="0.62" r="0.42">
          <stop offset="0" stopColor="#e4ff7a" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e4ff7a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dsViolet" cx="0.08" cy="0.05" r="0.5">
          <stop offset="0" stopColor="#7d5cff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#7d5cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dsFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bba9ff" />
          <stop offset="1" stopColor="#ddd3ff" />
        </linearGradient>
        <linearGradient id="dsMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a83ff" />
          <stop offset="1" stopColor="#cbbcff" />
        </linearGradient>
        <linearGradient id="dsNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9f58c" />
          <stop offset="0.55" stopColor="#ecf8c4" />
          <stop offset="1" stopColor="#f7f9ea" />
        </linearGradient>
        <linearGradient id="dsBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b2eff" />
          <stop offset="1" stopColor="#8f74ff" />
        </linearGradient>
        <pattern id="dsDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#5b2eff" opacity="0.16" />
        </pattern>
        <radialGradient id="dsDotsFade" cx="0.5" cy="0.25" r="0.6">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="dsDotsMask">
          <rect width="1600" height="1000" fill="url(#dsDotsFade)" />
        </mask>
        <filter id="dsGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" />
          <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.45  0 0 0 0.5 0" />
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#dsSky)" />
      <rect width="1600" height="1000" fill="url(#dsViolet)" />
      <rect width="1600" height="1000" fill="url(#dsDots)" mask="url(#dsDotsMask)" />
      <rect width="1600" height="1000" fill="url(#dsLime)" />

      {/* Sound ripples spreading out from behind the app. */}
      <g className={styles.ripples}>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx="800" cy="600" r="260" style={{ animationDelay: `${i * 1.8}s` }} />
        ))}
      </g>

      <path className={styles.far} fill="url(#dsFar)" d={ridge(600, far)} />
      <g className={styles.bars}>
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={(b.y - b.h).toFixed(1)}
            width="7"
            height={b.h.toFixed(1)}
            rx="3.5"
            style={{ animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }}
          />
        ))}
      </g>
      <path className={styles.mid} fill="url(#dsMid)" d={ridge(690, mid)} />
      <path className={styles.near} fill="url(#dsNear)" d={ridge(800, near)} />

      <g className={styles.motes}>
        {motes.map((m, i) => (
          <circle
            key={i}
            cx={m.x.toFixed(1)}
            cy={m.y.toFixed(1)}
            r={m.r.toFixed(1)}
            fill={m.lime ? "#e6ff6a" : "#ffffff"}
            style={{ animationDelay: `${m.delay}s`, animationDuration: `${m.dur}s` }}
          />
        ))}
      </g>

      <rect width="1600" height="1000" filter="url(#dsGrain)" opacity="0.07" />
    </svg>
  );
}

export const DemoScenery = memo(Scenery);
