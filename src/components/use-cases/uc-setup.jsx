"use client";

import { useEffect, useRef, useState } from "react";
import { roles, setup } from "@/content/use-cases";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./uc-setup.module.css";

// "One call, set up for your role". A glass switcher of the six roles (an ink thumb slides to the
// picked one). Under it a 3 × 3 board: columns Before · During · After, rows aligned across all
// three (what you pick · what it is about · the extras), split by full-width rules. Under it, three equal columns that tell that role's call
// left to right: 01 Before, you set it up (call type, goal, notes for the AI, documents) | 02
// During, MeetFly helps (answer length, a dark panel with the first line of the real answer from
// the hero's recording, the switches that are on) | 03 After, you get back (the notes template's
// sections ticking in, "Saved as a profile"). Every column's content shows at once in a quick
// cascade; a flow line runs across the top and its glowing lime dot travels it, highlighting each
// column in turn (its numeral fills, a soft glow), without holding any text back.
// Then the next role, only while on screen, until one is picked. No pinning. Reduced motion shows
// everything filled.
const STAGE = 2.6; // seconds the highlight spends on each column
const HOLD = STAGE * 3 + 2.4; // seconds per role
const firstLine = (text) => text.split(/(?<=[.?!])\s/)[0];

export function UseCasesSetup() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(ref, 0.25);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // The clock: the dot travels the three columns, then the next role while playing.
  useEffect(() => {
    if (still || !on || !seen) return undefined;
    let frame = 0;
    let last = performance.now();
    let local = 0;
    const loop = (now) => {
      local += Math.min(0.1, (now - last) / 1000);
      last = now;
      if (local >= HOLD && auto) {
        setActive((a) => (a + 1) % roles.length);
        return;
      }
      setT(Math.min(local, HOLD));
      frame = requestAnimationFrame(loop);
    };
    setT(0);
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [still, on, seen, auto, active]);

  const pick = (i) => {
    setAuto(false);
    setActive(i);
  };

  const role = roles[active];
  const s = setup.roles[role.id];
  const time = still ? 99 : t;
  const lit = (stage) => time >= stage * STAGE;
  const flow = still ? 1 : Math.min(1, time / (STAGE * 3)); // the dot's place along the line
  const typeIndex = setup.types.indexOf(role.type);
  const lengthIndex = setup.lengths.indexOf(s.length);
  const options = s.extras.filter(([, v]) => v).map(([l]) => l);

  return (
    <section ref={ref} id="setup" className={styles.section} data-in={seen || undefined} aria-labelledby="setup-title">
      <SectionHead id="setup-title" eyebrow={setup.eyebrow} title={setup.title} lead={setup.lead} />

      {/* The role switcher. */}
      <div className={styles.switchWrap}>
        <div className={styles.switcher} role="tablist" aria-label="Roles" style={{ "--a": active, "--n": roles.length }}>
          <span className={styles.thumb} aria-hidden="true" />
          {roles.map((x, i) => (
            <button key={x.id} type="button" role="tab" aria-selected={i === active} aria-controls="setup-board" onClick={() => pick(i)}>
              {x.short || x.role}
            </button>
          ))}
        </div>
      </div>

      {/* The board: a 3 × 3 grid. Columns: Before · During · After. Rows, aligned across all three:
          what you pick · what it is about · the extras. A flow line runs along the top. */}
      <div id="setup-board" className={styles.board} role="tabpanel" aria-label={`${role.role}: ${s.title}`} style={{ "--flow": flow.toFixed(4) }}>
        <div className={styles.flow} aria-hidden="true">
          <span className={styles.flowFill} />
          <span className={styles.flowDot} />
          {[0, 1, 2].map((i) => (
            <span key={i} className={styles.flowStop} data-on={lit(i) || undefined} style={{ "--x": `${(i * 100) / 3}%` }} />
          ))}
        </div>

        {setup.stages.map((st, i) => (
          <header
            key={st.n}
            className={styles.colHead}
            data-c={i}
            style={{ "--c": i, "--o": i * 10, gridColumn: i + 1, gridRow: 1 }}
            data-on={lit(i) || undefined}
            data-now={(!still && lit(i) && !lit(i + 1)) || undefined}
          >
            <span className={styles.numeral}>{st.n}</span>
            <span className={styles.colTitle}>
              <em>{st.when}</em>
              {st.title}
            </span>
            <span className={styles.where}>{st.note}</span>
          </header>
        ))}

        {/* Row 1 · what you pick */}
        <div className={styles.cell} data-c={0} data-r={0} style={{ "--c": 0, "--r": 0, "--o": 1, gridColumn: 1, gridRow: 2 }} key={`a0-${role.id}`}>
          <span className={styles.label}>{setup.labels.type}</span>
          <span className={styles.types}>
            {setup.types.map((x, j) => (
              <span key={x} data-on={j === typeIndex || undefined}>
                {x}
              </span>
            ))}
          </span>
        </div>
        <div className={styles.cell} data-c={1} data-r={0} style={{ "--c": 1, "--r": 0, "--o": 11, gridColumn: 2, gridRow: 2 }} key={`a1-${role.id}`}>
          <span className={styles.label}>{setup.labels.length}</span>
          <span className={styles.lengths} style={{ "--pick": lengthIndex }}>
            <i className={styles.lengthPill} />
            {setup.lengths.map((x, j) => (
              <span key={x} data-on={j === lengthIndex || undefined}>
                {x}
              </span>
            ))}
          </span>
        </div>
        <div className={styles.cell} data-c={2} data-r={0} style={{ "--c": 2, "--r": 0, "--o": 21, gridColumn: 3, gridRow: 2 }} key={`a2-${role.id}`}>
          <span className={styles.label}>{setup.labels.template}</span>
          <span className={styles.templateName}>
            {role.type}
            <em>
              {s.template.length} {setup.sections}
            </em>
          </span>
        </div>

        {/* Row 2 · what it is about */}
        <div className={styles.cell} data-c={0} data-r={1} style={{ "--c": 0, "--r": 1, "--o": 2, gridColumn: 1, gridRow: 3 }} key={`b0-${role.id}`}>
          <span className={styles.label}>{setup.labels.goal}</span>
          <span className={styles.goal}>
            <span className={styles.typed} style={{ "--chars": role.goal.length }}>
              {role.goal}
            </span>
          </span>
          <span className={`${styles.label} ${styles.subLabel}`}>{setup.labels.notes}</span>
          <span className={styles.notes}>{s.notes}</span>
        </div>
        <div className={styles.cell} data-c={1} data-r={1} style={{ "--c": 1, "--r": 1, "--o": 12, gridColumn: 2, gridRow: 3 }} key={`b1-${role.id}`}>
          <span className={styles.label}>
            {setup.labels.reply}
            <em>{setup.replyNote}</em>
          </span>
          <span className={styles.panel}>
            <span className={styles.panelHead}>
              <img src="/brand/icon.svg" alt="" width="16" height="16" />
              MeetFly
              <i>{role.type}</i>
            </span>
            <span className={styles.panelText}>
              {still ? firstLine(role.reply) : <DecodeText text={firstLine(role.reply)} delay={350} duration={900} />}
            </span>
          </span>
        </div>
        <div className={styles.cell} data-c={2} data-r={1} style={{ "--c": 2, "--r": 1, "--o": 22, gridColumn: 3, gridRow: 3 }} key={`b2-${role.id}`}>
          <span className={styles.label}>{setup.labels.sectionsLabel}</span>
          <ol className={styles.template}>
            {s.template.map((x, j) => (
              <li key={x} style={{ "--j": j }}>
                <span className={styles.tick} aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3.5 8.5l3 3 6-7" pathLength="1" />
                  </svg>
                </span>
                {x}
              </li>
            ))}
          </ol>
        </div>

        {/* Row 3 · the extras */}
        <div className={styles.cell} data-c={0} data-r={2} style={{ "--c": 0, "--r": 2, "--o": 3, gridColumn: 1, gridRow: 4 }} key={`c0-${role.id}`}>
          <span className={styles.label}>{setup.labels.files}</span>
          <span className={styles.files}>
            {s.files.map((f, j) => (
              <span key={f} style={{ "--d": `${j * 120}ms` }}>
                <b>{f.split(".").pop()}</b>
                {f}
              </span>
            ))}
          </span>
        </div>
        <div className={styles.cell} data-c={1} data-r={2} style={{ "--c": 1, "--r": 2, "--o": 13, gridColumn: 2, gridRow: 4 }} key={`c1-${role.id}`}>
          <span className={styles.label}>{setup.labels.options}</span>
          <span className={styles.options}>
            {options.map((o, j) => (
              <span key={o} style={{ "--d": `${j * 160}ms` }}>
                <i className={styles.toggle} />
                {o}
              </span>
            ))}
          </span>
        </div>
        <div className={styles.cell} data-c={2} data-r={2} style={{ "--c": 2, "--r": 2, "--o": 23, gridColumn: 3, gridRow: 4 }} key={`c2-${role.id}`}>
          <span className={styles.label}>{setup.labels.profile}</span>
          <span className={styles.saved} style={{ "--n": s.template.length }}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
            {setup.saved}
            <i>{s.title}</i>
          </span>
        </div>
      </div>
    </section>
  );
}
