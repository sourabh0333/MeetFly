"use client";

import { useEffect, useRef, useState } from "react";
import { stage } from "@/content/home";
import { DemoScenery } from "./demo-scenery";
import styles from "./hero-stage.module.css";

// The hero's interactive demo. A painted landscape card holds a headline, a tab bar, MeetFly's
// interface (drawn in code, in the app's own look) and the video call it's listening to. It plays
// four steps on its own: listening, the live transcript typing in, a suggested reply popping up,
// then a recap (the call card folds away). Clicking a tab jumps to that step. It animates itself
// in when it scrolls into view and only runs while on screen. With reduced motion it doesn't
// play: each tab shows its finished state.
const CPS = 42; // typing speed, characters per second
const paths = {
  // Tab icons, drawn for MeetFly.
  headphones: "M4 15v-3a8 8 0 0 1 16 0v3M4 14.5h2.5a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM20 14.5h-2.5a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1z",
  captions: "M3.5 5.5h17v11h-9l-4.5 3.5v-3.5H3.5zM7 9.5h6M7 12.5h10",
  bolt: "M13 3 5.5 13.5H11L10 21l7.5-10.5H12z",
  clipboard: "M9 4.5h6v2.5H9zM9 5.5H6.5v15h11v-15H15M9.5 13.5l2 2 3.5-4",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm-6 9a6 6 0 0 0 12 0M12 18v3",
  transcript: "M6 3.5h9l3 3v14H6zM9 9.5h6M9 13h6M9 16.5h4",
  spark: "M12 3.5l1.7 5.1 5.1 1.7-5.1 1.7L12 17.1l-1.7-5.1-5.1-1.7 5.1-1.7zM18.5 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
  list: "M9 6.5h10M9 12h10M9 17.5h10M5 6.5h.01M5 12h.01M5 17.5h.01",
  home: "M4 11 12 4l8 7v9h-5v-6H9v6H4z",
  doc: "M6 3.5h9l3 3v14H6zM9 9.5h6M9 13h6",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 12h17M12 3c2.5 2.6 3.6 5.6 3.6 9s-1.1 6.4-3.6 9c-2.5-2.6-3.6-5.6-3.6-9S9.5 5.6 12 3Z",
  bars: "M5 10v4M9 7v10M13 4v16M17 8v8M21 11v2",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19 12l2-1.5-2-3.5-2.4.7-1.6-1L14.5 4h-5L9 6.7l-1.6 1L5 7 3 10.5 5 12l-2 1.5L5 17l2.4-.7 1.6 1 .5 2.7h5l.5-2.7 1.6-1L19 17l2-3.5z",
  cam: "M3 7.5A1.5 1.5 0 0 1 4.5 6h9A1.5 1.5 0 0 1 15 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 16.5Zm12 3 6-3.5v10l-6-3.5",
  leave: "M3.5 14.5c4.7-4.7 12.3-4.7 17 0l-2 2.2-3.2-1.5v-2.4a10 10 0 0 0-6.6 0v2.4l-3.2 1.5Z",
  audio: "M4 6h10v12H4zM17 9l3-2v10l-3-2",
  copy: "M8 8h11v12H8zM5 16V4h11",
  redo: "M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5",
  check: "M5 12.5l4.5 4.5L19 7.5",
  chevron: "M7 10l5 5 5-5",
};
const Icon = ({ name, className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d={paths[name]} />
  </svg>
);
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const starts = stage.tabs.reduce((acc, tab, i) => [...acc, i ? acc[i - 1] + stage.tabs[i - 1].seconds : 0], []);
const typed = (text, from, t) => text.slice(0, Math.max(0, Math.floor((t - from) * CPS)));
const doneAt = (line) => line.at + line.text.length / CPS;
const wordsOut = (text, from, t, wps = 9) => {
  const words = text.split(" ");
  return words.slice(0, Math.max(0, Math.floor((t - from) * wps))).join(" ");
};

export function HeroStage() {
  const root = useRef(null);
  const people = useRef([]);
  const [step, setStep] = useState(0);
  const [t, setT] = useState(0);
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const clock = useRef({ step: 0, t: 0 });

  // Animate in the first time it's seen; run only while on screen.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce);
    const observer = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) setEntered(true);
    }, { threshold: 0.2 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  const running = entered && visible && !paused && !still;

  // The people's videos play while the demo is on screen.
  useEffect(() => {
    people.current.forEach((v) => {
      if (!v) return;
      if (visible && !still) v.play().catch(() => {});
      else v.pause();
    });
  }, [visible, still]);

  // The demo clock: steps through the tabs and loops.
  useEffect(() => {
    if (!running) return undefined;
    let frame = 0;
    let last = performance.now();
    let shown = -1;
    const loop = (now) => {
      const c = clock.current;
      c.t += Math.min(0.1, (now - last) / 1000);
      last = now;
      if (c.t >= stage.tabs[c.step].seconds) {
        c.step = (c.step + 1) % stage.tabs.length;
        c.t = 0;
        setStep(c.step);
      }
      if (c.t - shown >= 1 / 30 || c.t < shown) {
        shown = c.t;
        setT(c.t);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const go = (i) => {
    clock.current = { step: i, t: still ? 999 : 0 };
    setStep(i);
    setT(clock.current.t);
    if (!still) setPaused(false);
  };

  const key = stage.tabs[step].key;
  // With reduced motion, every step shows its finished state.
  const time = still ? 999 : t;
  const lineTime = key === "transcript" ? time : key === "reply" ? 999 : -1;
  const typing = stage.lines.find((l) => lineTime >= l.at && lineTime < doneAt(l));
  const speaker =
    key === "listen" ? (time > 4.2 && time < 900 ? "them" : null) : key === "transcript" ? typing?.who : key === "reply" && time > 7 && time < 900 ? "you" : null;
  const rec = fmt(19 + starts[step] + Math.min(time, stage.tabs[step].seconds));
  const recapReady = time >= 3.4;

  return (
    <div ref={root} className={styles.stage} data-in={entered || undefined}>
      <div className={styles.bg} aria-hidden="true">
        <DemoScenery />
      </div>

      <h2 className={styles.title}>{stage.title}</h2>

      <div className={styles.tabs} role="group" aria-label="Demo steps">
        {stage.tabs.map((tab, i) => (
          <button key={tab.key} type="button" className={styles.tab} aria-pressed={i === step} onClick={() => go(i)}>
            <span className={styles.tabFill} aria-hidden="true">
              <span style={{ transform: `scaleX(${i === step ? Math.min(1, time / tab.seconds) : 0})` }} />
            </span>
            <Icon name={tab.icon} />
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.scene}>
        {/* MeetFly, drawn in its own look. */}
        <div className={styles.window}>
          <p className={styles.sr}>{stage.label}</p>
          <div className={styles.winBar}>
            <span className={styles.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span aria-hidden="true">{stage.window}</span>
            {!still && (
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? stage.play : stage.pause}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  {paused ? <path d="M5 3.5v9l7-4.5z" /> : <path d="M4.5 3.5h2.4v9H4.5zM9.1 3.5h2.4v9H9.1z" />}
                </svg>
              </button>
            )}
          </div>
          <div className={styles.body} aria-hidden="true">
            <nav className={styles.rail}>
              <img className={styles.railLogo} src="/brand/icon.svg" alt="" width="24" height="24" />
              <Icon name="home" />
              <Icon name="doc" />
              <span className={styles.recBtn}>
                <i />
              </span>
              <Icon name="globe" />
              <Icon name="bars" />
              <Icon name="gear" className={styles.railEnd} />
            </nav>

            <div className={styles.main}>
              <div className={styles.head}>
                <p>
                  <b>{stage.meeting.title}</b>
                  <span>{stage.meeting.meta}</span>
                </p>
                <span className={styles.recPill}>
                  <i />
                  REC <b>{rec}</b>
                </span>
              </div>

              <div className={styles.content}>
                {/* Step 1: listening. */}
                <div className={styles.view} data-on={key === "listen" || undefined}>
                  <div className={styles.listen}>
                    <span className={styles.pulse} />
                    <p>{stage.listening.title}</p>
                    <small>{stage.listening.sub}</small>
                  </div>
                </div>

                {/* Steps 2 and 3: the live transcript. */}
                <div className={styles.view} data-on={key === "transcript" || key === "reply" || undefined} data-dim={key === "reply" || undefined}>
                  <ol className={styles.lines}>
                    {stage.lines
                      .filter((l) => lineTime >= l.at)
                      .map((l) => (
                        <li key={l.at} className={styles.line}>
                          <span className={styles.stamp}>{l.stamp}</span>
                          <span className={styles.who} data-who={l.who}>
                            {l.who === "them" ? stage.them : stage.you}
                          </span>
                          <span className={styles.said}>
                            {typed(l.text, l.at, lineTime)}
                            {typing === l && <i className={styles.caret} />}
                          </span>
                        </li>
                      ))}
                  </ol>
                </div>

                {/* Step 3: the suggested reply pops up. */}
                <div className={styles.overlay} data-on={key === "reply" || undefined}>
                  <div className={styles.replyCard}>
                    <p className={styles.replyHead}>
                      <Icon name="spark" />
                      {stage.reply.label}
                      <span>{stage.reply.auto}</span>
                    </p>
                    <p className={styles.quote}>{stage.reply.quote}</p>
                    <p className={styles.replyText}>
                      {key === "reply" ? wordsOut(stage.reply.text, 0.9, time) : ""}
                      {key === "reply" && time < 0.9 + stage.reply.text.split(" ").length / 9 && <i className={styles.caret} />}
                    </p>
                    <ul className={styles.tips}>
                      {stage.reply.tips.map((tip, i) => (
                        <li key={tip} data-on={(key === "reply" && time > 4.8 + i * 0.5) || undefined}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.chips}>
                      {stage.reply.actions.map((a) => (
                        <span key={a}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 4: the recap. */}
                <div className={styles.view} data-on={key === "recap" || undefined}>
                  <div className={styles.working} data-on={(key === "recap" && !recapReady) || undefined}>
                    <span className={styles.sparkBox}>
                      <Icon name="spark" />
                    </span>
                    <p>{stage.recap.working}</p>
                    <ul>
                      {stage.recap.steps.map((s, i) => (
                        <li key={s} data-on={(key === "recap" && time > 0.5 + i * 0.85) || undefined}>
                          <span>
                            <Icon name="check" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.doc} data-on={(key === "recap" && recapReady) || undefined}>
                    <h3>{stage.recap.title}</h3>
                    <p className={styles.meta}>{stage.recap.meta}</p>
                    <ul>
                      {stage.recap.items.map(([k, v], i) => (
                        <li key={v} data-on={(key === "recap" && time > 3.7 + i * 0.45) || undefined}>
                          <b>{k}:</b> {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* The dock at the bottom: call controls, or recap actions. */}
              <div className={styles.dockRow}>
                <div className={styles.dock} data-on={key !== "recap" || undefined}>
                  <span className={styles.meter} data-on={speaker ? true : undefined}>
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.dockBtn}>
                    <Icon name="mic" />
                    {stage.controls.mic}
                  </span>
                  <span className={styles.dockBtn} data-wide>
                    <Icon name="audio" />
                    {stage.controls.audio}
                  </span>
                  <span className={styles.endBtn}>
                    <Icon name="leave" />
                    {stage.controls.end}
                  </span>
                </div>
                <div className={styles.dock} data-on={(key === "recap" && recapReady) || undefined}>
                  <span className={styles.dockBtn}>
                    <Icon name="copy" />
                    {stage.recap.copy}
                  </span>
                  <span className={styles.dockBtn} data-violet>
                    <Icon name="redo" />
                    {stage.recap.again}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The call MeetFly is listening to; it folds away for the recap. */}
        <div className={styles.side} data-hidden={key === "recap" || undefined} aria-hidden="true">
          <div className={styles.sideInner}>
            <div className={styles.call}>
              <div className={styles.grid}>
                {stage.people.map((p, i) => {
                  const on = p.who && p.who === speaker;
                  return (
                    <div key={p.key} className={styles.tile} data-speaking={on || undefined}>
                      <video
                        ref={(v) => (people.current[i] = v)}
                        src={p.src}
                        poster={p.poster}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                      {on && (
                        <span className={styles.talking}>
                          <i />
                          <i />
                          <i />
                        </span>
                      )}
                      <span className={styles.name}>
                        <Icon name="mic" />
                        {p.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className={styles.controls}>
                <span>
                  <Icon name="mic" />
                </span>
                <span>
                  <Icon name="cam" />
                </span>
                <span data-leave>
                  <Icon name="leave" />
                </span>
              </div>
            </div>

            <div className={styles.works}>
              <p>{stage.worksWith}</p>
              <ul>
                {stage.apps.map((a) => (
                  <li key={a.name} title={a.name} style={{ "--app": a.bg }}>
                    {a.short}
                  </li>
                ))}
              </ul>
              <span className={styles.more}>
                {stage.more}
                <Icon name="chevron" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
