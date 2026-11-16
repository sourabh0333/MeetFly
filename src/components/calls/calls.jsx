"use client";

import { useEffect, useRef, useState } from "react";
import { calls } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./calls.module.css";

// "Tuned to the call you're on" as a full-width radio band. No pinning, no boxes.
// A tuning scale across the page with the five call types as big words; a glowing needle you can
// drag (mouse, touch, arrow keys) that snaps to the nearest station; ticks near it light up. It
// tunes through the stations by itself until touched. Under the band, a 5fr / 7fr spread: what
// they say (serif) | MeetFly's reply decoding in, with Goal and Notes chips.
const N = calls.types.length;
const at = (i) => 10 + (i * 80) / (N - 1); // station positions, % across the band
const TICKS = 81;

export function Calls() {
  const ref = useRef(null);
  const band = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(band, 0.4);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(at(0));
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (!on || touched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => {
      if (touched.current) return;
      setActive((a) => {
        const n = (a + 1) % N;
        setPos(at(n));
        return n;
      });
    }, 4600);
    return () => clearInterval(id);
  }, [on]);

  const nearest = (p) => {
    let best = 0;
    for (let i = 1; i < N; i++) if (Math.abs(at(i) - p) < Math.abs(at(best) - p)) best = i;
    return best;
  };
  const fromPointer = (e) => {
    const r = band.current.getBoundingClientRect();
    return Math.min(96, Math.max(4, ((e.clientX - r.left) / r.width) * 100));
  };
  const tune = (i) => {
    touched.current = true;
    setActive(i);
    setPos(at(i));
  };
  const onDown = (e) => {
    touched.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    const p = fromPointer(e);
    setPos(p);
    setActive(nearest(p));
  };
  const onMove = (e) => {
    if (!dragging) return;
    const p = fromPointer(e);
    setPos(p);
    setActive(nearest(p));
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    setPos(at(active));
  };
  const onKey = (e) => {
    if (e.key === "ArrowRight") tune(Math.min(N - 1, active + 1));
    else if (e.key === "ArrowLeft") tune(Math.max(0, active - 1));
    else return;
    e.preventDefault();
  };

  const call = calls.types[active];

  return (
    <section ref={ref} id="calls" className={styles.section} data-in={seen || undefined} aria-labelledby="calls-title">
      <SectionHead id="calls-title" eyebrow={calls.eyebrow} title={calls.title} lead={calls.lead} />

      {/* The band. */}
      <div className={styles.bandWrap}>
        <div
          ref={band}
          className={styles.band}
          data-dragging={dragging || undefined}
          style={{ "--pos": `${pos.toFixed(2)}%` }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className={styles.stations} role="radiogroup" aria-label="Call type">
            {calls.types.map((t, i) => (
              <button
                key={t.key}
                type="button"
                role="radio"
                aria-checked={i === active}
                className={styles.station}
                style={{ left: `${at(i)}%` }}
                onClick={() => tune(i)}
                onPointerDown={(e) => e.stopPropagation()}
                onKeyDown={onKey}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.scale} aria-hidden="true">
            {Array.from({ length: TICKS }, (_, k) => {
              const x = 4 + (k * 92) / (TICKS - 1);
              const near = Math.max(0, 1 - Math.abs(x - pos) / 12);
              return (
                <i
                  key={k}
                  data-long={k % 10 === 0 || undefined}
                  style={{ left: `${x.toFixed(2)}%`, "--near": near.toFixed(2) }}
                />
              );
            })}
          </div>

          <span className={styles.needle} aria-hidden="true">
            <i />
          </span>
        </div>
        <p className={styles.hint}>
          <span>{String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
          Drag the needle or pick a call
        </p>
      </div>

      {/* The tuned moment, as a spread. */}
      <div className={styles.spread} aria-live="polite">
        <div className={styles.left}>
          <p className={styles.label}>{calls.them}</p>
          <blockquote className={styles.them} key={`q-${call.key}`}>
            “{call.them}”
          </blockquote>
        </div>
        <div className={styles.right}>
          <p className={styles.label}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.5l1.7 5.1 5.1 1.7-5.1 1.7L12 17.1l-1.7-5.1-5.1-1.7 5.1-1.7z" />
            </svg>
            {calls.you}
          </p>
          <p className={styles.reply} key={`r-${call.key}`}>
            <DecodeText text={call.reply} delay={120} duration={900} />
          </p>
          <p className={styles.chips} key={`c-${call.key}`}>
            <span>
              <b>{calls.goalLabel}</b>
              {call.goal}
            </span>
            <span>
              <b>{calls.notesLabel}</b>
              {call.notes}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
