"use client";

import { useEffect, useRef, useState } from "react";
import { worksWith as w } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./works-with.module.css";

// "Works with": a through-line. Three rows on one grid, In | MeetFly | Out, so every row lines up
// across the page. On the left what comes in (Calendar, Meeting links, Any call app), on the right
// where notes go out (Paste, Files, Send). Down the middle an ink spine with the MeetFly icon;
// each row's wire runs into it from the left and out of it to the right, and a lime pulse travels
// the lit row's wire, in → spine → out. The lit row steps by itself while on screen; hover or
// focus a row to light it (that stops the stepping). Under it, one ruled "Runs on" line.
const STEP_MS = 3400;

export function WorksWith() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.1);
  const on = useOnScreen(ref, 0.1);
  const [lit, setLit] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!seen || !on || !auto || still) return undefined;
    const id = setTimeout(() => setLit((k) => (k + 1) % w.rows.length), STEP_MS);
    return () => clearTimeout(id);
  }, [seen, on, auto, still, lit]);

  const pick = (k) => {
    setAuto(false);
    setLit(k);
  };

  const side = (d, sideId, k) => (
    <div
      key={`${sideId}-${k}`}
      className={styles.cell}
      data-side={sideId}
      data-lit={lit === k || undefined}
      style={{ "--r": k + 2 }}
      tabIndex={0}
      onPointerEnter={(e) => e.pointerType === "mouse" && pick(k)}
      onFocus={() => pick(k)}
    >
      <span className={styles.kind}>
        <i aria-hidden="true" />
        {sideId === "in" ? w.inLabel : w.outLabel} · {d.kind}
      </span>
      <b className={styles.title}>{d.title}</b>
      <ul className={styles.names}>
        {d.names.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <p className={styles.note}>{d.note}</p>
      <span className={styles.wire} aria-hidden="true">
        {lit === k && seen && !still && <i key={`${k}-${lit}`} />}
      </span>
    </div>
  );

  return (
    <section
      id="works-with"
      ref={ref}
      className={styles.section}
      data-in={seen || undefined}
      data-paused={!on || undefined}
      aria-labelledby="works-with-title"
    >
      <SectionHead id="works-with-title" eyebrow={w.eyebrow} title={w.title} lead={w.lead} />

      <div className={styles.board} style={{ "--rows": w.rows.length }}>
        {/* Column heads */}
        <p className={styles.colHead} data-side="in">
          {w.inLabel}
        </p>
        <p className={styles.colHead} data-side="out">
          {w.outLabel}
        </p>

        {/* The spine */}
        <div className={styles.spine} aria-hidden="true">
          <span className={styles.spineLine} />
          <span className={styles.hub}>
            <img src="/brand/icon.svg" alt="" width="34" height="34" />
          </span>
          <span className={styles.hubName}>{w.hub}</span>
          <span className={styles.hubHint}>{w.hubHint}</span>
        </div>

        {w.rows.flatMap((r, k) => [side(r.in, "in", k), side(r.out, "out", k)])}
      </div>

      <p className={styles.runs}>
        {w.runs.map((x) => (
          <span key={x.label}>
            <b>{x.label}</b>
            {x.text}
          </span>
        ))}
      </p>
    </section>
  );
}

