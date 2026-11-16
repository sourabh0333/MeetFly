"use client";

import { useEffect, useRef, useState } from "react";
import { numbers } from "@/content/home";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./numbers.module.css";

// Product facts as a glass "signal console": five cells in one strip, each with a big number that
// counts up and a small live visual borrowed from the rest of the page (flipping language codes, a
// reply landing in about a second, a mini tuning dial, keycaps, a crossed-out bot). A thin sound
// wave runs along the strip's foot. Visuals move only while on screen; still with reduced motion.
function Count({ to, run }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!run || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame = 0;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 1400);
      setV(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    setV(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to, run]);
  return v;
}

// A tick that advances every `ms` while `on`.
function useTick(on, ms) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setN((x) => x + 1), ms);
    return () => clearInterval(id);
  }, [on, ms]);
  return n;
}

function Visual({ kind, on }) {
  const tick = useTick(on, kind === "langs" ? 1100 : kind === "dial" ? 1400 : 900);
  if (kind === "langs") {
    const code = numbers.langs[tick % numbers.langs.length];
    return (
      <span className={styles.langs}>
        <b key={code}>{code}</b>
        <svg viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        <b>EN</b>
      </span>
    );
  }
  if (kind === "speed") {
    return (
      <span className={styles.speed} data-on={on || undefined}>
        <span className={styles.wave}>
          {[0.5, 0.9, 0.6, 1, 0.7, 0.4].map((h, i) => (
            <i key={i} style={{ "--h": h, "--d": `${i * 0.08}s` }} />
          ))}
        </span>
        <span className={styles.bar}>
          <i />
        </span>
        <span className={styles.dot} />
      </span>
    );
  }
  if (kind === "dial") {
    const at = tick % 5;
    const angle = 160 - at * 35;
    return (
      <svg className={styles.dial} viewBox="0 0 80 46">
        <path d="M8 42 A32 32 0 0 1 72 42" />
        {[0, 1, 2, 3, 4].map((k) => {
          const a = ((160 - k * 35) * Math.PI) / 180;
          return <circle key={k} cx={(40 + 32 * Math.cos(a)).toFixed(1)} cy={(42 - 32 * Math.sin(a)).toFixed(1)} r="3.2" data-on={k === at || undefined} />;
        })}
        <line x1="40" y1="42" x2="40" y2="18" style={{ transform: `rotate(${90 - angle}deg)` }} />
        <circle cx="40" cy="42" r="4" />
      </svg>
    );
  }
  if (kind === "keys") {
    const at = tick % 3;
    return (
      <span className={styles.keys}>
        {["⌘", "⇧", "K"].map((k, i) => (
          <kbd key={k} data-on={i === at || undefined}>
            {k}
          </kbd>
        ))}
      </span>
    );
  }
  return (
    <span className={styles.nobot}>
      <svg viewBox="0 0 24 24">
        <path d="M6 9h12v9H6zM12 5v4M9.5 13h.01M14.5 13h.01" />
        <path d="M3 3l18 18" data-cross />
      </svg>
    </span>
  );
}

export function Numbers() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.4);
  const on = useOnScreen(ref, 0.3);
  return (
    <section ref={ref} className={styles.section} data-in={seen || undefined} aria-label={numbers.label}>
      <div className={styles.console}>
        <ul className={styles.row}>
          {numbers.items.map((it, i) => (
            <li key={it.label} style={{ "--i": i }}>
              <span className={styles.visual} aria-hidden="true">
                <Visual kind={it.visual} on={on} />
              </span>
              <p className={styles.value}>
                {it.prefix && <span className={styles.affix}>{it.prefix}</span>}
                <Count to={it.value} run={seen} />
                {it.suffix && <span className={styles.affix}>{it.suffix}</span>}
              </p>
              <p className={styles.label}>{it.label}</p>
            </li>
          ))}
        </ul>
        {/* A thin sound wave along the foot, joining the cells. */}
        <svg className={styles.signal} viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 20 C 60 4, 120 36, 180 20 S 300 4, 360 20 S 480 36, 540 20 S 660 4, 720 20 S 840 36, 900 20 S 1020 4, 1080 20 S 1170 30, 1200 20" />
        </svg>
      </div>
    </section>
  );
}
