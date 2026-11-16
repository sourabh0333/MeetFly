"use client";

import { useRef } from "react";
import { start } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./start.module.css";

// "From your calendar to a better call". No pinning, no boxes, full width.
// 1. Your day as an open timeline: an hour ruler across the page, meetings as bars on one line
//    with their names above, a Now line drifting toward the next meeting (Join / Prepare pulse).
// 2. Three steps as giant outlined numbers joined by a curve that draws itself as you scroll
//    (CSS scroll-linked, not pinned); each number fills as the line reaches it.
const first = start.hours[0];
const span = start.hours.at(-1) - first;
const pct = (h) => `${(((h - first) / span) * 100).toFixed(2)}%`;
// 9.5 -> "9:30am", 14 -> "2pm".
const fmt = (h) => {
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  const hour = whole > 12 ? whole - 12 : whole;
  return `${hour}${mins ? `:${String(mins).padStart(2, "0")}` : ""}${whole >= 12 ? "pm" : "am"}`;
};

export function Start() {
  const ref = useRef(null);
  const seen = useSeen(ref);

  return (
    <section ref={ref} id="start" className={styles.section} data-in={seen || undefined} aria-labelledby="start-title">
      <SectionHead id="start-title" eyebrow={start.eyebrow} title={start.title} lead={start.lead} />

      {/* 1. The day. */}
      <div className={styles.day}>
        <div className={styles.dayHead}>
          <p className={styles.today}>
            {start.today}
            <span>{start.connectNote}</span>
          </p>
          <ul className={styles.sources}>
            {start.calendars.map((c) => (
              <li key={c}>
                <i />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.scroller}>
          <div className={styles.timeline}>
            <ol className={styles.meetings}>
              {start.meetings.map((m, i) => (
                <li
                  key={m.title}
                  className={styles.meeting}
                  data-next={m.next || undefined}
                  style={{ left: pct(m.from), width: `calc(${pct(m.to)} - ${pct(m.from)})`, "--i": i }}
                >
                  <span className={styles.mText}>
                    <b>{m.title}</b>
                    <small>
                      {fmt(m.from)} · {m.type}
                    </small>
                    {m.next && (
                      <span className={styles.actions}>
                        <em data-primary>{start.join}</em>
                        <em>{start.prepare}</em>
                      </span>
                    )}
                  </span>
                  <span className={styles.bar} aria-hidden="true" />
                </li>
              ))}
            </ol>

            <div className={styles.ruler} aria-hidden="true">
              {start.hours.map((h) => (
                <span key={h} style={{ left: pct(h) }}>
                  {fmt(h)}
                </span>
              ))}
            </div>

            <span className={styles.now} style={{ "--from": pct(start.nowAt), "--to": pct(10.92) }} aria-hidden="true">
              <i>{start.now}</i>
            </span>
          </div>
        </div>
      </div>

      {/* 2. The steps, joined by a self-drawing curve. */}
      <div className={styles.steps}>
        <svg className={styles.path} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100 60 C 300 -10, 400 130, 600 60 S 900 -10, 1100 60" pathLength="1" />
        </svg>
        <ol>
          {start.steps.map((s, i) => (
            <li key={s.n} style={{ "--i": i }}>
              <span className={styles.bigN} aria-hidden="true">
                {s.n}
                <span>{s.n}</span>
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
