"use client";

import { useEffect, useRef, useState } from "react";
import { answers } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./answers.module.css";

// "Answers your way", scroll-driven. On wide screens the top part pins while you scroll and a 3D
// wheel of the four answer styles turns with the scroll (Normal → Short → Bullets → Script); the
// reply decodes into place for each style. A soft spotlight follows the cursor. After the pin:
// "Or just ask" types onto an underline, and the quick actions slide past as a big marquee with one
// word filling in at a time. Narrow screens and reduced motion: no pin; tap a style (it also cycles).
const icons = {
  spark: "M12 3.5l1.7 5.1 5.1 1.7-5.1 1.7L12 17.1l-1.7-5.1-5.1-1.7 5.1-1.7z",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
);
const N = answers.styles.length;

export function Answers() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const askRef = useRef(null);
  const seen = useSeen(ref);
  const askOn = useOnScreen(askRef, 0.3);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const touched = useRef(false);
  const [typed, setTyped] = useState(999);
  const [lit, setLit] = useState(0);

  // Pinned mode: the scroll turns the wheel (--pos, continuous) and picks the style.
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce);
    const mq = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let current = -1;
    const update = () => {
      frame = 0;
      // Leaving the page clears the ref before the cleanup runs; a queued frame can still arrive.
      if (!mq.matches || !trackRef.current) return;
      const r = trackRef.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      const pos = p * (N - 1);
      el.style.setProperty("--pos", pos.toFixed(3));
      el.style.setProperty("--p", p.toFixed(3));
      const s = Math.round(pos);
      if (s !== current) {
        current = s;
        setActive(s);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMode = () => {
      setPinned(mq.matches);
      update();
    };
    // The cursor spotlight.
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    onMode();
    mq.addEventListener("change", onMode);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", onMode);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Not pinned: cycle the styles by timer until one is picked.
  useEffect(() => {
    if (pinned || still || !seen) return undefined;
    const id = setInterval(() => !touched.current && setActive((a) => (a + 1) % N), 4600);
    return () => clearInterval(id);
  }, [pinned, still, seen]);

  // The Ask line types, then answers; loops while on screen.
  useEffect(() => {
    if (still || !askOn) return undefined;
    const full = answers.ask.typed.length;
    let n = 0;
    setTyped(0);
    const id = setInterval(() => {
      n = n > full + 110 ? 0 : n + 1;
      setTyped(n);
    }, 45);
    return () => clearInterval(id);
  }, [askOn, still]);

  useEffect(() => {
    if (!askOn || still) return undefined;
    const id = setInterval(() => setLit((a) => (a + 1) % answers.actions.length), 1300);
    return () => clearInterval(id);
  }, [askOn, still]);

  // Picking a style: in pinned mode, scroll to its place on the wheel.
  const pick = (i) => {
    touched.current = true;
    if (pinned) {
      const t = trackRef.current;
      const span = t.offsetHeight - window.innerHeight;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY + (span * i) / (N - 1), behavior: "smooth" });
    } else setActive(i);
  };

  const s = answers.styles[active];
  const full = answers.ask.typed.length;
  const answered = typed > full + 8;
  const loop = [...answers.actions, ...answers.actions];

  return (
    <section
      ref={ref}
      id="answers"
      className={styles.section}
      data-in={seen || undefined}
      data-pinned={pinned || undefined}
      style={{ "--n": N }}
      aria-labelledby="answers-title"
    >
      <span className={styles.spot} aria-hidden="true" />
      <SectionHead id="answers-title" eyebrow={answers.eyebrow} title={answers.title} lead={answers.lead} />

      <div ref={trackRef} className={styles.track}>
        <div className={styles.sticky}>
          <div className={styles.row}>
            {/* Left: the question and the wheel of styles. */}
            <div className={styles.left}>
              <p className={styles.them}>
                <span>{answers.them}</span>“{answers.question}”
              </p>
              <div className={styles.wheel} role="radiogroup" aria-label={answers.stylesLabel}>
                {answers.styles.map((x, i) => (
                  <button
                    key={x.key}
                    type="button"
                    role="radio"
                    aria-checked={i === active}
                    onClick={() => pick(i)}
                    style={{ "--i": i }}
                  >
                    <span className={styles.word}>
                      {x.label}
                      <svg className={styles.swash} viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M3 9 C 30 3, 60 13, 90 6 S 112 7, 117 5" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
              <p className={styles.styleNote} key={`n-${s.key}`}>
                {answers.styleNotes[s.key]}
              </p>
            </div>

            {/* Right: the reply, decoding into place. */}
            <div className={styles.right} aria-live="polite">
              <p className={styles.label}>
                <Icon name="spark" />
                {answers.replyLabel}
                <b>{s.label}</b>
              </p>
              <div className={styles.replyText} data-style={s.key} key={s.key}>
                {s.bullets ? (
                  <ul>
                    {s.bullets.map((b, k) => (
                      <li key={b}>
                        <DecodeText text={b} delay={k * 180} duration={900} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    <DecodeText text={s.reply} delay={60} duration={s.key === "short" ? 700 : 1100} />
                  </p>
                )}
              </div>
              <ol className={styles.progress} aria-hidden="true">
                {answers.styles.map((x, i) => (
                  <li key={x.key} data-on={i <= active || undefined}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Or just ask. */}
      <div ref={askRef} className={styles.askRow}>
        <div>
          <p className={styles.label}>{answers.orAsk}</p>
          <p className={styles.line}>
            <span>
              {answers.ask.typed.slice(0, Math.min(typed, full))}
              {typed <= full + 4 && <i className={styles.caret} />}
            </span>
            <span className={styles.go} data-on={answered || undefined}>
              <Icon name="arrow" />
            </span>
          </p>
        </div>
        <p className={styles.answer} data-on={answered || undefined}>
          <img src="/brand/icon.svg" alt="" width="26" height="26" />
          <span>{answers.ask.answer}</span>
        </p>
      </div>

      {/* Quick actions as a marquee of big words. */}
      <div className={styles.marquee} aria-label={answers.actionsLabel}>
        <ul className={styles.track2}>
          {loop.map((a, i) => (
            <li key={i} data-on={(!still && i % answers.actions.length === lit) || undefined} aria-hidden={i >= answers.actions.length || undefined}>
              {a.label}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.note}>{answers.screenNote}</p>
    </section>
  );
}
