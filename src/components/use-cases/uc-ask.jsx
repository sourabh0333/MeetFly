"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ask, roles } from "@/content/use-cases";
import { featureGroups } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./uc-ask.module.css";

// "Ask what your role would ask". Two rails of question pills drift across the full width in
// opposite directions (faded edges; they pause on hover; a click asks that question). Under them a
// wide stage: on the left the question in big type, rising in word by word out of a blur, with its
// role, a counter, ‹ › and a ring that runs down to the next question; on the right MeetFly's answer
// card inside a rotating gradient border: a "thinking" beat, then the answer streams in word by
// word, then the features it uses spring in as links. A spotlight follows the cursor over the card
// and an aurora drifts behind the stage. Plays while on screen until someone picks; reduced motion
// shows the answer at once and stops the rails. Every answer is in the HTML.
const STEP = 9000; // ms per question while it plays
const THINK = 650; // ms of "thinking" before the answer streams
const features = Object.fromEntries(featureGroups.flatMap((g) => g.items).map((f) => [f.id, f.name]));
const roleName = Object.fromEntries(roles.map((r) => [r.id, r.short || r.role]));
const items = ask.items.map((x, i) => ({ ...x, i }));
const rails = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)];

export function UseCasesAsk() {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(ref, 0.25);
  const [pick, setPick] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false); // pointer over the stage
  const [still, setStill] = useState(false);
  const [thinking, setThinking] = useState(true);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // A short "thinking" beat before each answer streams in.
  useEffect(() => {
    if (still) {
      setThinking(false);
      return undefined;
    }
    setThinking(true);
    const id = setTimeout(() => setThinking(false), THINK);
    return () => clearTimeout(id);
  }, [pick, still]);

  const choose = (i) => {
    setAuto(false);
    setPick(i);
  };
  const step = (d) => choose((pick + d + items.length) % items.length);

  // The spotlight follows the cursor over the answer card.
  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const item = items[pick];
  const playing = auto && on && !still && !hold;
  const qWords = item.q.split(" ");
  const aWords = item.a.split(" ");

  return (
    <section
      ref={ref}
      id="ask"
      className={styles.section}
      data-in={seen || undefined}
      data-play={(on && !still) || undefined}
      aria-labelledby="ask-title"
    >
      <SectionHead id="ask-title" eyebrow={ask.eyebrow} title={ask.title} lead={ask.lead} />

      {/* Two drifting rails of questions */}
      <div className={styles.rails}>
        {rails.map((rail, r) => (
          <div key={r} className={styles.rail} data-dir={r === 1 ? "back" : undefined}>
            <div className={styles.track}>
              {[0, 1].map((copy) =>
                rail.map((x) => (
                  <button
                    key={`${copy}-${x.i}`}
                    type="button"
                    className={styles.pill}
                    aria-pressed={x.i === pick}
                    aria-controls="ask-stage"
                    tabIndex={copy ? -1 : 0}
                    aria-hidden={copy ? true : undefined}
                    onClick={() => choose(x.i)}
                  >
                    <span className={styles.pillRole}>{roleName[x.role]}</span>
                    {x.q}
                  </button>
                )),
              )}
            </div>
          </div>
        ))}
      </div>

      {/* The stage */}
      <div
        id="ask-stage"
        className={styles.stage}
        aria-live="polite"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onMouseMove={onMove}
      >
        <span className={styles.aurora} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        {/* The question */}
        <div className={styles.qSide}>
          <p className={styles.qMeta}>
            <span className={styles.roleBadge}>{roleName[item.role]}</span>
            <span className={styles.counter}>
              {String(pick + 1).padStart(2, "0")}
              <i>/ {String(items.length).padStart(2, "0")}</i>
            </span>
          </p>

          <h3 className={styles.question} key={`q-${pick}`}>
            {qWords.map((w, i) => (
              <span key={i} style={{ "--d": `${i * 55}ms` }}>
                {w}{" "}
              </span>
            ))}
          </h3>

          <div className={styles.controls}>
            <button type="button" className={styles.navBtn} onClick={() => step(-1)} aria-label="Previous question">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10 3.5L5.5 8l4.5 4.5" />
              </svg>
            </button>
            <button type="button" className={styles.navBtn} onClick={() => step(1)} aria-label="Next question">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M6 3.5L10.5 8 6 12.5" />
              </svg>
            </button>
            {auto && !still && (
              <span className={styles.timer} aria-hidden="true">
                <svg viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" />
                  <circle
                    key={`t-${pick}`}
                    className={styles.timerRun}
                    cx="18"
                    cy="18"
                    r="15"
                    pathLength="1"
                    style={{ animationDuration: `${STEP}ms`, animationPlayState: playing ? "running" : "paused" }}
                    onAnimationEnd={() => setPick((p) => (p + 1) % items.length)}
                  />
                </svg>
                <em>Next</em>
              </span>
            )}
          </div>

          <div className={styles.moreLinks}>
            {ask.moreLinks.map((l) => (
              <Link key={l.href} href={l.href} className={styles.moreLink}>
                {l.label}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* MeetFly's answer */}
        <div className={styles.cardWrap}>
          <div ref={cardRef} className={styles.card}>
            <span className={styles.spot} aria-hidden="true" />
            <p className={styles.cardHead}>
              <img src="/brand/icon.svg" alt="" width="24" height="24" />
              <strong>{ask.answerLabel}</strong>
              <span className={styles.status} data-on={!thinking || undefined}>
                {thinking ? "Thinking" : "Answered"}
              </span>
            </p>

            <div className={styles.body} key={`a-${pick}`}>
              {thinking ? (
                <span className={styles.dots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              ) : null}
              <p className={styles.answer} data-on={!thinking || undefined}>
                {aWords.map((w, i) => (
                  <span key={i} style={{ "--d": `${i * 28}ms` }}>
                    {w}{" "}
                  </span>
                ))}
              </p>
              <div className={styles.related} data-on={!thinking || undefined} style={{ "--d": `${aWords.length * 28 + 150}ms` }}>
                <span className={styles.relatedLabel}>{ask.related}</span>
                {item.features.map((f, i) => (
                  <Link key={f} href={`/features#${f}`} className={styles.tag} style={{ "--k": i }}>
                    {features[f] || f}
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M5 11l6-6M6 5h5v5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
