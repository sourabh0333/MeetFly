"use client";

import { useEffect, useRef, useState } from "react";
import { consent } from "@/content/privacy";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./consent.module.css";

// "The people in your meetings": consent. Left: the honest statement and four facts. Right: the
// moment played out on a ruled timeline, no panels: the call starts, MeetFly's reminder bar slides
// in (its real title and buttons), "Copy notice for meeting chat" presses itself, the notice types
// into the meeting chat as your message, and an example reply arrives. Plays once when reached,
// with a Replay button.
const T = { start: 300, reminder: 1000, press: 2400, type: 3100, reply: 0 }; // reply set after typing

export function Consent() {
  const ref = useRef(null);
  const demoRef = useRef(null);
  const seen = useSeen(ref);
  const demoSeen = useSeen(demoRef, 0.4);
  const d = consent.demo;
  const [step, setStep] = useState(4); // 0 nothing · 1 start · 2 reminder · 3 pressed · 4 typing/typed · 5 reply
  const [typed, setTyped] = useState(d.notice.length);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!demoSeen) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(5);
      return undefined;
    }
    const timers = [];
    let typer = 0;
    setStep(0);
    setTyped(0);
    timers.push(setTimeout(() => setStep(1), T.start));
    timers.push(setTimeout(() => setStep(2), T.reminder));
    timers.push(setTimeout(() => setStep(3), T.press));
    timers.push(
      setTimeout(() => {
        setStep(4);
        let k = 0;
        typer = setInterval(() => {
          k += 2;
          setTyped(Math.min(k, d.notice.length));
          if (k >= d.notice.length) {
            clearInterval(typer);
            timers.push(setTimeout(() => setStep(5), 900));
          }
        }, 28);
      }, T.type),
    );
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(typer);
    };
  }, [demoSeen, run, d.notice.length]);

  return (
    <section ref={ref} id="consent" className={styles.section} data-in={seen || undefined} aria-labelledby="consent-title">
      <SectionHead id="consent-title" eyebrow={consent.eyebrow} title={consent.title} lead={consent.lead} />

      <div className={styles.split}>
        {/* The statement and facts. */}
        <div className={styles.left}>
          <p className={styles.statement}>{consent.statement}</p>
          <ul className={styles.facts}>
            {consent.facts.map((f, k) => (
              <li key={f.t} style={{ "--k": k }}>
                <span className={styles.check} aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                <span>
                  <b>{f.t}</b>
                  <small>{f.d}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* The moment, played out. */}
        <div ref={demoRef} className={styles.demo} data-step={step} aria-label={`${d.reminder} ${d.notice}`}>
          <ol className={styles.timeline}>
            <li className={styles.start} data-on={step >= 1 || undefined}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.stamp}>0:00</span>
              {d.start}
            </li>

            <li className={styles.reminder} data-on={step >= 2 || undefined}>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.bar}>
                <span className={styles.shield} aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M8 1.8l5 2v4c0 3-2.2 5.3-5 6.4-2.8-1.1-5-3.4-5-6.4v-4z" />
                    <path d="M5.8 8.2l1.6 1.6 3-3.3" />
                  </svg>
                </span>
                <b>{d.reminder}</b>
                <span className={styles.buttons}>
                  <span className={styles.primary} data-pressed={step >= 3 || undefined}>
                    {step >= 3 ? `✓ ${d.copied}` : d.buttons[0]}
                  </span>
                  <span>{d.buttons[1]}</span>
                  <span className={styles.quiet}>{d.buttons[2]}</span>
                </span>
              </div>
            </li>

            <li className={styles.chat} data-on={step >= 4 || undefined}>
              <span className={styles.dot} aria-hidden="true" />
              <p className={styles.chatLabel}>{d.chat}</p>
              <p className={styles.msg} data-me="">
                <span className={styles.who}>{d.you}</span>
                <span className={styles.text}>
                  {d.notice.slice(0, typed)}
                  {step === 4 && typed < d.notice.length && <i className={styles.caret} />}
                </span>
              </p>
              <p className={styles.msg} data-on={step >= 5 || undefined}>
                <span className={styles.who}>
                  {d.them} <em>{d.example}</em>
                </span>
                <span className={styles.text}>{d.reply}</span>
              </p>
            </li>
          </ol>
          <button type="button" className={styles.replay} onClick={() => setRun((r) => r + 1)}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8a5 5 0 1 0 1.5-3.6M3 3v2.5h2.5" />
            </svg>
            {d.replay}
          </button>
        </div>
      </div>
    </section>
  );
}
