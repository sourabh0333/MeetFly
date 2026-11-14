"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/home";
import styles from "./journey.module.css";

// "Before · During · After": three equal cards, each with a small live demo on top. The cards rise
// in one after another when the section is seen, and each demo loops only while it's on screen.
// With reduced motion every demo rests on its finished state.

// A looping clock (seconds) that runs only while `ref` is on screen.
function useLoop(ref, seconds) {
  const [t, setT] = useState(0);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setT(seconds - 0.01);
      return undefined;
    }
    let frame = 0;
    let last = 0;
    let time = 0;
    let shown = -1;
    const loop = (now) => {
      time = (time + (last ? Math.min(0.1, (now - last) / 1000) : 0)) % seconds;
      last = now;
      if (Math.abs(time - shown) >= 1 / 30) {
        shown = time;
        setT(time);
      }
      frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (e.isIntersecting) frame = requestAnimationFrame(loop);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, seconds]);
  return [t, still];
}

const typed = (text, from, t, cps = 26) => text.slice(0, Math.max(0, Math.floor((t - from) * cps)));
// Fade the whole demo out at the end of each loop, so the restart is soft.
const fade = (t, seconds) => (t > seconds - 0.6 ? Math.max(0, (seconds - t) / 0.6) : Math.min(1, t / 0.4));

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

function BeforeDemo({ d }) {
  const ref = useRef(null);
  const S = 8;
  const [t, still] = useLoop(ref, S);
  return (
    <div ref={ref} className={styles.panel} style={{ opacity: still ? 1 : fade(t, S) }}>
      <p className={styles.panelHead}>{d.heading}</p>
      <p className={styles.fieldLabel}>{d.typeLabel}</p>
      <div className={styles.chips}>
        {d.types.map((type, i) => (
          <span key={type} data-on={(i === 0 && t > 0.6) || undefined}>
            {type}
          </span>
        ))}
      </div>
      <p className={styles.fieldLabel}>{d.goalLabel}</p>
      <div className={styles.input}>
        {typed(d.goal, 1.2, t)}
        {t > 1.2 && t < 1.2 + d.goal.length / 26 + 0.3 && <i className={styles.caret} />}
      </div>
      <p className={styles.fieldLabel}>{d.docLabel}</p>
      <div className={styles.docRow}>
        <span className={styles.doc} data-on={t > 2.7 || undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3.5h7l4 4v13H7zM14 3.5v4h4" />
          </svg>
          {d.doc}
        </span>
      </div>
      <div className={styles.prepFoot}>
        <span className={styles.toggle} data-on={t > 3.8 || undefined}>
          <i />
          {d.practice}
        </span>
        <span className={styles.startBtn} data-on={t > 4.6 || undefined}>
          {d.start}
        </span>
      </div>
    </div>
  );
}

function DuringDemo({ d }) {
  const ref = useRef(null);
  const per = 4.2;
  const S = per * d.lines.length;
  const [t, still] = useLoop(ref, S);
  const i = still ? 0 : Math.min(d.lines.length - 1, Math.floor(t / per));
  const local = still ? per : t - i * per;
  const line = d.lines[i];
  const action = still ? -1 : Math.floor(t / 1.6) % (d.actions.length + 1);
  return (
    <div ref={ref} className={styles.panel}>
      <div className={styles.capHead}>
        <p className={styles.panelHead}>{d.heading}</p>
        <span className={styles.lang}>
          <b key={line.code}>{line.code}</b>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          EN
        </span>
      </div>
      <div className={styles.caption} key={i} style={{ opacity: still ? 1 : Math.min(1, local / 0.35, (per - local) / 0.35) }}>
        <span className={styles.who}>
          {d.them} · {line.lang}
        </span>
        <p className={styles.original} lang={line.code.toLowerCase()}>
          {line.text}
        </p>
        <p className={styles.english}>
          {still ? d.english : typed(d.english, 0.9, local, 30)}
          {!still && local > 0.9 && local < 0.9 + d.english.length / 30 + 0.2 && <i className={styles.caret} />}
        </p>
        <span className={styles.into}>{d.into}</span>
      </div>
      <div className={styles.actions}>
        {d.actions.map((a, k) => (
          <span key={a} data-on={k === action || undefined}>
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

function AfterDemo({ d }) {
  const ref = useRef(null);
  const S = 9;
  const [t, still] = useLoop(ref, S);
  const talk = Math.min(1, Math.max(0, (t - 2.4) / 0.9));
  return (
    <div ref={ref} className={styles.panel} style={{ opacity: still ? 1 : fade(t, S) }}>
      <div className={styles.capHead}>
        <p className={styles.panelHead}>{d.heading}</p>
        <span className={styles.tag}>{d.template}</span>
      </div>
      <ul className={styles.todo}>
        {d.items.map((item, k) => (
          <li key={item} data-on={t > 0.5 + k * 0.45 || undefined}>
            <span>
              <Check />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.stats}>
        {d.stats.map(([v, l]) => (
          <p key={l}>
            <b>{v}</b>
            {l}
          </p>
        ))}
        <div className={styles.talk}>
          <p>
            {d.talk.label}
            <span>
              {d.talk.youLabel} {Math.round(d.talk.you * talk)}%
            </span>
          </p>
          <div className={styles.bar}>
            <i style={{ transform: `scaleX(${(d.talk.you / 100) * talk})` }} />
          </div>
        </div>
      </div>
      <div className={styles.email} data-on={t > 3.6 || undefined}>
        <span className={styles.emailHead}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 6h17v12h-17zM3.5 6.5l8.5 6.5 8.5-6.5" />
          </svg>
          {d.email}
        </span>
        <p>
          {typed(d.draft, 4.1, t, 30)}
          {t > 4.1 && t < 4.1 + d.draft.length / 30 + 0.3 && <i className={styles.caret} />}
        </p>
      </div>
    </div>
  );
}

const demos = { before: BeforeDemo, during: DuringDemo, after: AfterDemo };

export function Journey() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="journey" className={styles.section} data-in={seen || undefined} aria-labelledby="journey-title">
      <header className={styles.head}>
        <p className={styles.eyebrow}>{journey.eyebrow}</p>
        <h2 id="journey-title" className={styles.title}>
          {journey.title}
        </h2>
        <p className={styles.lead}>{journey.lead}</p>
      </header>

      <ol className={styles.grid}>
        {journey.steps.map((step, i) => {
          const Demo = demos[step.key];
          return (
            <li key={step.key} className={styles.card} data-step={step.key} style={{ "--i": i }}>
              <div className={styles.stage} aria-hidden="true">
                <Demo d={step.demo} />
              </div>
              <div className={styles.body}>
                <p className={styles.when}>
                  <span>{step.n}</span>
                  {step.when}
                </p>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
                <ul className={styles.points}>
                  {step.points.map((p) => (
                    <li key={p}>
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
