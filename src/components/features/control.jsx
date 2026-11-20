"use client";

import { useEffect, useRef, useState } from "react";
import { control } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./control.module.css";

// "Your data, your rules". Row 1: how long meetings are kept, made visible: past meetings as dots
// on a time axis (Today → 7 → 30 → 90 days → older). Picking Forever / 90 / 30 / 7 days moves a
// cutoff line and the older meetings fade to empty outlines ("Cleared after 30 days"). When first
// seen it plays Forever → 90 → 30; click any option. Row 2: three ruled switches in big type (audio
// recordings, consent reminder, error reports, which switches off to show you can). Row 3: the
// honest note on what is sent out, the facts, and Delete all (explains it asks to confirm).
const keep = control.settings.find((s) => s.id === "keep");
const toggles = control.settings.filter((s) => s.kind === "toggle");
const del = control.settings.find((s) => s.id === "delete");
const DAYS = [Infinity, 90, 30, 7]; // matches keep.options
const MAX = 180;
const xOf = (d) => Math.sqrt(Math.min(d, MAX) / MAX) * 88; // % along the axis
const TICKS = [
  [0, "Today"],
  [7, "7 days"],
  [30, "30 days"],
  [90, "90 days"],
  [MAX, "Older"],
];

// Past meetings: more of them recently, fewer further back (deterministic).
const meetings = Array.from({ length: 54 }, (_, i) => {
  const r = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const age = Math.round(Math.pow((i + r) / 54, 1.6) * MAX * 1.05);
  return { age, x: +(xOf(age) + (age >= MAX ? r * 7 : 0)).toFixed(3), row: i % 3 };
});

const Check = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
);

function Switch({ s, seen }) {
  const [on, setOn] = useState(s.on);
  const touched = useRef(false);
  useEffect(() => {
    if (!s.flip || !seen || touched.current) return undefined;
    const id = setTimeout(() => !touched.current && setOn(false), 1800);
    return () => clearTimeout(id);
  }, [seen, s.flip]);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={s.label}
      className={styles.switch}
      onClick={() => {
        touched.current = true;
        setOn((x) => !x);
      }}
    >
      <i aria-hidden="true" />
      <span>{on ? "On" : "Off"}</span>
    </button>
  );
}

export function Control() {
  const ref = useRef(null);
  const rowRef = useRef(null);
  const seen = useSeen(ref);
  const rowSeen = useSeen(rowRef, 0.4);
  const [pick, setPick] = useState(0);
  const touched = useRef(false);
  const [asked, setAsked] = useState(false);

  // Play Forever → 90 days → 30 days once, when first seen.
  useEffect(() => {
    if (!rowSeen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const a = setTimeout(() => !touched.current && setPick(1), 900);
    const b = setTimeout(() => !touched.current && setPick(2), 2300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [rowSeen]);

  const days = DAYS[pick];
  const forever = days === Infinity;
  const cut = forever ? 100 : xOf(days);
  const cleared = meetings.filter((m) => m.age > days).length;

  return (
    <section ref={ref} id="privacy-controls" className={styles.section} data-in={seen || undefined} aria-labelledby="control-title">
      <SectionHead id="control-title" eyebrow={control.eyebrow} title={control.title} lead={control.lead} />

      <div className={styles.wrap}>
        {/* Row 1: keep meetings for. */}
        <div ref={rowRef} className={styles.keep} data-on={rowSeen || undefined} style={{ "--cut": `${cut}%` }}>
          <div className={styles.keepHead}>
            <p className={styles.label}>{keep.label}</p>
            <p className={styles.text}>{keep.text}</p>
            <p className={styles.segments} role="radiogroup" aria-label={keep.label} style={{ "--i": pick, "--n": keep.options.length }}>
              <span className={styles.thumb} aria-hidden="true" />
              {keep.options.map((o, k) => (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={k === pick}
                  onClick={() => {
                    touched.current = true;
                    setPick(k);
                  }}
                >
                  {o}
                </button>
              ))}
            </p>
            <p className={styles.tally} aria-live="polite">
              <b>{meetings.length - cleared}</b> kept
              <span>·</span>
              <b>{cleared}</b> cleared
            </p>
          </div>

          <div className={styles.chart} aria-hidden="true">
            <span className={styles.kept} />
            <span className={styles.cut} data-forever={forever || undefined}>
              <b>{forever ? "Kept forever" : `Cleared after ${keep.options[pick]}`}</b>
            </span>
            {meetings.map((m, k) => (
              <i
                key={k}
                className={styles.dot}
                data-gone={m.age > days || undefined}
                style={{ left: `${Math.min(m.x, 99)}%`, "--row": m.row, "--k": k }}
              />
            ))}
            <span className={styles.axis} />
            {TICKS.map(([d, l]) => (
              <span key={l} className={styles.tick} data-first={d === 0 || undefined} style={{ left: `${xOf(d).toFixed(3)}%` }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: three switches. */}
        <ul className={styles.switches}>
          {toggles.map((s) => (
            <li key={s.id}>
              <p className={styles.label}>{s.label}</p>
              <p className={styles.text}>{s.text}</p>
              <Switch s={s} seen={rowSeen} />
            </li>
          ))}
        </ul>

        {/* Row 3: honest note, facts, delete all. */}
        <div className={styles.foot}>
          <p className={styles.honest}>
            <span className={styles.lock} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M4.5 7.5h7v6h-7zM6 7.5V5.5a2 2 0 0 1 4 0v2" />
              </svg>
            </span>
            <span>
              <b>{control.statement}</b> {control.honest}
            </span>
          </p>
          <ul className={styles.facts}>
            {control.facts.map((f) => (
              <li key={f}>
                <Check />
                {f}
              </li>
            ))}
          </ul>
          <div className={styles.deleteCell}>
            <button type="button" className={styles.delete} onClick={() => setAsked((x) => !x)} aria-expanded={asked}>
              {del.button}
            </button>
            <small>{asked ? "In the app, it asks you to confirm first." : del.text}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
