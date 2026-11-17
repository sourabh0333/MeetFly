"use client";

import { useEffect, useRef, useState } from "react";
import { beforeCall, featureGroups } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./before-call.module.css";

// "Before the call". Left: the five steps as a "story" list (T–15 min … T–0); the active step opens
// to show what it does, and a progress line fills along it while it plays, then the next one
// starts. Hover pauses; click picks a step (and stops the auto-play). Right: a glass MeetFly window
// on a colour glow, showing that step's screen (drawn in code). The window tilts towards the mouse
// in 3D, two chips float in front of it at different depths, and each screen morphs in (blur,
// scale, rise, with its parts staggering in). Narrow screens: the window first, the list under it.
const group = featureGroups.find((g) => g.id === "before");
const byId = Object.fromEntries(group.items.map((f) => [f.id, f]));
const STEP_MS = 6000;

function Typed({ text, delay = 0, speed = 34 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return undefined;
    }
    let k = 0;
    let id = 0;
    const start = setTimeout(() => {
      id = setInterval(() => {
        k += 1;
        setN(k);
        if (k >= text.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, delay, speed]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <i className={styles.caret} />}
    </>
  );
}

const Icon = ({ d }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d={d} />
  </svg>
);
const CLIP = "M10.5 4.5l-5 5a1.4 1.4 0 0 0 2 2l5.5-5.5a2.8 2.8 0 0 0-4-4L3.5 7.5a4.2 4.2 0 0 0 6 6L13 10";
const MIC = "M8 2a2 2 0 0 1 2 2v4a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2zM4 7.5a4 4 0 0 0 8 0M8 11.5V14";
const LINK = "M6.5 9.5l3-3M5 7.5L3.8 8.7a2.5 2.5 0 0 0 3.5 3.5L8.5 11M11 8.5l1.2-1.2a2.5 2.5 0 0 0-3.5-3.5L7.5 5";

function Screen({ step }) {
  const d = step.demo;
  if (step.id === "calendar")
    return (
      <>
        <ul className={styles.cal}>
          {d.rows.map((r, k) => (
            <li key={r.title} data-hot={r.hot || undefined} style={{ "--k": k }}>
              <span className={styles.time}>{r.time}</span>
              <span className={styles.calText}>
                <b>{r.title}</b>
                <small>{r.meta}</small>
              </span>
              <span className={styles.btns}>
                <span>{d.join}</span>
                <span data-hot>{d.prepare}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.sources} style={{ "--k": 3 }}>
          {d.sources.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </p>
      </>
    );
  if (step.id === "call-prep")
    return (
      <div className={styles.form}>
        <p className={styles.types} style={{ "--k": 0 }}>
          {d.types.map((t) => (
            <span key={t} data-on={t === d.picked || undefined}>
              {t}
            </span>
          ))}
        </p>
        <p className={styles.field} style={{ "--k": 1 }}>
          <span>{d.goalLabel}</span>
          <b>
            <Typed text={d.goal} delay={500} />
          </b>
        </p>
        <p className={styles.field} style={{ "--k": 2 }}>
          <span>{d.notesLabel}</span>
          <b>
            <Typed text={d.notes} delay={500 + d.goal.length * 34 + 200} speed={26} />
          </b>
        </p>
        <p className={styles.files} style={{ "--k": 3 }}>
          {d.files.map((f) => (
            <span key={f}>
              <Icon d={CLIP} />
              {f}
            </span>
          ))}
        </p>
      </div>
    );
  if (step.id === "profiles")
    return (
      <ul className={styles.toggles}>
        {d.items.map(([name, sub, on], k) => (
          <li key={name} data-on={on || undefined} style={{ "--k": k }}>
            <span>
              <b>{name}</b>
              <small>{sub}</small>
            </span>
            <i aria-hidden="true" />
          </li>
        ))}
      </ul>
    );
  if (step.id === "practice")
    return (
      <div className={styles.practice}>
        <p className={styles.orb} style={{ "--k": 0 }} aria-hidden="true">
          <span />
          <span />
          <Icon d={MIC} />
        </p>
        <p className={styles.micLabel} style={{ "--k": 1 }}>
          {d.label}
        </p>
        <p className={styles.bars} style={{ "--k": 1 }} aria-hidden="true">
          {Array.from({ length: 34 }, (_, k) => (
            <i key={k} style={{ "--b": k, "--h": (0.25 + 0.75 * Math.abs(Math.sin(k * 0.9) * Math.cos(k * 0.37))).toFixed(3) }} />
          ))}
        </p>
        {d.lines.map((l, k) => (
          <p key={l} className={styles.said} style={{ "--k": 2 + k }}>
            {l}
          </p>
        ))}
        <p className={styles.ready} style={{ "--k": 4 }}>
          {d.reply}
        </p>
      </div>
    );
  return (
    <div className={styles.join}>
      <p className={styles.field} style={{ "--k": 0 }}>
        <span>{d.label}</span>
        <b className={styles.linkField}>
          <Icon d={LINK} />
          <span>
            <Typed text={d.link} delay={400} speed={28} />
          </span>
        </b>
      </p>
      <p className={styles.apps} style={{ "--k": 1 }}>
        {d.apps.map((a) => (
          <span key={a}>{a}</span>
        ))}
      </p>
      <p className={styles.tiles} style={{ "--k": 2 }}>
        {d.people.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </p>
    </div>
  );
}

export function BeforeCall() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(ref, 0.25);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // 3D tilt towards the mouse, on fine pointers.
  useEffect(() => {
    const el = stageRef.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || still) return undefined;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--tx", x.toFixed(3));
      el.style.setProperty("--ty", y.toFixed(3));
    };
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x = (e.clientX - r.left) / r.width - 0.5;
      y = (e.clientY - r.top) / r.height - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const leave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [still]);

  const step = beforeCall.steps[active];
  const playing = auto && on && !hold && !still;
  const next = () => setActive((a) => (a + 1) % beforeCall.steps.length);

  return (
    <section
      ref={ref}
      id="before"
      className={styles.section}
      data-in={seen || undefined}
      style={{ "--tone": group.tone, "--step": `${STEP_MS}ms` }}
      aria-labelledby="before-title"
    >
      <SectionHead id="before-title" eyebrow={beforeCall.eyebrow} title={beforeCall.title} lead={beforeCall.lead} />

      <div className={styles.split}>
        {/* The steps. */}
        <ol className={styles.steps} onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)} onPointerLeave={() => setHold(false)}>
          {beforeCall.steps.map((s, i) => {
            const f = byId[s.id];
            const isOn = i === active;
            return (
              <li key={s.id} id={`before-${s.id}`} data-on={isOn || undefined} data-done={i < active || undefined}>
                <span className={styles.bar} aria-hidden="true">
                  <i
                    key={isOn ? `on-${active}` : "off"}
                    style={{ animationPlayState: playing ? "running" : "paused" }}
                    onAnimationEnd={isOn ? next : undefined}
                  />
                </span>
                <button
                  type="button"
                  aria-expanded={isOn}
                  onClick={() => {
                    setAuto(false);
                    setActive(i);
                    // Narrow screens: the window sits above the list, so bring it back into view.
                    const r = stageRef.current.getBoundingClientRect();
                    if (window.innerWidth <= 960 && r.top < 60) stageRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
                  }}
                >
                  <span className={styles.t}>{s.t}</span>
                  <span className={styles.name}>{f.name}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
                <div className={styles.more}>
                  <div>
                    <p>{f.text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* The window. */}
        <div ref={stageRef} className={styles.stage} aria-live="polite">
          <span className={styles.glow} aria-hidden="true" />
          <div className={styles.tilt}>
            <div className={styles.window}>
              <p className={styles.titlebar}>
                <span className={styles.lights} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <img src="/brand/icon.svg" alt="" width="18" height="18" />
                <b>{beforeCall.window}</b>
                <span className={styles.crumb}>{step.screen}</span>
              </p>
              <div className={styles.screen} key={step.id}>
                <p className={styles.screenTitle}>{step.screen}</p>
                <Screen step={step} />
              </div>
            </div>

            {/* Floating chips, in front of the window. */}
            <p className={`${styles.float} ${styles.floatA}`} key={`a-${step.id}`} aria-hidden="true">
              <i />
              {step.t}
            </p>
            <p className={`${styles.float} ${styles.floatB}`} key={`b-${step.id}`} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
              {step.chip}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
