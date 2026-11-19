"use client";

import { useEffect, useRef, useState } from "react";
import { beforeCall, featureGroups } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./before-call.module.css";

// "Before the call", minute by minute: an editorial zigzag on a ruled grid. Each step has a giant
// "minutes to go" numeral (15, 12, 08, 05, 00) that rolls into place like an odometer when it comes
// into view, then fills with colour from the bottom up as you scroll (a scroll-driven clip on a
// second, coloured copy). Beside it: the step's name, what it does, and a live example set in type
// (no boxes): the meeting line with Join / Prepare, call types and a goal typing itself, profile
// switches, a talking waveform, a meeting link typing in. Rows alternate sides; phones stack.
const group = featureGroups.find((g) => g.id === "before");
const byId = Object.fromEntries(group.items.map((f) => [f.id, f]));
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Typed({ text, live, delay = 0, speed = 34 }) {
  const [n, setN] = useState(text.length);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    let id = 0;
    setN(0);
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
  }, [live, text, delay, speed]);
  return (
    <>
      {text.slice(0, n)}
      {live && n < text.length && <i className={styles.caret} />}
    </>
  );
}

// Two rolling digit columns. `on` rolls them from 00 to the value.
function Odometer({ value, on }) {
  const [a, b] = String(value).padStart(2, "0").split("").map(Number);
  return (
    <span className={styles.odo}>
      {[a, b].map((d, k) => (
        <span key={k} className={styles.col}>
          <span className={styles.strip} style={{ "--d": on ? d : 0, "--c": k }}>
            {DIGITS.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

const Icon = ({ d }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d={d} />
  </svg>
);
const MIC = "M8 2a2 2 0 0 1 2 2v4a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2zM4 7.5a4 4 0 0 0 8 0M8 11.5V14";
const ARROW = "M3 8h10M9 4l4 4-4 4";
const CLIP = "M10.5 4.5l-5 5a1.4 1.4 0 0 0 2 2l5.5-5.5a2.8 2.8 0 0 0-4-4L3.5 7.5a4.2 4.2 0 0 0 6 6L13 10";

function Demo({ step, live }) {
  const d = step.demo;
  if (step.id === "calendar") {
    const r = d.rows[0];
    return (
      <>
        <p className={styles.meeting}>
          <span className={styles.mono}>{r.time}</span>
          <b>{r.title}</b>
          <span className={styles.muted}>{r.meta}</span>
          <span className={styles.pills}>
            <span>{d.join}</span>
            <span data-hot>{d.prepare}</span>
          </span>
        </p>
        <p className={styles.small}>
          {d.rows.slice(1).map((x) => `${x.time} ${x.title}`).join("   ·   ")}
        </p>
        <p className={styles.sources}>
          {d.sources.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </p>
      </>
    );
  }
  if (step.id === "call-prep")
    return (
      <>
        <p className={styles.types}>
          {d.types.map((t) => (
            <span key={t} data-on={t === d.picked || undefined}>
              {t}
            </span>
          ))}
        </p>
        <p className={styles.label}>{d.goalLabel}</p>
        <p className={styles.goal}>
          <Typed text={d.goal} live={live} delay={400} />
        </p>
        <p className={styles.label}>{d.notesLabel}</p>
        <p className={styles.notes}>
          <Typed text={d.notes} live={live} delay={400 + d.goal.length * 34 + 250} speed={24} />
        </p>
        <p className={styles.sources}>
          {d.files.map((f) => (
            <span key={f}>
              <Icon d={CLIP} />
              {f}
            </span>
          ))}
        </p>
      </>
    );
  if (step.id === "profiles")
    return (
      <ul className={styles.toggles}>
        {d.items.map(([name, sub, on], k) => (
          <li key={name} data-on={on || undefined} style={{ "--k": k }}>
            <i aria-hidden="true" />
            <span>
              <b>{name}</b>
              <small>{sub}</small>
            </span>
          </li>
        ))}
      </ul>
    );
  if (step.id === "practice")
    return (
      <>
        <p className={styles.mic}>
          <span className={styles.micDot}>
            <Icon d={MIC} />
          </span>
          {d.label}
        </p>
        <p className={styles.bars} aria-hidden="true">
          {Array.from({ length: 40 }, (_, k) => (
            <i key={k} style={{ "--b": k, "--h": (0.2 + 0.8 * Math.abs(Math.sin(k * 0.9) * Math.cos(k * 0.37))).toFixed(3) }} />
          ))}
        </p>
        <p className={styles.quote}>{d.lines[1]}</p>
      </>
    );
  return (
    <>
      <p className={styles.label}>{d.label}</p>
      <p className={styles.link}>
        <Typed text={d.link} live={live} delay={300} speed={28} />
      </p>
      <p className={styles.opens} data-on={live || undefined}>
        <Icon d={ARROW} />
        {step.chip}
      </p>
      <p className={styles.sources}>
        {d.apps.map((a) => (
          <span key={a}>{a}</span>
        ))}
      </p>
    </>
  );
}

function Row({ step, i }) {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.35);
  const f = byId[step.id];
  const label = step.min === 0 ? beforeCall.nowLabel : beforeCall.minLabel;
  return (
    <li ref={ref} id={`before-${step.id}`} className={styles.row} data-flip={i % 2 === 1 || undefined} data-seen={seen || undefined}>
      <div className={styles.big} aria-hidden="true">
        <span className={styles.numeral}>
          <span className={styles.ghost}>
            <Odometer value={step.min} on={seen} />
          </span>
          <span className={styles.fill}>
            <Odometer value={step.min} on={seen} />
          </span>
        </span>
        <span className={styles.unit}>{label}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.meta}>
          <span>{String(i + 1).padStart(2, "0")} / 05</span>
          {step.t}
        </p>
        <h3 className={styles.name}>{f.name}</h3>
        <p className={styles.text}>{f.text}</p>
        <div className={styles.demo}>
          <Demo step={step} live={seen} />
        </div>
      </div>
    </li>
  );
}

export function BeforeCall() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  return (
    <section ref={ref} id="before" className={styles.section} data-in={seen || undefined} style={{ "--tone": group.tone }} aria-labelledby="before-title">
      <SectionHead id="before-title" eyebrow={beforeCall.eyebrow} title={beforeCall.title} lead={beforeCall.lead} />
      <ol className={styles.rows}>
        {beforeCall.steps.map((s, i) => (
          <Row key={s.id} step={s} i={i} />
        ))}
      </ol>
    </section>
  );
}
