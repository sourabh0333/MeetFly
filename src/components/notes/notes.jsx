"use client";

import { useEffect, useRef, useState } from "react";
import { notes } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./notes.module.css";

// "Your notes write themselves while you talk". No pinning, no boxes, full width.
// 1. A live strip: REC, "Live notes", a 30-second refresh ring, a bookmark, the latest note typing.
// 2. The rewrite sheet: each row pairs your rough note with what it becomes. As a row scrolls
//    into view a lime scan line sweeps across it, the rough note is struck through and the full
//    note slides in with its tag. The last rows are added by MeetFly from the transcript.
// 3. Four numbered points.
function Row({ row, i, added }) {
  const ref = useRef(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setDone(true), { rootMargin: "0px 0px -35% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <li ref={ref} className={styles.row} data-done={done || undefined} style={{ "--i": i }}>
      <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
      <span className={styles.rough} data-none={!row.rough || undefined}>
        {row.rough || added}
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      </span>
      <span className={styles.full}>
        <b data-tag={row.tag}>{row.tag}</b>
        {row.full}
      </span>
      <span className={styles.scan} aria-hidden="true" />
    </li>
  );
}

export function Notes() {
  const ref = useRef(null);
  const liveRef = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(liveRef, 0.4);
  const [t, setT] = useState(30);

  // The live strip: a 30s ring and the latest note typing in, looping while on screen.
  useEffect(() => {
    if (!on || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let n = 0;
    setT(0);
    const id = setInterval(() => {
      n = (n + 0.1) % 12;
      setT(n);
    }, 100);
    return () => clearInterval(id);
  }, [on]);

  const { sheet, live } = notes;
  const typed = notes.liveLine.slice(0, Math.max(0, Math.floor((t - 0.4) * 22)));
  const ring = (t % 12) / 12;

  return (
    <section ref={ref} id="notes" className={styles.section} data-in={seen || undefined} aria-labelledby="notes-title">
      <SectionHead id="notes-title" eyebrow={notes.eyebrow} title={notes.title} lead={notes.lead} />

      {/* 1. The live strip. */}
      <div ref={liveRef} className={styles.live} aria-hidden="true">
        <span className={styles.rec}>
          <i />
          {live.label}
        </span>
        <span className={styles.ring} style={{ "--p": ring.toFixed(3) }}>
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" />
            <circle cx="18" cy="18" r="15" pathLength="1" />
          </svg>
          {live.refresh}
        </span>
        <span className={styles.typing}>
          {typed}
          <i className={styles.caret} />
        </span>
        <span className={styles.bookmark}>
          <svg viewBox="0 0 24 24">
            <path d="M7 4h10v16l-5-4-5 4z" />
          </svg>
          {live.bookmark}
        </span>
      </div>

      {/* 2. The rewrite sheet. */}
      <div className={styles.sheet}>
        <div className={styles.heads} aria-hidden="true">
          <span />
          <span>{sheet.mineLabel}</span>
          <span />
          <span>{sheet.fullLabel}</span>
        </div>
        <ol className={styles.rows}>
          {sheet.rows.map((row, i) => (
            <Row key={row.full} row={row} i={i} added={sheet.added} />
          ))}
        </ol>
      </div>

      {/* 3. Points. */}
      <ul className={styles.points}>
        {notes.points.map((p, i) => (
          <li key={p} style={{ "--i": i }}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
