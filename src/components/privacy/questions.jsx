"use client";

import { useEffect, useRef, useState } from "react";
import { questions } from "@/content/privacy";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./questions.module.css";

// "Privacy questions, answered" as a question stage. Two marquee rows of question pills glide in
// opposite directions across the full width (they pause on hover); the picked pill turns ink with
// a glow. Below, the stage: "03 / 08", the question in big type with its words rising in, the
// answer decoding letter by letter, and its tags (policy section, setting in the app). A giant
// gradient "?" floats behind it. A thin line under the stage fills, then the next question plays,
// until a pill is clicked.
const STEP_MS = 6500;
const items = questions.items;
const half = Math.ceil(items.length / 2);
const rows = [items.slice(0, half).map((x, k) => ({ ...x, i: k })), items.slice(half).map((x, k) => ({ ...x, i: k + half }))];

export function Questions() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(stageRef, 0.3);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const pick = (i) => {
    setAuto(false);
    setActive(i);
  };
  const playing = auto && on && !still;
  const item = items[active];

  return (
    <section ref={ref} id="privacy-questions" className={styles.section} data-in={seen || undefined} aria-labelledby="pq-title">
      <SectionHead id="pq-title" eyebrow={questions.eyebrow} title={questions.title} lead={questions.lead} />

      {/* The questions, gliding. */}
      <div className={styles.marquees} role="tablist" aria-label={questions.title}>
        {rows.map((row, r) => (
          <div key={r} className={styles.marquee} data-rev={r === 1 || undefined}>
            <ul className={styles.track}>
              {[0, 1].map((copy) =>
                row.map((x) => (
                  <li key={`${copy}-${x.i}`} aria-hidden={copy === 1 || undefined}>
                    <button
                      type="button"
                      role={copy === 0 ? "tab" : undefined}
                      aria-selected={copy === 0 ? x.i === active : undefined}
                      tabIndex={copy === 0 ? 0 : -1}
                      data-on={x.i === active || undefined}
                      onClick={() => pick(x.i)}
                    >
                      <span className={styles.pn}>{String(x.i + 1).padStart(2, "0")}</span>
                      {x.q}
                    </button>
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* The stage. */}
      <div ref={stageRef} className={styles.stage} aria-live="polite">
        <span className={styles.glyph} aria-hidden="true">
          ?
        </span>
        <div className={styles.body} key={active}>
          <p className={styles.count}>
            {String(active + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span>
          </p>
          <h3 className={styles.q}>
            {item.q.split(" ").map((w, k) => (
              <span key={k} style={{ "--w": k }}>
                {w}{" "}
              </span>
            ))}
          </h3>
          <p className={styles.a}>{still ? item.a : <DecodeText text={item.a} delay={350} duration={1100} />}</p>
          <div className={styles.meta}>
            <p>
              <span>{questions.srcLabel}</span>
              {item.src}
            </p>
            {item.app && (
              <p>
                <span>{questions.appLabel}</span>
                {item.app}
              </p>
            )}
          </div>
        </div>
        <span className={styles.progress} aria-hidden="true">
          <i
            key={`${active}-${playing}`}
            style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
            onAnimationEnd={() => playing && setActive((a) => (a + 1) % items.length)}
          />
        </span>
      </div>
    </section>
  );
}
